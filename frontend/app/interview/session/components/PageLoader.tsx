"use client";

import { LoaderCircle } from "lucide-react";

export default function PageLoader() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f8f9ff] px-6">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                    <LoaderCircle className="h-7 w-7 animate-spin" />
                </div>

                <h1 className="mt-5 text-xl font-bold text-slate-950">
                    Preparing your interview
                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                    Loading your personalized behavioral questions...
                </p>

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-2/3 animate-pulse rounded-full bg-violet-600" />
                </div>

            </div>
        </main>
    );
}