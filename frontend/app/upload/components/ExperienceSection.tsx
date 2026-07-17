import type { ResumeAnalysis } from "../types";

type ExperienceSectionProps = {
    analysis: ResumeAnalysis;
};

export default function ExperienceSection({
    analysis,
}: ExperienceSectionProps) {
    const experienceItems = analysis.experience ?? [];

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-950">
                    Experience
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Professional experience identified from your resume.
                </p>
            </div>

            {experienceItems.length > 0 ? (
                <div className="space-y-5">
                    {experienceItems.map((item, index) => (
                        <article
                            key={`${item.company}-${item.title}-${index}`}
                            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-violet-100 hover:shadow-lg"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                                        Experience {index + 1}
                                    </p>

                                    <h3 className="mt-2 text-xl font-bold text-slate-950">
                                        {item.title || "Position"}
                                    </h3>

                                    <p className="mt-1 font-medium text-slate-600">
                                        {item.company ||
                                            "Company not identified"}
                                    </p>
                                </div>

                                {item.dates && (
                                    <span className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                                        {item.dates}
                                    </span>
                                )}
                            </div>

                            <div className="mt-5 border-t border-slate-100 pt-5">
                                <p className="text-sm leading-7 text-slate-600">
                                    {item.description ||
                                        "No experience description was extracted."}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                    <p className="font-semibold text-slate-700">
                        No experience found
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        Add internships, freelance work, or professional
                        experience to strengthen your resume.
                    </p>
                </div>
            )}
        </div>
    );
}