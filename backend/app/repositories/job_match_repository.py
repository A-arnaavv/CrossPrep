from sqlalchemy.orm import Session

from app.models.job_match import JobMatch


class JobMatchRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create(
        self,
        user_id,
        job_title: str,
        job_description: str,
        match_score: int,
        matched_skills: list,
        missing_skills: list,
        recommendations: list,
    ):
        job_match = JobMatch(
            user_id=user_id,
            job_title=job_title,
            job_description=job_description,
            match_score=match_score,
            matched_skills=matched_skills,
            missing_skills=missing_skills,
            recommendations=recommendations,
        )

        self.db.add(job_match)
        self.db.commit()
        self.db.refresh(job_match)

        return job_match

    def get_by_user(
        self,
        user_id,
    ):
        return (
            self.db.query(JobMatch)
            .filter(
                JobMatch.user_id == user_id
            )
            .order_by(
                JobMatch.created_at.desc()
            )
            .all()
        )