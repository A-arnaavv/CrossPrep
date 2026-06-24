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
            "gemini-3.1-flash-lite"
        )

        prompt = f"""
You are an expert technical recruiter,
ATS specialist,
and hiring manager at Microsoft,
Google,
Amazon,
and top AI startups.

Analyze the following resume.

Return ONLY valid JSON.

Format:

{{
  "summary": "",

  "skills": [],

  "projects": [
    {{
      "name": "",
      "description": "",
      "technologies": []
    }}
  ],

  "experience": [
    {{
      "title": "",
      "company": "",
      "dates": "",
      "description": ""
    }}
  ],

  "education": [
    {{
      "degree": "",
      "institution": "",
      "dates": "",
      "score": ""
    }}
  ],

  "ats_score": 0,

  "strengths": [],

  "weaknesses": [],

  "missing_skills": [],

  "recommendations": []
}}

Rules:

1. 1. ATS Score must be between 0 and 100.

2. Summary should be a professional 2-3 sentence overview of the candidate.

3. Strengths should contain the strongest aspects of the resume.

4. Weaknesses should contain issues that reduce interview chances.

5. Missing Skills should contain important industry skills that appear absent.

6. Projects MUST be returned as structured objects.

7. Experience MUST be returned as structured objects.

8. Education MUST be returned as structured objects.

9. Recommendations must be short action items.

Examples:
- Add GitHub portfolio link
- Quantify project impact
- Learn Docker and Kubernetes
- Add AWS experience
- Improve ATS keyword coverage

Recommendations Rules:

- Return concise action items only.
- Each recommendation must be 3-12 words.
- Maximum 8 recommendations.
- Do NOT explain recommendations.
- Do NOT write paragraphs.
- Do NOT use markdown.
- Do NOT use ":" characters.
- Do NOT use bullet points inside strings.
- One recommendation per array item.

10. Return ONLY valid JSON.

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

        result = json.loads(
            response_text
        )

        # Cleanup recommendations
        result["recommendations"] = [
            str(rec)
            .replace("**", "")
            .replace(":", "")
            .strip()[:120]
            for rec in result.get(
                "recommendations",
                []
            )
        ]
        result.setdefault("summary", "")
        result.setdefault("projects", [])
        result.setdefault("experience", [])
        result.setdefault("education", [])
        return result

    @staticmethod
    def generate_interview_questions(
        role: str,
        level: str,
        skills: list,
        projects: list,
    ):
        model = genai.GenerativeModel(
            "gemini-3.1-flash-lite"
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
                "Gemini Question Error:",
                str(e)
            )

            return {
                "questions": [
                    "Tell me about yourself.",
                    "Describe a challenging project you worked on.",
                    "What are your strongest technical skills?",
                    "Explain a difficult bug you solved.",
                    "How do you approach debugging?",
                    "Describe your experience with databases.",
                    "What is your development workflow?",
                    "How do you ensure code quality?",
                    "Tell me about a team collaboration experience.",
                    "Why are you interested in this role?"
                ]
            }

    @staticmethod
    def evaluate_answer(
        question: str,
        answer: str,
    ):
        model = genai.GenerativeModel(
            "gemini-3.1-flash-lite"
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
                "Gemini Evaluation Error:",
                str(e)
            )

            return {
                "score": 0,
                "feedback":
                    "AI evaluation temporarily unavailable.",
                "ideal_answer":
                    "Please retry later.",
            }