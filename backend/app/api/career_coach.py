from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.auth.dependencies import (
    get_current_user,
)
from app.dependencies import get_db
from app.models.user import User

from app.services.career_coach_service import (
    CareerCoachService,
)


router = APIRouter()


@router.get("")
def get_career_coach_report(
    current_user: User = Depends(
        get_current_user,
    ),
    db: Session = Depends(get_db),
):
    return (
        CareerCoachService
        .generate_for_user(
            user_id=current_user.id,
            db=db,
        )
    )