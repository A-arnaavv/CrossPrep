import type { DashboardStats } from "./types";

type PerformanceAnalyticsProps = {
    stats: DashboardStats;
};

export default function PerformanceAnalytics({
    stats,
}: PerformanceAnalyticsProps) {
    const averageScore =
        Number(stats.average_score || 0);

    const scorePercent =
        Math.min(
            100,
            Math.round(
                averageScore * 10
            )
        );

    return (
        <div className="lg:col-span-2 bg-white border rounded-3xl p-6 shadow-sm">

            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-2xl font-bold">
                        Performance Analytics
                    </h2>

                    <p className="text-zinc-500 mt-1">
                        Track your interview progress and readiness.
                    </p>
                </div>

            </div>

            <div className="mt-8">

                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-500">
                        Average Interview Score
                    </span>

                    <span className="font-semibold">
                        {averageScore}/10
                    </span>
                </div>

                <div className="h-4 bg-zinc-100 rounded-full overflow-hidden">

                    <div
                        className="
                            h-full
                            bg-gradient-to-r
                            from-violet-500
                            to-purple-600
                            rounded-full
                        "
                        style={{
                            width: `${scorePercent}%`,
                        }}
                    />

                </div>

            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">

                <div className="rounded-2xl bg-zinc-50 p-4">
                    <div className="text-sm text-zinc-500">
                        Interviews
                    </div>

                    <div className="text-2xl font-bold mt-2">
                        {stats.total_interviews}
                    </div>
                </div>

                <div className="rounded-2xl bg-zinc-50 p-4">
                    <div className="text-sm text-zinc-500">
                        Completion
                    </div>

                    <div className="text-2xl font-bold mt-2">
                        {stats.completion_percentage}%
                    </div>
                </div>

                <div className="rounded-2xl bg-zinc-50 p-4">
                    <div className="text-sm text-zinc-500">
                        Resume Files
                    </div>

                    <div className="text-2xl font-bold mt-2">
                        {stats.total_resumes}
                    </div>
                </div>

            </div>

            <div className="mt-8 border-t pt-5">

                <h3 className="font-semibold">
                    Insight
                </h3>

                <p className="text-zinc-600 mt-2 leading-7">
                    Your dashboard currently tracks resume uploads,
                    interview attempts, average score, and completion.
                    As you complete more interviews, this section will become
                    your performance trend center.
                </p>

            </div>

        </div>
    );
}