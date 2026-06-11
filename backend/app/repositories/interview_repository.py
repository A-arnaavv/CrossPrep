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
