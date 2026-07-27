from typing import Literal

from pydantic import BaseModel
from pydantic import Field


class SettingsUpdate(BaseModel):
    clerk_id: str

    default_interview_duration: int = Field(
        default=30,
        ge=15,
        le=60,
    )

    default_difficulty: Literal[
        "easy",
        "medium",
        "hard",
        "adaptive",
    ] = "medium"

    preferred_language: str = Field(
        default="English",
        min_length=1,
        max_length=50,
    )

    coaching_style: Literal[
        "encouraging",
        "balanced",
        "direct",
    ] = "balanced"

    feedback_detail: Literal[
        "concise",
        "standard",
        "detailed",
    ] = "standard"

    weekly_summary: bool = True

    interview_reminders: bool = True

    resume_notifications: bool = True

    product_updates: bool = False

    theme: Literal[
        "light",
        "dark",
        "system",
    ] = "system"