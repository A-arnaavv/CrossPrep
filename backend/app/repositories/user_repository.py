from sqlalchemy.orm import Session

from app.models.user import User

class UserRepository:
    def __init__(
    self,
    db: Session,
    ):
        self.db = db

    def get_by_clerk_id(
        self,
        clerk_id: str,
    ):
        return (
            self.db.query(User)
            .filter(
                User.clerk_id == clerk_id
            )
            .first()
        )
