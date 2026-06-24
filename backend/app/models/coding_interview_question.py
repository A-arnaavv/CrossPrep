import uuid

from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import Integer
from sqlalchemy import Boolean
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database.base import Base


class CodingInterviewQuestion(Base):
    __tablename__ = "coding_interview_questions"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    session_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("coding_interview_sessions.id")
    )

    question_number: Mapped[int] = mapped_column(Integer)

    difficulty: Mapped[str] = mapped_column(String)

    title: Mapped[str] = mapped_column(String)

    question: Mapped[str] = mapped_column(Text)

    code: Mapped[str] = mapped_column(
        Text,
        default="",
    )

    score: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    feedback: Mapped[str] = mapped_column(
        Text,
        default="",
    )

    completed: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
    )

    session = relationship(
        "CodingInterviewSession",
        back_populates="questions",
    )