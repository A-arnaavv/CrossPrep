"use client";

import { LoaderCircle } from "lucide-react";

type LoadingOverlayProps = {
    open: boolean;
    title?: string;
    description?: string;
};

export default function LoadingOverlay({
    open,
    title = "Evaluating your answer",
    description = "The AI interviewer is reviewing your response and preparing personalized feedback.",
}: LoadingOverlayProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/25 px-6 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-3xl border border-white/30 bg-white p-7 text-center shadow-2xl">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                    <LoaderCircle className="h-7 w-7 animate-spin" />
                </div>

                <h2 className="mt-5 text-xl font-bold text-slate-950">
                    {title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                    {description}
                </p>
            </div>
        </div>
    );
}