"use client";

import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import type {
    DashboardActivity,
} from "./types";

type PerformanceTrendProps = {
    activity: DashboardActivity[];
};

type ChartPoint = {
    label: string;
    coding: number | null;
    behavioral: number | null;
    role: string;
};

export default function PerformanceTrend({
    activity,
}: PerformanceTrendProps) {
    const data: ChartPoint[] = activity
        .filter(
            (item) =>
                item.coding_score !== null &&
                item.coding_score !== undefined ||
                item.behavioral_score !== null &&
                item.behavioral_score !== undefined
        )
        .slice()
        .reverse()
        .map((item, index) => ({
            label: item.created_at
                ? new Date(
                    item.created_at
                ).toLocaleDateString(
                    "en-US",
                    {
                        month: "short",
                        day: "numeric",
                    }
                )
                : `I${index + 1}`,

            coding:
                item.coding_score !== null &&
                    item.coding_score !== undefined
                    ? Math.min(
                        100,
                        Math.round(
                            Number(
                                item.coding_score
                            ) * 10
                        )
                    )
                    : null,

            behavioral:
                item.behavioral_score !== null &&
                    item.behavioral_score !== undefined
                    ? Math.min(
                        100,
                        Math.round(
                            Number(
                                item.behavioral_score
                            ) * 10
                        )
                    )
                    : null,

            role:
                item.role ||
                "Interview",
        }));

    return (
        <section
            className="
                h-full
                min-h-0
                rounded-3xl
                border
                border-slate-100
                bg-white
                p-5
                shadow-sm
                flex
                flex-col
            "
        >
            <div className="mb-3 shrink-0">
                <h2 className="text-2xl font-bold text-slate-950">
                    Your Progress
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Coding and behavioral interview score trends.
                </p>
            </div>

            {data.length === 0 ? (
                <div
                    className="
                        flex
                        h-[230px]
                        items-center
                        justify-center
                        rounded-2xl
                        bg-slate-50
                    "
                >
                    <div className="text-center">
                        <p className="font-semibold text-slate-700">
                            No scored interviews yet
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                            Complete an evaluated interview to see progress.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="w-full flex-1 min-h-[180px] max-h-[250px]">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <LineChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 20,
                                bottom: 5,
                                left: 0,
                            }}
                        >
                            <CartesianGrid
                                stroke="#e2e8f0"
                                strokeDasharray="4 4"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="label"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#64748b",
                                    fontSize: 12,
                                }}
                                tickMargin={12}
                            />

                            <YAxis
                                domain={[0, 100]}
                                ticks={[
                                    0,
                                    25,
                                    50,
                                    75,
                                    100,
                                ]}
                                tickFormatter={(
                                    value
                                ) =>
                                    `${value}%`
                                }
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#64748b",
                                    fontSize: 12,
                                }}
                                width={48}
                            />

                            <Tooltip
                                formatter={(
                                    value,
                                    name
                                ) => [
                                        `${value}%`,
                                        name,
                                    ]}
                                labelFormatter={(
                                    label
                                ) =>
                                    `Date: ${label}`
                                }
                                contentStyle={{
                                    borderRadius:
                                        "16px",
                                    border:
                                        "1px solid #e2e8f0",
                                    boxShadow:
                                        "0 12px 30px rgba(15, 23, 42, 0.12)",
                                }}
                            />

                            <Legend
                                verticalAlign="top"
                                align="right"
                                iconType="circle"
                                iconSize={8}
                                wrapperStyle={{
                                    paddingBottom:
                                        "16px",
                                    fontSize:
                                        "13px",
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="coding"
                                name="Coding"
                                stroke="#7c3aed"
                                strokeWidth={3}
                                connectNulls
                                dot={{
                                    r: 4,
                                    fill: "#7c3aed",
                                    stroke: "#ffffff",
                                    strokeWidth: 2,
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="behavioral"
                                name="Behavioral"
                                stroke="#10b981"
                                strokeWidth={3}
                                connectNulls
                                dot={{
                                    r: 4,
                                    fill: "#10b981",
                                    stroke: "#ffffff",
                                    strokeWidth: 2,
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </section>
    );
}