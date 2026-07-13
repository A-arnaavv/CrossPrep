import uuid

from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from datetime import datetime
from app.database.base import Base

class CareerCoachReport(Base):
    __tablename__ = "career_coach_reports"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False,
    )

    career_readiness: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    summary: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    strengths: Mapped[list] = mapped_column(
        JSONB,
        nullable=False,
    )

    focus_areas: Mapped[list] = mapped_column(
        JSONB,
        nullable=False,
    )

    weekly_plan: Mapped[list] = mapped_column(
        JSONB,
        nullable=False,
    )

    target_roles: Mapped[list] = mapped_column(
        JSONB,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )