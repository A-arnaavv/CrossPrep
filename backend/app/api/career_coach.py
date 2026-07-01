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

from app.repositories.coding_interview_session_repository import (
    CodingInterviewSessionRepository,
)

from app.repositories.interview_repository import (
    InterviewRepository,
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

    coding_repo = CodingInterviewSessionRepository(
        db
    )

    coding_sessions = (
        coding_repo.get_sessions_by_user(
            user.id
        )
    )

    interview_repo = InterviewRepository(
        db
    )

    behavioral_interviews = (
        interview_repo.get_by_user(
            user.id
        )
    )

    interview_data = [
        {
            "type": "coding",
            "role": session.role,
            "language": session.language,
            "status": session.status,
            "total_score": session.total_score,
            "summary": session.summary,
            "strengths": session.strengths,
            "improvements": session.improvements,
        }
        for session in coding_sessions
    ]

    interview_data.extend(
    [
        {
            "type": "behavioral",
            "role": interview.role,
            "level": interview.level,
            "status": interview.status,
        }
        for interview in behavioral_interviews
    ]
    )

    total_resumes = 1 if latest_resume else 0

    total_interviews = len(
        behavioral_interviews
    ) + len(
        coding_sessions
    )

    coding_scores = [
        session.total_score / 4
        for session in coding_sessions
        if session.status == "completed"
    ]

    average_score = 0

    if coding_scores:
        average_score = (
            sum(coding_scores)
            / len(coding_scores)
        )

    completed_interviews = len(
        [
            session
            for session in coding_sessions
            if session.status == "completed"
        ]
    )

    completion_percentage = 0

    if total_interviews:
        completion_percentage = (
            completed_interviews
            / total_interviews
        ) * 100

    dashboard_stats = {
        "total_resumes": total_resumes,
        "total_interviews": total_interviews,
        "average_score": round(
            average_score,
            2,
        ),
        "completion_percentage": round(
            completion_percentage,
            2,
        ),
    }

    return (
        CareerCoachService
        .generate_coach_report(
            resume_data=resume_data,
            interview_data=interview_data,
            dashboard_stats=dashboard_stats,
        )
    )

   