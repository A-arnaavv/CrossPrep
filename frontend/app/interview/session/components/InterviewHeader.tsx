"use client";

import {
    ArrowLeft,
    Sparkles,
    Target,
} from "lucide-react";

type InterviewHeaderProps = {
    role: string;
    level: string;
    onExit: () => void;
};

export default function InterviewHeader({
    role,
    level,
    onExit,
}: InterviewHeaderProps) {
    return (
        <header>
            <div className="flex items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={onExit}
                    className="
                        inline-flex items-center gap-2
                        text-sm font-semibold text-violet-600
                        transition-colors hover:text-violet-800
                    "
                >
                    <ArrowLeft className="h-4 w-4" />
                    Exit interview
                </button>

                <div
                    className="
                        inline-flex items-center gap-2 rounded-full
                        border border-violet-100 bg-violet-50
                        px-3 py-1.5 text-xs font-semibold
                        text-violet-700
                    "
                >
                    <Sparkles className="h-3.5 w-3.5" />
                    AI-powered interview
                </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-6">
                <div className="min-w-0">
                    <p className="text-xs font-semibold text-violet-600">
                        Behavioral interview session
                    </p>

                    <h1
                        className="
                            mt-0.5 truncate text-3xl
                            font-bold tracking-tight text-slate-950
                        "
                    >
                        {role}
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Structure your response clearly and support it with a
                        specific example.
                    </p>
                </div>

                <div
                    className="
                        hidden shrink-0 items-center gap-3
                        rounded-2xl border border-slate-200
                        bg-white px-4 py-2 shadow-sm sm:flex
                    "
                >
                    <div
                        className="
                            flex h-8 w-8 items-center justify-center
                            rounded-lg bg-violet-100 text-violet-600
                        "
                    >
                        <Target className="h-4 w-4" />
                    </div>

                    <div>
                        <p
                            className="
                                text-[10px] font-semibold uppercase
                                tracking-wider text-slate-400
                            "
                        >
                            Experience level
                        </p>

                        <p className="text-sm font-bold text-slate-800">
                            {level}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}