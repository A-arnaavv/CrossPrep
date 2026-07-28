import os
import uuid


class StorageService:
    @staticmethod
    def upload_resume(
        file_bytes: bytes,
        file_name: str,
    ):
        uploads_dir = "uploads"

        os.makedirs(
            uploads_dir,
            exist_ok=True,
        )

        unique_name = (
            f"{uuid.uuid4()}_{file_name}"
        )

        path = os.path.join(
            uploads_dir,
            unique_name,
        )

        with open(
            path,
            "wb",
        ) as file:
            file.write(file_bytes)

        return path

    @staticmethod
    def delete_file(
        file_path: str,
    ) -> bool:
        if not file_path:
            return False

        try:
            if os.path.isfile(file_path):
                os.remove(file_path)
                return True

            return False
        except OSError as error:
            print(
                "Failed to delete stored file:",
                file_path,
                error,
            )
            return False