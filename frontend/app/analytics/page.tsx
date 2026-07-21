"use client";

import Link from "next/link";
import {
    AlertCircle,
    ArrowRight,
    BarChart3,
    RefreshCw,
    Sparkles,
} from "lucide-react";
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useUser } from "@clerk/nextjs";

import { api } from "@/lib/api";
import BackToDashboard from "@/components/navigation/BackToDashboard";

import AnalyticsHeader from "./components/AnalyticsHeader";
import AnalyticsStats from "./components/AnalyticsStats";
import PerformanceChart from "./components/PerformanceChart";
import ReadinessCard from "./components/ReadinessCard";
import RecentInterviews from "./components/RecentInterviews";

import type { AnalyticsInterview } from "./types";

function AnalyticsSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-72 rounded-[2rem] bg-slate-200" />

            <div className="mt-8 grid gap-8 lg:grid-cols-5">
                <div className="space-y-8 lg:col-span-3">
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 3 }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className="h-48 rounded-[1.75rem] bg-slate-200"
                                />
                            )
                        )}
                    </div>

                    <div className="h-80 rounded-[2rem] bg-slate-200" />

                    <div className="h-[28rem] rounded-[2rem] bg-slate-200" />
                </div>

                <div className="h-[42rem] rounded-[2rem] bg-slate-200 lg:col-span-2" />
            </div>
        </div>
    );
}

function AnalyticsError({
    onRetry,
}: {
    onRetry: () => void;
}) {
    return (
        <div className="flex min-h-[420px] items-center justify-center rounded-[2rem] border border-rose-200 bg-white px-6 py-12 text-center shadow-sm">
            <div className="max-w-md">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100">
                    <AlertCircle className="h-8 w-8 text-rose-600" />
                </div>

                <h2 className="mt-5 text-2xl font-bold text-slate-950">
                    Analytics could not be loaded
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                    We could not retrieve your interview data. Check
                    your connection and try again.
                </p>

                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                    <RefreshCw className="h-4 w-4" />
                    Try again
                </button>
            </div>
        </div>
    );
}

function EmptyAnalyticsState() {
    return (
        <div className="flex min-h-[460px] items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
            <div className="max-w-lg">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
                    <BarChart3 className="h-8 w-8 text-violet-700" />
                </div>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
                    <Sparkles className="h-3.5 w-3.5" />
                    Your analytics journey starts here
                </div>

                <h2 className="mt-5 text-2xl font-bold text-slate-950 sm:text-3xl">
                    No interview analytics yet
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                    Complete a mock interview to generate your first
                    performance score, readiness estimate, and
                    improvement trend.
                </p>

                <Link
                    href="/coding-interview"
                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                    Start an interview
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}

function normalizeScore(value: unknown) {
    const score = Number(value);

    if (!Number.isFinite(score)) {
        return 0;
    }

    return Math.max(0, Math.min(10, score));
}

function formatChartDate(date: string) {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Unknown date";
    }

    return parsedDate.toLocaleDateString("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

export default function AnalyticsPage() {
    const {
        user,
        isLoaded,
        isSignedIn,
    } = useUser();

    const [interviews, setInterviews] = useState<
        AnalyticsInterview[]
    >([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadAnalytics = useCallback(async () => {
        if (!user?.id) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await api.get(
                `/api/interviews/user/${user.id}`
            );

            const analyticsData = Array.isArray(response.data)
                ? response.data
                : [];

            setInterviews(analyticsData);
        } catch (loadError) {
            console.error(
                "Failed to load analytics:",
                loadError
            );

            setError(
                "Unable to retrieve your interview analytics."
            );
        } finally {
            setIsLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        if (!isSignedIn || !user?.id) {
            setIsLoading(false);
            return;
        }

        void loadAnalytics();
    }, [
        isLoaded,
        isSignedIn,
        user?.id,
        loadAnalytics,
    ]);

    const analytics = useMemo(() => {
        const scoredInterviews = interviews.map(
            (interview) => ({
                ...interview,
                average_score: normalizeScore(
                    interview.average_score
                ),
            })
        );

        const totalInterviews = scoredInterviews.length;

        const scoreTotal = scoredInterviews.reduce(
            (sum, interview) =>
                sum + interview.average_score,
            0
        );

        const averageScore =
            totalInterviews > 0
                ? (
                    scoreTotal / totalInterviews
                ).toFixed(1)
                : "0.0";

        const bestScore =
            totalInterviews > 0
                ? Math.max(
                    ...scoredInterviews.map(
                        (interview) =>
                            interview.average_score
                    )
                )
                : 0;

        const chartData = [...scoredInterviews]
            .sort(
                (a, b) =>
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime()
            )
            .map((interview, index) => ({
                interview: index + 1,
                score: interview.average_score,
                label: `${interview.role} · ${interview.level || "Practice"
                    }`,
                date: formatChartDate(
                    interview.created_at
                ),
            }));

        return {
            totalInterviews,
            averageScore,
            bestScore,
            chartData,
            scoredInterviews,
        };
    }, [interviews]);

    if (!isLoaded || isLoading) {
        return (
            <main className="min-h-screen bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <AnalyticsSkeleton />
                </div>
            </main>
        );
    }

    if (!isSignedIn || !user) {
        return (
            <main className="min-h-screen bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex min-h-[500px] items-center justify-center rounded-[2rem] border border-slate-200 bg-white px-6 text-center shadow-sm">
                        <div className="max-w-md">
                            <h1 className="text-2xl font-bold text-slate-950">
                                Sign in to view analytics
                            </h1>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                Your interview performance and
                                readiness analytics are linked to
                                your account.
                            </p>

                            <Link
                                href="/sign-in"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                            >
                                Sign in
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <BackToDashboard />

                <div className="mt-6">
                    <AnalyticsHeader />
                </div>

                {error ? (
                    <AnalyticsError
                        onRetry={() => {
                            void loadAnalytics();
                        }}
                    />
                ) : analytics.totalInterviews === 0 ? (
                    <EmptyAnalyticsState />
                ) : (
                    <div className="grid gap-8 lg:grid-cols-5">
                        <div className="min-w-0 lg:col-span-3">
                            <AnalyticsStats
                                totalInterviews={
                                    analytics.totalInterviews
                                }
                                averageScore={
                                    analytics.averageScore
                                }
                                bestScore={
                                    analytics.bestScore
                                }
                            />

                            <ReadinessCard
                                averageScore={
                                    analytics.averageScore
                                }
                            />

                            <PerformanceChart
                                data={analytics.chartData}
                            />
                        </div>

                        <div className="min-w-0 lg:col-span-2">
                            <RecentInterviews
                                interviews={
                                    analytics.scoredInterviews
                                }
                            />
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}