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
    xKey: string;
    label: string;
    fullDate: string;
    coding: number | null;
    behavioral: number | null;
    role: string;
};

type TooltipPayloadItem = {
    name: string;
    value: number | null;
    color: string;
    payload: ChartPoint;
};

type CustomTooltipProps = {
    active?: boolean;
    payload?: TooltipPayloadItem[];
};

function CustomTooltip({
    active,
    payload,
}: CustomTooltipProps) {
    if (!active || !payload?.length) {
        return null;
    }

    const point = payload[0]?.payload;

    return (
        <div
            className="
                min-w-52
                rounded-2xl
                border
                border-slate-100
                bg-white
                p-4
                shadow-xl
            "
        >
            <p className="font-bold text-slate-950">
                {point?.role || "Interview"}
            </p>

            <p className="mt-1 text-xs text-slate-400">
                {point?.fullDate}
            </p>

            <div className="mt-4 space-y-2">
                {payload.map((item) => {
                    if (
                        item.value === null ||
                        item.value === undefined
                    ) {
                        return null;
                    }

                    return (
                        <div
                            key={item.name}
                            className="
                                flex
                                items-center
                                justify-between
                                gap-6
                            "
                        >
                            <div className="flex items-center gap-2">
                                <span
                                    className="h-2.5 w-2.5 rounded-full"
                                    style={{
                                        backgroundColor:
                                            item.color,
                                    }}
                                />

                                <span className="text-sm text-slate-500">
                                    {item.name}
                                </span>
                            </div>

                            <span className="text-sm font-bold text-slate-900">
                                {item.value}/10
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

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
        .map((item, index) => {
            const createdAt = item.created_at
                ? new Date(item.created_at)
                : null;

            return {
                xKey: item.created_at ?? `interview-${index}`,
                label: createdAt
                    ? createdAt.toLocaleDateString(
                        "en-US",
                        {
                            month: "short",
                            day: "numeric",
                        }
                    )
                    : `I${index + 1}`,

                fullDate: createdAt
                    ? createdAt.toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                        }
                    )
                    : `Interview ${index + 1}`,

                coding:
                    item.coding_score !== null &&
                        item.coding_score !== undefined
                        ? Number(item.coding_score)
                        : null,

                behavioral:
                    item.behavioral_score !== null &&
                        item.behavioral_score !== undefined
                        ? Number(item.behavioral_score)
                        : null,

                role:
                    item.role || "Interview",
            };
        });

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
                shadow-md
                hover:shadow-xl
                transition-all
                duration-300
                flex
                flex-col
            "
        >
            <div className="mb-3 shrink-0">
                <h2 className="text-2xl font-bold text-slate-950">
                    Your Progress
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Interview performance across coding and behavioral sessions.
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
                                dataKey="xKey"
                                tickFormatter={(_, index) =>
                                    data[index]?.label || ""
                                }
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#64748b",
                                    fontSize: 12,
                                }}
                                tickMargin={12}
                            />

                            <YAxis
                                domain={[0, 10]}
                                ticks={[
                                    0,
                                    2,
                                    4,
                                    6,
                                    8,
                                    10,
                                ]}
                                tickFormatter={(value) => value}
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#64748b",
                                    fontSize: 12,
                                }}
                                width={48}
                            />

                            <Tooltip
                                cursor={{
                                    stroke: "#E2E8F0",
                                    strokeDasharray: "4 4",
                                }}
                                content={
                                    <CustomTooltip />
                                }
                            />

                            <Legend
                                verticalAlign="top"
                                align="right"
                                iconType="circle"
                                iconSize={6}
                                wrapperStyle={{
                                    paddingBottom:
                                        "16px",
                                    fontSize:
                                        "12px",
                                }}
                            />

                            <Line
                                type="natural"
                                dataKey="coding"
                                name="Coding"
                                stroke="#7c3aed"
                                strokeWidth={3}
                                connectNulls
                                dot={{
                                    r: 3,
                                    fill: "#7c3aed",
                                    stroke: "#ffffff",
                                    strokeWidth: 2,
                                }}
                                activeDot={{
                                    r: 8,
                                    stroke: "#ffffff",
                                    strokeWidth: 3,
                                }}
                                animationDuration={1200}
                                animationEasing="ease-out"
                            />

                            <Line
                                type="natural"
                                dataKey="behavioral"
                                name="Behavioral"
                                stroke="#10b981"
                                strokeWidth={3}
                                connectNulls
                                dot={{
                                    r: 3,
                                    fill: "#10b981",
                                    stroke: "#ffffff",
                                    strokeWidth: 2,
                                }}
                                activeDot={{
                                    r: 8,
                                    stroke: "#ffffff",
                                    strokeWidth: 3,
                                }}
                                animationDuration={1200}
                                animationEasing="ease-out"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </section>
    );
}