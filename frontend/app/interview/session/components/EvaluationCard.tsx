"use client";

import type { ComponentType } from "react";

import {
    ArrowRight,
    Award,
    CheckCircle2,
    Lightbulb,
    MessageSquareText,
    RotateCcw,
} from "lucide-react";

import type { AnswerEvaluation } from "../types";

type EvaluationCardProps = {
    evaluation: AnswerEvaluation;
    isLastQuestion: boolean;
    onReviewAnswer: () => void;
    onNextQuestion: () => void;
    onFinishInterview: () => void;
};

export default function EvaluationCard({
    evaluation,
    isLastQuestion,
    onReviewAnswer,
    onNextQuestion,
    onFinishInterview,
}: EvaluationCardProps) {
    const score =
        typeof evaluation.score === "number"
            ? evaluation.score
            : 0;

    return (
        <section className="rounded-3xl border border-violet-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-xl font-bold text-white shadow-lg shadow-violet-200">
                        {score}
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />

                            <h2 className="text-xl font-bold text-slate-950">
                                Answer evaluated
                            </h2>
                        </div>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
                            Review the AI feedback before continuing.
                        </p>
                    </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                    <Award className="h-3.5 w-3.5" />
                    AI score
                </div>
            </div>

            <div className="mt-6 grid gap-4">
                <FeedbackCard
                    icon={MessageSquareText}
                    title="AI feedback"
                    content={
                        evaluation.feedback ||
                        "No feedback was provided."
                    }
                />

                <FeedbackCard
                    icon={Lightbulb}
                    title="Example of a stronger answer"
                    content={
                        evaluation.ideal_answer ||
                        "No ideal answer was provided."
                    }
                />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={onReviewAnswer}
                    className="
                        inline-flex items-center justify-center
                        gap-2 rounded-2xl border border-slate-200
                        bg-white px-5 py-3 text-sm font-semibold
                        text-slate-700 transition
                        hover:border-slate-300 hover:bg-slate-50
                    "
                >
                    <RotateCcw className="h-4 w-4" />
                    Review answer
                </button>

                <button
                    type="button"
                    onClick={
                        isLastQuestion
                            ? onFinishInterview
                            : onNextQuestion
                    }
                    className="
                        inline-flex flex-1 items-center
                        justify-center gap-2 rounded-2xl
                        bg-violet-600 px-6 py-3
                        text-sm font-semibold text-white
                        shadow-lg shadow-violet-200
                        transition hover:bg-violet-700
                    "
                >
                    {isLastQuestion ? (
                        <>
                            Complete interview
                            <CheckCircle2 className="h-4 w-4" />
                        </>
                    ) : (
                        <>
                            Next question
                            <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </button>
            </div>
        </section>
    );
}

type FeedbackCardProps = {
    title: string;
    content: string;
    icon: ComponentType<{
        className?: string;
    }>;
};

function FeedbackCard({
    title,
    content,
    icon: Icon,
}: FeedbackCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-violet-600" />

                <h3 className="text-sm font-bold text-slate-900">
                    {title}
                </h3>
            </div>

            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                {content}
            </p>
        </div>
    );
}