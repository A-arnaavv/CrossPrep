from uuid import UUID

from pydantic import BaseModel


class SubmitAnswerRequest(BaseModel):
    question_id: UUID
    answer_text: str