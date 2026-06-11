import fitz


class PDFService:
    @staticmethod
    def extract_text(
        file_bytes: bytes,
    ) -> str:
        text = ""

        pdf = fitz.open(
            stream=file_bytes,
            filetype="pdf",
        )

        for page in pdf:
            text += page.get_text()

        return text.strip()