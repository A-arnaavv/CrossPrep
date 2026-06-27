import type { DashboardStats } from "./types";

type AICoachProps = {
    stats: DashboardStats;
};

export default function AICoach({
    stats,
}: AICoachProps) {
    const averageScore =
        Number(stats.average_score || 0);

    let recommendation =
        "Start with a coding interview to build your baseline.";

    if (stats.total_resumes === 0) {
        recommendation =
            "Upload your resume first so InterviewGPT can personalize your preparation.";
    } else if (stats.total_interviews === 0) {
        recommendation =
            "Complete your first mock interview to generate your readiness score.";
    } else if (averageScore < 6) {
        recommendation =
            "Focus on fundamentals, edge cases, and explaining your approach clearly.";
    } else if (averageScore < 8) {
        recommendation =
            "You are making good progress. Practice medium-level questions and review weak areas.";
    } else {
        recommendation =
            "You are performing strongly. Move toward harder problems and timed interview practice.";
    }

    return (
        <div className="bg-white border rounded-3xl p-6 shadow-sm">

            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-2xl font-bold">
                        AI Coach
                    </h2>

                    <p className="text-zinc-500 mt-1">
                        Today&apos;s recommendation
                    </p>
                </div>

            </div>

            <div className="mt-6 rounded-2xl bg-violet-50 p-5">

                <div className="text-sm font-semibold text-violet-700">
                    Suggested Next Step
                </div>

                <p className="text-zinc-700 mt-3 leading-7">
                    {recommendation}
                </p>

            </div>

            <div className="mt-6 space-y-3">

                <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">
                        Coding Practice
                    </span>

                    <span className="font-semibold">
                        Priority
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">
                        Resume Review
                    </span>

                    <span className="font-semibold">
                        Recommended
                    </span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">
                        Behavioral Prep
                    </span>

                    <span className="font-semibold">
                        Continue
                    </span>
                </div>

            </div>

        </div>
    );
}