from sqlalchemy.orm import Session

from app.models.career_coach_report import (
    CareerCoachReport,
)
from datetime import datetime
from datetime import timedelta

class CareerCoachReportRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create(
        self,
        user_id,
        report: dict,
    ):
        career_report = CareerCoachReport(
            user_id=user_id,
            career_readiness=report.get(
                "career_readiness",
                0,
            ),
            summary=report.get(
                "summary",
                "",
            ),
            strengths=report.get(
                "strengths",
                [],
            ),
            focus_areas=report.get(
                "focus_areas",
                [],
            ),
            weekly_plan=report.get(
                "weekly_plan",
                [],
            ),
            target_roles=report.get(
                "target_roles",
                [],
            ),
        )

        self.db.add(
            career_report
        )

        self.db.commit()

        self.db.refresh(
            career_report
        )

        return career_report

    def get_latest_by_user(
        self,
        user_id,
    ):
        return (
            self.db.query(
                CareerCoachReport
            )
            .filter(
                CareerCoachReport.user_id == user_id
            )
            .order_by(
                CareerCoachReport.created_at.desc()
            )
            .first()
        )

    def get_recent_by_user(
        self,
        user_id,
        hours: int = 24,
    ):
        cutoff = (
            datetime.utcnow()
            - timedelta(hours=hours)
        )

        return (
            self.db.query(
                CareerCoachReport
            )
            .filter(
                CareerCoachReport.user_id == user_id
            )
            .filter(
                CareerCoachReport.created_at >= cutoff
            )
            .order_by(
                CareerCoachReport.created_at.desc()
            )
            .first()
        )