import Link from "next/link";
import {
    ArrowUpRight,
    CalendarDays,
    Clock3,
    History,
    Sparkles,
} from "lucide-react";

import type {
    AnalyticsInterview,
} from "../types";

type RecentInterviewsProps = {
    interviews: AnalyticsInterview[];
};

function formatLabel(value?: string | null) {
    if (!value) {
        return "Practice";
    }

    return value
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (character) =>
            character.toUpperCase()
        );
}

function formatInterviewDate(date: string) {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return {
            fullDate: "Unknown date",
            relativeDate: "",
        };
    }

    const now = new Date();

    const differenceInDays = Math.floor(
        (now.getTime() - parsedDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    let relativeDate = "";

    if (differenceInDays <= 0) {
        relativeDate = "Today";
    } else if (differenceInDays === 1) {
        relativeDate = "Yesterday";
    } else if (differenceInDays < 7) {
        relativeDate = `${differenceInDays} days ago`;
    } else {
        relativeDate = parsedDate.toLocaleDateString(
            "en",
            {
                month: "short",
                day: "numeric",
            }
        );
    }

    return {
        fullDate: parsedDate.toLocaleDateString(
            "en",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        ),
        relativeDate,
    };
}

function getScoreStyle(score: number) {
    if (score >= 8) {
        return {
            badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
            bar: "bg-emerald-500",
            label: "Strong",
        };
    }

    if (score >= 6) {
        return {
            badge: "border-amber-200 bg-amber-50 text-amber-700",
            bar: "bg-amber-500",
            label: "Progressing",
        };
    }

    return {
        badge: "border-rose-200 bg-rose-50 text-rose-700",
        bar: "bg-rose-500",
        label: "Needs practice",
    };
}

export default function RecentInterviews({
    interviews,
}: RecentInterviewsProps) {
    const recentInterviews = [...interviews]
        .sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
        )
        .slice(0, 8);

    return (
        <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-6 lg:self-start">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                            <History className="h-5 w-5 text-violet-700" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-950">
                                Recent Interviews
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Your latest scored sessions
                            </p>
                        </div>
                    </div>
                </div>

                {recentInterviews.length > 0 && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {recentInterviews.length}
                    </span>
                )}
            </div>

            {recentInterviews.length > 0 ? (
                <>
                    <div className="mt-6 max-h-[680px] space-y-4 overflow-y-auto pr-1">
                        {recentInterviews.map(
                            (interview, index) => {
                                const score = Number.isFinite(
                                    Number(
                                        interview.average_score
                                    )
                                )
                                    ? Math.max(
                                        0,
                                        Math.min(
                                            10,
                                            Number(
                                                interview.average_score
                                            )
                                        )
                                    )
                                    : 0;

                                const scoreStyle =
                                    getScoreStyle(score);

                                const {
                                    fullDate,
                                    relativeDate,
                                } =
                                    formatInterviewDate(
                                        interview.created_at
                                    );

                                return (
                                    <article
                                        key={`${interview.created_at}-${interview.role}-${index}`}
                                        className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <h3 className="truncate font-bold text-slate-950">
                                                    {
                                                        interview.role
                                                    }
                                                </h3>

                                                <p className="mt-1 text-sm font-medium text-slate-500">
                                                    {formatLabel(
                                                        interview.level
                                                    )}
                                                </p>
                                            </div>

                                            <div
                                                className={`shrink-0 rounded-xl border px-3 py-2 text-right ${scoreStyle.badge}`}
                                            >
                                                <p className="text-lg font-bold leading-none">
                                                    {score.toFixed(
                                                        1
                                                    )}
                                                </p>

                                                <p className="mt-1 text-[10px] font-bold uppercase tracking-wide">
                                                    /10
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                                                <span>
                                                    {
                                                        scoreStyle.label
                                                    }
                                                </span>

                                                <span>
                                                    {Math.round(
                                                        score * 10
                                                    )}
                                                    %
                                                </span>
                                            </div>

                                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                                                <div
                                                    className={`h-full rounded-full ${scoreStyle.bar}`}
                                                    style={{
                                                        width: `${score * 10}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                                            <span className="inline-flex items-center gap-1.5">
                                                <Clock3 className="h-3.5 w-3.5" />
                                                {
                                                    relativeDate
                                                }
                                            </span>

                                            <span className="inline-flex items-center gap-1.5">
                                                <CalendarDays className="h-3.5 w-3.5" />
                                                {fullDate}
                                            </span>
                                        </div>
                                    </article>
                                );
                            }
                        )}
                    </div>

                    <Link
                        href="/history"
                        className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                    >
                        View complete history
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </>
            ) : (
                <div className="mt-6 flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
                        <Sparkles className="h-7 w-7 text-violet-700" />
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-950">
                        No interviews yet
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Complete your first mock interview to
                        see recent performance here.
                    </p>

                    <Link
                        href="/coding-interview"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                    >
                        Start an interview
                        <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>
            )}
        </aside>
    );
}