class ATSService:

    @staticmethod
    def calculate_score(
        skills: list,
        projects: list,
        experience: list,
        education: list,
    ):
        score = 0

        skills_lower = [
            str(skill).lower()
            for skill in skills
        ]

        # ======================
        # Technical Skills
        # ======================

        for skill in skills_lower:

            if "python" in skill:
                score += 8

            elif "java" in skill:
                score += 6

            elif "c++" in skill:
                score += 6

            elif "react" in skill:
                score += 8

            elif "fastapi" in skill:
                score += 8

            elif "sql" in skill:
                score += 8

            elif "machine learning" in skill:
                score += 10

            elif "deep learning" in skill:
                score += 10

            elif "computer vision" in skill:
                score += 10

            elif "nlp" in skill:
                score += 8

            elif "langchain" in skill:
                score += 8

            elif "redis" in skill:
                score += 5

            elif "firebase" in skill:
                score += 5

        if len(skills) >= 10:
            score += 10

        if len(skills) >= 20:
            score += 5

        # ======================
        # Projects
        # ======================

        if len(projects) >= 1:
            score += 10

        if len(projects) >= 2:
            score += 10

        if len(projects) >= 3:
            score += 5

        project_text = str(
            projects
        ).lower()

        if (
            "ai" in project_text
            or "machine learning"
            in project_text
            or "deep learning"
            in project_text
        ):
            score += 10

        # ======================
        # Experience
        # ======================

        if len(experience) > 0:
            score += 15

        # ======================
        # Education
        # ======================

        if len(education) > 0:
            score += 10

        # ======================
        # Research / Publications
        # ======================

        combined_text = (
            str(projects)
            + str(experience)
        ).lower()

        research_terms = [
            "research",
            "publication",
            "conference",
        ]

        if any(
            term in combined_text
            for term in research_terms
        ):
            score += 10

        # ======================
        # Quantified Impact
        # ======================

        if "%" in combined_text:
            score += 5

        if "98.4" in combined_text:
            score += 5

        # ======================
        # Missing Industry Skills
        # ======================

        penalties = [
            "docker",
            "aws",
            "ci/cd",
        ]

        for penalty in penalties:

            found = any(
                penalty in skill
                for skill in skills_lower
            )

            if not found:
                score -= 5

        # ======================
        # Normalize
        # ======================

        score = round(score * 0.5)

        score = max(
            0,
            min(score, 100)
        )

        return score