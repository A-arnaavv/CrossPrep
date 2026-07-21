"use client";

import {
    Briefcase,
    CheckCircle2,
    Clock3,
    CalendarDays,
} from "lucide-react";

import type { InterviewHistoryItem } from "./types";

type HistoryStatsProps = {
    interviews: InterviewHistoryItem[];
};

export default function HistoryStats({
    interviews,
}: HistoryStatsProps) {
    const totalInterviews = interviews.length;

    const completedInterviews =
        interviews.filter(
            (item) =>
                item.status?.toLowerCase() === "completed"
        ).length;

    const pendingInterviews =
        interviews.filter(
            (item) =>
                item.status?.toLowerCase() !== "completed"
        ).length;

    const latestInterview =
        interviews.length > 0
            ? new Date(
                interviews
                    .map((i) => new Date(i.created_at))
                    .sort(
                        (a, b) =>
                            b.getTime() - a.getTime()
                    )[0]
            ).toLocaleDateString()
            : "—";

    const cards = [
        {
            title: "Total Interviews",
            value: totalInterviews,
            icon: Briefcase,
        },
        {
            title: "Completed",
            value: completedInterviews,
            icon: CheckCircle2,
        },
        {
            title: "Pending",
            value: pendingInterviews,
            icon: Clock3,
        },
        {
            title: "Latest Interview",
            value: latestInterview,
            icon: CalendarDays,
        },
    ];

    return (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
                            <Icon className="h-6 w-6 text-violet-600" />
                        </div>

                        <div className="mt-5">
                            <p className="text-sm text-slate-500">
                                {card.title}
                            </p>

                            <h3 className="mt-2 text-3xl font-bold text-slate-900">
                                {card.value}
                            </h3>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}