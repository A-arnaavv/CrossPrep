from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.auth.dependencies import (
    get_current_user,
)
from app.dependencies import get_db

from app.models.answer import Answer
from app.models.question import Question
from app.models.user import User

from app.repositories.answer_repository import (
    AnswerRepository,
)
from app.repositories.question_repository import (
    QuestionRepository,
)

from app.schemas.answer import (
    SubmitAnswerRequest,
)

from app.services.gemini_service import (
    GeminiService,
)


router = APIRouter()


@router.post("/submit")
def submit_answer(
    request: SubmitAnswerRequest,
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    question_repo = QuestionRepository(db)

    question = question_repo.get_by_id(
        request.question_id
    )

    if (
        not question
        or not question.interview
        or question.interview.user_id
        != current_user.id
    ):
        raise HTTPException(
            status_code=404,
            detail="Question not found.",
        )

    try:
        evaluation = (
            GeminiService.evaluate_answer(
                question.question_text,
                request.answer_text,
            )
        )

    except Exception as error:
        print(
            "Gemini Evaluation Error:",
            str(error),
        )

        evaluation = {
            "score": 0,
            "feedback": (
                "AI evaluation temporarily "
                "unavailable."
            ),
            "ideal_answer": "",
        }

    answer_repo = AnswerRepository(db)

    answer = answer_repo.create(
        question_id=question.id,
        answer_text=request.answer_text,
        score=evaluation["score"],
        feedback=evaluation["feedback"],
        ideal_answer=evaluation[
            "ideal_answer"
        ],
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
        "ideal_answer": (
            answer.ideal_answer
        ),
        "interview_status": (
            interview.status
        ),
    }