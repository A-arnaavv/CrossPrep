from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import Query

from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.repositories.settings_repository import (
    SettingsRepository,
)
from app.repositories.user_repository import (
    UserRepository,
)
from app.schemas.settings_schema import (
    SettingsUpdate,
)


router = APIRouter(
    prefix="/settings",
    tags=["Settings"],
)


def serialize_settings(settings):
    return {
        "default_interview_duration": (
            settings.default_interview_duration
        ),
        "default_difficulty": (
            settings.default_difficulty
        ),
        "preferred_language": (
            settings.preferred_language
        ),
        "coaching_style": (
            settings.coaching_style
        ),
        "feedback_detail": (
            settings.feedback_detail
        ),
        "weekly_summary": (
            settings.weekly_summary
        ),
        "interview_reminders": (
            settings.interview_reminders
        ),
        "resume_notifications": (
            settings.resume_notifications
        ),
        "product_updates": (
            settings.product_updates
        ),
        "theme": settings.theme,
    }


@router.get("")
def get_settings(
    clerk_id: str = Query(...),
    db: Session = Depends(get_db),
):
    user_repo = UserRepository(db)

    user = user_repo.get_by_clerk_id(
        clerk_id
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    settings_repo = SettingsRepository(db)

    settings = settings_repo.get_by_user_id(
        user.id
    )

    if not settings:
        return {
            "default_interview_duration": 30,
            "default_difficulty": "medium",
            "preferred_language": "English",
            "coaching_style": "balanced",
            "feedback_detail": "standard",
            "weekly_summary": True,
            "interview_reminders": True,
            "resume_notifications": True,
            "product_updates": False,
            "theme": "system",
        }

    return serialize_settings(settings)


@router.put("")
def update_settings(
    payload: SettingsUpdate,
    db: Session = Depends(get_db),
):
    user_repo = UserRepository(db)

    user = user_repo.get_by_clerk_id(
        payload.clerk_id
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    settings_repo = SettingsRepository(db)

    settings = settings_repo.get_by_user_id(
        user.id
    )

    if not settings:
        settings = settings_repo.create(
            user.id
        )

    updated_settings = settings_repo.update(
        settings,
        {
            "default_interview_duration": (
                payload.default_interview_duration
            ),
            "default_difficulty": (
                payload.default_difficulty
            ),
            "preferred_language": (
                payload.preferred_language
            ),
            "coaching_style": (
                payload.coaching_style
            ),
            "feedback_detail": (
                payload.feedback_detail
            ),
            "weekly_summary": (
                payload.weekly_summary
            ),
            "interview_reminders": (
                payload.interview_reminders
            ),
            "resume_notifications": (
                payload.resume_notifications
            ),
            "product_updates": (
                payload.product_updates
            ),
            "theme": payload.theme,
        },
    )

    return {
        "message": (
            "Settings updated successfully"
        ),
        "settings": serialize_settings(
            updated_settings
        ),
    }