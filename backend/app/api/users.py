from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.models.user import User
from app.schemas.user import UserCreate

router = APIRouter()


@router.post("/sync")
def sync_user(
    payload: UserCreate,
    db: Session = Depends(get_db),
):
    existing_user = (
        db.query(User)
        .filter(User.clerk_id == payload.clerk_id)
        .first()
    )

    if existing_user:
        return {
            "message": "User already exists"
        }

    user = User(
        clerk_id=payload.clerk_id,
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

@router.get("/clerk/{clerk_id}")
def get_user_by_clerk_id(
    clerk_id: str,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(
            User.clerk_id == clerk_id
        )
        .first()
    )

    if not user:
        return {
            "error": "User not found"
        }

    return {
        "id": str(user.id),
        "clerk_id": user.clerk_id,
        "email": user.email,
        "name": user.name,
    }