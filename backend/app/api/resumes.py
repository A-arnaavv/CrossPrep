from fastapi import APIRouter
from fastapi import Depends
from fastapi import File
from fastapi import HTTPException
from fastapi import UploadFile

from sqlalchemy.orm import Session

from app.auth.dependencies import (
    get_current_user,
)
from app.dependencies import get_db

from app.models.resume import Resume
from app.models.user import User

from app.repositories.resume_repository import (
    ResumeRepository,
)

from app.services.ats_service import (
    ATSService,
)
from app.services.gemini_service import (
    GeminiService,
)
from app.services.pdf_service import (
    PDFService,
)
from app.services.storage_service import (
    StorageService,
)


router = APIRouter()


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="A resume file is required.",
        )

    file_bytes = await file.read()

    if not file_bytes:
        raise HTTPException(
            status_code=400,
            detail="The uploaded resume is empty.",
        )

    storage_path = (
        StorageService.upload_resume(
            file_bytes=file_bytes,
            file_name=file.filename,
        )
    )

    resume_repo = ResumeRepository(db)

    try:
        resume = resume_repo.create(
            user_id=current_user.id,
            file_url=storage_path,
        )

        parsed_text = (
            PDFService.extract_text(
                file_bytes
            )
        )

        analysis = (
            GeminiService.analyze_resume(
                parsed_text
            )
        )

        analysis["ats_score"] = (
            ATSService.calculate_score(
                skills=analysis.get(
                    "skills",
                    [],
                ),
                projects=analysis.get(
                    "projects",
                    [],
                ),
                experience=analysis.get(
                    "experience",
                    [],
                ),
                education=analysis.get(
                    "education",
                    [],
                ),
            )
        )

        resume_repo.update_parsed_text(
            resume.id,
            parsed_text,
        )

        resume_repo.update_analysis(
            resume.id,
            analysis,
        )

        updated_resume = (
            db.query(Resume)
            .filter(
                Resume.id == resume.id
            )
            .first()
        )

        if not updated_resume:
            raise HTTPException(
                status_code=500,
                detail=(
                    "The resume could not be "
                    "loaded after analysis."
                ),
            )

        return {
            "resume_id": str(
                updated_resume.id
            ),
            "skills": (
                updated_resume.skills
            ),
            "projects": (
                updated_resume.projects
            ),
            "experience": (
                updated_resume.experience
            ),
            "education": (
                updated_resume.education
            ),
            "ats_score": (
                updated_resume.ats_score
            ),
            "strengths": (
                updated_resume.strengths
            ),
            "weaknesses": (
                updated_resume.weaknesses
            ),
            "missing_skills": (
                updated_resume.missing_skills
            ),
            "recommendations": (
                updated_resume.recommendations
            ),
        }

    except HTTPException:
        raise

    except Exception as error:
        print(
            "Resume upload failed:",
            error,
        )

        raise HTTPException(
            status_code=500,
            detail=(
                "Resume analysis could not "
                "be completed."
            ),
        ) from error