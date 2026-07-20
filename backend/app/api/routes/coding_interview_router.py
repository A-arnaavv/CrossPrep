from app.models import coding_interview_question
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

from app.repositories.coding_interview_session_repository import (
    CodingInterviewSessionRepository,
)

from app.services.code_execution_service import (
    CodeExecutionService,
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

@router.post("/start-session")
def start_session(
    user_id: UUID,
    role: str,
    language: str,
    db: Session = Depends(get_db),
):

    repo = (
        CodingInterviewSessionRepository(
            db
        )
    )

    session = (
        repo.create_session(
            user_id=user_id,
            role=role,
            language=language,
        )
    )

    questions = (
        CodingInterviewService
        .generate_interview_set(
            role=role,
            language=language,
        )
    )

    saved_questions = (
        repo.create_questions(
            session.id,
            questions,
        )
    )

    return {
        "session_id": str(
            session.id
        ),
        "current_question": {
            "id": str(
                saved_questions[0].id
            ),
            "question_number": 1,
            "total_questions": 4,
            "title":
                saved_questions[0].title,
            "difficulty":
                saved_questions[0].difficulty,
            "question":
                saved_questions[0].question,
        },
    }

@router.post("/session-submit")
def submit_session_question(
    session_id: UUID,
    question_id: UUID,
    code: str,
    db: Session = Depends(get_db),
):

    repo = (
        CodingInterviewSessionRepository(
            db
        )
    )

    question = (
        repo.get_question_by_id(
            question_id
        )
    )

    if not question:
        return {
            "error":
                "Question not found"
        }

    evaluation = (
        CodingInterviewService
        .evaluate_code(
            question=question.question,
            code=code,
        )
    )

    repo.update_question_result(
        question_id=question.id,
        code=code,
        score=evaluation["score"],
        feedback=evaluation["feedback"],
    )

    session = (
        repo.get_session_by_id(
            session_id
        )
    )

    questions = (
        repo.get_questions_by_session(
            session_id
        )
    )

    total_score = sum(
        q.score
        for q in questions
    )

    next_number = (
        question.question_number + 1
    )

    if next_number <= 4:

        repo.update_session_progress(
            session_id=session.id,
            current_question=next_number,
            total_score=total_score,
            status="in_progress",
        )

        next_question = (
            repo.get_next_question(
                session_id,
                next_number,
            )
        )

        return {
            "completed": False,
            "score":
                evaluation["score"],
            "feedback":
                evaluation["feedback"],
            "next_question": {
                "id": str(
                    next_question.id
                ),
                "question_number":
                    next_question.question_number,
                "title":
                    next_question.title,
                "difficulty":
                    next_question.difficulty,
                "question":
                    next_question.question,
            },
        }

    repo.update_session_progress(
        session_id=session.id,
        current_question=4,
        total_score=total_score,
        status="completed",
    )
    average_score = round(
        total_score / 4,
        2,
    )

    question_results = [
    {
        "number": q.question_number,
        "title": q.title,
        "difficulty": q.difficulty,
        "score": q.score,
        "feedback": q.feedback,
        "code": q.code,
    }
    for q in questions
]

    ai_report = (
    CodingInterviewService.generate_final_report(
        role=session.role,
        language=session.language,
        total_score=total_score,
        average_score=average_score,
        questions=question_results,
    )
    )
    repo.save_final_report(
        session_id=session.id,
        summary=ai_report["summary"],
        strengths=ai_report["strengths"],
        improvements=ai_report["improvements"],
        recommendations=ai_report["recommendations"],
    )

    return {
    "completed": True,
    "total_score": total_score,
    "average_score": average_score,
    "questions": question_results,

    "summary":
        ai_report["summary"],

    "strengths":
        ai_report["strengths"],

    "improvements":
        ai_report["improvements"],

    "recommendations":
        ai_report["recommendations"],
}

@router.post("/run-code")
def run_code(
    language: str,
    code: str,
    function_name: str | None = None,
    test_cases: str | None = None,
):

    if language == "Python":
        if function_name and test_cases:

            return (
                CodeExecutionService
                .run_python_tests(
                    code=code,
                    function_name=function_name,
                    test_cases=test_cases,
                )
            )

        return (
            CodeExecutionService
            .run_python(code)
        )

    if language == "JavaScript":

        return (
            CodeExecutionService
            .run_javascript(code)
        )

    return {
        "success": False,
        "output":
            "Run Code currently supports Python and JavaScript only."
    }

@router.get("/session-report/{session_id}")
def get_session_report(
    session_id: UUID,
    db: Session = Depends(get_db),
):

    repo = (
        CodingInterviewSessionRepository(
            db
        )
    )

    session = (
        repo.get_session_by_id(
            session_id
        )
    )

    if not session:
        return {
            "error": "Session not found"
        }

    questions = (
        repo.get_questions_by_session(
            session_id
        )
    )

    return {
        "session_id": str(session.id),
        "role": session.role,
        "language": session.language,
        "status": session.status,
        "total_score": session.total_score,
        "average_score": round(
            session.total_score / 4,
            2,
        ),
        "summary": session.summary,
        "strengths": session.strengths or [],
        "improvements": session.improvements or [],
        "recommendations": session.recommendations or [],
        "questions": [
            {
                "number": q.question_number,
                "title": q.title,
                "difficulty": q.difficulty,
                "score": q.score,
                "feedback": q.feedback,
                "code": q.code,
                "completed": q.completed,
            }
            for q in questions
        ],
    }