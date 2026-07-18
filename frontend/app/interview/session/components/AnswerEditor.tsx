"use client";

import { LoaderCircle, Send } from "lucide-react";

type AnswerEditorProps = {
    answer: string;
    error: string;
    submitting: boolean;
    isEvaluated: boolean;
    onAnswerChange: (answer: string) => void;
    onSubmit: () => void;
};

export default function AnswerEditor({
    answer,
    error,
    submitting,
    isEvaluated,
    onAnswerChange,
    onSubmit,
}: AnswerEditorProps) {
    const characterCount = answer.trim().length;

    const isSubmitDisabled =
        submitting || characterCount === 0 || isEvaluated;

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div>
                <h2 className="text-base font-bold text-slate-950">
                    Your answer
                </h2>

                <p className="mt-0.5 text-sm text-slate-500">
                    Use a clear situation, action, and measurable result.
                </p>
            </div>

            <textarea
                value={answer}
                onChange={(event) => onAnswerChange(event.target.value)}
                disabled={submitting || isEvaluated}
                aria-label="Interview answer"
                placeholder="Describe your experience using the STAR method..."
                className="
                    mt-3
                    h-[220px]
                    w-full
                    resize-none
                    overflow-y-auto
                    rounded-xl
                    border border-slate-200
                    bg-slate-50
                    p-4
                    text-sm
                    leading-6
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-violet-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-violet-100
                    disabled:cursor-not-allowed
                    disabled:bg-slate-50
                    disabled:text-slate-600
                "
            />

            {error && (
                <div
                    role="alert"
                    className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
                >
                    {error}
                </div>
            )}

            {!isEvaluated && (
                <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                        {characterCount} characters
                    </span>

                    <button
                        type="button"
                        onClick={onSubmit}
                        disabled={isSubmitDisabled}
                        className="
                            inline-flex
                            min-w-36
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-violet-600
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-white
                            shadow-sm
                            transition
                            hover:bg-violet-700
                            disabled:cursor-not-allowed
                            disabled:bg-slate-300
                            disabled:shadow-none
                        "
                    >
                        {submitting ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Send className="h-4 w-4" />
                                Submit answer
                            </>
                        )}
                    </button>
                </div>
            )}
        </section>
    );
}