from uuid import UUID

from sqlalchemy.orm import Session

from app.models.coding_interview import (
    CodingInterview,
)


class CodingInterviewRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create(
        self,
        user_id: UUID,
        role: str,
        language: str,
        question: str,
        code: str,
        score: int,
        feedback: str,
    ):
        interview = CodingInterview(
            user_id=user_id,
            role=role,
            language=language,
            question=question,
            code=code,
            score=score,
            feedback=feedback,
        )

        self.db.add(
            interview
        )

        self.db.commit()

        self.db.refresh(
            interview
        )

        return interview

    def get_by_user(
        self,
        user_id: UUID,
    ):
        return (
            self.db.query(
                CodingInterview
            )
            .filter(
                CodingInterview.user_id
                == user_id
            )
            .order_by(
                CodingInterview.created_at.desc()
            )
            .all()
        )

    def get_by_id(
        self,
        interview_id: UUID,
    ):
        return (
            self.db.query(
                CodingInterview
            )
            .filter(
                CodingInterview.id
                == interview_id
            )
            .first()
        )