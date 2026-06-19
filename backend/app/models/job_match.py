import uuid

from datetime import datetime

from sqlalchemy import String
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.dialects.postgresql import JSONB

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database.base import Base


class JobMatch(Base):
    __tablename__ = "job_matches"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    job_title: Mapped[str] = mapped_column(
        String,
        default="",
    )

    job_description: Mapped[str] = mapped_column(
        String,
        default="",
    )

    match_score: Mapped[int] = mapped_column(
        Integer,
        default=0,
    )

    matched_skills: Mapped[list] = mapped_column(
        JSONB,
        default=list,
    )

    missing_skills: Mapped[list] = mapped_column(
        JSONB,
        default=list,
    )

    recommendations: Mapped[list] = mapped_column(
        JSONB,
        default=list,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    user = relationship(
        "User",
        back_populates="job_matches",
    )