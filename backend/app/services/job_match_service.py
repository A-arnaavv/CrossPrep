class JobMatchService:

    @staticmethod
    def calculate_match(
        resume_skills: list,
        job_description: str,
    ):
        skills_lower = [
            str(skill).lower()
            for skill in resume_skills
        ]

        jd = job_description.lower()

        matched_skills = []
        missing_skills = []

        keywords = [
            "python",
            "java",
            "c++",
            "react",
            "next.js",
            "fastapi",
            "sql",
            "postgresql",
            "docker",
            "kubernetes",
            "aws",
            "azure",
            "gcp",
            "machine learning",
            "deep learning",
            "computer vision",
            "langchain",
            "redis",
            "firebase",
            "git",
            "ci/cd",
        ]

        required_keywords = []

        for keyword in keywords:

            if keyword in jd:
                required_keywords.append(
                    keyword
                )

        for keyword in required_keywords:

            found = any(
                keyword in skill
                for skill in skills_lower
            )

            if found:
                matched_skills.append(
                    keyword
                )
            else:
                missing_skills.append(
                    keyword
                )

        if len(required_keywords) == 0:
            match_score = 0
        else:
            match_score = round(
                (
                    len(matched_skills)
                    / len(required_keywords)
                )
                * 100
            )

        recommendations = []

        for skill in missing_skills:
            recommendations.append(
                f"Learn {skill}"
            )

        return {
            "match_score": match_score,
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "recommendations": recommendations,
        }