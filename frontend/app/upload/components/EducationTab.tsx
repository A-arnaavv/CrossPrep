import type {
    ResumeAnalysis,
    ResumeEducation,
} from "../types";

type EducationTabProps = {
    analysis: ResumeAnalysis;
};

export default function EducationTab({
    analysis,
}: EducationTabProps) {
    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-950">
                    Education
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Academic qualifications extracted from your resume.
                </p>
            </div>

            {analysis.education?.length ? (
                <div className="space-y-5">
                    {analysis.education.map(
                        (
                            item: ResumeEducation,
                            index: number
                        ) => (
                            <article
                                key={index}
                                className="
                                    rounded-3xl
                                    border
                                    border-slate-100
                                    bg-white
                                    p-6
                                    shadow-sm
                                    transition-all
                                    duration-300
                                    hover:border-violet-100
                                    hover:shadow-lg
                                "
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                                            Education {index + 1}
                                        </p>

                                        <h3 className="mt-2 text-xl font-bold text-slate-950">
                                            {item.degree}
                                        </h3>

                                        <p className="mt-1 font-medium text-slate-600">
                                            {item.institution}
                                        </p>
                                    </div>

                                    {item.dates && (
                                        <span
                                            className="
                                                w-fit
                                                rounded-full
                                                bg-slate-100
                                                px-3
                                                py-1.5
                                                text-xs
                                                font-semibold
                                                text-slate-600
                                            "
                                        >
                                            {item.dates}
                                        </span>
                                    )}
                                </div>

                                {item.score && (
                                    <div className="mt-5 border-t border-slate-100 pt-5">
                                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            Score
                                        </p>

                                        <p className="mt-2 text-base font-medium text-slate-700">
                                            {item.score}
                                        </p>
                                    </div>
                                )}
                            </article>
                        )
                    )}
                </div>
            ) : (
                <div
                    className="
                        rounded-3xl
                        border
                        border-dashed
                        border-slate-200
                        bg-slate-50
                        p-10
                        text-center
                    "
                >
                    <p className="text-lg font-semibold text-slate-700">
                        No education found
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                        Your education details will appear here after your
                        resume is analyzed.
                    </p>
                </div>
            )}
        </div>
    );
}