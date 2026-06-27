from app import models
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
        difficulty: str = "Medium",
    ):
        model = genai.GenerativeModel(
            "gemini-3.1-flash-lite"
        )

        prompt = f"""
Generate ONE realistic LeetCode-style coding interview question.

Role:
{role}

Programming Language:
{language}

Requirements:

- Return a realistic coding interview problem.
- Include a clear description.
- Include exactly 2 examples.
- Include 3-5 constraints.
- Difficulty must be Easy, Medium, or Hard.
- Do NOT include solutions.
- Do NOT include hints.
- Do NOT include pseudocode.
- Include a realistic function_signature for the selected programming language.
- The function_signature must match the problem.
- Example explanations must be short.
- Each explanation must be maximum 2 sentences.
- Do NOT include long walkthroughs.
- starter_code must be valid starter code for the selected programming language.
- starter_code should include the function signature and a placeholder body.
- Do NOT include the solution logic.
- function_name must exactly match the function in starter_code.
- test_cases must contain exactly 2 sample tests.
- test_cases.input must be a JSON object.
- Keys inside test_cases.input must match the function parameters.
- expected_output must be valid JSON.
- Do NOT include explanations inside test_cases.

Return ONLY valid JSON.

{{
    "title": "",
    "difficulty": "",
    "description": "",
    "function_name": "",
    "starter_code": "",
    "examples": [
        {{
            "input": "",
            "output": "",
            "explanation": ""
        }}
    ],
    "constraints": [
        ""
    ],
    "test_cases": [
        {{
            "input": {{}},
            "expected_output": null
        }}
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

            print(
                "Generated Question:",
                response_text
            )

            result = json.loads(
                response_text
            )
            result.setdefault("title", "Untitled Problem")
            result.setdefault("difficulty", difficulty)
            result.setdefault("description", "")
            result.setdefault("examples", [])
            result.setdefault("constraints", [])
            result.setdefault(
                "starter_code",
                ""
            )
            result.setdefault("function_name", "")
            result.setdefault("test_cases", [])

            return result

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
        clean_code = code.strip().lower()

        compact_code = (
            clean_code
            .replace(" ", "")
            .replace("\n", "")
            .replace("\t", "")
        )

        placeholder_patterns = [
            "todo",
            "fixme",
            "returnnone",
            "returnnull",
            "return[]",
            "return{}",
            "return0",
            "defsolution():pass",
            "defsolution():return",
            "defsolution():returnnone",
            "functionsolution(){}",
            "functionsolution(){return;}",
            "functionsolution(){returnnull;}",
            "publicstaticvoidsolution(){}",
            "voidsolution(){}",
        ]

        if (
            not clean_code
            or len(clean_code) < 25
            or any(
                pattern in compact_code
                for pattern in placeholder_patterns
            )
        ):
            return {
                "score": 0,
                "feedback":
                    "The submitted code appears to be starter code, placeholder code, or too incomplete to solve the problem."
            }

        model = genai.GenerativeModel(
            "gemini-3.1-flash-lite"
        )

        prompt = f"""
    You are a strict senior software engineer evaluating a coding interview answer.

    Coding Question:

    {question}

    Candidate Code:

    {code}

    Evaluation Rules:

    1. If the candidate code is only starter code,
    empty code,
    placeholder code,
    or contains only pass / TODO / empty function,
    the score MUST be 0.

    2. If the code does not attempt to solve the actual problem,
    the score MUST be between 0 and 2.

    3. If the code has a partial but incomplete solution,
    the score should be between 3 and 6.

    4. If the code mostly solves the problem but misses edge cases,
    the score should be between 7 and 8.

    5. Only give 9 or 10 if the code clearly solves the full problem,
    handles edge cases,
    and is efficient.

    6. Be strict.
    7. Do NOT reward clean syntax alone.
    8. Do NOT reward placeholder code.
    9. Do NOT assume missing logic works.

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

    @staticmethod
    def generate_interview_set(
        role: str,
        language: str,
    ):
        questions = []

        difficulties = [
            "Easy",
            "Medium",
            "Medium",
            "Hard",
        ]

        for difficulty in difficulties:

            question = (
                CodingInterviewService
                .generate_question(
                    role=role,
                    language=language,
                    difficulty=difficulty,
                )
            )

            question["difficulty"] = (
                difficulty
            )

            questions.append(
                question
            )

        return questions

    @staticmethod
    def generate_final_report(
        role: str,
        language: str,
        total_score: int,
        average_score: float,
        questions: list,
    ):
        model = genai.GenerativeModel(
            "gemini-3.1-flash-lite"
        )

        prompt = f"""
    You are an AI coding interview evaluator.

    Generate a final coding interview report.

    Role:
    {role}

    Language:
    {language}

    Total Score:
    {total_score}/40

    Average Score:
    {average_score}/10

    Question Scores:
    {questions}

    Return ONLY valid JSON.

    Format:
    {{
        "summary": "",
        "strengths": [
            ""
        ],
        "improvements": [
            ""
        ],
        "recommendations": [
            ""
        ]
    }}

    Rules:
    - Keep summary concise.
    - Strengths should be specific.
    - Improvements should be practical.
    - Recommendations should be actionable.
    - Do not be overly harsh.
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
                "Final Report Generation Error:",
                str(e)
            )

            return {
                "summary":
                    "The coding interview has been completed. Review the question scores to identify your strongest and weakest areas.",
                "strengths": [
                    "Completed a multi-question coding interview round.",
                    "Practiced solving problems in a timed interview-style environment."
                ],
                "improvements": [
                    "Review low-scoring questions.",
                    "Practice edge cases and complexity analysis."
                ],
                "recommendations": [
                    "Redo similar problems.",
                    "Focus on correctness before optimization."
                ],
            }