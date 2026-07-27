"use client";

import {
    Clock3,
    Globe2,
    Gauge,
} from "lucide-react";

type InterviewPreferencesCardProps = {
    duration: string;
    difficulty: string;
    language: string;
    onDurationChange: (value: string) => void;
    onDifficultyChange: (value: string) => void;
    onLanguageChange: (value: string) => void;
};

export default function InterviewPreferencesCard({
    duration,
    difficulty,
    language,
    onDurationChange,
    onDifficultyChange,
    onLanguageChange,
}: InterviewPreferencesCardProps) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div>
                <p className="text-sm font-semibold text-violet-600">
                    Interview setup
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-950">
                    Interview Preferences
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                    Choose the defaults used when you begin a new interview.
                </p>
            </div>

            <div className="mt-6 space-y-5">
                <div>
                    <label
                        htmlFor="default-duration"
                        className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                    >
                        <Clock3
                            size={16}
                            aria-hidden="true"
                        />
                        Default duration
                    </label>

                    <select
                        id="default-duration"
                        value={duration}
                        onChange={(event) =>
                            onDurationChange(
                                event.target.value
                            )
                        }
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    >
                        <option value="15">
                            15 minutes
                        </option>

                        <option value="30">
                            30 minutes
                        </option>

                        <option value="45">
                            45 minutes
                        </option>

                        <option value="60">
                            60 minutes
                        </option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="default-difficulty"
                        className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                    >
                        <Gauge
                            size={16}
                            aria-hidden="true"
                        />
                        Default difficulty
                    </label>

                    <select
                        id="default-difficulty"
                        value={difficulty}
                        onChange={(event) =>
                            onDifficultyChange(
                                event.target.value
                            )
                        }
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    >
                        <option value="easy">
                            Easy
                        </option>

                        <option value="medium">
                            Medium
                        </option>

                        <option value="hard">
                            Hard
                        </option>

                        <option value="adaptive">
                            Adaptive
                        </option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="preferred-language"
                        className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                    >
                        <Globe2
                            size={16}
                            aria-hidden="true"
                        />
                        Preferred language
                    </label>

                    <select
                        id="preferred-language"
                        value={language}
                        onChange={(event) =>
                            onLanguageChange(
                                event.target.value
                            )
                        }
                        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    >
                        <option value="English">
                            English
                        </option>

                        <option value="Hindi">
                            Hindi
                        </option>

                        <option value="Spanish">
                            Spanish
                        </option>

                        <option value="French">
                            French
                        </option>

                        <option value="German">
                            German
                        </option>
                    </select>
                </div>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="text-sm text-slate-500">
                    These defaults can still be changed before each session.
                </p>
            </div>
        </section>
    );
}