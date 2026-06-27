import type { DashboardStats } from "./types";

type StatsCardsProps = {
    stats: DashboardStats;
    loading: boolean;
};

const cards = [
    {
        title: "Resumes",
        key: "total_resumes",
        color: "text-blue-600",
    },
    {
        title: "Interviews",
        key: "total_interviews",
        color: "text-violet-600",
    },
    {
        title: "Average Score",
        key: "average_score",
        color: "text-green-600",
    },
    {
        title: "Completion",
        key: "completion_percentage",
        color: "text-orange-600",
        suffix: "%",
    },
];

export default function StatsCards({
    stats,
    loading,
}: StatsCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {cards.map((card) => (

                <div
                    key={card.key}
                    className="
                        bg-white
                        border
                        rounded-3xl
                        p-6
                        shadow-sm
                        hover:shadow-lg
                        transition-all
                        duration-300
                    "
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <div className="text-sm text-zinc-500">
                                {card.title}
                            </div>

                            <div
                                className={`text-4xl font-bold mt-3 ${card.color}`}
                            >
                                {loading
                                    ? "..."
                                    : `${stats[
                                    card.key as keyof typeof stats
                                    ]}${card.suffix || ""}`}
                            </div>

                        </div>

                    </div>

                </div>

            ))}

        </div>
    );
}