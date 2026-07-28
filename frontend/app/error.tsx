"use client";

import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { useEffect } from "react";

type GlobalErrorProps = {
    error: Error & {
        digest?: string;
    };
    reset: () => void;
};

export default function GlobalError({
    error,
    reset,
}: GlobalErrorProps) {
    useEffect(() => {
        console.error(
            "Application error:",
            error
        );
    }, [error]);

    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-violet-50 px-6 py-12">
            <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60 sm:p-10">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <AlertTriangle
                        size={38}
                        aria-hidden="true"
                    />
                </div>

                <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
                    Application error
                </p>

                <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                    Something went wrong
                </h1>

                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                    We could not complete this request. You can try loading
                    the page again or return to your dashboard.
                </p>

                {error.digest && (
                    <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
                        Error reference: {error.digest}
                    </p>
                )}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                        type="button"
                        onClick={reset}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
                    >
                        <RefreshCw
                            size={17}
                            aria-hidden="true"
                        />
                        Try Again
                    </button>

                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
                    >
                        <Home
                            size={17}
                            aria-hidden="true"
                        />
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </main>
    );
}