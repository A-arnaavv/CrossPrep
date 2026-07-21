import {
    Award,
    BarChart3,
    BriefcaseBusiness,
} from "lucide-react";

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
    const cards = [
        {
            title: "Total Interviews",
            value: totalInterviews,
            icon: BriefcaseBusiness,
            description: "Completed mock interviews",
        },
        {
            title: "Average Score",
            value: averageScore,
            icon: BarChart3,
            description: "Overall performance",
        },
        {
            title: "Best Score",
            value: bestScore,
            icon: Award,
            description: "Highest score achieved",
        },
    ];

    return (
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className="group rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 transition-colors group-hover:bg-violet-600">
                            <Icon className="h-6 w-6 text-violet-700 transition-colors group-hover:text-white" />
                        </div>

                        <div className="mt-6">
                            <p className="text-sm font-medium text-slate-500">
                                {card.title}
                            </p>

                            <h3 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
                                {card.value}
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                {card.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}