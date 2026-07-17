import type {
    ResumeAnalysis,
} from "../types";

type ProjectsTabProps = {
    analysis: ResumeAnalysis;
};

export default function ProjectsTab({
    analysis,
}: ProjectsTabProps) {
    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-950">
                    Projects
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Projects extracted from your resume.
                </p>
            </div>

            {analysis.projects?.length ? (
                <div className="grid gap-5 lg:grid-cols-2">
                    {analysis.projects.map(
                        (project, index) => (
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
                                    hover:-translate-y-1
                                    hover:shadow-lg
                                "
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                                            Project {index + 1}
                                        </p>

                                        <h3 className="mt-2 text-xl font-bold text-slate-950">
                                            {project.name ||
                                                "Untitled Project"}
                                        </h3>
                                    </div>

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-lg font-bold text-violet-700">
                                        {index + 1}
                                    </div>
                                </div>

                                <p className="mt-4 text-sm leading-7 text-slate-600">
                                    {project.description ||
                                        "No project description was extracted."}
                                </p>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    {project.technologies?.length ? (
                                        project.technologies.map(
                                            (
                                                technology,
                                                technologyIndex
                                            ) => (
                                                <span
                                                    key={
                                                        technologyIndex
                                                    }
                                                    className="
                                                        rounded-full
                                                        border
                                                        border-violet-100
                                                        bg-violet-50
                                                        px-3
                                                        py-1.5
                                                        text-xs
                                                        font-semibold
                                                        text-violet-700
                                                    "
                                                >
                                                    {technology}
                                                </span>
                                            )
                                        )
                                    ) : (
                                        <span className="text-sm text-slate-400">
                                            No technologies identified.
                                        </span>
                                    )}
                                </div>
                            </article>
                        )
                    )}
                </div>
            ) : (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                    <p className="font-semibold text-slate-700">
                        No projects found
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        Add relevant projects to strengthen your resume.
                    </p>
                </div>
            )}
        </div>
    );
}