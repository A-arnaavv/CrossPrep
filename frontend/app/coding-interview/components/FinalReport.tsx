import type {
    CodingInterviewReport,
} from "../types";

type FinalReportProps = {
    report: CodingInterviewReport;
    role: string;
    language: string;
    onRestart: () => void;
};

function getPerformanceLabel(
    averageScore: number
) {
    if (averageScore >= 8.5) {
        return "Excellent";
    }

    if (averageScore >= 7) {
        return "Strong";
    }

    if (averageScore >= 5) {
        return "Good";
    }

    return "Needs Practice";
}

function getScorePercentage(
    score: number,
    maxScore: number
) {
    return Math.min(
        100,
        Math.round(
            (score / maxScore) * 100
        )
    );
}

export default function FinalReport({
    report,
    role,
    language,
    onRestart,
}: FinalReportProps) {
    const averageScore =
        Number(report.average_score || 0);

    const totalScore =
        Number(report.total_score || 0);

    const totalPercentage =
        getScorePercentage(
            totalScore,
            40
        );

    const performanceLabel =
        getPerformanceLabel(
            averageScore
        );

    return (
        <div
            className="
                max-w-5xl
                mx-auto
                mt-10
                border
                rounded-3xl
                p-8
                bg-white
                shadow-sm
            "
        >

            <div
                className="
                    flex
                    items-start
                    justify-between
                    gap-6
                "
            >

                <div>

                    <div
                        className="
                            text-sm
                            text-violet-600
                            font-semibold
                        "
                    >
                        Coding Interview Complete
                    </div>

                    <h1
                        className="
                            text-4xl
                            font-bold
                            mt-2
                        "
                    >
                        {role} Interview Report
                    </h1>

                    <p className="text-zinc-500 mt-2">
                        Language: {language}
                    </p>

                </div>

                <div
                    className="
                        px-4
                        py-2
                        rounded-full
                        bg-violet-100
                        text-violet-700
                        font-semibold
                    "
                >
                    {performanceLabel}
                </div>

            </div>

            <div
                className="
                    mt-8
                    border
                    rounded-3xl
                    p-6
                    bg-gradient-to-r
                    from-violet-50
                    to-purple-50
                "
            >

                <div className="text-zinc-500">
                    Overall Score
                </div>

                <div
                    className="
                        flex
                        items-end
                        gap-3
                        mt-2
                    "
                >

                    <div
                        className="
                            text-6xl
                            font-bold
                            text-violet-600
                        "
                    >
                        {totalScore}
                    </div>

                    <div
                        className="
                            text-2xl
                            font-semibold
                            text-zinc-500
                            mb-2
                        "
                    >
                        /40
                    </div>

                </div>

                <div
                    className="
                        mt-5
                        h-4
                        bg-white
                        rounded-full
                        overflow-hidden
                    "
                >

                    <div
                        className="
                            h-full
                            bg-violet-600
                            rounded-full
                        "
                        style={{
                            width: `${totalPercentage}%`,
                        }}
                    />

                </div>

                <div
                    className="
                        flex
                        justify-between
                        text-sm
                        text-zinc-500
                        mt-2
                    "
                >
                    <span>
                        Average: {averageScore}/10
                    </span>

                    <span>
                        {totalPercentage}%
                    </span>
                </div>

            </div>

            <div
                className="
                    mt-8
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-5
                "
            >

                {report.questions?.map(
                    (
                        item,
                        index
                    ) => {
                        const questionScore =
                            Number(item.score || 0);

                        const questionPercentage =
                            getScorePercentage(
                                questionScore,
                                10
                            );

                        const status =
                            questionScore >= 8
                                ? "Excellent"
                                : questionScore >= 6
                                    ? "Good"
                                    : questionScore >= 4
                                        ? "Partial"
                                        : "Needs Work";

                        return (
                            <div
                                key={index}
                                className="
                                    border
                                    rounded-2xl
                                    p-5
                                    bg-white
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >

                                    <div>

                                        <div className="font-semibold">
                                            Question {item.number}
                                        </div>

                                        <div
                                            className="
                                                text-sm
                                                text-zinc-500
                                                mt-1
                                            "
                                        >
                                            Coding challenge
                                        </div>

                                    </div>

                                    <div
                                        className="
                                            text-2xl
                                            font-bold
                                            text-violet-600
                                        "
                                    >
                                        {questionScore}/10
                                    </div>

                                </div>

                                <div
                                    className="
                                        mt-4
                                        h-3
                                        bg-zinc-100
                                        rounded-full
                                        overflow-hidden
                                    "
                                >

                                    <div
                                        className="
                                            h-full
                                            bg-violet-600
                                            rounded-full
                                        "
                                        style={{
                                            width: `${questionPercentage}%`,
                                        }}
                                    />

                                </div>

                                <div
                                    className="
                                        flex
                                        justify-between
                                        text-sm
                                        text-zinc-500
                                        mt-2
                                    "
                                >
                                    <span>
                                        {status}
                                    </span>

                                    <span>
                                        {questionPercentage}%
                                    </span>
                                </div>

                            </div>
                        );
                    }
                )}

            </div>

            <div
                className="
                    mt-8
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-5
                "
            >

                <div
                    className="
                        border
                        rounded-2xl
                        p-6
                        bg-zinc-50
                    "
                >

                    <h2 className="text-xl font-bold">
                        Strengths
                    </h2>

                    <ul
                        className="
                            mt-4
                            space-y-3
                            text-zinc-600
                        "
                    >

                        {report.strengths?.map(
                            (
                                item: string,
                                index: number
                            ) => (

                                <li key={index}>
                                    ✓ {item}
                                </li>

                            )
                        )}

                    </ul>

                </div>

                <div
                    className="
                        border
                        rounded-2xl
                        p-6
                        bg-zinc-50
                    "
                >

                    <h2 className="text-xl font-bold">
                        Recommended Focus
                    </h2>

                    <ul
                        className="
                            mt-4
                            space-y-3
                            text-zinc-600
                        "
                    >

                        {report.improvements?.map(
                            (
                                item: string,
                                index: number
                            ) => (

                                <li key={index}>
                                    • {item}
                                </li>

                            )
                        )}

                    </ul>

                </div>

            </div>

            <div
                className="
                    mt-8
                    border
                    rounded-2xl
                    p-6
                    bg-white
                "
            >

                <h2 className="text-xl font-bold">
                    Overall Summary
                </h2>

                <p
                    className="
                        text-zinc-600
                        mt-3
                        leading-7
                    "
                >
                    {report.summary}
                </p>

            </div>

            <div
                className="
                    mt-8
                    flex
                    justify-end
                "
            >

                <button
                    onClick={onRestart}
                    className="
                        bg-violet-600
                        text-white
                        px-6
                        py-3
                        rounded-xl
                    "
                >
                    Start New Coding Interview
                </button>

            </div>

        </div>
    );
}