from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.dependencies import get_db

from app.services.career_coach_service import (
    CareerCoachService,
)

router = APIRouter()


@router.get("/{clerk_id}")
def get_career_coach_report(
    clerk_id: str,
    db: Session = Depends(get_db),
):
    return (
        CareerCoachService
        .generate_for_user(
            clerk_id=clerk_id,
            db=db,
        )
    )