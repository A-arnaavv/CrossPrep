import json

import google.generativeai as genai

from app.core.config import settings


genai.configure(
    api_key=settings.GEMINI_API_KEY
)


class CodingInterviewService:

    @staticmethod
    def generate_question(
        role: str,
        language: str,
    ):
        model = genai.GenerativeModel(
            "gemini-2.5-flash"
        )

        prompt = f"""
    Generate ONE realistic coding interview problem.

    Role:
    {role}

    Programming Language:
    {language}

    Rules:

    - Write like LeetCode.
    - Include:
    - title
    - difficulty
    - problem description
    - constraints
    - examples

    - Do NOT provide:
    - solution
    - pseudocode
    - implementation hints
    - algorithm hints
    - design pattern hints

    Return ONLY valid JSON.

    {{
        "title": "",
        "difficulty": "",
        "question": ""
    }}
    """

        try:

            response = model.generate_content(
                prompt
            )

            response_text = (
                response.text
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )

            print(
                "Generated Question:",
                response_text
            )

            return json.loads(
                response_text
            )

        except Exception as e:

            print(
                "Question Generation Error:",
                str(e)
            )

            return {
                "title": "Question Generation Failed",
                "difficulty": "Medium",
                "question":
                    "Unable to generate question at this time."
            }

        

    @staticmethod
    def evaluate_code(
        question: str,
        code: str,
    ):
        model = genai.GenerativeModel(
            "gemini-2.5-flash"
        )

        prompt = f"""
You are a senior software engineer.

Coding Question:

{question}

Candidate Code:

{code}

Evaluate the code.

Consider:

1. Correctness
2. Code Quality
3. Readability
4. Efficiency
5. Best Practices

Score should be between 0 and 10.

Return ONLY valid JSON.

Format:

{{
    "score": 0,
    "feedback": ""
}}
"""

        try:

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

        except Exception as e:

            print(
                "Coding Evaluation Error:",
                str(e)
            )

            return {
                "score": 0,
                "feedback":
                    "AI evaluation temporarily unavailable. Please try again later."
            }