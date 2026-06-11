from fastapi import APIRouter
from fastapi import Depends

from app.auth import get_current_user

router = APIRouter()


@router.get("/me")
def me(
    user=Depends(
        get_current_user
    )
):
    return user