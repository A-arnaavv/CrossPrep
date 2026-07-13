export type DashboardStats = {
    total_resumes: number;
    total_interviews: number;
    average_score: number;
    completion_percentage: number;
};

export type DashboardActivity = {
    type?: "coding" | "behavioral";
    role?: string;
    level?: string;
    status?: string;
    created_at?: string;
    average_score?: number;
    coding_score: number | null;
    behavioral_score: number | null;
};

export type CareerCoachTargetRole = {
    company: string;
    role: string;
    readiness: number;
};

export type CareerCoachReport = {
    career_readiness: number;
    summary: string;
    strengths: string[];
    focus_areas: string[];
    weekly_plan: string[];
    target_roles: CareerCoachTargetRole[];
    created_at?: string;
};