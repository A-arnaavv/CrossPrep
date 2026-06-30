"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/lib/api";

import AnalyticsHeader from "./components/AnalyticsHeader";
import AnalyticsStats
    from "./components/AnalyticsStats";

import ReadinessCard
    from "./components/ReadinessCard";

import PerformanceChart
    from "./components/PerformanceChart";

import RecentInterviews
    from "./components/RecentInterviews";

import type {
    AnalyticsInterview,
} from "./types";

export default function AnalyticsPage() {
    const { user } = useUser();

    const [interviews, setInterviews] =
        useState<AnalyticsInterview[]>([]);

    useEffect(() => {
        if (user) {
            loadAnalytics();
        }
    }, [user]);

    const loadAnalytics =
        async () => {
            try {
                const response =
                    await api.get(
                        `/api/interviews/user/${user?.id}`
                    );

                setInterviews(
                    response.data
                );

            } catch (error) {
                console.error(error);
            }
        };

    if (!user) {
        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    const totalInterviews =
        interviews.length;

    const averageScore =
        interviews.length
            ? (
                interviews.reduce(
                    (
                        sum,
                        interview
                    ) =>
                        sum +
                        (
                            interview.average_score ||
                            0
                        ),
                    0
                ) /
                interviews.length
            ).toFixed(1)
            : "0";

    const bestScore =
        interviews.length
            ? Math.max(
                ...interviews.map(
                    (
                        interview
                    ) =>
                        interview.average_score ||
                        0
                )
            )
            : 0;
    const chartData =
        interviews.map(
            (
                interview,
                index
            ) => ({
                interview:
                    index + 1,
                score:
                    interview.average_score || 0,
            })
        );
    return (
        <div className="max-w-7xl mx-auto p-10">

            <AnalyticsHeader />

            <div className="grid lg:grid-cols-5 gap-8">

                {/* LEFT COLUMN */}
                <div className="lg:col-span-3">

                    <AnalyticsStats
                        totalInterviews={
                            totalInterviews
                        }
                        averageScore={
                            averageScore
                        }
                        bestScore={
                            bestScore
                        }
                    />

                    <ReadinessCard
                        averageScore={
                            averageScore
                        }
                    />

                    <PerformanceChart
                        data={chartData}
                    />
                </div>

                {/* RIGHT COLUMN */}
                <div className="col-span-2">

                    <RecentInterviews
                        interviews={interviews}
                    />

                </div>
            </div>

        </div>
    );
}