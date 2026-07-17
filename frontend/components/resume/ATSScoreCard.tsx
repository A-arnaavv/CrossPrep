type ATSScoreCardProps = {
    score: number | null | undefined;
};

type ScoreConfig = {
    label: string;
    description: string;
    color: string;
    softColor: string;
    borderColor: string;
    textColor: string;
};

function getScoreConfig(score: number): ScoreConfig {
    if (score >= 90) {
        return {
            label: "Excellent",
            description:
                "Your resume is highly optimized and should perform well with most applicant tracking systems.",
            color: "#10b981",
            softColor: "#ecfdf5",
            borderColor: "#a7f3d0",
            textColor: "#047857",
        };
    }

    if (score >= 75) {
        return {
            label: "Good",
            description:
                "Your resume has a strong foundation. A few targeted improvements could increase its ATS performance.",
            color: "#3b82f6",
            softColor: "#eff6ff",
            borderColor: "#bfdbfe",
            textColor: "#1d4ed8",
        };
    }

    if (score >= 60) {
        return {
            label: "Fair",
            description:
                "Your resume is readable, but stronger keywords and clearer impact statements would improve it.",
            color: "#f59e0b",
            softColor: "#fffbeb",
            borderColor: "#fde68a",
            textColor: "#b45309",
        };
    }

    return {
        label: "Needs Improvement",
        description:
            "Your resume may struggle with applicant tracking systems. Focus on structure, relevant keywords, and measurable achievements.",
        color: "#f43f5e",
        softColor: "#fff1f2",
        borderColor: "#fecdd3",
        textColor: "#be123c",
    };
}

function getCompatibility(score: number) {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Strong";
    if (score >= 55) return "Moderate";
    return "Limited";
}

function getKeywordCoverage(score: number) {
    if (score >= 85) return "High";
    if (score >= 65) return "Moderate";
    return "Low";
}

function getRecruiterReadiness(score: number) {
    if (score >= 85) return "Ready";
    if (score >= 65) return "Nearly ready";
    return "Needs work";
}

export default function ATSScoreCard({
    score,
}: ATSScoreCardProps) {
    const normalizedScore = Math.min(
        100,
        Math.max(0, Math.round(score ?? 0))
    );

    const config = getScoreConfig(normalizedScore);

    const metrics = [
        {
            label: "ATS compatibility",
            value: getCompatibility(normalizedScore),
        },
        {
            label: "Keyword coverage",
            value: getKeywordCoverage(normalizedScore),
        },
        {
            label: "Recruiter readiness",
            value: getRecruiterReadiness(normalizedScore),
        },
    ];

    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p className="text-sm font-semibold text-violet-600">
                        Resume health
                    </p>

                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
                        ATS performance
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                        See how effectively your resume may perform with
                        applicant tracking systems.
                    </p>
                </div>

                <span
                    className="w-fit rounded-full border px-4 py-2 text-sm font-semibold"
                    style={{
                        color: config.textColor,
                        backgroundColor: config.softColor,
                        borderColor: config.borderColor,
                    }}
                >
                    {config.label}
                </span>
            </div>

            {/* Score and metrics */}
            <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
                {/* Score */}
                <div>
                    <div className="flex items-end justify-between gap-4">
                        <div className="flex items-end gap-2">
                            <span className="text-6xl font-bold tracking-tight text-slate-950">
                                {normalizedScore}
                            </span>

                            <span className="pb-2 text-base font-semibold text-slate-400">
                                / 100
                            </span>
                        </div>

                        <span
                            className="pb-2 text-sm font-bold"
                            style={{
                                color: config.textColor,
                            }}
                        >
                            {normalizedScore}%
                        </span>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-slate-200">
                        <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                                width: `${normalizedScore}%`,
                                backgroundColor: config.color,
                            }}
                        />
                    </div>

                    <div className="mt-3 flex justify-between text-xs font-medium text-slate-400">
                        <span>Needs work</span>
                        <span>Competitive</span>
                        <span>Excellent</span>
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                    {metrics.map((metric) => (
                        <div
                            key={metric.label}
                            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
                        >
                            <p className="text-sm font-medium text-slate-500">
                                {metric.label}
                            </p>

                            <p className="text-sm font-bold text-slate-900">
                                {metric.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Insight */}
            <div
                className="mt-6 rounded-2xl border p-5"
                style={{
                    backgroundColor: config.softColor,
                    borderColor: config.borderColor,
                }}
            >
                <div className="flex items-start gap-4">
                    <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg font-bold shadow-sm"
                        style={{
                            color: config.textColor,
                        }}
                    >
                        ✦
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-950">
                            AI insight
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                            {config.description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}