import json

import google.generativeai as genai

from app.core.config import settings


genai.configure(
    api_key=settings.GEMINI_API_KEY
)


class CareerCoachService:

    @staticmethod
    def generate_coach_report(
        resume_data: dict,
        interview_data: list,
        dashboard_stats: dict,
    ):
        model = genai.GenerativeModel(
            "gemini-2.5-flash"
        )

        prompt = f"""
You are an AI career coach for software engineering candidates.

Analyze this user's career preparation data.

Resume Data:
{resume_data}

Interview Data:
{interview_data}

Dashboard Stats:
{dashboard_stats}

Return ONLY valid JSON.

Format:
{{
    "career_readiness": 0,
    "summary": "",
    "strengths": [
        ""
    ],
    "focus_areas": [
        ""
    ],
    "weekly_plan": [
        ""
    ],
    "target_roles": [
        {{
            "company": "",
            "role": "",
            "readiness": 0
        }}
    ]
}}

Rules:
- career_readiness must be between 0 and 100.
- target_roles must include Microsoft, Google, and Amazon.
- Keep advice practical and specific.
- Base recommendations on the provided resume and interview data.
- Do not mention that you are an AI.
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

            return json.loads(
                response_text
            )

        except Exception as e:
            print(
                "Career Coach Error:",
                str(e)
            )

            return {
                "career_readiness": 70,
                "summary":
                    "Your preparation is progressing well. Continue improving your coding consistency, resume positioning, and interview communication.",
                "strengths": [
                    "You are actively practicing interviews.",
                    "You have resume intelligence data available.",
                    "You are building consistency through repeated preparation."
                ],
                "focus_areas": [
                    "Improve coding interview accuracy.",
                    "Review weak resume keywords.",
                    "Practice structured behavioral answers."
                ],
                "weekly_plan": [
                    "Complete one coding interview.",
                    "Review your latest resume recommendations.",
                    "Practice one behavioral interview using the STAR method."
                ],
                "target_roles": [
                    {
                        "company": "Microsoft",
                        "role": "Software Engineer",
                        "readiness": 72
                    },
                    {
                        "company": "Google",
                        "role": "Software Engineer",
                        "readiness": 68
                    },
                    {
                        "company": "Amazon",
                        "role": "SDE",
                        "readiness": 74
                    }
                ],
            }