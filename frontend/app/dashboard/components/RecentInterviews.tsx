import {
    CheckCircle2,
    Code2,
    MessageSquareText,
} from "lucide-react";

import type {
    DashboardActivity,
} from "./types";

type RecentInterviewsProps = {
    activity: DashboardActivity[];
};

function getStatusStyle(
    status?: string
) {
    if (status === "completed") {
        return "bg-emerald-50 text-emerald-700";
    }

    if (status === "in_progress") {
        return "bg-amber-50 text-amber-700";
    }

    return "bg-slate-100 text-slate-600";
}

export default function RecentInterviews({
    activity,
}: RecentInterviewsProps) {
    return (
        <section
            className="
                h-full
                min-h-0
                overflow-hidden
                rounded-3xl
                border
                border-slate-100
                bg-white
                p-4
                shadow-sm
                flex
                flex-col
            "
        >
            <div>
                <h2 className="text-2xl font-bold text-slate-950">
                    Recent Activity
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Your latest coding and behavioral sessions.
                </p>
            </div>

            {activity.length === 0 ? (
                <div
                    className="
                        mt-4
                        flex
                        min-h-[280px]
                        items-center
                        justify-center
                        rounded-2xl
                        bg-slate-50
                        p-3
                        text-center
                    "
                >
                    <div>
                        <p className="font-semibold text-slate-700">
                            No recent activity
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                            Complete an interview to see it here.
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <div
                        className="
                            mt-4
                            space-y-3
                            flex-1
                            min-h-0
                            overflow-y-auto
                            pr-1
                        "
                    >
                        {activity
                            .slice(0, 4)
                            .map(
                                (
                                    item,
                                    index
                                ) => {
                                    const isCoding =
                                        item.type ===
                                        "coding";

                                    return (
                                        <div
                                            key={`${item.created_at}-${index}`}
                                            className="
                                                flex
                                                items-center
                                                justify-between
                                                gap-4
                                                rounded-2xl
                                                border
                                                border-slate-100
                                                p-3
                                                transition
                                                hover:border-violet-100
                                                hover:bg-violet-50/40
                                            "
                                        >
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div
                                                    className={`
                                                        flex
                                                        h-10
                                                        w-10
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-xl
                                                        ${isCoding
                                                            ? "bg-violet-100 text-violet-700"
                                                            : "bg-emerald-100 text-emerald-700"
                                                        }
                                                    `}
                                                >
                                                    {isCoding ? (
                                                        <Code2
                                                            size={
                                                                18
                                                            }
                                                        />
                                                    ) : (
                                                        <MessageSquareText
                                                            size={
                                                                18
                                                            }
                                                        />
                                                    )}
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="truncate font-semibold text-slate-900">
                                                        {item.role ||
                                                            "Interview Session"}
                                                    </p>

                                                    <p className="mt-0.5 truncate text-sm text-slate-500">
                                                        {isCoding
                                                            ? `Coding • ${item.level ||
                                                            "Practice"
                                                            }`
                                                            : `Behavioral • ${item.level ||
                                                            "Practice"
                                                            }`}
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {item.created_at
                                                            ? new Date(
                                                                item.created_at
                                                            ).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    year: "numeric",
                                                                }
                                                            )
                                                            : "Recently"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="shrink-0 text-right">
                                                <span
                                                    className={`
                                                        inline-flex
                                                        rounded-full
                                                        px-2.5
                                                        py-1
                                                        text-xs
                                                        font-semibold
                                                        ${getStatusStyle(
                                                        item.status
                                                    )}
                                                    `}
                                                >
                                                    {item.status ||
                                                        "practice"}
                                                </span>

                                                {item.status ===
                                                    "completed" && (
                                                        <div className="mt-2 flex items-center justify-end gap-1 text-xs font-medium text-emerald-600">
                                                            <CheckCircle2
                                                                size={
                                                                    13
                                                                }
                                                            />
                                                            Finished
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                    </div>

                    <a
                        href="/history"
                        className="
                            mt-3
                            shrink-0
                            block
                            rounded-2xl
                            bg-violet-50
                            px-4
                            py-2.5
                            text-center
                            text-sm
                            font-semibold
                            text-violet-700
                            transition
                            hover:bg-violet-100
                        "
                    >
                        View all activity
                    </a>
                </>
            )}
        </section>
    );
}