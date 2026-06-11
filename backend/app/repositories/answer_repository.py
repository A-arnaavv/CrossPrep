from sqlalchemy.orm import Session

from app.models.answer import Answer


class AnswerRepository:
    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create(
        self,
        question_id,
        answer_text,
        score,
        feedback,
        ideal_answer,
    ):
        answer = Answer(
            question_id=question_id,
            answer_text=answer_text,
            score=score,
            feedback=feedback,
            ideal_answer=ideal_answer,
        )

        self.db.add(answer)
        self.db.commit()
        self.db.refresh(answer)

        return answer