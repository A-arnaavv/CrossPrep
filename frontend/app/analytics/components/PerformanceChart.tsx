"use client";

import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {
    BarChart3,
    TrendingUp,
} from "lucide-react";

type ChartPoint = {
    interview: number;
    score: number;
    label?: string;
    date?: string;
};

type PerformanceChartProps = {
    data: ChartPoint[];
};

type TooltipPayload = {
    value?: number;
    payload?: ChartPoint;
};

type CustomTooltipProps = {
    active?: boolean;
    payload?: TooltipPayload[];
};

function CustomTooltip({
    active,
    payload,
}: CustomTooltipProps) {
    if (!active || !payload?.length) {
        return null;
    }

    const point = payload[0]?.payload;

    if (!point) {
        return null;
    }

    return (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Interview {point.interview}
            </p>

            {point.label && (
                <p className="mt-1 text-sm font-semibold text-slate-700">
                    {point.label}
                </p>
            )}

            {point.date && (
                <p className="mt-1 text-xs text-slate-500">
                    {point.date}
                </p>
            )}

            <p className="mt-2 text-lg font-bold text-violet-700">
                {point.score.toFixed(1)}
            </p>
        </div>
    );
}

export default function PerformanceChart({
    data,
}: PerformanceChartProps) {
    const hasData = data.length > 0;

    return (
        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
                            <TrendingUp className="h-5 w-5 text-violet-700" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">
                                Performance Trend
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Track how your interview scores change over time.
                            </p>
                        </div>
                    </div>
                </div>

                {hasData && (
                    <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600">
                        <BarChart3 className="h-4 w-4 text-violet-600" />
                        {data.length}{" "}
                        {data.length === 1
                            ? "interview"
                            : "interviews"}
                    </div>
                )}
            </div>

            {hasData ? (
                <div className="mt-8 h-80 w-full">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <LineChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 16,
                                left: -16,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="4 4"
                                vertical={false}
                                stroke="#e2e8f0"
                            />

                            <XAxis
                                dataKey="interview"
                                tickLine={false}
                                axisLine={false}
                                tick={{
                                    fill: "#64748b",
                                    fontSize: 12,
                                }}
                                tickFormatter={(value) =>
                                    `#${value}`
                                }
                            />

                            <YAxis
                                domain={[0, 10]}
                                tickLine={false}
                                axisLine={false}
                                tick={{
                                    fill: "#64748b",
                                    fontSize: 12,
                                }}
                            />

                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{
                                    stroke: "#c4b5fd",
                                    strokeWidth: 1,
                                    strokeDasharray: "4 4",
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="score"
                                stroke="#7c3aed"
                                strokeWidth={3}
                                dot={{
                                    r: 5,
                                    fill: "#ffffff",
                                    stroke: "#7c3aed",
                                    strokeWidth: 3,
                                }}
                                activeDot={{
                                    r: 7,
                                    fill: "#7c3aed",
                                    stroke: "#ffffff",
                                    strokeWidth: 3,
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="mt-8 flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
                        <TrendingUp className="h-7 w-7 text-violet-700" />
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-950">
                        No performance data yet
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                        Complete and score an interview to start building your
                        performance trend.
                    </p>
                </div>
            )}
        </section>
    );
}