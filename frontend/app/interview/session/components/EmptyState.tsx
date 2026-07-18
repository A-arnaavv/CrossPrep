"use client";

import { ArrowRight, RotateCcw } from "lucide-react";

type EmptyStateProps = {
    title: string;
    description: string;
    primaryLabel: string;
    secondaryLabel?: string;
    onPrimary: () => void;
    onSecondary?: () => void;
};

export default function EmptyState({
    title,
    description,
    primaryLabel,
    secondaryLabel,
    onPrimary,
    onSecondary,
}: EmptyStateProps) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f8f9ff] px-6">
            <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">

                <h1 className="text-2xl font-bold text-slate-950">
                    {title}
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                    {description}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

                    <button
                        onClick={onPrimary}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"
                    >
                        {primaryLabel}
                        <ArrowRight className="h-4 w-4" />
                    </button>

                    {secondaryLabel && onSecondary && (
                        <button
                            onClick={onSecondary}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            <RotateCcw className="h-4 w-4" />
                            {secondaryLabel}
                        </button>
                    )}

                </div>

            </div>
        </main>
    );
}