import uuid

from datetime import datetime

from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import Integer
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database.base import Base


class CodingInterview(Base):
    __tablename__ = "coding_interviews"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id")
    )

    role: Mapped[str] = mapped_column(
        String
    )

    language: Mapped[str] = mapped_column(
        String
    )

    question: Mapped[str] = mapped_column(
        Text
    )

    code: Mapped[str] = mapped_column(
        Text
    )

    score: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    feedback: Mapped[str] = mapped_column(
        Text,
        default="",
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    user = relationship(
        "User"
    )