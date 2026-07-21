"use client";

import { useState } from "react";
import type {
    Dispatch,
    ReactNode,
    SetStateAction,
} from "react";

import type { LucideIcon } from "lucide-react";

import {
    BrainCircuit,
    Building2,
    CalendarDays,
    Check,
    ChevronDown,
    Circle,
    CircleCheckBig,
    FileText,
    Sparkles,
    Target,
    TrendingUp,
    Trophy,
} from "lucide-react";

import type { CareerCoachReport } from "./types";

type AICoachProps = {
    report: CareerCoachReport | null;
    loading: boolean;
};

type SectionHeaderProps = {
    icon: LucideIcon;
    title: string;
    description: string;
    iconClassName: string;
};

type ParsedContent = {
    title: string;
    description: string;
};

function clampPercentage(value: number) {
    return Math.min(100, Math.max(0, value));
}

function splitContent(value: string): ParsedContent {
    const cleanedValue = value
        .replace(/^[-•]\s*/, "")
        .trim();

    const separatorIndex = cleanedValue.indexOf(":");

    if (separatorIndex === -1) {
        return {
            title: cleanedValue,
            description: "",
        };
    }

    return {
        title: cleanedValue
            .slice(0, separatorIndex)
            .trim(),
        description: cleanedValue
            .slice(separatorIndex + 1)
            .trim(),
    };
}

function extractDuration(value: string) {
    const match = value.match(/\(([^)]*hrs?[^)]*)\)/i);

    return match?.[1] ?? null;
}

function removeDuration(value: string) {
    return value
        .replace(/\s*\([^)]*hrs?[^)]*\)/i, "")
        .trim();
}

