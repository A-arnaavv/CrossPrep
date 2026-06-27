export type DashboardStats = {
    total_resumes: number;
    total_interviews: number;
    average_score: number;
    completion_percentage: number;
};

export type DashboardActivity = {
    role?: string;
    level?: string;
    status?: string;
    created_at?: string;
};