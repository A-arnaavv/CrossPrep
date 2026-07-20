import {
    BookOpen,
    CheckCircle2,
    ChevronRight,
    Code2,
    Lightbulb,
} from "lucide-react";

import ProgressDots from "./ProgressDots";

import type {
    CodingInterviewQuestion,
} from "../types";

type QuestionPanelProps = {
    question: CodingInterviewQuestion;
    activeTab: string;
    setActiveTab: (value: string) => void;
    questionNumber: number;
    totalQuestions: number;
};

export default function QuestionPanel({
    question,
    activeTab,
    setActiveTab,
    questionNumber,
    totalQuestions,
}: QuestionPanelProps) {
    const difficultyStyles = getDifficultyStyles(
        question.difficulty
    );

    const examples = question.examples ?? [];
    const constraints = question.constraints ?? [];

    return (
        <section className="flex min-h-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <header className="border-b border-slate-200 px-5 py-5 sm:px-6">
                <ProgressDots
                    questionNumber={questionNumber}
                    totalQuestions={totalQuestions}
                />

                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-600">
                            Question {questionNumber} of{" "}
                            {totalQuestions}
                        </p>

                        <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl">
                            {question.title}
                        </h2>
                    </div>

                    <span
                        className={`
                            inline-flex w-fit shrink-0 items-center
                            rounded-full px-3 py-1.5 text-xs
                            font-bold
                            ${difficultyStyles}
                        `}
                    >
                        {question.difficulty}
                    </span>
                </div>

                <nav
                    role="tablist"
                    aria-label="Question information"
                    className="mt-6 flex gap-2 overflow-x-auto"
                >
                    <TabButton
                        active={activeTab === "description"}
                        label="Description"
                        icon={BookOpen}
                        onClick={() =>
                            setActiveTab("description")
                        }
                    />

                    <TabButton
                        active={activeTab === "hints"}
                        label="Hints"
                        icon={Lightbulb}
                        onClick={() =>
                            setActiveTab("hints")
                        }
                    />
                </nav>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-6">
                {activeTab === "description" && (
                    <div className="space-y-9">
                        <section>
                            <SectionHeading
                                icon={BookOpen}
                                title="Problem description"
                            />

                            <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-600 sm:text-base">
                                {question.description ||
                                    "No problem description is available."}
                            </p>
                        </section>

                        <section>
                            <SectionHeading
                                icon={Code2}
                                title="Examples"
                                count={examples.length}
                            />

                            {examples.length > 0 ? (
                                <div className="mt-4 space-y-4">
                                    {examples.map(
                                        (
                                            example,
                                            index: number
                                        ) => (
                                            <article
                                                key={index}
                                                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                                            >
                                                <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
                                                    <p className="text-sm font-bold text-slate-900">
                                                        Example{" "}
                                                        {index + 1}
                                                    </p>

                                                    <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
                                                        Test case
                                                    </span>
                                                </div>

                                                <div className="space-y-4 p-4">
                                                    <CodeBlock
                                                        label="Input"
                                                        value={
                                                            example.input
                                                        }
                                                    />

                                                    <CodeBlock
                                                        label="Output"
                                                        value={
                                                            example.output
                                                        }
                                                    />

                                                    {example.explanation && (
                                                        <div>
                                                            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                                                                Explanation
                                                            </p>

                                                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                                                {
                                                                    example.explanation
                                                                }
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </article>
                                        )
                                    )}
                                </div>
                            ) : (
                                <EmptyBlock message="No examples are available for this question." />
                            )}
                        </section>

                        <section>
                            <SectionHeading
                                icon={CheckCircle2}
                                title="Constraints"
                                count={constraints.length}
                            />

                            {constraints.length > 0 ? (
                                <ul className="mt-4 space-y-3">
                                    {constraints.map(
                                        (
                                            constraint: string,
                                            index: number
                                        ) => (
                                            <li
                                                key={index}
                                                className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                                            >
                                                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />

                                                <code className="break-words text-sm leading-6 text-slate-700">
                                                    {constraint}
                                                </code>
                                            </li>
                                        )
                                    )}
                                </ul>
                            ) : (
                                <EmptyBlock message="No constraints are available for this question." />
                            )}
                        </section>
                    </div>
                )}

                {activeTab === "hints" && (
                    <section>
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600 shadow-sm">
                                    <Lightbulb className="h-5 w-5" />
                                </div>

                                <div>
                                    <h3 className="font-bold text-amber-950">
                                        Think before revealing a hint
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-amber-800">
                                        Try identifying the expected
                                        time complexity, useful data
                                        structures, and edge cases
                                        before asking the AI for help.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                                <Lightbulb className="h-6 w-6" />
                            </div>

                            <h3 className="mt-4 font-bold text-slate-900">
                                AI hints coming soon
                            </h3>

                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                                This area will provide progressive
                                hints without immediately revealing
                                the complete solution.
                            </p>
                        </div>
                    </section>
                )}
            </div>
        </section>
    );
}

type TabButtonProps = {
    active: boolean;
    label: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
    onClick: () => void;
};

function TabButton({
    active,
    label,
    icon: Icon,
    onClick,
}: TabButtonProps) {
    return (
        <button
            type="button"
            role="tab"
            aria-selected={active}
            onClick={onClick}
            className={`
                inline-flex shrink-0 items-center gap-2
                rounded-xl border px-4 py-2.5
                text-sm font-semibold transition
                ${active
                    ? `
                            border-violet-600
                            bg-violet-600
                            text-white shadow-sm
                        `
                    : `
                            border-slate-200
                            bg-white
                            text-slate-600
                            hover:border-violet-200
                            hover:bg-violet-50
                            hover:text-violet-700
                        `
                }
            `}
        >
            <Icon className="h-4 w-4" />
            {label}
        </button>
    );
}

type SectionHeadingProps = {
    title: string;
    count?: number;
    icon: React.ComponentType<{
        className?: string;
    }>;
};

function SectionHeading({
    title,
    count,
    icon: Icon,
}: SectionHeadingProps) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <Icon className="h-4 w-4" />
            </div>

            <h3 className="text-lg font-bold text-slate-950">
                {title}
            </h3>

            {typeof count === "number" && (
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                    {count}
                </span>
            )}
        </div>
    );
}

type CodeBlockProps = {
    label: string;
    value?: string;
};

function CodeBlock({
    label,
    value,
}: CodeBlockProps) {
    return (
        <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                {label}
            </p>

            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-6 text-slate-100">
                <code>
                    {value || "Not provided"}
                </code>
            </pre>
        </div>
    );
}

function EmptyBlock({
    message,
}: {
    message: string;
}) {
    return (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <p className="text-sm text-slate-500">
                {message}
            </p>
        </div>
    );
}

function getDifficultyStyles(
    difficulty?: string
) {
    switch (difficulty?.toLowerCase()) {
        case "easy":
            return "bg-emerald-100 text-emerald-700";

        case "hard":
            return "bg-red-100 text-red-700";

        default:
            return "bg-amber-100 text-amber-700";
    }
}