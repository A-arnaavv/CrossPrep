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

from app.repositories.user_repository import (
    UserRepository,
)

router = APIRouter()


@router.post("/create")
def create_interview(
    clerk_id: str,
    role: str,
    level: str,
    db: Session = Depends(get_db),
):
    user_repo = UserRepository(db)

    user = user_repo.get_by_clerk_id(
        clerk_id
    )

    if not user:
        return {
            "error": "User not found"
        }

    resume_repo = ResumeRepository(db)

    resume = (
        resume_repo.get_latest_by_user(
            user.id
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
        user_id=user.id,
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

@router.get("/user/{clerk_id}")
def get_user_interviews(
    clerk_id: str,
    db: Session = Depends(get_db),
):
    user_repo = UserRepository(db)

    user = user_repo.get_by_clerk_id(
        clerk_id
    )

    if not user:
        return []

    interview_repo = InterviewRepository(
        db
    )

    interviews = (
        interview_repo.get_by_user(
            user.id
        )
    )

    answer_repo = AnswerRepository(
        db
    )

    data = []

    for interview in interviews:

        question_ids = [
            q.id
            for q in interview.questions
        ]

        answers = (
            answer_repo.get_all_by_question_ids(
                question_ids
            )
        )

        average_score = 0

        if answers:
            average_score = round(
                sum(
                    answer.score
                    for answer in answers
                )
                / len(answers),
                2,
            )

        data.append(
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
                "average_score": average_score,
            }
        )

    return data

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

    total_questions = len(
        interview.questions
    )

    questions_answered = len(
        answers
    )

    completion_percentage = 0

    if total_questions > 0:
        completion_percentage = round(
            (
                questions_answered
                / total_questions
            )
            * 100,
            2,
        )

    return {
        "interview_id": str(
            interview.id
        ),

        "role": interview.role,

        "level": interview.level,

        "total_questions":
            total_questions,

        "questions_answered":
            questions_answered,

        "completion_percentage":
            completion_percentage,

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