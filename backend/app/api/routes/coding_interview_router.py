from uuid import UUID

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.services.coding_interview_service import (
    CodingInterviewService,
)

from app.repositories.coding_interview_repository import (
    CodingInterviewRepository,
)

router = APIRouter()


@router.post("/generate")
def generate_question(
    role: str,
    language: str,
):
    return (
        CodingInterviewService.generate_question(
            role=role,
            language=language,
        )
    )


@router.post("/submit")
def submit_code(
    user_id: UUID,
    role: str,
    language: str,
    question: str,
    code: str,
    db: Session = Depends(get_db),
):
    evaluation = (
        CodingInterviewService.evaluate_code(
            question=question,
            code=code,
        )
    )

    repo = CodingInterviewRepository(
        db
    )

    interview = repo.create(
        user_id=user_id,
        role=role,
        language=language,
        question=question,
        code=code,
        score=evaluation["score"],
        feedback=evaluation["feedback"],
    )

    return {
        "coding_interview_id": str(
            interview.id
        ),
        "score": interview.score,
        "feedback": interview.feedback,
    }


@router.get("/user/{user_id}")
def get_history(
    user_id: UUID,
    db: Session = Depends(get_db),
):
    repo = CodingInterviewRepository(
        db
    )

    interviews = repo.get_by_user(
        user_id
    )

    return [
        {
            "id": str(
                interview.id
            ),
            "role": interview.role,
            "language": interview.language,
            "score": interview.score,
            "created_at": str(
                interview.created_at
            ),
        }
        for interview in interviews
    ]