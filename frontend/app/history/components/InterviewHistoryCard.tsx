"use client";

import Link from "next/link";
import {
    ArrowRight,
    BriefcaseBusiness,
    CalendarDays,
    Clock3,
    RotateCcw,
} from "lucide-react";

import type { InterviewHistoryItem } from "./types";

type InterviewHistoryCardProps = {
    interview: InterviewHistoryItem;
};

function normalizeStatus(status?: string) {
    return status?.trim().toLowerCase() || "practice";
}

function formatLabel(value?: string) {
    if (!value) {
        return "Practice";
    }

    return value
        .replaceAll("_", " ")
        .replaceAll("-", " ")
        .replace(/\b\w/g, (character) =>
            character.toUpperCase()
        );
}

function getStatusStyle(status?: string) {
    switch (normalizeStatus(status)) {
        case "completed":
            return {
                label: "Completed",
                className:
                    "border-emerald-200 bg-emerald-50 text-emerald-700",
            };

        case "in_progress":
            return {
                label: "In Progress",
                className:
                    "border-amber-200 bg-amber-50 text-amber-700",
            };

        case "pending":
            return {
                label: "Pending",
                className:
                    "border-blue-200 bg-blue-50 text-blue-700",
            };

        case "cancelled":
            return {
                label: "Cancelled",
                className:
                    "border-red-200 bg-red-50 text-red-700",
            };

        default:
            return {
                label: formatLabel(status || "practice"),
                className:
                    "border-slate-200 bg-slate-50 text-slate-600",
            };
    }
}

function formatInterviewDate(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return {
            fullDate: "Date unavailable",
            relativeDate: "",
        };
    }

    const fullDate = new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(date);

    const differenceInMilliseconds =
        date.getTime() - Date.now();

    const differenceInDays = Math.round(
        differenceInMilliseconds /
        (1000 * 60 * 60 * 24)
    );

    const relativeFormatter =
        new Intl.RelativeTimeFormat("en", {
            numeric: "auto",
        });

    let relativeDate: string;

    if (Math.abs(differenceInDays) < 1) {
        const differenceInHours = Math.round(
            differenceInMilliseconds /
            (1000 * 60 * 60)
        );

        if (Math.abs(differenceInHours) < 1) {
            const differenceInMinutes = Math.round(
                differenceInMilliseconds /
                (1000 * 60)
            );

            relativeDate =
                relativeFormatter.format(
                    differenceInMinutes,
                    "minute"
                );
        } else {
            relativeDate =
                relativeFormatter.format(
                    differenceInHours,
                    "hour"
                );
        }
    } else if (Math.abs(differenceInDays) < 30) {
        relativeDate =
            relativeFormatter.format(
                differenceInDays,
                "day"
            );
    } else {
        relativeDate = fullDate;
    }

    return {
        fullDate,
        relativeDate,
    };
}

export default function InterviewHistoryCard({
    interview,
}: InterviewHistoryCardProps) {
    const interviewId =
        interview.interview_id || interview.id;

    const status = getStatusStyle(
        interview.status
    );

    const {
        fullDate,
        relativeDate,
    } = formatInterviewDate(
        interview.created_at
    );

    const level = formatLabel(
        interview.level || "Practice Interview"
    );

    const canViewReport =
        Boolean(interviewId) &&
        normalizeStatus(interview.status) ===
        "completed";

    return (
        <article className="group flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                        <BriefcaseBusiness className="h-5 w-5" />
                    </div>

                    <h2 className="mt-5 truncate text-xl font-bold text-slate-950">
                        {interview.role}
                    </h2>

                    <p className="mt-1 text-sm font-medium text-slate-500">
                        {level}
                    </p>
                </div>

                <span
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.className}`}
                >
                    {status.label}
                </span>
            </div>

            <div className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-4 sm:grid-cols-2">
                <div className="flex items-center gap-2.5 text-sm text-slate-600">
                    <CalendarDays className="h-4 w-4 shrink-0 text-violet-600" />

                    <span>{fullDate}</span>
                </div>

                {relativeDate && (
                    <div className="flex items-center gap-2.5 text-sm text-slate-600">
                        <Clock3 className="h-4 w-4 shrink-0 text-violet-600" />

                        <span>{relativeDate}</span>
                    </div>
                )}
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                {canViewReport ? (
                    <Link
                        href={`/coding-interview/report/${interviewId}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-100"
                    >
                        View Report
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                ) : (
                    <button
                        type="button"
                        disabled
                        className="inline-flex flex-1 cursor-not-allowed items-center justify-center rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-400"
                    >
                        Report unavailable
                    </button>
                )}

                <Link
                    href="/coding-interview"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-100"
                >
                    <RotateCcw className="h-4 w-4" />
                    Practice Again
                </Link>
            </div>
        </article>
    );
}