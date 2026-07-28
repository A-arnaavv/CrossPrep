"use client";

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
            "Root application error:",
            error
        );
    }, [error]);

    return (
        <html lang="en">
            <body>
                <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
                    <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl">
                            !
                        </div>

                        <h1 className="mt-6 text-3xl font-bold text-slate-950">
                            HirePilot encountered an error
                        </h1>

                        <p className="mt-4 text-sm leading-7 text-slate-600">
                            The application could not recover from this
                            problem. Try loading it again.
                        </p>

                        {error.digest && (
                            <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
                                Error reference: {error.digest}
                            </p>
                        )}

                        <button
                            type="button"
                            onClick={reset}
                            className="mt-8 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                        >
                            Reload Application
                        </button>
                    </div>
                </main>
            </body>
        </html>
    );
}