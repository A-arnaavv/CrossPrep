from uuid import UUID

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.repositories.user_repository import (
    UserRepository,
)

from app.services.career_coach_service import (
    CareerCoachService,
)

from app.repositories.resume_repository import (
    ResumeRepository,
)

router = APIRouter()


@router.get("/{clerk_id}")
def get_career_coach_report(
    clerk_id: str,
    db: Session = Depends(get_db),
):

    user_repo = UserRepository(
        db
    )

    user = user_repo.get_by_clerk_id(
        clerk_id
    )

    if not user:
        return {
            "error": "User not found"
        }

    resume_repo = ResumeRepository(
        db
    )

    latest_resume = (
        resume_repo.get_latest_by_user(
            user.id
        )
    )

    if latest_resume:

        resume_data = {
            "ats_score":
                latest_resume.ats_score,

            "skills":
                latest_resume.skills,

            "strengths":
                latest_resume.strengths,

            "weaknesses":
                latest_resume.weaknesses,

            "missing_skills":
                latest_resume.missing_skills,

            "recommendations":
                latest_resume.recommendations,
        }

    else:

        resume_data = {}

    interview_data = []

    dashboard_stats = {
        "message": "Career coach initial version"
    }

    return (
        CareerCoachService
        .generate_coach_report(
            resume_data=resume_data,
            interview_data=interview_data,
            dashboard_stats=dashboard_stats,
        )
    )