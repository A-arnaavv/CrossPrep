from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str

    SUPABASE_URL: str
    SUPABASE_SERVICE_KEY: str
    GEMINI_API_KEY: str
    CLERK_SECRET_KEY: str

    CLERK_ISSUER_URL: str
    CLERK_AUTHORIZED_PARTIES: str

    class Config:
        env_file = ".env"


settings = Settings()