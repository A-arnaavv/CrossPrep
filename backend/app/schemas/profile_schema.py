from pydantic import BaseModel


class ProfileUpdate(BaseModel):

    clerk_id: str

    bio: str | None = None

    target_role: str | None = None

    experience_level: str | None = None

    preferred_companies: list[str] = []

    linkedin_url: str | None = None

    github_url: str | None = None

    portfolio_url: str | None = None