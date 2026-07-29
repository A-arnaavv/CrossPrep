from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.auth.dependencies import (
    get_current_user,
)
from app.dependencies import get_db

from app.models.user import User

from app.repositories.resume_repository import (
    ResumeRepository,
)
from app.repositories.job_match_repository import (
    JobMatchRepository,
)

from app.services.job_match_service import (
    JobMatchService,
)


router = APIRouter()


@router.post("/")
def create_job_match(
    job_title: str,
    job_description: str,
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    resume_repo = ResumeRepository(db)

    resume = resume_repo.get_latest_by_user(
        current_user.id
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail=(
                "Upload a resume before "
                "creating a job match."
            ),
        )

    result = (
        JobMatchService.calculate_match(
            resume_skills=resume.skills,
            job_description=job_description,
        )
    )

    repo = JobMatchRepository(db)

    job_match = repo.create(
        user_id=current_user.id,
        job_title=job_title,
        job_description=job_description,
        match_score=result[
            "match_score"
        ],
        matched_skills=result[
            "matched_skills"
        ],
        missing_skills=result[
            "missing_skills"
        ],
        recommendations=result[
            "recommendations"
        ],
    )

    return {
        "job_match_id": str(
            job_match.id
        ),
        **result,
    }


@router.get("/user")
def get_job_matches(
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    repo = JobMatchRepository(db)

    matches = repo.get_by_user(
        current_user.id
    )

    return [
        {
            "id": str(
                match.id
            ),
            "job_title": (
                match.job_title
            ),
            "match_score": (
                match.match_score
            ),
            "created_at": str(
                match.created_at
            ),
        }
        for match in matches
    ]