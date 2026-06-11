import json

import google.generativeai as genai

from app.core.config import settings


genai.configure(
    api_key=settings.GEMINI_API_KEY
)


class GeminiService:
    @staticmethod
    def analyze_resume(
        resume_text: str,
    ):
        model = genai.GenerativeModel(
            "gemini-2.5-flash"
        )

        prompt = f"""
Analyze the following resume.

Return ONLY valid JSON.

Format:

{{
  "skills": [],
  "projects": [],
  "experience": [],
  "education": []
}}

Resume:

{resume_text}
"""

        response = model.generate_content(
            prompt
        )

        response_text = response.text

        response_text = response_text.replace(
            "```json",
            ""
        )

        response_text = response_text.replace(
            "```",
            ""
        )

        return json.loads(
            response_text.strip()
        )