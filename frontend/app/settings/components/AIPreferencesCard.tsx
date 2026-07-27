"use client";

import {
    Bot,
    Sparkles,
} from "lucide-react";

type AIPreferencesCardProps = {
    coachingStyle: string;
    feedbackDetail: string;
    onCoachingStyleChange: (value: string) => void;
    onFeedbackDetailChange: (value: string) => void;
};

const coachingStyles = [
    {
        value: "encouraging",
        label: "Encouraging",
        description:
            "Supportive guidance with positive reinforcement.",
    },
    {
        value: "balanced",
        label: "Balanced",
        description:
            "A practical mix of encouragement and direct feedback.",
    },
    {
        value: "direct",
        label: "Direct",
        description:
            "Clear, concise feedback focused on improvement.",
    },
];

export default function AIPreferencesCard({
    coachingStyle,
    feedbackDetail,
    onCoachingStyleChange,
    onFeedbackDetailChange,
}: AIPreferencesCardProps) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div>
                <p className="text-sm font-semibold text-violet-600">
                    AI behavior
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-950">
                    AI Preferences
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                    Choose how InterviewGPT delivers coaching, feedback,
                    and recommendations.
                </p>
            </div>

            <div className="mt-6">
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Bot
                        size={16}
                        aria-hidden="true"
                    />
                    Coaching style
                </p>

                <div className="mt-3 grid gap-3">
                    {coachingStyles.map((style) => {
                        const selected =
                            coachingStyle === style.value;

                        return (
                            <button
                                key={style.value}
                                type="button"
                                onClick={() =>
                                    onCoachingStyleChange(
                                        style.value
                                    )
                                }
                                className={[
                                    "w-full rounded-2xl border p-4 text-left transition",
                                    selected
                                        ? "border-violet-300 bg-violet-50 ring-2 ring-violet-100"
                                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                                ].join(" ")}
                            >
                                <div className="flex items-start gap-3">
                                    <span
                                        className={[
                                            "mt-1 h-4 w-4 shrink-0 rounded-full border",
                                            selected
                                                ? "border-violet-600 bg-violet-600 ring-4 ring-violet-100"
                                                : "border-slate-300 bg-white",
                                        ].join(" ")}
                                    />

                                    <div>
                                        <p className="font-semibold text-slate-900">
                                            {style.label}
                                        </p>

                                        <p className="mt-1 text-sm leading-6 text-slate-500">
                                            {style.description}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-6">
                <label
                    htmlFor="feedback-detail"
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                >
                    <Sparkles
                        size={16}
                        aria-hidden="true"
                    />
                    Feedback detail
                </label>

                <select
                    id="feedback-detail"
                    value={feedbackDetail}
                    onChange={(event) =>
                        onFeedbackDetailChange(
                            event.target.value
                        )
                    }
                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                >
                    <option value="concise">
                        Concise
                    </option>

                    <option value="standard">
                        Standard
                    </option>

                    <option value="detailed">
                        Detailed
                    </option>
                </select>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="text-sm text-slate-500">
                    These preferences influence AI Coach responses and
                    interview feedback.
                </p>
            </div>
        </section>
    );
}