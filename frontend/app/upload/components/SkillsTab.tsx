import type { ResumeAnalysis } from "../types";

type SkillsTabProps = {
    analysis: ResumeAnalysis;
};

export default function SkillsTab({
    analysis,
}: SkillsTabProps) {
    return (
        <div>

            <h2 className="text-2xl font-bold mb-4">
                Skills
            </h2>

            <div className="flex flex-wrap gap-3">

                {analysis.skills?.map(
                    (
                        skill,
                        index
                    ) => (

                        <span
                            key={index}
                            className="
                                px-4
                                py-2
                                rounded-full
                                bg-violet-100
                                text-violet-700
                                text-sm
                                font-medium
                                hover:bg-violet-200
                                transition
                            "
                        >
                            {skill}
                        </span>

                    )
                )}

            </div>

        </div>
    );
}