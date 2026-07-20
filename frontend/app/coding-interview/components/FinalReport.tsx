"use client";

import { useMemo, useState } from "react";

import {
    ArrowRight,
    Award,
    BarChart3,
    Brain,
    CheckCircle2,
    ChevronRight,
    Code2,
    RotateCcw,
    Star,
} from "lucide-react";

import type {
    CodingInterviewReport,
} from "../types";

type FinalReportProps = {
    report: CodingInterviewReport;
    role: string;
    language: string;
    onRestart: () => void;
};

function getPerformanceLabel(score: number) {
    if (score >= 8.5) return "Excellent";
    if (score >= 7) return "Strong";
    if (score >= 5) return "Good";
    return "Needs Practice";
}

function getPerformanceColor(score: number) {
    if (score >= 8.5)
        return "bg-emerald-100 text-emerald-700";

    if (score >= 7)
        return "bg-blue-100 text-blue-700";

    if (score >= 5)
        return "bg-amber-100 text-amber-700";

    return "bg-red-100 text-red-700";
}

function getScorePercentage(
    score: number,
    maxScore: number
) {
    return Math.min(
        100,
        Math.round((score / maxScore) * 100)
    );
}

export default function FinalReport({
    report,
    role,
    language,
    onRestart,
}: FinalReportProps) {
    const averageScore = Number(
        report.average_score || 0
    );

    const totalScore = Number(
        report.total_score || 0
    );

    const totalPercentage =
        getScorePercentage(
            totalScore,
            40
        );

    const performanceLabel =
        getPerformanceLabel(
            averageScore
        );

    const performanceColor =
        getPerformanceColor(
            averageScore
        );

    const questions =
        report.questions ?? [];

    const [selectedQuestion, setSelectedQuestion] =
        useState(0);

    const currentQuestion =
        useMemo(
            () =>
                questions[
                Math.min(
                    selectedQuestion,
                    Math.max(
                        0,
                        questions.length - 1
                    )
                )
                ],
            [questions, selectedQuestion]
        );

    return (
        <div className="mx-auto max-w-7xl space-y-8">

            {/* HERO */}

            <section className="rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 text-white shadow-xl">

                <div className="p-10">

                    <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

                        <div className="max-w-2xl">

                            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">

                                <Award className="h-4 w-4" />

                                Coding Interview Complete

                            </div>

                            <h1 className="mt-6 text-5xl font-bold tracking-tight">

                                {role} Interview Report

                            </h1>

                            <p className="mt-4 max-w-xl text-lg text-violet-100">

                                Your interview has been
                                evaluated across
                                correctness,
                                problem-solving,
                                implementation quality,
                                and overall coding
                                ability.

                            </p>

                        </div>

                        <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">

                            <div className="text-sm uppercase tracking-[0.25em] text-violet-200">

                                Overall Score

                            </div>

                            <div className="mt-3 text-7xl font-bold">

                                {totalPercentage}%

                            </div>

                            <div
                                className={`mt-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${performanceColor}`}
                            >

                                {performanceLabel}

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* SUMMARY */}

            <section className="grid gap-5 md:grid-cols-4">

                <MetricCard
                    icon={<BarChart3 className="h-5 w-5" />}
                    label="Overall Score"
                    value={`${totalScore}/40`}
                />

                <MetricCard
                    icon={<Star className="h-5 w-5" />}
                    label="Average"
                    value={`${averageScore}/10`}
                />

                <MetricCard
                    icon={<Code2 className="h-5 w-5" />}
                    label="Language"
                    value={language}
                />

                <MetricCard
                    icon={<Brain className="h-5 w-5" />}
                    label="Questions"
                    value={String(questions.length)}
                />

            </section>

            {/* QUESTION SELECTOR */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-bold text-slate-900">

                            Question Review

                        </h2>

                        <p className="mt-1 text-sm text-slate-500">

                            Select a question to
                            review your performance.

                        </p>

                    </div>

                </div>

                <div className="mt-6 flex flex-wrap gap-3">

                    {questions.map(
                        (
                            question,
                            index
                        ) => {

                            const score =
                                Number(
                                    question.score ||
                                    0
                                );

                            const active =
                                selectedQuestion ===
                                index;

                            return (

                                <button
                                    key={index}
                                    type="button"
                                    onClick={() =>
                                        setSelectedQuestion(
                                            index
                                        )
                                    }
                                    className={`rounded-xl border px-5 py-3 text-left transition-all ${active
                                        ? "border-violet-600 bg-violet-600 text-white shadow-lg"
                                        : "border-slate-200 bg-white hover:border-violet-300 hover:bg-violet-50"
                                        }`}
                                >

                                    <div className="text-xs font-semibold uppercase tracking-wide opacity-80">

                                        Question {question.number}

                                    </div>

                                    <div className="mt-2 text-2xl font-bold">

                                        {score}/10

                                    </div>

                                </button>

                            );

                        }
                    )}

                </div>

            </section>
            {/* SELECTED QUESTION DETAILS */}

            {currentQuestion ? (
                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-200 px-6 py-5 sm:px-8">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div>

                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                                    Question {currentQuestion.number}
                                </p>

                                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                                    Coding Challenge Review
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Review your score and the overall evaluation
                                    for this coding problem.
                                </p>

                            </div>

                            <QuestionScore
                                score={Number(
                                    currentQuestion.score || 0
                                )}
                            />

                        </div>

                    </div>

                    <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_280px]">

                        <div className="space-y-6">

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                                        <Code2 className="h-5 w-5" />
                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-slate-950">
                                            Performance Evaluation
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Evaluation for the selected coding
                                            challenge.
                                        </p>

                                    </div>

                                </div>

                                <div className="mt-6">

                                    <ScoreProgress
                                        score={Number(
                                            currentQuestion.score || 0
                                        )}
                                    />

                                </div>

                            </div>

                            <QuestionFeedback
                                question={currentQuestion}
                            />

                        </div>

                        <aside className="space-y-4">

                            <MiniMetric
                                label="Question"
                                value={`Q${currentQuestion.number}`}
                            />

                            <MiniMetric
                                label="Score"
                                value={`${Number(
                                    currentQuestion.score || 0
                                )}/10`}
                            />

                            <MiniMetric
                                label="Rating"
                                value={getPerformanceLabel(
                                    Number(
                                        currentQuestion.score || 0
                                    )
                                )}
                            />

                            <MiniMetric
                                label="Language"
                                value={language}
                            />

                        </aside>

                    </div>

                </section>
            ) : (
                <section className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">

                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                        <Code2 className="h-6 w-6" />
                    </div>

                    <h2 className="mt-4 text-lg font-semibold text-slate-900">
                        No question evaluations available
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        This report does not contain individual question
                        results.
                    </p>

                </section>
            )}

            {/* STRENGTHS AND IMPROVEMENTS */}

            <section className="grid gap-6 lg:grid-cols-2">

                <FeedbackCard
                    title="Key Strengths"
                    description="What you demonstrated well during the interview."
                    icon={
                        <CheckCircle2 className="h-5 w-5" />
                    }
                    items={report.strengths ?? []}
                    variant="strength"
                    emptyMessage="No specific strengths were recorded."
                />

                <FeedbackCard
                    title="Areas to Improve"
                    description="Skills and techniques to focus on next."
                    icon={
                        <ArrowRight className="h-5 w-5" />
                    }
                    items={report.improvements ?? []}
                    variant="improvement"
                    emptyMessage="No specific improvements were recorded."
                />

            </section>

            {/* OVERALL SUMMARY */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                        <Brain className="h-5 w-5" />
                    </div>

                    <div>

                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                            AI Evaluation
                        </p>

                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                            Overall Interview Summary
                        </h2>

                    </div>

                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">

                    <p className="whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                        {report.summary ||
                            "No overall interview summary is available."}
                    </p>

                </div>

            </section>

            {/* ACTIONS */}

            <section className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">

                <button
                    type="button"
                    onClick={() => {
                        window.location.href = "/dashboard";
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                    Back to Dashboard
                </button>

                <button
                    type="button"
                    onClick={onRestart}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
                >
                    <RotateCcw className="h-4 w-4" />

                    Start New Coding Interview
                </button>

            </section>

        </div>
    );
}

type MetricCardProps = {
    icon: React.ReactNode;
    label: string;
    value: string;
};

function MetricCard({
    icon,
    label,
    value,
}: MetricCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-center gap-3 text-violet-600">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                    {icon}
                </div>

                <span className="text-sm font-medium text-slate-500">
                    {label}
                </span>

            </div>

            <div className="mt-5 truncate text-2xl font-bold tracking-tight text-slate-950">
                {value}
            </div>

        </div>
    );
}

