import uuid
from datetime import datetime

from sqlalchemy import Boolean
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.database.base import Base


class UserSettings(Base):
    __tablename__ = "user_settings"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey(
            "users.id",
            ondelete="CASCADE",
        ),
        unique=True,
        nullable=False,
        index=True,
    )

    default_interview_duration: Mapped[int] = mapped_column(
        Integer,
        default=30,
        nullable=False,
    )

    default_difficulty: Mapped[str] = mapped_column(
        String,
        default="medium",
        nullable=False,
    )

    preferred_language: Mapped[str] = mapped_column(
        String,
        default="English",
        nullable=False,
    )

    coaching_style: Mapped[str] = mapped_column(
        String,
        default="balanced",
        nullable=False,
    )

    feedback_detail: Mapped[str] = mapped_column(
        String,
        default="standard",
        nullable=False,
    )

    weekly_summary: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    interview_reminders: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    resume_notifications: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    product_updates: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    theme: Mapped[str] = mapped_column(
        String,
        default="system",
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )