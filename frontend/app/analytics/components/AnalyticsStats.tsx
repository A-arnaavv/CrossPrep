type AnalyticsStatsProps = {
    totalInterviews: number;
    averageScore: string;
    bestScore: number;
};

export default function AnalyticsStats({
    totalInterviews,
    averageScore,
    bestScore,
}: AnalyticsStatsProps) {
    return (
        <div className="grid md:grid-cols-3 gap-6 mb-8">

            <div className="border rounded-2xl p-4 bg-white shadow-sm">
                <div className="text-2xl font-bold">
                    {totalInterviews}
                </div>

                <div className="text-zinc-500 mt-2">
                    Total Interviews
                </div>
            </div>

            <div className="border rounded-2xl p-4 bg-white shadow-sm">
                <div className="text-2xl font-bold">
                    {averageScore}
                </div>

                <div className="text-zinc-500 mt-2">
                    Average Score
                </div>
            </div>

            <div className="border rounded-2xl p-4 bg-white shadow-sm">
                <div className="text-2xl font-bold">
                    {bestScore}
                </div>

                <div className="text-zinc-500 mt-2">
                    Best Score
                </div>
            </div>

        </div>
    );
}