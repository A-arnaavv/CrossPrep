from supabase import create_client

from app.core.config import settings
import uuid

supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_SERVICE_KEY,
)


class StorageService:
    BUCKET = "resumes"

    @staticmethod
    def upload_resume(
        file_bytes: bytes,
        file_name: str,
    ):
        path = f"uploads/{uuid.uuid4()}_{file_name}"

        supabase.storage.from_(
            StorageService.BUCKET
        ).upload(
            path,
            file_bytes,
        )

        return path