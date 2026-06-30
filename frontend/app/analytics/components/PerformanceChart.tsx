import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

type ChartPoint = {
    interview: number;
    score: number;
};

type PerformanceChartProps = {
    data: ChartPoint[];
};

export default function PerformanceChart({
    data,
}: PerformanceChartProps) {
    return (
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

                    <LineChart data={data}>

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
    );
}