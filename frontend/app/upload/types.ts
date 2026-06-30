export type ResumeProject = {
    name?: string;
    description?: string;
    technologies?: string[];
};

export type ResumeExperience = {
    title?: string;
    company?: string;
    dates?: string;
    description?: string;
};

export type ResumeEducation = {
    degree?: string;
    institution?: string;
    dates?: string;
    score?: string;
};

export type ResumeAnalysis = {
    resume_id?: string;
    ats_score: number;
    skills?: string[];
    projects?: ResumeProject[];
    experience?: ResumeExperience[];
    education?: ResumeEducation[];
    strengths?: string[];
    weaknesses?: string[];
    missing_skills?: string[];
    recommendations?: string[];
};