export default function AICoach({
    report,
    loading,
}: AICoachProps) {
    const [completedTasks, setCompletedTasks] =
        useState<number[]>([]);

    const [summaryExpanded, setSummaryExpanded] =
        useState(false);

    const [expandedStrengths, setExpandedStrengths] =
        useState<number[]>([]);

    const [
        expandedFocusAreas,
        setExpandedFocusAreas,
    ] = useState<number[]>([]);

    const [expandedTasks, setExpandedTasks] =
        useState<number[]>([]);

    const toggleTask = (index: number) => {
        setCompletedTasks((current) =>
            current.includes(index)
                ? current.filter(
                    (item) => item !== index
                )
                : [...current, index]
        );
    };

    const toggleExpandedItem = (
        index: number,
        setItems: Dispatch<
            SetStateAction<number[]>
        >
    ) => {
        setItems((current) =>
            current.includes(index)
                ? current.filter(
                    (item) => item !== index
                )
                : [...current, index]
        );
    };

    if (loading) {
        return <CoachSkeleton />;
    }

    if (!report) {
        return <CoachEmptyState />;
    }

    const readiness = clampPercentage(
        Number(report.career_readiness) || 0
    );

    const visibleWeeklyTasks =
        report.weekly_plan?.slice(0, 4) ?? [];

    const completedCount =
        visibleWeeklyTasks.filter((_, index) =>
            completedTasks.includes(index)
        ).length;

    const readinessStatus =
        readiness >= 80
            ? "Interview ready"
            : readiness >= 60
                ? "Developing"
                : "Building foundations";

    return (
        <div className="space-y-5">
            {/* Report heading */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-violet-700">
                        <Sparkles className="h-4 w-4" />

                        Personalized Report
                    </div>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                        Your coaching overview
                    </h2>

                    <p className="mt-2 max-w-2xl text-slate-500">
                        A personalized view of your
                        readiness, strongest qualities,
                        priority improvements, and
                        target-company preparation.
                    </p>
                </div>

                {report.created_at && (
                    <div className="self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-500 shadow-sm sm:self-auto">
                        <span className="font-medium text-slate-700">
                            Updated
                        </span>

                        {" · "}

                        {new Date(
                            report.created_at
                        ).toLocaleString()}
                    </div>
                )}
            </div>

            {/* Readiness and summary */}

            <div className="grid items-start gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                <section className="relative self-start overflow-hidden rounded-[2rem] border border-violet-200 bg-gradient-to-br from-white to-violet-50/70 p-6 shadow-sm sm:p-7">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-200/50 blur-3xl" />

                    <div className="relative">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                                    <TrendingUp className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="font-bold text-slate-950">
                                        Career readiness
                                    </p>

                                    <p className="mt-0.5 text-sm text-slate-500">
                                        Overall preparation
                                        score
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-violet-100 bg-white/80 px-4 py-2.5 text-right shadow-sm">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-violet-500">
                                    Target
                                </p>

                                <p className="mt-0.5 text-lg font-bold text-violet-700">
                                    90%
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex items-end gap-2">
                            <span className="text-6xl font-bold tracking-tight text-slate-950">
                                {readiness}
                            </span>

                            <span className="mb-2 text-2xl font-bold text-violet-600">
                                %
                            </span>
                        </div>

                        <div className="mt-2 inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                            {readinessStatus}
                        </div>

                        <div className="mt-6">
                            <div className="h-3 overflow-hidden rounded-full bg-white">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-700"
                                    style={{
                                        width: `${readiness}%`,
                                    }}
                                />
                            </div>

                            <div className="mt-3 flex items-center justify-between text-xs font-medium text-slate-400">
                                <span>
                                    Getting started
                                </span>

                                <span>
                                    Interview ready
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="self-start rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">
                            <Sparkles className="h-5 w-5" />
                        </div>

                        <div>
                            <h3 className="font-bold text-slate-950">
                                Coach summary
                            </h3>

                            <p className="mt-0.5 text-sm text-slate-500">
                                Your current preparation
                                snapshot
                            </p>
                        </div>
                    </div>

                    <div className="mt-5">
                        <p
                            className={`
                                leading-7 text-slate-600
                                ${summaryExpanded
                                    ? ""
                                    : "line-clamp-4"
                                }
                            `}
                        >
                            {report.summary}
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                setSummaryExpanded(
                                    (current) =>
                                        !current
                                )
                            }
                            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-700 transition hover:text-violet-900"
                        >
                            {summaryExpanded
                                ? "Show less"
                                : "Read full analysis"}

                            <ChevronDown
                                className={`
                                    h-4 w-4
                                    transition-transform
                                    ${summaryExpanded
                                        ? "rotate-180"
                                        : ""
                                    }
                                `}
                            />
                        </button>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-emerald-50 p-4">
                            <p className="text-2xl font-bold text-emerald-700">
                                {report.strengths
                                    ?.length ?? 0}
                            </p>

                            <p className="mt-1 text-sm font-medium text-emerald-700/80">
                                Strengths identified
                            </p>
                        </div>

                        <div className="rounded-2xl bg-amber-50 p-4">
                            <p className="text-2xl font-bold text-amber-700">
                                {report.focus_areas
                                    ?.length ?? 0}
                            </p>

                            <p className="mt-1 text-sm font-medium text-amber-700/80">
                                Focus areas
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Strengths and focus areas */}

            <div className="grid items-start gap-5 lg:grid-cols-2">
                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                    <SectionHeader
                        icon={Trophy}
                        title="Top strengths"
                        description="Your highest-impact capabilities"
                        iconClassName="bg-emerald-50 text-emerald-700"
                    />

                    <div className="mt-5 space-y-3">
                        {report.strengths
                            ?.slice(0, 2)
                            .map((item, index) => {
                                const expanded =
                                    expandedStrengths.includes(
                                        index
                                    );

                                const parsed =
                                    splitContent(item);

                                return (
                                    <article
                                        key={`${item}-${index}`}
                                        className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                                <CircleCheckBig className="h-4 w-4" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-start justify-between gap-2">
                                                    <h4 className="font-semibold leading-6 text-slate-800">
                                                        {
                                                            parsed.title
                                                        }
                                                    </h4>

                                                    <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                                                        {index ===
                                                            0
                                                            ? "Excellent"
                                                            : "Strong"}
                                                    </span>
                                                </div>

                                                {parsed.description && (
                                                    <p
                                                        className={`
                                                            mt-1.5
                                                            text-sm
                                                            leading-6
                                                            text-slate-600
                                                            ${expanded
                                                                ? ""
                                                                : "line-clamp-2"
                                                            }
                                                        `}
                                                    >
                                                        {
                                                            parsed.description
                                                        }
                                                    </p>
                                                )}

                                                {parsed.description && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            toggleExpandedItem(
                                                                index,
                                                                setExpandedStrengths
                                                            )
                                                        }
                                                        className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900"
                                                    >
                                                        {expanded
                                                            ? "Show less"
                                                            : "View details"}

                                                        <ChevronDown
                                                            className={`
                                                                h-3.5
                                                                w-3.5
                                                                transition-transform
                                                                ${expanded
                                                                    ? "rotate-180"
                                                                    : ""
                                                                }
                                                            `}
                                                        />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}

                        {!report.strengths?.length && (
                            <SmallEmptyMessage>
                                Complete more assessments
                                to identify your strongest
                                capabilities.
                            </SmallEmptyMessage>
                        )}
                    </div>
                </section>

                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                    <SectionHeader
                        icon={Target}
                        title="Priority focus areas"
                        description="Your most valuable improvement opportunities"
                        iconClassName="bg-amber-50 text-amber-700"
                    />

                    <div className="mt-5 space-y-3">
                        {report.focus_areas
                            ?.slice(0, 2)
                            .map((item, index) => {
                                const expanded =
                                    expandedFocusAreas.includes(
                                        index
                                    );

                                const parsed =
                                    splitContent(item);

                                return (
                                    <article
                                        key={`${item}-${index}`}
                                        className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition hover:border-violet-200 hover:bg-violet-50/40"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-sm font-bold text-amber-700">
                                                {String(
                                                    index + 1
                                                ).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h4 className="font-semibold leading-6 text-slate-800">
                                                    {
                                                        parsed.title
                                                    }
                                                </h4>

                                                {parsed.description && (
                                                    <p
                                                        className={`
                                                            mt-1.5
                                                            text-sm
                                                            leading-6
                                                            text-slate-600
                                                            ${expanded
                                                                ? ""
                                                                : "line-clamp-2"
                                                            }
                                                        `}
                                                    >
                                                        {
                                                            parsed.description
                                                        }
                                                    </p>
                                                )}

                                                {parsed.description && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            toggleExpandedItem(
                                                                index,
                                                                setExpandedFocusAreas
                                                            )
                                                        }
                                                        className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-amber-700 transition hover:text-amber-900"
                                                    >
                                                        {expanded
                                                            ? "Show less"
                                                            : "View recommendation"}

                                                        <ChevronDown
                                                            className={`
                                                                h-3.5
                                                                w-3.5
                                                                transition-transform
                                                                ${expanded
                                                                    ? "rotate-180"
                                                                    : ""
                                                                }
                                                            `}
                                                        />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}

                        {!report.focus_areas?.length && (
                            <SmallEmptyMessage>
                                No focus areas are
                                currently available.
                            </SmallEmptyMessage>
                        )}
                    </div>
                </section>
            </div>

            {/* Compact weekly plan */}

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <SectionHeader
                        icon={CalendarDays}
                        title="Weekly action plan"
                        description="Your highest-priority preparation tasks"
                        iconClassName="bg-violet-50 text-violet-700"
                    />

                    {visibleWeeklyTasks.length >
                        0 && (
                            <div className="self-start rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 sm:self-auto">
                                {completedCount} of{" "}
                                {
                                    visibleWeeklyTasks.length
                                }{" "}
                                complete
                            </div>
                        )}
                </div>

                <div className="mt-5 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
                    {visibleWeeklyTasks.map(
                        (item, index) => {
                            const completed =
                                completedTasks.includes(
                                    index
                                );

                            const expanded =
                                expandedTasks.includes(
                                    index
                                );

                            const parsed =
                                splitContent(item);

                            const duration =
                                extractDuration(
                                    parsed.title
                                );

                            const taskTitle =
                                removeDuration(
                                    parsed.title
                                );

                            return (
                                <article
                                    key={`${item}-${index}`}
                                    className={`
                                        transition-colors
                                        ${completed
                                            ? "bg-emerald-50/70"
                                            : "bg-white hover:bg-slate-50/70"
                                        }
                                    `}
                                >
                                    <div className="flex items-start gap-4 p-4 sm:p-5">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleTask(
                                                    index
                                                )
                                            }
                                            aria-label={
                                                completed
                                                    ? `Mark ${taskTitle} incomplete`
                                                    : `Mark ${taskTitle} complete`
                                            }
                                            className={`
                                                mt-0.5
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                transition
                                                ${completed
                                                    ? "bg-emerald-600 text-white"
                                                    : "bg-violet-100 text-violet-700 hover:bg-violet-600 hover:text-white"
                                                }
                                            `}
                                        >
                                            {completed ? (
                                                <Check className="h-5 w-5" />
                                            ) : (
                                                <Circle className="h-5 w-5" />
                                            )}
                                        </button>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-start justify-between gap-2">
                                                <h4
                                                    className={`
                                                        font-semibold
                                                        leading-6
                                                        ${completed
                                                            ? "text-emerald-800 line-through"
                                                            : "text-slate-850"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        taskTitle
                                                    }
                                                </h4>

                                                {duration && (
                                                    <span className="shrink-0 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-700">
                                                        {
                                                            duration
                                                        }
                                                    </span>
                                                )}
                                            </div>

                                            {parsed.description && (
                                                <p
                                                    className={`
                                                        mt-1.5
                                                        text-sm
                                                        leading-6
                                                        ${completed
                                                            ? "text-emerald-700"
                                                            : "text-slate-500"
                                                        }
                                                        ${expanded
                                                            ? ""
                                                            : "line-clamp-1"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        parsed.description
                                                    }
                                                </p>
                                            )}

                                            <div className="mt-2 flex flex-wrap items-center gap-4">
                                                {parsed.description && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            toggleExpandedItem(
                                                                index,
                                                                setExpandedTasks
                                                            )
                                                        }
                                                        className="inline-flex items-center gap-1 text-sm font-semibold text-violet-700 transition hover:text-violet-900"
                                                    >
                                                        {expanded
                                                            ? "Hide details"
                                                            : "View details"}

                                                        <ChevronDown
                                                            className={`
                                                                h-3.5
                                                                w-3.5
                                                                transition-transform
                                                                ${expanded
                                                                    ? "rotate-180"
                                                                    : ""
                                                                }
                                                            `}
                                                        />
                                                    </button>
                                                )}

                                                <span
                                                    className={`
                                                        text-xs
                                                        font-medium
                                                        ${completed
                                                            ? "text-emerald-600"
                                                            : "text-slate-400"
                                                        }
                                                    `}
                                                >
                                                    {completed
                                                        ? "Completed"
                                                        : "Not completed"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        }
                    )}

                    {!visibleWeeklyTasks.length && (
                        <div className="p-4">
                            <SmallEmptyMessage>
                                Your weekly plan will
                                appear after additional
                                coaching data is
                                available.
                            </SmallEmptyMessage>
                        </div>
                    )}
                </div>
            </section>

            {/* Company readiness */}

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <SectionHeader
                    icon={Building2}
                    title="Company readiness"
                    description="Your preparation level for selected companies and roles"
                    iconClassName="bg-indigo-50 text-indigo-700"
                />

                <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {report.target_roles?.map(
                        (item, index) => {
                            const companyReadiness =
                                clampPercentage(
                                    Number(
                                        item.readiness
                                    ) || 0
                                );

                            const status =
                                companyReadiness >= 80
                                    ? "Strong"
                                    : companyReadiness >=
                                        60
                                        ? "Developing"
                                        : "Needs focus";

                            return (
                                <article
                                    key={`${item.company}-${item.role}-${index}`}
                                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition hover:-translate-y-0.5 hover:border-violet-200 hover:bg-white hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 text-sm font-bold text-violet-700">
                                                {item.company
                                                    ?.charAt(
                                                        0
                                                    )
                                                    .toUpperCase() ||
                                                    "C"}
                                            </div>

                                            <div className="min-w-0">
                                                <p className="truncate font-bold text-slate-900">
                                                    {
                                                        item.company
                                                    }
                                                </p>

                                                <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">
                                                    {
                                                        item.role
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div className="shrink-0 rounded-xl bg-violet-100 px-2.5 py-1.5 text-sm font-bold text-violet-700">
                                            {
                                                companyReadiness
                                            }
                                            %
                                        </div>
                                    </div>

                                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500"
                                            style={{
                                                width: `${companyReadiness}%`,
                                            }}
                                        />
                                    </div>

                                    <div className="mt-2.5 flex items-center justify-between text-xs font-medium text-slate-400">
                                        <span>
                                            Current readiness
                                        </span>

                                        <span>
                                            {status}
                                        </span>
                                    </div>
                                </article>
                            );
                        }
                    )}

                    {!report.target_roles
                        ?.length && (
                            <div className="md:col-span-2 xl:col-span-3">
                                <SmallEmptyMessage>
                                    Add target roles to see
                                    personalized company
                                    readiness estimates.
                                </SmallEmptyMessage>
                            </div>
                        )}
                </div>
            </section>
        </div>
    );
}

function SectionHeader({
    icon: Icon,
    title,
    description,
    iconClassName,
}: SectionHeaderProps) {
    return (
        <div className="flex items-start gap-3">
            <div
                className={`
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    ${iconClassName}
                `}
            >
                <Icon className="h-5 w-5" />
            </div>

            <div>
                <h3 className="text-lg font-bold text-slate-950">
                    {title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                    {description}
                </p>
            </div>
        </div>
    );
}

function SmallEmptyMessage({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm leading-6 text-slate-500">
            {children}
        </div>
    );
}

function CoachSkeleton() {
    return (
        <div className="animate-pulse space-y-5">
            <div>
                <div className="h-5 w-36 rounded-full bg-slate-200" />

                <div className="mt-4 h-8 w-72 rounded-lg bg-slate-200" />

                <div className="mt-3 h-4 w-full max-w-xl rounded bg-slate-100" />
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
                <div className="h-64 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
                    <div className="h-11 w-11 rounded-2xl bg-slate-100" />

                    <div className="mt-7 h-14 w-32 rounded-lg bg-slate-100" />

                    <div className="mt-7 h-3 w-full rounded-full bg-slate-100" />
                </div>

                <div className="h-64 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
                    <div className="h-11 w-11 rounded-2xl bg-slate-100" />

                    <div className="mt-6 space-y-3">
                        <div className="h-4 w-full rounded bg-slate-100" />

                        <div className="h-4 w-full rounded bg-slate-100" />

                        <div className="h-4 w-3/4 rounded bg-slate-100" />
                    </div>
                </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
                <div className="h-64 rounded-[2rem] border border-slate-200 bg-white shadow-sm" />

                <div className="h-64 rounded-[2rem] border border-slate-200 bg-white shadow-sm" />
            </div>
        </div>
    );
}

function CoachEmptyState() {
    const steps = [
        {
            icon: FileText,
            title: "Upload resume",
        },
        {
            icon: BrainCircuit,
            title: "Complete interview",
        },
        {
            icon: Sparkles,
            title: "Generate coaching",
        },
    ];

    return (
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="px-6 py-14 text-center sm:px-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
                    <Sparkles className="h-8 w-8 text-violet-700" />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-slate-950">
                    Your coaching report is not ready
                    yet
                </h2>

                <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-500">
                    Upload a resume or complete an
                    interview to generate personalized
                    career guidance, preparation
                    priorities, and a weekly action plan.
                </p>

                <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
                    {steps.map(
                        (
                            {
                                icon: Icon,
                                title,
                            },
                            index
                        ) => (
                            <div
                                key={title}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                            >
                                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                                    <Icon className="h-5 w-5" />
                                </div>

                                <p className="mt-3 text-sm font-semibold text-slate-700">
                                    {index + 1}.{" "}
                                    {title}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}