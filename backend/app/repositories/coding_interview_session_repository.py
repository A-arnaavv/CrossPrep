import json

from uuid import UUID

from sqlalchemy.orm import Session

from app.models.coding_interview_session import (
    CodingInterviewSession,
)

from app.models.coding_interview_question import (
    CodingInterviewQuestion,
)

class CodingInterviewSessionRepository:

    def __init__(
        self,
        db: Session,
    ):
        self.db = db

    def create_session(
        self,
        user_id: UUID,
        role: str,
        language: str,
    ):
        session = CodingInterviewSession(
            user_id=user_id,
            role=role,
            language=language,
        )

        self.db.add(session)
        self.db.commit()
        self.db.refresh(session)

        return session

    def create_questions(
        self,
        session_id: UUID,
        questions: list,
    ):
        db_questions = []

        for index, item in enumerate(
            questions
        ):
            db_question = CodingInterviewQuestion(
                session_id=session_id,
                question_number=index + 1,
                difficulty=item["difficulty"],
                title=item["title"],
                question=json.dumps(
                    item
                ),
            )

            self.db.add(db_question)
            db_questions.append(db_question)

        self.db.commit()

        for question in db_questions:
            self.db.refresh(question)

        return db_questions

    def get_session_by_id(
        self,
        session_id: UUID,
    ):
        return (
            self.db.query(
                CodingInterviewSession
            )
            .filter(
                CodingInterviewSession.id
                == session_id
            )
            .first()
        )

    def get_question_by_id(
        self,
        question_id: UUID,
    ):
        return (
            self.db.query(
                CodingInterviewQuestion
            )
            .filter(
                CodingInterviewQuestion.id
                == question_id
            )
            .first()
        )

    def update_question_result(
        self,
        question_id: UUID,
        code: str,
        score: int,
        feedback: str,
    ):
        question = self.get_question_by_id(
            question_id
        )

        if not question:
            return None

        question.code = code
        question.score = score
        question.feedback = feedback
        question.completed = True

        self.db.commit()
        self.db.refresh(question)

        return question

    def update_session_progress(
        self,
        session_id: UUID,
        current_question: int,
        total_score: int,
        status: str,
    ):
        session = self.get_session_by_id(
            session_id
        )

        if not session:
            return None

        session.current_question = current_question
        session.total_score = total_score
        session.status = status

        self.db.commit()
        self.db.refresh(session)

        return session

    def get_questions_by_session(
        self,
        session_id: UUID,
    ):
        return (
            self.db.query(
                CodingInterviewQuestion
            )
            .filter(
                CodingInterviewQuestion.session_id
                == session_id
            )
            .order_by(
                CodingInterviewQuestion.question_number
            )
            .all()
        )

    def get_next_question(
        self,
        session_id: UUID,
        question_number: int,
    ):
        return (
            self.db.query(
                CodingInterviewQuestion
            )
            .filter(
                CodingInterviewQuestion.session_id
                == session_id,
                CodingInterviewQuestion.question_number
                == question_number,
            )
            .first()
        )

    def save_final_report(
        self,
        session_id: UUID,
        summary: str,
        strengths: list,
        improvements: list,
        recommendations: list,
    ):
        session = self.get_session_by_id(
            session_id
        )

        if not session:
            return None

        session.summary = summary
        session.strengths = strengths
        session.improvements = improvements
        session.recommendations = recommendations

        self.db.commit()
        self.db.refresh(session)

        return session

    def get_sessions_by_user(
        self,
        user_id,
    ):
        return (
            self.db.query(
            CodingInterviewSession
        )
        .filter(
            CodingInterviewSession.user_id == user_id
        )
        .order_by(
            CodingInterviewSession.created_at.desc()
        )
        .all()
    )