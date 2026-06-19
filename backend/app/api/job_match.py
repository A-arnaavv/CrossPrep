from uuid import UUID

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.dependencies import get_db

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
    user_id: UUID,
    job_title: str,
    job_description: str,
    db: Session = Depends(get_db),
):
    resume_repo = ResumeRepository(
        db
    )

    resume = (
        resume_repo.get_latest_by_user(
            user_id
        )
    )

    if not resume:
        return {
            "error": "Resume not found"
        }

    result = (
        JobMatchService.calculate_match(
            resume_skills=resume.skills,
            job_description=job_description,
        )
    )

    repo = JobMatchRepository(
        db
    )

    job_match = repo.create(
        user_id=user_id,
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

@router.get("/user/{user_id}")
def get_job_matches(
    user_id: UUID,
    db: Session = Depends(get_db),
):
    repo = JobMatchRepository(
        db
    )

    matches = repo.get_by_user(
        user_id
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