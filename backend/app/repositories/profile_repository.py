from sqlalchemy.orm import Session

from app.models.user_profile import UserProfile


class ProfileRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def get_by_user_id(
        self,
        user_id,
    ):
        return (
            self.db.query(UserProfile)
            .filter(
                UserProfile.user_id == user_id
            )
            .first()
        )

    def create(
        self,
        user_id,
    ):
        profile = UserProfile(
            user_id=user_id,
        )

        self.db.add(profile)
        self.db.commit()
        self.db.refresh(profile)

        return profile

    def update(
        self,
        profile: UserProfile,
        data: dict,
    ):
        for key, value in data.items():
            setattr(
                profile,
                key,
                value,
            )

        self.db.commit()
        self.db.refresh(profile)

        return profile