import {
    BarChart3,
    Bot,
    BrainCircuit,
    BriefcaseBusiness,
    Code2,
    FileSearch,
} from "lucide-react";

const features = [
    {
        icon: FileSearch,
        title: "Resume Intelligence",
        description:
            "Analyze your resume, uncover gaps, and prepare for questions based on your experience.",
    },
    {
        icon: BrainCircuit,
        title: "AI Mock Interviews",
        description:
            "Practice realistic technical and behavioural interviews with adaptive questions.",
    },
    {
        icon: Code2,
        title: "Coding Practice",
        description:
            "Strengthen your technical skills in a focused interview-style environment.",
    },
    {
        icon: Bot,
        title: "AI Career Coach",
        description:
            "Get personalized guidance for your preparation, career goals, and next steps.",
    },
    {
        icon: BarChart3,
        title: "Progress Analytics",
        description:
            "Track your performance, readiness, consistency, and areas for improvement.",
    },
    {
        icon: BriefcaseBusiness,
        title: "Job Matching",
        description:
            "Compare your profile with target roles and identify the skills you need to improve.",
    },
];

export default function FeaturesSection() {
    return (
        <section
            id="features"
            className="scroll-mt-24 bg-[#f8f9ff]"
        >
            <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
                        One intelligent workspace
                    </div>

                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                        Built around your complete preparation journey
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-600">
                        Every CrossPrep tool works together to make each practice session
                        more focused and useful.
                    </p>
                </div>

                <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <article
                                key={feature.title}
                                className="group rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-violet-200 hover:shadow-2xl hover:shadow-violet-100/70"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-violet-600 group-hover:text-white">
                                    <Icon className="h-6 w-6" />
                                </div>

                                <h3 className="mt-7 text-xl font-bold text-slate-950">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 leading-7 text-slate-600">
                                    {feature.description}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}