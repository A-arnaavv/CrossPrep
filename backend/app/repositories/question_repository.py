from sqlalchemy.orm import Session

from app.models.question import Question


class QuestionRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_many(
        self,
        interview_id,
        questions: list[str],
    ):
        records = []

        for index, question_text in enumerate(
            questions,
            start=1,
        ):
            question = Question(
                interview_id=interview_id,
                question_text=question_text,
                order_index=index,
            )

            self.db.add(question)
            records.append(question)

        self.db.commit()

        return records