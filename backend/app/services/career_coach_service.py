import json

import google.generativeai as genai

from app.core.config import settings

from app.repositories.user_repository import UserRepository
from app.repositories.resume_repository import ResumeRepository
from app.repositories.coding_interview_session_repository import CodingInterviewSessionRepository
from app.repositories.interview_repository import InterviewRepository
from app.repositories.career_coach_report_repository import (
    CareerCoachReportRepository,
)

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

    @staticmethod
    def generate_for_user(
        clerk_id: str,
        db,
    ):
        user_repo = UserRepository(db)

        user = user_repo.get_by_clerk_id(
            clerk_id
        )

        if not user:
            return {
                "error": "User not found"
            }

        resume_repo = ResumeRepository(db)

        latest_resume = resume_repo.get_latest_by_user(
            user.id
        )

        if latest_resume:
            resume_data = {
                "ats_score": latest_resume.ats_score,
                "skills": latest_resume.skills,
                "strengths": latest_resume.strengths,
                "weaknesses": latest_resume.weaknesses,
                "missing_skills": latest_resume.missing_skills,
                "recommendations": latest_resume.recommendations,
            }
        else:
            resume_data = {}

        coding_repo = CodingInterviewSessionRepository(db)

        coding_sessions = coding_repo.get_sessions_by_user(
            user.id
        )

        interview_repo = InterviewRepository(db)

        behavioral_interviews = interview_repo.get_by_user(
            user.id
        )

        interview_data = [
            {
                "type": "coding",
                "role": session.role,
                "language": session.language,
                "status": session.status,
                "total_score": session.total_score,
                "summary": session.summary,
                "strengths": session.strengths,
                "improvements": session.improvements,
            }
            for session in coding_sessions
        ]

        interview_data.extend(
            [
                {
                    "type": "behavioral",
                    "role": interview.role,
                    "level": interview.level,
                    "status": interview.status,
                }
                for interview in behavioral_interviews
            ]
        )

        total_resumes = 1 if latest_resume else 0

        total_interviews = (
            len(behavioral_interviews)
            + len(coding_sessions)
        )

        coding_scores = [
            session.total_score / 4
            for session in coding_sessions
            if session.status == "completed"
        ]

        average_score = 0

        if coding_scores:
            average_score = (
                sum(coding_scores)
                / len(coding_scores)
            )

        completed_interviews = len(
            [
                session
                for session in coding_sessions
                if session.status == "completed"
            ]
        )

        completion_percentage = 0

        if total_interviews:
            completion_percentage = (
                completed_interviews
                / total_interviews
            ) * 100

        dashboard_stats = {
            "total_resumes": total_resumes,
            "total_interviews": total_interviews,
            "average_score": round(
                average_score,
                2,
            ),
            "completion_percentage": round(
                completion_percentage,
                2,
            ),
        }

        report = CareerCoachService.generate_coach_report(
            resume_data=resume_data,
            interview_data=interview_data,
            dashboard_stats=dashboard_stats,
        )

        report_repo = CareerCoachReportRepository(
            db
        )

        recent_report = (
            report_repo.get_recent_by_user(
                user.id
            )
        )

        if recent_report:
            return {
                "career_readiness":
                    recent_report.career_readiness,
                "summary":
                    recent_report.summary,
                "strengths":
                    recent_report.strengths,
                "focus_areas":
                    recent_report.focus_areas,
                "weekly_plan":
                    recent_report.weekly_plan,
                "target_roles":
                    recent_report.target_roles,
                "created_at":
                    str(recent_report.created_at),
            }

        saved_report = report_repo.create(
            user_id=user.id,
            report=report,
        )

        report["created_at"] = str(
            saved_report.created_at
        )

        return report