from pydantic import BaseModel


class ResumeResponse(BaseModel):
    id: str
    file_url: str

    projects: Mapped[dict] = mapped_column(
        JSONB,
        default=list,
    )

    experience: Mapped[dict] = mapped_column(
        JSONB,
        default=list,
    )

    education: Mapped[dict] = mapped_column(
        JSONB,
        default=list,
    )