from sqlalchemy.orm import Session

from app.models.career_coach_report import CareerCoachReport
from app.models.coding_interview import CodingInterview
from app.models.coding_interview_session import CodingInterviewSession
from app.models.interview import Interview
from app.models.job_match import JobMatch
from app.models.resume import Resume
from app.models.user import User
from app.models.user_profile import UserProfile
from app.models.user_settings import UserSettings

from app.services.storage_service import StorageService


class AccountDeletionService:
    @staticmethod
    def delete_user_data(
        db: Session,
        user: User,
    ) -> dict:

        deleted_files = 0

        try:

            print("1. Loading resumes")

            resumes = (
                db.query(Resume)
                .filter(
                    Resume.user_id == user.id
                )
                .all()
            )

            print("2. Deleting coding sessions")

            coding_sessions = (
                db.query(CodingInterviewSession)
                .filter(
                    CodingInterviewSession.user_id == user.id
                )
                .all()
            )

            for session in coding_sessions:
                db.delete(session)

            db.flush()

            print("3. Deleting coding interviews")

            (
                db.query(CodingInterview)
                .filter(
                    CodingInterview.user_id == user.id
                )
                .delete(synchronize_session=False)
            )

            print("4. Deleting career reports")

            (
                db.query(CareerCoachReport)
                .filter(
                    CareerCoachReport.user_id == user.id
                )
                .delete(synchronize_session=False)
            )

            print("5. Deleting profile")

            (
                db.query(UserProfile)
                .filter(
                    UserProfile.user_id == user.id
                )
                .delete(synchronize_session=False)
            )

            print("6. Deleting settings")

            (
                db.query(UserSettings)
                .filter(
                    UserSettings.user_id == user.id
                )
                .delete(synchronize_session=False)
            )

            print("7. Deleting job matches")

            (
                db.query(JobMatch)
                .filter(
                    JobMatch.user_id == user.id
                )
                .delete(synchronize_session=False)
            )

            print("8. Deleting interviews")

            interviews = (
                db.query(Interview)
                .filter(
                    Interview.user_id == user.id
                )
                .all()
            )

            for interview in interviews:
                db.delete(interview)

            db.flush()

            print("9. Deleting resumes")

            for resume in resumes:
                db.delete(resume)

            db.flush()
            print("10. Deleting user")

            db.delete(user)

            print("11. Committing")

            db.commit()

            print("12. SUCCESS")

            return {
                "deleted_files": deleted_files,
            }

        except Exception as e:
            print("ERROR:", e)
            db.rollback()
            raise