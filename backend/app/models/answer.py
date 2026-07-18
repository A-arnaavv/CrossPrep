import uuid

from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database.base import Base
from app.schemas.answer import SubmitAnswerRequest


class Answer(Base):
    __tablename__ = "answers"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    question_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("questions.id"),
        nullable=False,
    )

    answer_text: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    score: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    feedback: Mapped[str] = mapped_column(
        Text,
        default="",
    )

    ideal_answer: Mapped[str] = mapped_column(
        Text,
        default="",
    )

    question = relationship(
        "Question",
        back_populates="answers",
    )