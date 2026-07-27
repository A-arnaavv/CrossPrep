"use client";

import {
    Monitor,
    Moon,
    Save,
    Sun,
} from "lucide-react";

type AppearanceCardProps = {
    theme: string;
    isSaving?: boolean;
    message?: string;
    onThemeChange: (value: string) => void;
    onSave: () => void;
};

const themes = [
    {
        value: "light",
        label: "Light",
        description:
            "Use a bright interface across InterviewGPT.",
        icon: Sun,
    },
    {
        value: "dark",
        label: "Dark",
        description:
            "Use a darker interface that is easier on the eyes.",
        icon: Moon,
    },
    {
        value: "system",
        label: "System",
        description:
            "Match your device appearance automatically.",
        icon: Monitor,
    },
];

export default function AppearanceCard({
    theme,
    isSaving = false,
    message = "",
    onThemeChange,
    onSave,
}: AppearanceCardProps) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div>
                <p className="text-sm font-semibold text-violet-600">
                    Display
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-950">
                    Appearance
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                    Choose how InterviewGPT should look across your
                    devices.
                </p>
            </div>

            <div className="mt-6 grid gap-3">
                {themes.map((option) => {
                    const Icon = option.icon;
                    const selected =
                        theme === option.value;

                    return (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                                onThemeChange(option.value)
                            }
                            className={[
                                "flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition",
                                selected
                                    ? "border-violet-300 bg-violet-50 ring-2 ring-violet-100"
                                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                            ].join(" ")}
                        >
                            <div
                                className={[
                                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                                    selected
                                        ? "bg-violet-600 text-white"
                                        : "bg-slate-100 text-slate-600",
                                ].join(" ")}
                            >
                                <Icon
                                    size={19}
                                    aria-hidden="true"
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="font-semibold text-slate-900">
                                        {option.label}
                                    </p>

                                    <span
                                        className={[
                                            "h-4 w-4 shrink-0 rounded-full border",
                                            selected
                                                ? "border-violet-600 bg-violet-600 ring-4 ring-violet-100"
                                                : "border-slate-300 bg-white",
                                        ].join(" ")}
                                    />
                                </div>

                                <p className="mt-1 text-sm leading-6 text-slate-500">
                                    {option.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                    Theme switching will be enabled in a later polish
                    pass.
                </p>

                <button
                    type="button"
                    onClick={onSave}
                    disabled={isSaving}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <Save
                        size={16}
                        aria-hidden="true"
                    />

                    {isSaving
                        ? "Saving..."
                        : "Save Appearance"}
                </button>
            </div>

            {message && (
                <p
                    role="status"
                    className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
                >
                    {message}
                </p>
            )}
        </section>
    );
}