from sqlalchemy.orm import Session

from app.models.resume import Resume


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
            .filter(Resume.id == resume_id)
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

        self.db.commit()
        self.db.refresh(resume)

        return resume