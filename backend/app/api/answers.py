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

from sqlalchemy import func

from app.models.answer import Answer
from app.models.question import Question

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

    try:
        evaluation = (
            GeminiService.evaluate_answer(
                question.question_text,
                answer_text,
            )
        )

    except Exception as e:
        print(
            "Gemini Evaluation Error:",
            str(e)
        )

        evaluation = {
            "score": 0,
            "feedback":
                "AI evaluation temporarily unavailable.",
            "ideal_answer": "",
        }

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
    interview = question.interview

    total_questions = (
        db.query(Question)
        .filter(
            Question.interview_id
            == interview.id
        )
        .count()
    )

    answered_questions = (
        db.query(
            func.count(
                func.distinct(
                    Answer.question_id
                )
            )
        )
        .join(
            Question,
            Answer.question_id
            == Question.id,
        )
        .filter(
            Question.interview_id
            == interview.id
        )
        .scalar()
        or 0
    )

    if (
        total_questions > 0
        and answered_questions
        >= total_questions
    ):
        interview.status = "completed"
    else:
        interview.status = "in_progress"

    db.commit()
    db.refresh(interview)

    return {
    "answer_id": str(answer.id),
    "score": answer.score,
    "feedback": answer.feedback,
    "ideal_answer": answer.ideal_answer,
    "interview_status": interview.status,
}