from uuid import UUID

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.auth.dependencies import (
    get_current_user,
)
from app.dependencies import get_db

from app.models.user import User

from app.repositories.answer_repository import (
    AnswerRepository,
)
from app.repositories.interview_repository import (
    InterviewRepository,
)
from app.repositories.question_repository import (
    QuestionRepository,
)
from app.repositories.resume_repository import (
    ResumeRepository,
)

from app.services.gemini_service import (
    GeminiService,
)


router = APIRouter()


@router.post("/create")
def create_interview(
    role: str,
    level: str,
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    resume_repo = ResumeRepository(db)

    resume = resume_repo.get_latest_by_user(
        current_user.id
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail=(
                "Upload a resume before creating "
                "an interview."
            ),
        )

    interview_repo = InterviewRepository(db)

    interview = interview_repo.create(
        user_id=current_user.id,
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

    questions = analysis.get(
        "questions",
        [],
    )

    if not questions:
        raise HTTPException(
            status_code=500,
            detail=(
                "Interview questions could not "
                "be generated."
            ),
        )

    question_repo = QuestionRepository(db)

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


# Keep this static route above /{interview_id}.
@router.get("/user")
def get_user_interviews(
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    interview_repo = InterviewRepository(db)

    interviews = interview_repo.get_by_user(
        current_user.id
    )

    answer_repo = AnswerRepository(db)

    data = []

    for interview in interviews:
        question_ids = [
            question.id
            for question in interview.questions
        ]

        answers = (
            answer_repo.get_all_by_question_ids(
                question_ids
            )
            if question_ids
            else []
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
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    interview_repo = InterviewRepository(db)

    interview = interview_repo.get_by_id(
        interview_id
    )

    if (
        not interview
        or interview.user_id != current_user.id
    ):
        raise HTTPException(
            status_code=404,
            detail="Interview not found.",
        )

    questions_by_id = {
        question.id: question
        for question in interview.questions
    }

    question_ids = [
        question.id
        for question in interview.questions
    ]

    answer_repo = AnswerRepository(db)

    answers = (
        answer_repo.get_all_by_question_ids(
            question_ids
        )
        if question_ids
        else []
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

    report_questions = []

    for answer in answers:
        question = questions_by_id.get(
            answer.question_id
        )

        report_questions.append(
            {
                "question_id": str(
                    answer.question_id
                ),
                "question": (
                    question.question_text
                    if question
                    else "Question text unavailable"
                ),
                "score": answer.score,
                "feedback": answer.feedback,
                "ideal_answer": (
                    answer.ideal_answer
                ),
                "answer": answer.answer_text,
            }
        )

    return {
        "interview_id": str(
            interview.id
        ),
        "role": interview.role,
        "level": interview.level,
        "total_questions": total_questions,
        "questions_answered": (
            questions_answered
        ),
        "completion_percentage": (
            completion_percentage
        ),
        "average_score": round(
            average_score,
            2,
        ),
        "questions": report_questions,
    }


@router.get("/{interview_id}")
def get_interview(
    interview_id: UUID,
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    interview_repo = InterviewRepository(db)

    interview = interview_repo.get_by_id(
        interview_id
    )

    if (
        not interview
        or interview.user_id != current_user.id
    ):
        raise HTTPException(
            status_code=404,
            detail="Interview not found.",
        )

    return {
        "interview_id": str(
            interview.id
        ),
        "role": interview.role,
        "level": interview.level,
        "questions": [
            {
                "id": str(question.id),
                "question": (
                    question.question_text
                ),
                "order": (
                    question.order_index
                ),
            }
            for question in interview.questions
        ],
    }