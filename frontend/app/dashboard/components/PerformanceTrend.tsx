import type { DashboardStats } from "./types";

type PerformanceTrendProps = {
    stats: DashboardStats;
};

export default function PerformanceTrend({
    stats,
}: PerformanceTrendProps) {

    const value =
        Number(stats.average_score || 0);

    const bars = [
        Math.max(value - 3, 2),
        Math.max(value - 2, 3),
        Math.max(value - 1, 4),
        value,
    ];

    return (

        <div
            className="
                mt-8
                bg-white
                border
                rounded-3xl
                p-6
                shadow-sm
            "
        >

            <div className="flex justify-between items-center">

                <div>

                    <h2 className="text-2xl font-bold">
                        Performance Trend
                    </h2>

                    <p className="text-zinc-500 mt-1">
                        Your interview score progression.
                    </p>

                </div>

            </div>

            <div
                className="
                    mt-10
                    flex
                    items-end
                    justify-between
                    h-48
                "
            >

                {bars.map(
                    (
                        bar,
                        index
                    ) => (

                        <div
                            key={index}
                            className="
                                flex
                                flex-col
                                items-center
                                gap-3
                            "
                        >

                            <div
                                className="
                                    w-12
                                    rounded-t-xl
                                    bg-gradient-to-t
                                    from-violet-600
                                    to-purple-400
                                "
                                style={{
                                    height: `${bar * 14}px`,
                                }}
                            />

                            <span className="text-xs text-zinc-500">
                                Q{index + 1}
                            </span>

                        </div>

                    )
                )}

            </div>

        </div>

    );

}