"use client";

import {
    RadialBarChart,
    RadialBar,
    ResponsiveContainer,
} from "recharts";

export default function ATSScoreCard({
    score,
}: {
    score: number;
}) {
    const data = [
        {
            name: "ATS",
            value: score,
            fill: "#7C3AED",
        },
    ];

    const getLabel = () => {
        if (score >= 85) {
            return "Excellent";
        }

        if (score >= 70) {
            return "Good";
        }

        return "Needs Improvement";
    };

    return (
        <div
            className="
            bg-white
            border
            rounded-3xl
            p-8
            shadow-sm
            mb-8
            "
        >

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h2 className="text-2xl font-bold">
                        ATS Score
                    </h2>

                    <p className="text-zinc-500 mt-1">
                        AI Resume Analysis
                    </p>

                </div>

                <div
                    className="
                    px-4
                    py-2
                    rounded-full
                    bg-violet-100
                    text-violet-700
                    font-medium
                    "
                >
                    {getLabel()}
                </div>

            </div>

            <div className="relative h-72">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <RadialBarChart
                        data={data}
                        innerRadius="75%"
                        outerRadius="100%"
                        startAngle={90}
                        endAngle={-270}
                    >
                        <RadialBar
                            dataKey="value"
                            cornerRadius={20}
                            background
                        />
                    </RadialBarChart>
                </ResponsiveContainer>

                <div
                    className="
                        absolute
                        inset-0
                        flex
                        flex-col
                        items-center
                        justify-center
                        pointer-events-none
                        z-10
                    "
                >

                    <div className="text-7xl font-bold text-zinc-900">
                        {score}
                    </div>

                    <div className="text-zinc-500 mt-2">
                        out of 100
                    </div>

                </div>

            </div>

        </div>
    );
}