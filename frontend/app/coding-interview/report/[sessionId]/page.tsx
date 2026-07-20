"use client";

import {
    CircleAlert,
    LoaderCircle,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
    useParams,
    useRouter,
} from "next/navigation";

import { api } from "@/lib/api";

import FinalReport from "../../components/FinalReport";

import type {
    CodingInterviewReport,
} from "../../types";

export default function CodingInterviewReportPage() {
    const params = useParams();
    const router = useRouter();

    const sessionId =
        params.sessionId as string;

    const [report, setReport] =
        useState<CodingInterviewReport | null>(
            null
        );

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        const loadReport = async () => {
            try {
                setLoading(true);
                setError("");

                const response =
                    await api.get<CodingInterviewReport>(
                        `/api/coding-interviews/session-report/${sessionId}`
                    );

                setReport(response.data);
            } catch (error) {
                console.error(
                    "Failed to load coding interview report:",
                    error
                );

                setError(
                    "We could not load this coding interview report."
                );
            } finally {
                setLoading(false);
            }
        };

        if (sessionId) {
            void loadReport();
        }
    }, [sessionId]);

    if (loading) {
        return <ReportLoadingState />;
    }

    if (error || !report) {
        return (
            <ReportErrorState
                message={
                    error ||
                    "This coding interview report could not be found."
                }
                onBack={() =>
                    router.push(
                        "/coding-interview"
                    )
                }
            />
        );
    }

    return (
        <main className="min-h-dvh overflow-y-auto bg-[#f8f9ff] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <FinalReport
                    report={report}
                    role={report.role}
                    language={report.language}
                    onRestart={() =>
                        router.push(
                            "/coding-interview"
                        )
                    }
                />
            </div>
        </main>
    );
}

function ReportLoadingState() {
    return (
        <main className="flex min-h-dvh items-center justify-center bg-[#f8f9ff] px-4">
            <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                    <LoaderCircle className="h-7 w-7 animate-spin" />
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">
                    Preparing your report
                </p>

                <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                    Reviewing your coding interview
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                    We are loading your scores,
                    test results, code analysis, and
                    improvement feedback.
                </p>
            </section>
        </main>
    );
}

type ReportErrorStateProps = {
    message: string;
    onBack: () => void;
};

function ReportErrorState({
    message,
    onBack,
}: ReportErrorStateProps) {
    return (
        <main className="flex min-h-dvh items-center justify-center bg-[#f8f9ff] px-4">
            <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                    <CircleAlert className="h-7 w-7" />
                </div>

                <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-950">
                    Report unavailable
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                    {message}
                </p>

                <button
                    type="button"
                    onClick={onBack}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                    Return to coding interviews
                </button>
            </section>
        </main>
    );
}