type QuestionScoreProps = {
    score: number;
};

function QuestionScore({
    score,
}: QuestionScoreProps) {
    const label =
        getPerformanceLabel(score);

    const color =
        getPerformanceColor(score);

    return (
        <div className="flex items-center gap-3">

            <div className="text-right">

                <div className="text-3xl font-bold text-slate-950">
                    {score}
                    <span className="text-base font-semibold text-slate-400">
                        /10
                    </span>
                </div>

                <div
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${color}`}
                >
                    {label}
                </div>

            </div>

        </div>
    );
}

type ScoreProgressProps = {
    score: number;
};

function ScoreProgress({
    score,
}: ScoreProgressProps) {
    const percentage =
        getScorePercentage(score, 10);

    return (
        <div>

            <div className="flex items-center justify-between text-sm">

                <span className="font-medium text-slate-600">
                    Question score
                </span>

                <span className="font-semibold text-slate-900">
                    {percentage}%
                </span>

            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">

                <div
                    className="h-full rounded-full bg-violet-600 transition-all duration-500"
                    style={{
                        width: `${percentage}%`,
                    }}
                />

            </div>

            <div className="mt-3 flex justify-between text-xs text-slate-400">

                <span>Needs work</span>

                <span>Excellent</span>

            </div>

        </div>
    );
}

type QuestionFeedbackProps = {
    question: NonNullable<
        CodingInterviewReport["questions"]
    >[number];
};

function QuestionFeedback({
    question,
}: QuestionFeedbackProps) {
    const data =
        question as unknown as Record<
            string,
            unknown
        >;

    const feedback =
        getStringValue(
            data,
            [
                "feedback",
                "evaluation",
                "summary",
                "ai_feedback",
                "review",
            ]
        );

    const strengths =
        getStringArray(
            data,
            [
                "strengths",
                "positive_feedback",
            ]
        );

    const improvements =
        getStringArray(
            data,
            [
                "improvements",
                "suggestions",
                "areas_to_improve",
            ]
        );

    const timeComplexity =
        getStringValue(
            data,
            [
                "time_complexity",
                "timeComplexity",
            ]
        );

    const spaceComplexity =
        getStringValue(
            data,
            [
                "space_complexity",
                "spaceComplexity",
            ]
        );

    const hasDetails =
        Boolean(feedback) ||
        strengths.length > 0 ||
        improvements.length > 0 ||
        Boolean(timeComplexity) ||
        Boolean(spaceComplexity);

    if (!hasDetails) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-6">

                <h3 className="font-semibold text-slate-950">
                    Question Feedback
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                    No detailed feedback was provided for this question.
                    The score above reflects the final evaluation.
                </p>

            </div>
        );
    }

    return (
        <div className="space-y-6">

            {feedback && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6">

                    <h3 className="font-semibold text-slate-950">
                        Code Review
                    </h3>

                    <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                        {feedback}
                    </p>

                </div>
            )}

            {(timeComplexity ||
                spaceComplexity) && (
                    <div className="grid gap-4 sm:grid-cols-2">

                        <ComplexityCard
                            label="Time Complexity"
                            value={
                                timeComplexity ||
                                "Not provided"
                            }
                        />

                        <ComplexityCard
                            label="Space Complexity"
                            value={
                                spaceComplexity ||
                                "Not provided"
                            }
                        />

                    </div>
                )}

            {strengths.length > 0 && (
                <CompactList
                    title="What Went Well"
                    items={strengths}
                    variant="strength"
                />
            )}

            {improvements.length > 0 && (
                <CompactList
                    title="Suggested Improvements"
                    items={improvements}
                    variant="improvement"
                />
            )}

        </div>
    );
}

type ComplexityCardProps = {
    label: string;
    value: string;
};

function ComplexityCard({
    label,
    value,
}: ComplexityCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">

            <div className="text-sm font-medium text-slate-500">
                {label}
            </div>

            <div className="mt-3 font-mono text-xl font-bold text-slate-950">
                {value}
            </div>

        </div>
    );
}

type MiniMetricProps = {
    label: string;
    value: string;
};

function MiniMetric({
    label,
    value,
}: MiniMetricProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                {label}
            </div>

            <div className="mt-2 break-words text-lg font-bold text-slate-950">
                {value}
            </div>

        </div>
    );
}

type FeedbackCardProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    items: string[];
    variant:
    | "strength"
    | "improvement";
    emptyMessage: string;
};

function FeedbackCard({
    title,
    description,
    icon,
    items,
    variant,
    emptyMessage,
}: FeedbackCardProps) {
    const isStrength =
        variant === "strength";

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-start gap-4">

                <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${isStrength
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                        }`}
                >
                    {icon}
                </div>

                <div>

                    <h2 className="text-xl font-bold text-slate-950">
                        {title}
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                        {description}
                    </p>

                </div>

            </div>

            {items.length > 0 ? (
                <ul className="mt-6 space-y-3">

                    {items.map(
                        (
                            item,
                            index
                        ) => (
                            <li
                                key={`${item}-${index}`}
                                className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600"
                            >

                                {isStrength ? (
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                                ) : (
                                    <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                                )}

                                <span>{item}</span>

                            </li>
                        )
                    )}

                </ul>
            ) : (
                <p className="mt-6 rounded-xl bg-slate-50 px-4 py-4 text-sm text-slate-500">
                    {emptyMessage}
                </p>
            )}

        </div>
    );
}

