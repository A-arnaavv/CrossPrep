from sqlalchemy.orm import Session

from app.models.resume import Resume

from app.services.storage_service import (
    StorageService,
)

class ResumeRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        user_id,
        file_url: str,
    ):
        resume = Resume(
            user_id=user_id,
            file_url=file_url,
            parsed_text="",
            skills={},
        )

        self.db.add(resume)
        self.db.commit()
        self.db.refresh(resume)

        return resume
    def update_parsed_text(
        self,
        resume_id,
        parsed_text: str,
    ):
        resume = (
            self.db.query(Resume)
            .filter(Resume.id == resume_id)
            .first()
        )

        resume.parsed_text = parsed_text

        self.db.commit()
        self.db.refresh(resume)

        return resume
    
    def update_analysis(
    self,
    resume_id,
    analysis: dict,
    ):
        resume = (
            self.db.query(Resume)
            .filter(
                Resume.id == resume_id
            )
            .first()
        )

        resume.skills = analysis.get(
            "skills",
            [],
        )

        resume.projects = analysis.get(
            "projects",
            [],
        )

        resume.experience = analysis.get(
            "experience",
            [],
        )

        resume.education = analysis.get(
            "education",
            [],
        )

        resume.ats_score = analysis.get(
            "ats_score",
            0,
        )

        resume.strengths = analysis.get(
            "strengths",
            [],
        )

        resume.weaknesses = analysis.get(
            "weaknesses",
            [],
        )

        resume.missing_skills = analysis.get(
            "missing_skills",
            [],
        )

        resume.recommendations = analysis.get(
            "recommendations",
            [],
        )

        self.db.commit()
        self.db.refresh(resume)

        return resume
    
    def get_latest_by_user(
    self,
    user_id,
    ):
        return (
            self.db.query(Resume)
            .filter(
                Resume.user_id == user_id
            )
            .order_by(
                Resume.uploaded_at.desc()
            )
            .first()
        )

    def delete_all_by_user(
        self,
        user_id,
    ):
        resumes = (
            self.db.query(Resume)
            .filter(
                Resume.user_id == user_id
            )
            .all()
        )

        deleted_records = 0
        deleted_files = 0

        for resume in resumes:
            file_deleted = (
                StorageService.delete_file(
                    resume.file_url
                )
            )

            if file_deleted:
                deleted_files += 1

            self.db.delete(resume)
            deleted_records += 1

        self.db.commit()

        return {
            "deleted_records": deleted_records,
            "deleted_files": deleted_files,
        }