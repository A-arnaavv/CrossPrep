from uuid import UUID

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.repositories.resume_repository import (
    ResumeRepository,
)

from app.repositories.interview_repository import (
    InterviewRepository,
)

from app.repositories.question_repository import (
    QuestionRepository,
)

from app.services.gemini_service import (
    GeminiService,
)


router = APIRouter()


@router.post("/create")
def create_interview(
    user_id: UUID,
    role: str,
    level: str,
    db: Session = Depends(get_db),
):
    resume_repo = ResumeRepository(db)

    resume = (
        resume_repo.get_latest_by_user(
            user_id
        )
    )

    if not resume:
        return {
            "error": "Resume not found"
        }

    interview_repo = InterviewRepository(
        db
    )

    interview = interview_repo.create(
        user_id=user_id,
        role=role,
        level=level,
    )

    analysis = (
        GeminiService.generate_interview_questions(
            role=role,
            level=level,
            skills=resume.skills,
            projects=resume.projects,
        )
    )

    questions = analysis["questions"]

    question_repo = QuestionRepository(
        db
    )

    question_repo.create_many(
        interview.id,
        questions,
    )

    return {
        "interview_id": str(
            interview.id
        ),
        "questions": questions,
    }