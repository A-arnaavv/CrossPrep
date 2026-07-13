import {
    FileText,
    BadgeCheck,
    Target,
    TrendingUp,
} from "lucide-react";

import type {
    LucideIcon,
} from "lucide-react";

import type {
    DashboardStats,
} from "./types";

type StatsCardsProps = {
    stats: DashboardStats;
    loading: boolean;
};

type Card = {
    title: string;
    subtitle: string;
    key: keyof DashboardStats;
    icon: LucideIcon;
    iconBg: string;
    iconColor: string;
    suffix?: string;
};

const cards: Card[] = [
    {
        title: "Resumes",
        subtitle: "Total uploaded",
        key: "total_resumes",
        icon: FileText,
        iconBg: "bg-violet-100",
        iconColor: "text-violet-600",
    },
    {
        title: "Interviews",
        subtitle: "Total sessions",
        key: "total_interviews",
        icon: BadgeCheck,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
    },
    {
        title: "Average Score",
        subtitle: "Across interviews",
        key: "average_score",
        icon: Target,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",

    },
    {
        title: "Completion",
        subtitle: "Progress rate",
        key: "completion_percentage",
        icon: TrendingUp,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        suffix: "%",
    },
];

export default function StatsCards({
    stats,
    loading,
}: StatsCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">

            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.key}
                        className="
                            group
                            bg-white
                            rounded-3xl
                            border
                            border-slate-100
                            p-5
                            shadow-sm
                            hover:shadow-xl
                            hover:-translate-y-1
                            transition-all
                            duration-300
                        "
                    >

                        <div className="flex items-start justify-between">

                            <div
                                className={`
                                    h-14
                                    w-14
                                    rounded-2xl
                                    flex
                                    items-center
                                    justify-center
                                    ${card.iconBg}
                                `}
                            >
                                <Icon
                                    size={26}
                                    strokeWidth={2.2}
                                    className={card.iconColor}
                                />
                            </div>

                            <span
                                className="
                                    rounded-full
                                    bg-slate-50
                                    px-3
                                    py-1
                                    text-xs
                                    font-semibold
                                    text-slate-500
                                "
                            >
                            </span>

                        </div>

                        <div className="mt-6">

                            <div className="text-sm font-medium text-slate-500">
                                {card.title}
                            </div>

                            <div className="mt-2 text-3xl font-bold text-slate-950">
                                {loading
                                    ? "..."
                                    : `${stats[card.key]}${card.suffix || ""}`}
                            </div>

                            <div className="mt-1 text-sm text-slate-400">
                                {card.subtitle}
                            </div>

                        </div>

                    </div>
                );
            })}

        </div>
    );
}