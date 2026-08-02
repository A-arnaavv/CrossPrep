import {
    BrainCircuit,
    CheckCircle2,
    FileSearch,
    TrendingUp,
    Upload,
} from "lucide-react";

const steps = [
    {
        number: "01",
        icon: Upload,
        title: "Build your profile",
        description:
            "Upload your resume, select your target role, and define the areas you want to improve.",
    },
    {
        number: "02",
        icon: FileSearch,
        title: "Understand your gaps",
        description:
            "CrossPrep analyzes your profile and identifies the skills, experience, and interview areas that need attention.",
    },
    {
        number: "03",
        icon: BrainCircuit,
        title: "Practise intelligently",
        description:
            "Complete mock interviews, coding challenges, and personalized preparation sessions.",
    },
    {
        number: "04",
        icon: TrendingUp,
        title: "Improve continuously",
        description:
            "Review feedback, measure your progress, and focus on the next action with the highest impact.",
    },
];

export default function WorkflowSection() {
    return (
        <section
            id="workflow"
            className="scroll-mt-24 border-y border-slate-200/70 bg-white"
        >
            <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
                        A clearer preparation workflow
                    </div>

                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                        Move from uncertainty to interview readiness
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-600">
                        CrossPrep gives you a repeatable system for understanding your
                        profile, practising effectively, and improving over time.
                    </p>
                </div>

                <div className="mt-16 grid gap-6 lg:grid-cols-2">
                    {steps.map((step) => {
                        const Icon = step.icon;

                        return (
                            <article
                                key={step.number}
                                className="group relative rounded-3xl border border-slate-200 bg-[#f8f9ff] p-7 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-violet-200 hover:bg-white hover:shadow-2xl hover:shadow-violet-100/60 sm:p-8"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-500">
                                            Step {step.number}
                                        </p>

                                        <h3 className="mt-2 text-xl font-bold text-slate-950">
                                            {step.title}
                                        </h3>

                                        <p className="mt-3 leading-7 text-slate-600">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-violet-700">
                                    <CheckCircle2 className="h-4 w-4" />

                                    Built into your CrossPrep workflow
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}