type CompactListProps = {
    title: string;
    items: string[];
    variant:
    | "strength"
    | "improvement";
};

function CompactList({
    title,
    items,
    variant,
}: CompactListProps) {
    const isStrength =
        variant === "strength";

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">

            <h3 className="font-semibold text-slate-950">
                {title}
            </h3>

            <ul className="mt-4 space-y-3">

                {items.map(
                    (
                        item,
                        index
                    ) => (
                        <li
                            key={`${item}-${index}`}
                            className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                        >

                            {isStrength ? (
                                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                            ) : (
                                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-amber-600" />
                            )}

                            <span>{item}</span>

                        </li>
                    )
                )}

            </ul>

        </div>
    );
}

function getStringValue(
    data: Record<string, unknown>,
    keys: string[]
) {
    for (const key of keys) {
        const value = data[key];

        if (
            typeof value === "string" &&
            value.trim()
        ) {
            return value;
        }
    }

    return "";
}

function getStringArray(
    data: Record<string, unknown>,
    keys: string[]
) {
    for (const key of keys) {
        const value = data[key];

        if (Array.isArray(value)) {
            return value.filter(
                (
                    item
                ): item is string =>
                    typeof item ===
                    "string" &&
                    Boolean(item.trim())
            );
        }
    }

    return [];
}