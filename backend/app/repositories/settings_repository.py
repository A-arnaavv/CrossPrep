from sqlalchemy.orm import Session

from app.models.user_settings import UserSettings


class SettingsRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_user_id(
        self,
        user_id,
    ):
        return (
            self.db.query(UserSettings)
            .filter(
                UserSettings.user_id == user_id
            )
            .first()
        )

    def create(
        self,
        user_id,
    ):
        settings = UserSettings(
            user_id=user_id,
        )

        self.db.add(settings)
        self.db.commit()
        self.db.refresh(settings)

        return settings

    def update(
        self,
        settings: UserSettings,
        data: dict,
    ):
        for key, value in data.items():
            setattr(
                settings,
                key,
                value,
            )

        self.db.commit()
        self.db.refresh(settings)

        return settings