import type {
    CareerCoachReport,
} from "./types";

type AICoachProps = {
    report: CareerCoachReport | null;
    loading: boolean;
};

export default function AICoach({
    report,
    loading,
}: AICoachProps) {
    if (loading) {
        return (
            <div className="bg-white border rounded-3xl p-6 shadow-sm">
                <div className="h-6 w-40 bg-zinc-100 rounded mb-4" />
                <div className="h-4 w-full bg-zinc-100 rounded mb-3" />
                <div className="h-4 w-3/4 bg-zinc-100 rounded" />
            </div>
        );
    }

    if (!report) {
        return (
            <div className="bg-white border rounded-3xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold">
                    AI Career Coach
                </h2>

                <p className="text-zinc-500 mt-3">
                    Complete a resume upload or interview to generate personalized coaching.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white border rounded-3xl p-6 shadow-sm">

            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-2xl font-bold">
                        AI Career Coach
                    </h2>

                    <p className="text-zinc-500 mt-1">
                        Personalized guidance from your resume and interview data.
                    </p>
                </div>

                <div className="text-3xl">
                    🤖
                </div>

            </div>

            <div className="mt-6 rounded-2xl bg-violet-50 p-5">

                <div className="flex items-center justify-between">

                    <div>
                        <div className="text-sm font-semibold text-violet-700">
                            Career Readiness
                        </div>

                        <div className="text-4xl font-bold text-violet-700 mt-2">
                            {report.career_readiness}%
                        </div>
                    </div>

                    <div className="text-violet-700 font-semibold">
                        Target: 90%
                    </div>

                </div>

                <div className="mt-5 h-3 bg-white rounded-full overflow-hidden">

                    <div
                        className="h-full bg-violet-600 rounded-full"
                        style={{
                            width: `${report.career_readiness}%`,
                        }}
                    />

                </div>

            </div>

            <p className="text-zinc-600 mt-5 leading-7">
                {report.summary}
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                    <h3 className="font-semibold">
                        Strengths
                    </h3>

                    <ul className="mt-3 space-y-2 text-zinc-600">
                        {report.strengths?.slice(0, 3).map(
                            (
                                item,
                                index
                            ) => (
                                <li key={index}>
                                    ✓ {item}
                                </li>
                            )
                        )}
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold">
                        Focus Areas
                    </h3>

                    <ul className="mt-3 space-y-2 text-zinc-600">
                        {report.focus_areas?.slice(0, 3).map(
                            (
                                item,
                                index
                            ) => (
                                <li key={index}>
                                    • {item}
                                </li>
                            )
                        )}
                    </ul>
                </div>

            </div>

            <div className="mt-6 border-t pt-5">

                <h3 className="font-semibold">
                    Weekly Plan
                </h3>

                <ul className="mt-3 space-y-2 text-zinc-600">
                    {report.weekly_plan?.slice(0, 3).map(
                        (
                            item,
                            index
                        ) => (
                            <li key={index}>
                                {index + 1}. {item}
                            </li>
                        )
                    )}
                </ul>

            </div>
            <div className="mt-6 border-t pt-5">

                <h3 className="font-semibold">
                    Company Readiness
                </h3>

                <div className="mt-4 space-y-4">

                    {report.target_roles?.map(
                        (
                            item,
                            index
                        ) => (

                            <div
                                key={index}
                                className="rounded-2xl border p-4"
                            >

                                <div className="flex items-center justify-between">

                                    <div>

                                        <div className="font-semibold">
                                            {item.company}
                                        </div>

                                        <div className="text-sm text-zinc-500">
                                            {item.role}
                                        </div>

                                    </div>

                                    <div className="font-bold text-violet-600">
                                        {item.readiness}%
                                    </div>

                                </div>

                                <div className="mt-3 h-2 bg-zinc-100 rounded-full overflow-hidden">

                                    <div
                                        className="h-full bg-violet-600 rounded-full"
                                        style={{
                                            width: `${item.readiness}%`,
                                        }}
                                    />

                                </div>

                            </div>

                        )
                    )}

                </div>

            </div>
        </div>
    );
}