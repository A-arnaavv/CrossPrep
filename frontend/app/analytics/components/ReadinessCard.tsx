import {
    CheckCircle2,
    CircleAlert,
    Gauge,
    Sparkles,
    Target,
} from "lucide-react";

type ReadinessCardProps = {
    averageScore: string;
};

type ReadinessState = {
    label: string;
    description: string;
    icon: typeof Target;
};

function getReadinessState(score: number): ReadinessState {
    if (score >= 8) {
        return {
            label: "Interview Ready",
            description:
                "Your recent performance suggests you are operating at a strong interview level.",
            icon: CheckCircle2,
        };
    }

    if (score >= 6) {
        return {
            label: "Progressing Well",
            description:
                "You are close to interview-ready. A few focused practice sessions can improve consistency.",
            icon: Target,
        };
    }

    return {
        label: "Building Readiness",
        description:
            "Keep practicing core concepts and reviewing feedback to strengthen your overall performance.",
        icon: CircleAlert,
    };
}

export default function ReadinessCard({
    averageScore,
}: ReadinessCardProps) {
    const parsedAverage = Number(averageScore);

    const safeAverage = Number.isFinite(parsedAverage)
        ? Math.max(0, Math.min(10, parsedAverage))
        : 0;

    const readiness = Math.round(safeAverage * 10);

    const readinessState =
        getReadinessState(safeAverage);

    const StatusIcon = readinessState.icon;

    return (
        <section className="relative mt-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-700 p-6 text-white shadow-xl sm:p-8">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-fuchsia-300/20 blur-3xl" />

            <div className="relative">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-violet-50 backdrop-blur-sm">
                            <Gauge className="h-4 w-4" />
                            Interview Readiness
                        </div>

                        <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                            {readiness}%
                        </h2>

                        <div className="mt-3 flex items-center gap-2">
                            <StatusIcon className="h-5 w-5 text-violet-100" />

                            <p className="text-lg font-semibold text-white">
                                {readinessState.label}
                            </p>
                        </div>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
                        <Sparkles className="h-7 w-7 text-violet-100" />
                    </div>
                </div>

                <div className="mt-7">
                    <div className="flex items-center justify-between text-sm font-medium text-violet-100">
                        <span>Readiness progress</span>
                        <span>{readiness}/100</span>
                    </div>

                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/20">
                        <div
                            className="h-full rounded-full bg-white transition-all duration-500"
                            style={{
                                width: `${readiness}%`,
                            }}
                        />
                    </div>
                </div>

                <p className="mt-6 max-w-2xl text-sm leading-6 text-violet-100 sm:text-base">
                    {readinessState.description}
                </p>

                <p className="mt-3 text-xs leading-5 text-violet-200">
                    Readiness is estimated from your current
                    average interview score and should be used
                    as a progress indicator, not a hiring
                    guarantee.
                </p>
            </div>
        </section>
    );
}