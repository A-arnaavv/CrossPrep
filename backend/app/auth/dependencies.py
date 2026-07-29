from fastapi import Depends
from fastapi import HTTPException
from fastapi.security import (
    HTTPAuthorizationCredentials,
    HTTPBearer,
)
from sqlalchemy.orm import Session

from app.auth.clerk import (
    verify_clerk_token,
)
from app.dependencies import get_db
from app.models.user import User
from app.repositories.user_repository import (
    UserRepository,
)


bearer_scheme = HTTPBearer(
    auto_error=False,
)


def get_current_clerk_id(
    credentials: (
        HTTPAuthorizationCredentials | None
    ) = Depends(bearer_scheme),
) -> str:
    if not credentials:
        raise HTTPException(
            status_code=401,
            detail=(
                "Authentication credentials "
                "were not provided."
            ),
            headers={
                "WWW-Authenticate": "Bearer",
            },
        )

    if credentials.scheme.lower() != "bearer":
        raise HTTPException(
            status_code=401,
            detail=(
                "Unsupported authentication "
                "scheme."
            ),
            headers={
                "WWW-Authenticate": "Bearer",
            },
        )

    payload = verify_clerk_token(
        credentials.credentials
    )

    return payload["sub"]


def get_current_user(
    clerk_id: str = Depends(
        get_current_clerk_id
    ),
    db: Session = Depends(get_db),
) -> User:
    user_repo = UserRepository(db)

    user = user_repo.get_by_clerk_id(
        clerk_id
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail=(
                "Authenticated user does not "
                "exist in the application."
            ),
        )

    return user