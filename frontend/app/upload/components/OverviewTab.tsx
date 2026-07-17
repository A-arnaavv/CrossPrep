import ATSScoreCard from "@/components/resume/ATSScoreCard";

import type {
    ResumeAnalysis,
} from "../types";

type OverviewTabProps = {
    analysis: ResumeAnalysis;
};

export default function OverviewTab({
    analysis,
}: OverviewTabProps) {
    return (
        <div className="space-y-6">

            <ATSScoreCard score={analysis.ats_score} />

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                <section className="rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6 shadow-sm">
                    <div className="mb-5">
                        <h3 className="text-lg font-bold text-emerald-900">
                            Strengths
                        </h3>

                        <p className="mt-1 text-sm text-emerald-700/70">
                            What already works well in your resume.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {analysis.strengths?.length ? (
                            analysis.strengths.map(
                                (item, index) => (
                                    <div
                                        key={index}
                                        className="rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm"
                                    >
                                        {item}
                                    </div>
                                )
                            )
                        ) : (
                            <p className="text-sm text-emerald-700">
                                No strengths were returned.
                            </p>
                        )}
                    </div>
                </section>

                <section className="rounded-3xl border border-rose-100 bg-rose-50/60 p-6 shadow-sm">
                    <div className="mb-5">
                        <h3 className="text-lg font-bold text-rose-900">
                            Areas to Improve
                        </h3>

                        <p className="mt-1 text-sm text-rose-700/70">
                            Changes that can strengthen your resume.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {analysis.weaknesses?.length ? (
                            analysis.weaknesses.map(
                                (item, index) => (
                                    <div
                                        key={index}
                                        className="rounded-2xl border border-rose-100 bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm"
                                    >
                                        {item}
                                    </div>
                                )
                            )
                        ) : (
                            <p className="text-sm text-rose-700">
                                No weaknesses were returned.
                            </p>
                        )}
                    </div>
                </section>

            </div>

            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-950">
                    Missing Skills
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Keywords and capabilities that could improve role alignment.
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                    {analysis.missing_skills?.length ? (
                        analysis.missing_skills.map(
                            (skill, index) => (
                                <span
                                    key={index}
                                    className="rounded-full border border-violet-100 bg-violet-50 px-3.5 py-1.5 text-sm font-medium text-violet-700"
                                >
                                    + {skill}
                                </span>
                            )
                        )
                    ) : (
                        <p className="text-sm text-slate-500">
                            No missing skills were identified.
                        </p>
                    )}
                </div>
            </section>

            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-950">
                    AI Recommendations
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    High-impact improvements generated from your resume analysis.
                </p>

                <div className="mt-5 space-y-3">
                    {analysis.recommendations?.length ? (
                        analysis.recommendations.map(
                            (
                                recommendation,
                                index
                            ) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 rounded-2xl border border-violet-100 bg-violet-50/50 p-4"
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-sm font-bold text-violet-700">
                                        {index + 1}
                                    </div>

                                    <p className="text-sm leading-6 text-slate-700">
                                        {recommendation.replace(
                                            /\*\*/g,
                                            ""
                                        )}
                                    </p>
                                </div>
                            )
                        )
                    ) : (
                        <p className="text-sm text-slate-500">
                            No recommendations were returned.
                        </p>
                    )}
                </div>
            </section>

        </div>
    );
}