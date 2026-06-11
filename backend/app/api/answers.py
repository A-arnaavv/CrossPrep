from uuid import UUID

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.repositories.question_repository import (
    QuestionRepository,
)

from app.repositories.answer_repository import (
    AnswerRepository,
)

from app.services.gemini_service import (
    GeminiService,
)

router = APIRouter()


@router.post("/submit")
def submit_answer(
    question_id: UUID,
    answer_text: str,
    db: Session = Depends(get_db),
):
    question_repo = QuestionRepository(
        db
    )

    question = question_repo.get_by_id(
        question_id
    )

    if not question:
        return {
            "error": "Question not found"
        }

    evaluation = (
        GeminiService.evaluate_answer(
            question.question_text,
            answer_text,
        )
    )

    answer_repo = AnswerRepository(
        db
    )

    answer = answer_repo.create(
        question_id=question.id,
        answer_text=answer_text,
        score=evaluation["score"],
        feedback=evaluation["feedback"],
        ideal_answer=evaluation["ideal_answer"],
    )

    return {
        "answer_id": str(answer.id),
        "score": answer.score,
        "feedback": answer.feedback,
        "ideal_answer": answer.ideal_answer,
    }