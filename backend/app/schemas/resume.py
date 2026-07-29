from pydantic import BaseModel
from pydantic import Field


class ResumeResponse(BaseModel):
    id: str
    file_url: str

    projects: list[dict] = Field(
        default_factory=list
    )

    experience: list[dict] = Field(
        default_factory=list
    )

    education: list[dict] = Field(
        default_factory=list
    )