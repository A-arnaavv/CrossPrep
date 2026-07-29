import json
from datetime import datetime

from fastapi import APIRouter
from fastapi import Depends
from fastapi.responses import Response
from sqlalchemy.orm import Session

from app.auth.dependencies import get_current_user
from app.dependencies import get_db

from app.models.interview import Interview
from app.models.resume import Resume
from app.models.user import User
from app.models.user_profile import UserProfile
from app.models.user_settings import UserSettings

from app.repositories.interview_repository import (
    InterviewRepository,
)
from app.repositories.resume_repository import (
    ResumeRepository,
)
from app.repositories.settings_repository import (
    SettingsRepository,
)

from app.schemas.settings_schema import (
    SettingsUpdate,
)

from app.services.account_deletion_service import (
    AccountDeletionService,
)


router = APIRouter(
    prefix="/settings",
    tags=["Settings"],
)


DEFAULT_SETTINGS = {
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


def serialize_settings(
    settings: UserSettings,
) -> dict:
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
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    settings_repo = SettingsRepository(db)

    settings = settings_repo.get_by_user_id(
        current_user.id
    )

    if not settings:
        return DEFAULT_SETTINGS.copy()

    return serialize_settings(settings)


@router.put("")
def update_settings(
    payload: SettingsUpdate,
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    settings_repo = SettingsRepository(db)

    settings = settings_repo.get_by_user_id(
        current_user.id
    )

    if not settings:
        settings = settings_repo.create(
            current_user.id
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


@router.get("/export")
def export_user_data(
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    user = current_user

    profile = (
        db.query(UserProfile)
        .filter(
            UserProfile.user_id == user.id
        )
        .first()
    )

    settings = (
        db.query(UserSettings)
        .filter(
            UserSettings.user_id == user.id
        )
        .first()
    )

    resumes = (
        db.query(Resume)
        .filter(
            Resume.user_id == user.id
        )
        .order_by(
            Resume.uploaded_at.desc()
        )
        .all()
    )

    interviews = (
        db.query(Interview)
        .filter(
            Interview.user_id == user.id
        )
        .all()
    )

    export_data = {
        "exported_at": (
            datetime.utcnow().isoformat()
        ),
        "account": {
            "id": str(user.id),
            "clerk_id": user.clerk_id,
            "email": user.email,
            "name": user.name,
        },
        "profile": {
            "bio": (
                profile.bio
                if profile
                else None
            ),
            "target_role": (
                profile.target_role
                if profile
                else None
            ),
            "experience_level": (
                profile.experience_level
                if profile
                else None
            ),
            "preferred_companies": (
                profile.preferred_companies
                if profile
                else []
            ),
            "linkedin_url": (
                profile.linkedin_url
                if profile
                else None
            ),
            "github_url": (
                profile.github_url
                if profile
                else None
            ),
            "portfolio_url": (
                profile.portfolio_url
                if profile
                else None
            ),
        },
        "settings": (
            serialize_settings(settings)
            if settings
            else DEFAULT_SETTINGS.copy()
        ),
        "resumes": [
            {
                "id": str(resume.id),
                "file_url": resume.file_url,
                "skills": resume.skills,
                "projects": resume.projects,
                "experience": resume.experience,
                "education": resume.education,
                "ats_score": resume.ats_score,
                "strengths": resume.strengths,
                "weaknesses": resume.weaknesses,
                "missing_skills": (
                    resume.missing_skills
                ),
                "recommendations": (
                    resume.recommendations
                ),
                "uploaded_at": (
                    resume.uploaded_at.isoformat()
                    if resume.uploaded_at
                    else None
                ),
            }
            for resume in resumes
        ],
        "interviews": [
            {
                "id": str(interview.id),
                "role": getattr(
                    interview,
                    "role",
                    None,
                ),
                "level": getattr(
                    interview,
                    "level",
                    None,
                ),
                "status": getattr(
                    interview,
                    "status",
                    None,
                ),
                "created_at": (
                    interview.created_at.isoformat()
                    if getattr(
                        interview,
                        "created_at",
                        None,
                    )
                    else None
                ),
            }
            for interview in interviews
        ],
    }

    file_content = json.dumps(
        export_data,
        indent=2,
        ensure_ascii=False,
        default=str,
    )

    filename = (
        "hirepilot-data-"
        f"{datetime.utcnow().strftime('%Y-%m-%d')}.json"
    )

    return Response(
        content=file_content,
        media_type="application/json",
        headers={
            "Content-Disposition": (
                f'attachment; filename="{filename}"'
            ),
        },
    )


@router.delete("/interviews")
def delete_interview_history(
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    interview_repo = InterviewRepository(db)

    deleted_count = (
        interview_repo.delete_all_by_user(
            current_user.id
        )
    )

    return {
        "message": (
            "Interview history deleted successfully"
        ),
        "deleted_count": deleted_count,
    }

@router.delete("/resumes")
def delete_resume_history(
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    resume_repo = ResumeRepository(db)

    result = resume_repo.delete_all_by_user(
        current_user.id
    )

    return {
        "message": (
            "Resume history deleted successfully"
        ),
        "deleted_count": (
            result["deleted_records"]
        ),
        "deleted_files": (
            result["deleted_files"]
        ),
    }


@router.delete("/account")
def delete_account_data(
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    result = (
        AccountDeletionService.delete_user_data(
            db=db,
            user=current_user,
        )
    )

    return {
        "message": (
            "Application account data deleted successfully"
        ),
        "deleted_files": (
            result["deleted_files"]
        ),
    }