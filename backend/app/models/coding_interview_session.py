import uuid

from datetime import datetime

from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database.base import Base


class CodingInterviewSession(Base):
    __tablename__ = "coding_interview_sessions"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id")
    )

    role: Mapped[str] = mapped_column(String)

    language: Mapped[str] = mapped_column(String)

    status: Mapped[str] = mapped_column(
        String,
        default="in_progress",
    )

    total_score: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    current_question: Mapped[int] = mapped_column(
        Integer,
        default=1,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    questions = relationship(
        "CodingInterviewQuestion",
        back_populates="session",
        cascade="all, delete-orphan",
    )