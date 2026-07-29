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

from app.repositories.coding_interview_repository import (
    CodingInterviewRepository,
)
from app.repositories.coding_interview_session_repository import (
    CodingInterviewSessionRepository,
)

from app.services.code_execution_service import (
    CodeExecutionService,
)
from app.services.coding_interview_service import (
    CodingInterviewService,
)


router = APIRouter()


@router.post("/generate")
def generate_question(
    role: str,
    language: str,
    current_user: User = Depends(
        get_current_user,
    ),
):
    return (
        CodingInterviewService.generate_question(
            role=role,
            language=language,
        )
    )


@router.post("/submit")
def submit_code(
    role: str,
    language: str,
    question: str,
    code: str,
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    evaluation = (
        CodingInterviewService.evaluate_code(
            question=question,
            code=code,
        )
    )

    repo = CodingInterviewRepository(db)

    interview = repo.create(
        user_id=current_user.id,
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


@router.get("/user")
def get_history(
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    repo = CodingInterviewRepository(db)

    interviews = repo.get_by_user(
        current_user.id
    )

    return [
        {
            "id": str(interview.id),
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
    role: str,
    language: str,
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    repo = (
        CodingInterviewSessionRepository(
            db
        )
    )

    session = repo.create_session(
        user_id=current_user.id,
        role=role,
        language=language,
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

    if not saved_questions:
        raise HTTPException(
            status_code=500,
            detail=(
                "Coding interview questions "
                "could not be generated."
            ),
        )

    first_question = saved_questions[0]

    return {
        "session_id": str(
            session.id
        ),
        "current_question": {
            "id": str(
                first_question.id
            ),
            "question_number": (
                first_question.question_number
            ),
            "total_questions": len(
                saved_questions
            ),
            "title": first_question.title,
            "difficulty": (
                first_question.difficulty
            ),
            "question": (
                first_question.question
            ),
        },
    }


@router.post("/session-submit")
def submit_session_question(
    session_id: UUID,
    question_id: UUID,
    code: str,
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    repo = (
        CodingInterviewSessionRepository(
            db
        )
    )

    session = repo.get_session_by_id(
        session_id
    )

    if (
        not session
        or session.user_id != current_user.id
    ):
        raise HTTPException(
            status_code=404,
            detail="Coding interview session not found.",
        )

    question = repo.get_question_by_id(
        question_id
    )

    if (
        not question
        or question.session_id != session.id
    ):
        raise HTTPException(
            status_code=404,
            detail="Coding interview question not found.",
        )

    if question.completed:
        raise HTTPException(
            status_code=409,
            detail=(
                "This coding interview question "
                "has already been submitted."
            ),
        )

    evaluation = (
        CodingInterviewService.evaluate_code(
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

    questions = (
        repo.get_questions_by_session(
            session.id
        )
    )

    total_score = sum(
        question_item.score or 0
        for question_item in questions
    )

    total_questions = len(questions)

    next_number = (
        question.question_number + 1
    )

    if next_number <= total_questions:
        repo.update_session_progress(
            session_id=session.id,
            current_question=next_number,
            total_score=total_score,
            status="in_progress",
        )

        next_question = (
            repo.get_next_question(
                session.id,
                next_number,
            )
        )

        if not next_question:
            raise HTTPException(
                status_code=500,
                detail=(
                    "The next coding interview "
                    "question could not be loaded."
                ),
            )

        return {
            "completed": False,
            "score": evaluation["score"],
            "feedback": (
                evaluation["feedback"]
            ),
            "next_question": {
                "id": str(
                    next_question.id
                ),
                "question_number": (
                    next_question.question_number
                ),
                "title": next_question.title,
                "difficulty": (
                    next_question.difficulty
                ),
                "question": (
                    next_question.question
                ),
            },
        }

    repo.update_session_progress(
        session_id=session.id,
        current_question=total_questions,
        total_score=total_score,
        status="completed",
    )

    average_score = (
        round(
            total_score / total_questions,
            2,
        )
        if total_questions > 0
        else 0
    )

    question_results = [
        {
            "number": (
                question_item.question_number
            ),
            "title": question_item.title,
            "difficulty": (
                question_item.difficulty
            ),
            "score": (
                question_item.score
            ),
            "feedback": (
                question_item.feedback
            ),
            "code": question_item.code,
        }
        for question_item in questions
    ]

    ai_report = (
        CodingInterviewService
        .generate_final_report(
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
        improvements=(
            ai_report["improvements"]
        ),
        recommendations=(
            ai_report["recommendations"]
        ),
    )

    return {
        "completed": True,
        "total_score": total_score,
        "average_score": average_score,
        "questions": question_results,
        "summary": ai_report["summary"],
        "strengths": (
            ai_report["strengths"]
        ),
        "improvements": (
            ai_report["improvements"]
        ),
        "recommendations": (
            ai_report["recommendations"]
        ),
    }


@router.post("/run-code")
def run_code(
    language: str,
    code: str,
    function_name: str | None = None,
    test_cases: str | None = None,
    current_user: User = Depends(
        get_current_user,
    ),
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
        "output": (
            "Run Code currently supports "
            "Python and JavaScript only."
        ),
    }


@router.get("/session-report/{session_id}")
def get_session_report(
    session_id: UUID,
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    repo = (
        CodingInterviewSessionRepository(
            db
        )
    )

    session = repo.get_session_by_id(
        session_id
    )

    if (
        not session
        or session.user_id != current_user.id
    ):
        raise HTTPException(
            status_code=404,
            detail="Coding interview session not found.",
        )

    questions = (
        repo.get_questions_by_session(
            session.id
        )
    )

    total_questions = len(questions)

    average_score = (
        round(
            session.total_score
            / total_questions,
            2,
        )
        if total_questions > 0
        else 0
    )

    return {
        "session_id": str(
            session.id
        ),
        "role": session.role,
        "language": session.language,
        "status": session.status,
        "total_score": (
            session.total_score
        ),
        "average_score": average_score,
        "summary": session.summary,
        "strengths": (
            session.strengths or []
        ),
        "improvements": (
            session.improvements or []
        ),
        "recommendations": (
            session.recommendations or []
        ),
        "questions": [
            {
                "number": (
                    question.question_number
                ),
                "title": question.title,
                "difficulty": (
                    question.difficulty
                ),
                "score": question.score,
                "feedback": (
                    question.feedback
                ),
                "code": question.code,
                "completed": (
                    question.completed
                ),
            }
            for question in questions
        ],
    }