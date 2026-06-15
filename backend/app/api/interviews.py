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

from app.repositories.answer_repository import (
    AnswerRepository,
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

@router.get("/{interview_id}")
def get_interview(
    interview_id: UUID,
    db: Session = Depends(get_db),
):
    interview_repo = InterviewRepository(
        db
    )

    interview = interview_repo.get_by_id(
        interview_id
    )

    if not interview:
        return {
            "error": "Interview not found"
        }

    return {
        "interview_id": str(
            interview.id
        ),
        "role": interview.role,
        "level": interview.level,
        "questions": [
            {
                "id": str(question.id),
                "question": question.question_text,
                "order": question.order_index,
            }
            for question in interview.questions
        ],
    }

@router.get("/user/{user_id}")
def get_user_interviews(
    user_id: UUID,
    db: Session = Depends(get_db),
):
    interview_repo = InterviewRepository(
        db
    )

    interviews = (
        interview_repo.get_by_user(
            user_id
        )
    )

    return [
        {
            "interview_id": str(
                interview.id
            ),
            "role": interview.role,
            "level": interview.level,
            "status": interview.status,
            "created_at": str(
                interview.created_at
            ),
        }
        for interview in interviews
    ]

@router.get("/{interview_id}/results")
def get_results(
    interview_id: UUID,
    db: Session = Depends(get_db),
):
    interview_repo = InterviewRepository(
        db
    )

    interview = interview_repo.get_by_id(
        interview_id
    )

    if not interview:
        return {
            "error": "Interview not found"
        }

    question_ids = [
        question.id
        for question in interview.questions
    ]

    answer_repo = AnswerRepository(
        db
    )

    answers = (
        answer_repo.get_by_question_ids(
            question_ids
        )
    )

    total_questions = len(
        interview.questions
    )

    answered_questions = len(
        answers
    )

    average_score = 0

    if answers:
        average_score = (
            sum(
                answer.score
                for answer in answers
            )
            / len(answers)
        )

    completion_percentage = 0

    if total_questions:
        completion_percentage = (
            answered_questions
            / total_questions
        ) * 100

    return {
        "interview_id": str(
            interview.id
        ),
        "role": interview.role,
        "level": interview.level,
        "questions_answered": answered_questions,
        "total_questions": total_questions,
        "completion_percentage": round(
            completion_percentage,
            2,
        ),
        "average_score": round(
            average_score,
            2,
        ),
    }

@router.get("/{interview_id}/report")
def get_report(
    interview_id: UUID,
    db: Session = Depends(get_db),
):
    interview_repo = InterviewRepository(
        db
    )

    interview = interview_repo.get_by_id(
        interview_id
    )

    if not interview:
        return {
            "error": "Interview not found"
        }

    question_ids = [
        q.id
        for q in interview.questions
    ]

    answer_repo = AnswerRepository(
        db
    )

    answers = (
        answer_repo.get_all_by_question_ids(
            question_ids
        )
    )

    average_score = 0

    if answers:
        average_score = (
            sum(
                answer.score
                for answer in answers
            )
            / len(answers)
        )

    return {
        "interview_id": str(
            interview.id
        ),
        "role": interview.role,
        "level": interview.level,
        "average_score": round(
            average_score,
            2,
        ),
        "questions": [
            {
                "question_id": str(
                    answer.question_id
                ),
                "score": answer.score,
                "feedback": answer.feedback,
                "ideal_answer": answer.ideal_answer,
                "answer": answer.answer_text,
            }
            for answer in answers
        ],
    }