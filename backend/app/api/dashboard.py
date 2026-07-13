from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.models.user import User
from app.models.resume import Resume
from app.models.interview import Interview
from app.models.answer import Answer
from app.models.coding_interview_session import CodingInterviewSession

router = APIRouter()


@router.get("/stats/{clerk_id}")
def get_dashboard_stats(
    clerk_id: str,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(
            User.clerk_id == clerk_id
        )
        .first()
    )

    if not user:
        return {
            "error": "User not found"
        }

    total_resumes = (
        db.query(Resume)
        .filter(
            Resume.user_id == user.id
        )
        .count()
    )

    interviews = (
        db.query(Interview)
        .filter(
            Interview.user_id == user.id
        )
        .all()
    )

    total_interviews = len(
        interviews
    )

    question_ids = []

    for interview in interviews:
        for question in interview.questions:
            question_ids.append(
                question.id
            )

    answers = []

    if question_ids:
        answers = (
            db.query(Answer)
            .filter(
                Answer.question_id.in_(
                    question_ids
                )
            )
            .all()
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

    total_questions = len(
        question_ids
    )

    if total_questions:
        completion_percentage = (
            len(answers)
            / total_questions
        ) * 100

    return {
        "total_resumes":
            total_resumes,
        "total_interviews":
            total_interviews,
        "average_score":
            round(
                average_score,
                2
            ),
        "completion_percentage":
            round(
                completion_percentage,
                2
            ),
    }

@router.get("/activity/{clerk_id}")
def get_recent_activity(
    clerk_id: str,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(
            User.clerk_id == clerk_id
        )
        .first()
    )

    if not user:
        return []

    behavioral_interviews = (
        db.query(Interview)
        .filter(
            Interview.user_id == user.id
        )
        .order_by(
            Interview.created_at.desc()
        )
        .limit(5)
        .all()
    )

    coding_sessions = (
        db.query(
            CodingInterviewSession
        )
        .filter(
            CodingInterviewSession.user_id
            == user.id
        )
        .order_by(
            CodingInterviewSession.created_at.desc()
        )
        .limit(5)
        .all()
    )

    activity = []

    for interview in behavioral_interviews:
        answer_scores = [
            answer.score
            for question in interview.questions
            for answer in question.answers
            if answer.score is not None
        ]

        behavioral_score = (
            round(
                sum(answer_scores)
                / len(answer_scores),
                2,
            )
            if answer_scores
            else None
        )

        activity.append({
            "type": "behavioral",
            "role": interview.role,
            "level": interview.level,
            "status": interview.status,
            "created_at": interview.created_at,
            "coding_score": None,
            "behavioral_score":
                behavioral_score,
        })

    for session in coding_sessions:
        coding_score = (
            round(
                session.total_score / 4,
                2,
            )
            if session.total_score
            is not None
            else None
        )

        activity.append({
            "type": "coding",
            "role": session.role,
            "level": session.language,
            "status": session.status,
            "created_at": session.created_at,
            "coding_score":
                coding_score,
            "behavioral_score": None,
        })

    activity.sort(
        key=lambda item:
            item["created_at"],
        reverse=True,
    )

    return activity