"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/lib/api";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

export default function AnalyticsPage() {
    const { user } = useUser();

    const [interviews, setInterviews] =
        useState<any[]>([]);

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

            <h1 className="text-4xl font-bold mb-8">
                Analytics Dashboard
            </h1>

            <div className="grid lg:grid-cols-5 gap-8">

                {/* LEFT COLUMN */}
                <div className="lg:col-span-3">

                    <div className="grid md:grid-cols-3 gap-6 mb-8">

                        <div className="border rounded-2xl p-4 bg-white shadow-sm">

                            <div className="text-2xl font-bold">
                                {totalInterviews}
                            </div>

                            <div className="text-zinc-500 mt-2">
                                Total Interviews
                            </div>

                        </div>

                        <div className="border rounded-2xl p-4 bg-white shadow-sm">

                            <div className="text-2xl font-bold">
                                {averageScore}
                            </div>

                            <div className="text-zinc-500 mt-2">
                                Average Score
                            </div>

                        </div>

                        <div className="border rounded-2xl p-4 bg-white shadow-sm">

                            <div className="text-2xl font-bold">
                                {bestScore}
                            </div>

                            <div className="text-zinc-500 mt-2">
                                Best Score
                            </div>

                        </div>

                    </div>

                    <div
                        className="
                            bg-gradient-to-r
                            from-violet-600
                            to-purple-600
                            text-white
                            rounded-3xl
                            p-6
                            shadow-lg
                        "
                    >

                        <div className="text-lg opacity-90">
                            Interview Readiness
                        </div>

                        <div className="flex items-center justify-between mt-6">

                            <div>

                                <div className="text-5xl font-bold">

                                    {Math.min(
                                        100,
                                        Math.round(
                                            Number(
                                                averageScore
                                            ) * 10
                                        )
                                    )}%

                                </div>

                                <div className="text-xl mt-2">

                                    {Number(
                                        averageScore
                                    ) >= 8
                                        ? "Ready"
                                        : Number(
                                            averageScore
                                        ) >= 6
                                            ? "Almost Ready"
                                            : "Needs Practice"}

                                </div>

                            </div>

                        </div>

                        <p className="mt-4 opacity-80">
                            Based on your overall interview performance.
                        </p>

                    </div>
                    <div
                        className="
                            bg-white
                            border
                            rounded-3xl
                            p-6
                            shadow-sm
                            mt-8
                        "
                    >

                        <h2 className="text-2xl font-bold mb-6">
                            Performance Trend
                        </h2>

                        <div className="h-80">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <LineChart
                                    data={chartData}
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis
                                        dataKey="interview"
                                    />

                                    <YAxis
                                        domain={[0, 10]}
                                    />

                                    <Tooltip />

                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#7c3aed"
                                        strokeWidth={4}
                                        dot={{ r: 6 }}
                                        activeDot={{ r: 8 }}
                                    />

                                </LineChart>

                            </ResponsiveContainer>

                        </div>

                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="col-span-2">

                    <div
                        className="
                            sticky
                            top-6
                            bg-white
                            border
                            rounded-3xl
                            p-6
                            shadow-sm
                        "
                    >

                        <h2 className="text-2xl font-bold mb-6">
                            Recent Interviews
                        </h2>

                        <div
                            className="
                                space-y-4
                                max-h-[700px]
                                overflow-y-auto
                                pr-2
                            "
                        >

                            {interviews.map(
                                (
                                    interview,
                                    index
                                ) => (
                                    <div
                                        key={index}
                                        className="
                                            bg-white
                                            border
                                            rounded-2xl
                                            p-5
                                            shadow-sm
                                        "
                                    >

                                        <div className="flex justify-between items-start">

                                            <div>

                                                <h3 className="font-bold">
                                                    {interview.role}
                                                </h3>

                                                <p className="text-zinc-500 text-sm">
                                                    {interview.level}
                                                </p>

                                                <p className="text-xs text-zinc-400 mt-1">
                                                    {new Date(
                                                        interview.created_at
                                                    ).toLocaleDateString()}
                                                </p>

                                            </div>

                                            <div
                                                className="
                                                    font-bold
                                                    text-violet-600
                                                "
                                            >
                                                {interview.average_score}/10
                                            </div>

                                        </div>

                                    </div>
                                )
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}