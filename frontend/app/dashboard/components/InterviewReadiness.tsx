import type { DashboardStats } from "./types";

type InterviewReadinessProps = {
    stats: DashboardStats;
};

export default function InterviewReadiness({
    stats,
}: InterviewReadinessProps) {

    const readiness = Math.min(
        100,
        Math.round(
            stats.average_score * 10
        )
    );

    let label = "Needs Practice";

    if (readiness >= 85) {
        label = "Interview Ready";
    }
    else if (readiness >= 70) {
        label = "Strong Candidate";
    }
    else if (readiness >= 50) {
        label = "Making Progress";
    }

    return (

        <div
            className="
                mt-8
                rounded-3xl
                border
                bg-white
                p-8
                shadow-sm
            "
        >

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-zinc-500">
                        Overall Interview Readiness
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                        {readiness}%
                    </h2>

                    <p className="text-violet-600 font-semibold mt-2">
                        {label}
                    </p>

                </div>

            </div>

            <div className="mt-6 h-5 bg-zinc-100 rounded-full overflow-hidden">

                <div
                    className="
                        h-full
                        rounded-full
                        bg-gradient-to-r
                        from-violet-500
                        to-purple-600
                    "
                    style={{
                        width: `${readiness}%`,
                    }}
                />

            </div>

            <div
                className="
                    mt-4
                    flex
                    justify-between
                    text-sm
                    text-zinc-500
                "
            >

                <span>
                    Current Progress
                </span>

                <span>
                    Target: 90%
                </span>

            </div>

        </div>

    );

}