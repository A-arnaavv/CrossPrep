from sqlalchemy.orm import Session

from app.models.interview import Interview


class InterviewRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        user_id,
        role: str,
        level: str,
    ):
        interview = Interview(
            user_id=user_id,
            role=role,
            level=level,
            status="created",
        )

        self.db.add(interview)
        self.db.commit()
        self.db.refresh(interview)

        return interview

    def get_by_id(
        self,
        interview_id,
    ):
        return (
            self.db.query(Interview)
            .filter(
                Interview.id == interview_id
            )
            .first()
        )

    def get_by_user(
        self,
        user_id,
    ):
        return (
            self.db.query(Interview)
            .filter(
                Interview.user_id == user_id
            )
            .order_by(
                Interview.created_at.desc()
            )
            .all()
        )