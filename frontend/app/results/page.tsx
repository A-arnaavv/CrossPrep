"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    BriefcaseBusiness,
    CheckCircle2,
    CircleAlert,
    Gauge,
    LoaderCircle,
    RefreshCw,
    Sparkles,
    Target,
} from "lucide-react";

import { api } from "@/lib/api";

type QuestionResult = {
    question?: string;
    answer: string;
    feedback: string;
    ideal_answer: string;
    score: number;
};

type InterviewResults = {
    role: string;
    level: string;
    questions_answered: number;
    total_questions: number;
    completion_percentage: number;
    average_score: number;
    questions: QuestionResult[];
};

export default function ResultsPage() {
    const router = useRouter();

    const [results, setResults] =
        useState<InterviewResults | null>(null);

    const [selectedQuestionIndex, setSelectedQuestionIndex] =
        useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadResults = async () => {
            try {
                setLoading(true);
                setError("");

                const interviewId = sessionStorage.getItem(
                    "completed_interview_id"
                );

                if (!interviewId) {
                    setError(
                        "We could not find the completed interview."
                    );

                    return;
                }

                const response =
                    await api.get<InterviewResults>(
                        `/api/interviews/${interviewId}/report`
                    );

                setResults(response.data);
                setSelectedQuestionIndex(0);
            } catch (error) {
                console.error(
                    "Failed to load interview results:",
                    error
                );

                setError(
                    "We could not load your interview results. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        void loadResults();
    }, []);

    const handleStartNewInterview = () => {
        sessionStorage.removeItem(
            "completed_interview_id"
        );

        router.push("/interview");
    };

    const handleBackToDashboard = () => {
        sessionStorage.removeItem(
            "completed_interview_id"
        );

        router.push("/dashboard");
    };

    if (loading) {
        return <ResultsLoadingState />;
    }

    if (error || !results) {
        return (
            <ResultsErrorState
                message={
                    error ||
                    "Your interview results are unavailable."
                }
                onDashboard={() =>
                    router.push("/dashboard")
                }
            />
        );
    }

    const status = getInterviewStatus(
        results.average_score
    );

    const selectedQuestion =
        results.questions?.[selectedQuestionIndex];

    return (
        <main className="min-h-dvh bg-[#f8f9ff] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <section
                    className="
                        overflow-hidden rounded-3xl
                        bg-gradient-to-br from-violet-600
                        via-violet-600 to-indigo-700
                        px-6 py-8 text-white shadow-lg
                        shadow-violet-200
                        sm:px-8 lg:px-10
                    "
                >
                    <div
                        className="
                            flex flex-col gap-8
                            lg:flex-row lg:items-center
                            lg:justify-between
                        "
                    >
                        <div className="max-w-2xl">
                            <div
                                className="
                                    inline-flex items-center gap-2
                                    rounded-full bg-white/15
                                    px-3 py-1.5 text-xs
                                    font-semibold backdrop-blur
                                "
                            >
                                <Sparkles className="h-3.5 w-3.5" />
                                Interview complete
                            </div>

                            <h1
                                className="
                                    mt-4 text-3xl font-bold
                                    tracking-tight sm:text-4xl
                                "
                            >
                                Great work completing your
                                interview
                            </h1>

                            <p
                                className="
                                    mt-3 max-w-xl text-sm
                                    leading-6 text-violet-100
                                    sm:text-base
                                "
                            >
                                Review your performance,
                                understand the feedback, and use
                                the suggested answers to improve
                                your next interview.
                            </p>

                            <div
                                className="
                                    mt-5 flex flex-wrap
                                    items-center gap-3
                                    text-sm font-medium
                                    text-violet-100
                                "
                            >
                                <span>{results.role}</span>

                                <span
                                    aria-hidden="true"
                                    className="
                                        h-1 w-1 rounded-full
                                        bg-violet-200
                                    "
                                />

                                <span>{results.level}</span>
                            </div>
                        </div>

                        <div
                            className="
                                w-full rounded-3xl
                                border border-white/20
                                bg-white/10 p-6
                                backdrop-blur-sm
                                lg:w-auto lg:min-w-64
                            "
                        >
                            <p
                                className="
                                    text-sm font-semibold
                                    text-violet-100
                                "
                            >
                                Average score
                            </p>

                            <div className="mt-2 flex items-end gap-1">
                                <span
                                    className="
                                        text-6xl font-bold
                                        tracking-tight
                                    "
                                >
                                    {formatScore(
                                        results.average_score
                                    )}
                                </span>

                                <span
                                    className="
                                        pb-1 text-2xl
                                        font-semibold
                                        text-violet-200
                                    "
                                >
                                    /10
                                </span>
                            </div>

                            <div
                                className="
                                    mt-4 inline-flex
                                    items-center gap-2
                                    rounded-full bg-white/15
                                    px-3 py-1.5 text-sm
                                    font-semibold
                                "
                            >
                                <CheckCircle2 className="h-4 w-4" />
                                {status}
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    className="
                        mt-6 grid gap-4
                        sm:grid-cols-2
                        lg:grid-cols-4
                    "
                >
                    <SummaryCard
                        icon={BriefcaseBusiness}
                        label="Role"
                        value={results.role}
                    />

                    <SummaryCard
                        icon={Gauge}
                        label="Level"
                        value={results.level}
                    />

                    <SummaryCard
                        icon={Target}
                        label="Questions answered"
                        value={`${results.questions_answered} / ${results.total_questions}`}
                    />

                    <SummaryCard
                        icon={CheckCircle2}
                        label="Completion"
                        value={`${formatPercentage(
                            results.completion_percentage
                        )}%`}
                    />
                </section>

                <section className="mt-10">
                    <div>
                        <p
                            className="
                                text-xs font-semibold uppercase
                                tracking-[0.14em]
                                text-violet-600
                            "
                        >
                            Detailed review
                        </p>

                        <h2
                            className="
                                mt-1 text-2xl font-bold
                                tracking-tight text-slate-950
                            "
                        >
                            Question breakdown
                        </h2>

                        <p
                            className="
                                mt-2 text-sm leading-6
                                text-slate-500
                            "
                        >
                            Select a question to review your
                            answer, score, AI feedback, and
                            suggested response.
                        </p>
                    </div>

                    {results.questions?.length > 0 ? (
                        <>
                            <QuestionTabs
                                questions={results.questions}
                                selectedIndex={
                                    selectedQuestionIndex
                                }
                                onSelect={
                                    setSelectedQuestionIndex
                                }
                            />

                            {selectedQuestion && (
                                <QuestionResultCard
                                    item={selectedQuestion}
                                    index={
                                        selectedQuestionIndex
                                    }
                                />
                            )}
                        </>
                    ) : (
                        <div
                            className="
                                mt-6 rounded-2xl
                                border border-slate-200
                                bg-white p-6 text-center
                                shadow-sm
                            "
                        >
                            <p className="text-sm text-slate-500">
                                No question results are
                                available for this interview.
                            </p>
                        </div>
                    )}
                </section>

                <div
                    className="
                        mt-8 flex flex-col-reverse gap-3
                        border-t border-slate-200 pt-6
                        sm:flex-row sm:justify-end
                    "
                >
                    <button
                        type="button"
                        onClick={handleBackToDashboard}
                        className="
                            inline-flex items-center
                            justify-center rounded-xl
                            border border-slate-200 bg-white
                            px-5 py-2.5 text-sm
                            font-semibold text-slate-700
                            shadow-sm transition
                            hover:border-slate-300
                            hover:bg-slate-50
                        "
                    >
                        Back to dashboard
                    </button>

                    <button
                        type="button"
                        onClick={handleStartNewInterview}
                        className="
                            inline-flex items-center
                            justify-center gap-2 rounded-xl
                            bg-violet-600 px-5 py-2.5
                            text-sm font-semibold text-white
                            shadow-sm transition
                            hover:bg-violet-700
                        "
                    >
                        <RefreshCw className="h-4 w-4" />
                        Start new interview
                    </button>
                </div>
            </div>
        </main>
    );
}

type SummaryCardProps = {
    label: string;
    value: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
};

function SummaryCard({
    label,
    value,
    icon: Icon,
}: SummaryCardProps) {
    return (
        <article
            className="
                rounded-2xl border border-slate-200
                bg-white p-5 shadow-sm
            "
        >
            <div
                className="
                    flex h-10 w-10 items-center
                    justify-center rounded-xl
                    bg-violet-100 text-violet-600
                "
            >
                <Icon className="h-5 w-5" />
            </div>

            <p className="mt-4 text-xs font-medium text-slate-500">
                {label}
            </p>

            <p className="mt-1 truncate text-lg font-bold text-slate-900">
                {value}
            </p>
        </article>
    );
}

type QuestionTabsProps = {
    questions: QuestionResult[];
    selectedIndex: number;
    onSelect: (index: number) => void;
};

function QuestionTabs({
    questions,
    selectedIndex,
    onSelect,
}: QuestionTabsProps) {
    return (
        <div
            className="
                mt-6 rounded-2xl
                border border-slate-200
                bg-white p-3 shadow-sm
            "
        >
            <div
                role="tablist"
                aria-label="Interview question results"
                className="
                    flex gap-2 overflow-x-auto
                    pb-1
                "
            >
                {questions.map((question, index) => {
                    const selected =
                        selectedIndex === index;

                    return (
                        <button
                            key={index}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            onClick={() =>
                                onSelect(index)
                            }
                            className={`
                                min-w-[86px] shrink-0
                                rounded-xl border px-3 py-2
                                text-left transition
                                ${selected
                                    ? `
                                            border-violet-600
                                            bg-violet-600
                                            text-white
                                            shadow-sm
                                        `
                                    : `
                                            border-slate-200
                                            bg-white
                                            text-slate-700
                                            hover:border-violet-200
                                            hover:bg-violet-50
                                        `
                                }
                            `}
                        >
                            <span
                                className={`
                                    block text-[10px]
                                    font-semibold uppercase
                                    tracking-wider
                                    ${selected
                                        ? "text-violet-100"
                                        : "text-slate-400"
                                    }
                                `}
                            >
                                Question {index + 1}
                            </span>

                            <span
                                className="
                                    mt-0.5 block text-sm
                                    font-bold
                                "
                            >
                                {formatScore(
                                    question.score
                                )}
                                /10
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

type QuestionResultCardProps = {
    item: QuestionResult;
    index: number;
};

function QuestionResultCard({
    item,
    index,
}: QuestionResultCardProps) {
    const scoreStyle = getScoreStyle(item.score);

    return (
        <article
            role="tabpanel"
            className="
                mt-4 rounded-3xl
                border border-slate-200
                bg-white p-5 shadow-sm
                sm:p-6
            "
        >
            <div
                className="
                    flex items-start justify-between
                    gap-4 border-b
                    border-slate-100 pb-5
                "
            >
                <div className="min-w-0">
                    <p
                        className="
                            text-xs font-semibold uppercase
                            tracking-[0.14em]
                            text-violet-600
                        "
                    >
                        Question {index + 1}
                    </p>

                    <h3
                        className="
                            mt-2 text-lg font-bold
                            leading-7 text-slate-950
                            sm:text-xl
                        "
                    >
                        {item.question ||
                            "Question text unavailable"}
                    </h3>
                </div>

                <div
                    className={`
                        shrink-0 rounded-xl
                        px-3 py-2 text-sm font-bold
                        ${scoreStyle}
                    `}
                >
                    {formatScore(item.score)}/10
                </div>
            </div>

            <div className="mt-5 grid gap-5">
                <ResultSection
                    title="Your answer"
                    content={item.answer}
                />

                <ResultSection
                    title="AI feedback"
                    content={item.feedback}
                    highlighted
                />

                <ResultSection
                    title="Suggested answer"
                    content={item.ideal_answer}
                />
            </div>
        </article>
    );
}

type ResultSectionProps = {
    title: string;
    content: string;
    highlighted?: boolean;
};

function ResultSection({
    title,
    content,
    highlighted = false,
}: ResultSectionProps) {
    return (
        <section
            className={
                highlighted
                    ? `
                        rounded-2xl
                        border border-violet-100
                        bg-violet-50 p-4
                    `
                    : ""
            }
        >
            <h4
                className={
                    highlighted
                        ? "text-sm font-bold text-violet-950"
                        : "text-sm font-bold text-slate-900"
                }
            >
                {title}
            </h4>

            <p
                className={
                    highlighted
                        ? `
                            mt-2 whitespace-pre-wrap
                            text-sm leading-6
                            text-violet-800
                        `
                        : `
                            mt-2 whitespace-pre-wrap
                            text-sm leading-6
                            text-slate-600
                        `
                }
            >
                {content || "No information available."}
            </p>
        </section>
    );
}

function ResultsLoadingState() {
    return (
        <main
            className="
                flex min-h-dvh items-center
                justify-center bg-[#f8f9ff]
                px-4
            "
        >
            <div className="text-center">
                <div
                    className="
                        mx-auto flex h-14 w-14
                        items-center justify-center
                        rounded-2xl bg-violet-100
                        text-violet-600
                    "
                >
                    <LoaderCircle className="h-7 w-7 animate-spin" />
                </div>

                <h1 className="mt-5 text-xl font-bold text-slate-950">
                    Preparing your results
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    We are reviewing your interview performance.
                </p>
            </div>
        </main>
    );
}

type ResultsErrorStateProps = {
    message: string;
    onDashboard: () => void;
};

function ResultsErrorState({
    message,
    onDashboard,
}: ResultsErrorStateProps) {
    return (
        <main
            className="
                flex min-h-dvh items-center
                justify-center bg-[#f8f9ff]
                px-4
            "
        >
            <div
                className="
                    w-full max-w-md rounded-3xl
                    border border-slate-200
                    bg-white p-7 text-center shadow-sm
                "
            >
                <div
                    className="
                        mx-auto flex h-14 w-14
                        items-center justify-center
                        rounded-2xl bg-red-50
                        text-red-600
                    "
                >
                    <CircleAlert className="h-7 w-7" />
                </div>

                <h1 className="mt-5 text-xl font-bold text-slate-950">
                    Results unavailable
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                    {message}
                </p>

                <button
                    type="button"
                    onClick={onDashboard}
                    className="
                        mt-6 inline-flex w-full
                        items-center justify-center
                        rounded-xl bg-violet-600
                        px-5 py-2.5 text-sm
                        font-semibold text-white
                        transition hover:bg-violet-700
                    "
                >
                    Return to dashboard
                </button>
            </div>
        </main>
    );
}

function getInterviewStatus(score: number) {
    if (score >= 8) {
        return "Interview ready";
    }

    if (score >= 6) {
        return "Almost ready";
    }

    return "Needs more practice";
}

function getScoreStyle(score: number) {
    if (score >= 8) {
        return "bg-emerald-50 text-emerald-700";
    }

    if (score >= 6) {
        return "bg-amber-50 text-amber-700";
    }

    return "bg-red-50 text-red-700";
}

function formatScore(score: number) {
    return Number(score || 0).toFixed(1);
}

function formatPercentage(value: number) {
    return Math.round(Number(value || 0));
}