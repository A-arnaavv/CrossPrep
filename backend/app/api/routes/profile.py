from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.auth.dependencies import (
    get_current_user,
)
from app.dependencies import get_db
from app.models.user import User

from app.repositories.profile_repository import (
    ProfileRepository,
)
from app.schemas.profile_schema import (
    ProfileUpdate,
)


router = APIRouter(
    prefix="/profile",
    tags=["Profile"],
)


@router.get("")
def get_profile(
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    profile_repo = ProfileRepository(db)

    profile = profile_repo.get_by_user_id(
        current_user.id
    )

    if not profile:
        return {
            "bio": "",
            "target_role": "",
            "experience_level": "",
            "preferred_companies": [],
            "linkedin_url": "",
            "github_url": "",
            "portfolio_url": "",
        }

    return {
        "bio": profile.bio or "",
        "target_role": profile.target_role or "",
        "experience_level": (
            profile.experience_level or ""
        ),
        "preferred_companies": (
            profile.preferred_companies or []
        ),
        "linkedin_url": profile.linkedin_url or "",
        "github_url": profile.github_url or "",
        "portfolio_url": profile.portfolio_url or "",
    }


@router.put("")
def update_profile(
    payload: ProfileUpdate,
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    profile_repo = ProfileRepository(db)

    profile = profile_repo.get_by_user_id(
        current_user.id
    )

    if not profile:
        profile = profile_repo.create(
            current_user.id
        )

    updated_profile = profile_repo.update(
        profile,
        {
            "bio": payload.bio,
            "target_role": payload.target_role,
            "experience_level": (
                payload.experience_level
            ),
            "preferred_companies": (
                payload.preferred_companies
            ),
            "linkedin_url": payload.linkedin_url,
            "github_url": payload.github_url,
            "portfolio_url": payload.portfolio_url,
        },
    )

    return {
        "message": "Profile updated successfully",
        "profile": {
            "bio": updated_profile.bio or "",
            "target_role": (
                updated_profile.target_role or ""
            ),
            "experience_level": (
                updated_profile.experience_level or ""
            ),
            "preferred_companies": (
                updated_profile.preferred_companies or []
            ),
            "linkedin_url": (
                updated_profile.linkedin_url or ""
            ),
            "github_url": (
                updated_profile.github_url or ""
            ),
            "portfolio_url": (
                updated_profile.portfolio_url or ""
            ),
        },
    }
