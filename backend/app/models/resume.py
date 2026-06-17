import uuid

from datetime import datetime

from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database.base import Base


class Resume(Base):
    __tablename__ = "resumes"

    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    file_url: Mapped[str]

    parsed_text: Mapped[str] = mapped_column(
        Text,
        default="",
    )

    skills: Mapped[dict] = mapped_column(
    JSONB,
    default=dict,
    )

    projects: Mapped[list] = mapped_column(
        JSONB,
        default=list,
    )

    experience: Mapped[list] = mapped_column(
        JSONB,
        default=list,
    )

    education: Mapped[list] = mapped_column(
        JSONB,
        default=list,
    )

    ats_score: Mapped[int] = mapped_column(
    default=0,
    )

    strengths: Mapped[list] = mapped_column(
        JSONB,
        default=list,
    )

    weaknesses: Mapped[list] = mapped_column(
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

    uploaded_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
    )

    user = relationship(
        "User",
        back_populates="resumes",
    )