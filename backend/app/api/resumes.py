from uuid import UUID

from fastapi import APIRouter
from fastapi import Depends
from fastapi import UploadFile
from fastapi import File
from fastapi import Form

from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.models.resume import Resume

from app.repositories.resume_repository import (
    ResumeRepository,
)

from app.services.storage_service import (
    StorageService,
)

from app.services.pdf_service import (
    PDFService,
)

from app.services.gemini_service import (
    GeminiService,
)

router = APIRouter()


@router.post("/upload")
async def upload_resume(
    user_id: UUID = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    file_bytes = await file.read()

    storage_path = (
        StorageService.upload_resume(
            file_bytes=file_bytes,
            file_name=file.filename,
        )
    )

    repo = ResumeRepository(db)

    resume = repo.create(
        user_id=user_id,
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

    repo.update_parsed_text(
        resume.id,
        parsed_text,
    )

    repo.update_analysis(
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
    }