from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.auth.dependencies import (
    get_current_clerk_id,
    get_current_user,
)
from app.dependencies import get_db
from app.models.user import User
from app.schemas.user import UserCreate


router = APIRouter()


@router.post("/sync")
def sync_user(
    payload: UserCreate,
    clerk_id: str = Depends(
        get_current_clerk_id,
    ),
    db: Session = Depends(get_db),
):
    existing_user = (
        db.query(User)
        .filter(
            User.clerk_id == clerk_id
        )
        .first()
    )

    if existing_user:
        existing_user.email = payload.email
        existing_user.name = payload.name

        db.commit()
        db.refresh(existing_user)

        return {
            "message": "User synchronized",
            "id": str(existing_user.id),
        }

    user = User(
        clerk_id=clerk_id,
        email=payload.email,
        name=payload.name,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "message": "User created",
        "id": str(user.id),
    }


@router.get("/me")
def get_current_application_user(
    current_user: User = Depends(
        get_current_user,
    ),
):
    return {
        "id": str(current_user.id),
        "clerk_id": current_user.clerk_id,
        "email": current_user.email,
        "name": current_user.name,
    }