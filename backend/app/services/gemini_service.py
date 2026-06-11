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

        response_text = (
            response.text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(
            response_text
        )

    @staticmethod
    def generate_interview_questions(
        role: str,
        level: str,
        skills: list,
        projects: list,
    ):
        model = genai.GenerativeModel(
            "gemini-2.5-flash"
        )

        prompt = f"""
Generate exactly 10 personalized interview questions.

Role:
{role}

Experience Level:
{level}

Candidate Skills:
{skills}

Candidate Projects:
{projects}

Rules:
1. Questions must be relevant to the candidate profile.
2. Mix technical and project-based questions.
3. Increase difficulty based on level.
4. Return ONLY valid JSON.

Format:

{{
  "questions": [
    "question 1",
    "question 2",
    "question 3"
  ]
}}
"""

        response = model.generate_content(
            prompt
        )

        response_text = (
            response.text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(
            response_text
        )

    @staticmethod
    def evaluate_answer(
        question: str,
        answer: str,
    ):
        model = genai.GenerativeModel(
            "gemini-2.5-flash"
        )

        prompt = f"""
You are a senior technical interviewer.

Question:
{question}

Candidate Answer:
{answer}

Evaluate the answer.

Score should be between 0 and 10.

Return ONLY valid JSON.

Format:

{{
    "score": 0,
    "feedback": "",
    "ideal_answer": ""
}}
"""

        response = model.generate_content(
            prompt
        )

        response_text = (
            response.text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        result = json.loads(
            response_text
        )

        result["score"] = int(
            result.get("score", 0)
        )

        return result