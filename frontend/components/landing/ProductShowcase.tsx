import {
    BrainCircuit,
    Check,
    ChevronRight,
    FileSearch,
    MessageSquareText,
    Target,
} from "lucide-react";

export default function ProductShowcase() {
    return (
        <section
            id="product"
            className="scroll-mt-24 border-y border-slate-200/70 bg-white"
        >
            <div className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
                <SectionHeading
                    eyebrow="The CrossPrep workspace"
                    title="Everything you need to prepare in one place"
                    description="Move from scattered preparation to a clear workflow built around your profile, goals, and progress."
                />

                <div className="mt-20 space-y-24">
                    <ShowcaseRow
                        icon={<FileSearch className="h-6 w-6" />}
                        eyebrow="Resume Intelligence"
                        title="Understand how recruiters see your profile"
                        description="Upload your resume and receive structured insights into your strengths, missing skills, experience relevance, and likely interview questions."
                        points={[
                            "Role-specific resume analysis",
                            "Skill and experience gap detection",
                            "Personalized interview-question generation",
                        ]}
                        visual={<ResumePreview />}
                    />

                    <ShowcaseRow
                        reverse
                        icon={<BrainCircuit className="h-6 w-6" />}
                        eyebrow="AI Mock Interviews"
                        title="Practise interviews that adapt to your goals"
                        description="Complete focused interview sessions based on your resume, target role, experience level, and previous performance."
                        points={[
                            "Technical and behavioural interviews",
                            "Adaptive follow-up questions",
                            "Actionable feedback after every response",
                        ]}
                        visual={<InterviewPreview />}
                    />

                    <ShowcaseRow
                        icon={<Target className="h-6 w-6" />}
                        eyebrow="Progress Analytics"
                        title="Know what to improve next"
                        description="See how your preparation changes over time and focus your effort on the areas that will have the biggest impact."
                        points={[
                            "Interview-readiness tracking",
                            "Performance trends across sessions",
                            "Clear recommendations for your next step",
                        ]}
                        visual={<AnalyticsPreview />}
                    />
                </div>
            </div>
        </section>
    );
}

function SectionHeading({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description: string;
}) {
    return (
        <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
                {eyebrow}
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                {title}
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
                {description}
            </p>
        </div>
    );
}

function ShowcaseRow({
    icon,
    eyebrow,
    title,
    description,
    points,
    visual,
    reverse = false,
}: {
    icon: React.ReactNode;
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
    visual: React.ReactNode;
    reverse?: boolean;
}) {
    return (
        <div
            className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
        >
            <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                    {icon}
                </div>

                <p className="mt-7 text-sm font-semibold text-violet-600">{eyebrow}</p>

                <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                    {title}
                </h3>

                <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>

                <div className="mt-7 space-y-4">
                    {points.map((point) => (
                        <div key={point} className="flex items-center gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                                <Check className="h-3.5 w-3.5 text-emerald-600" />
                            </span>

                            <span className="font-medium text-slate-700">{point}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-[#f8f9ff] p-5 shadow-xl shadow-violet-100/50 sm:p-7">
                {visual}
            </div>
        </div>
    );
}

function ResumePreview() {
    return (
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-bold text-slate-950">Resume analysis</p>
                    <p className="mt-1 text-sm text-slate-400">
                        Software Engineer profile
                    </p>
                </div>

                <div className="rounded-2xl bg-violet-600 px-4 py-3 text-xl font-bold text-white">
                    86
                </div>
            </div>

            <div className="mt-7 space-y-5">
                <AnalysisRow label="Technical skills" value="88%" />
                <AnalysisRow label="Experience relevance" value="76%" />
                <AnalysisRow label="Resume impact" value="68%" />
            </div>

            <div className="mt-7 rounded-2xl bg-violet-50 p-4">
                <p className="text-sm font-semibold text-violet-700">
                    Recommended improvement
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                    Add measurable outcomes to your recent project experience.
                </p>
            </div>
        </div>
    );
}

function InterviewPreview() {
    return (
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                    <MessageSquareText className="h-5 w-5" />
                </div>

                <div className="flex-1">
                    <p className="font-bold text-slate-950">Behavioural interview</p>
                    <p className="mt-1 text-sm text-slate-400">
                        Communication and leadership
                    </p>
                </div>

                <span className="rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    Ready
                </span>
            </div>

            <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                    Current question
                </p>

                <p className="mt-3 text-lg font-semibold leading-7 text-slate-900">
                    Tell me about a time you handled a difficult technical decision.
                </p>

                <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                    <span>Estimated response: 3 minutes</span>
                    <ChevronRight className="h-4 w-4 text-violet-600" />
                </div>
            </div>
        </div>
    );
}

function AnalyticsPreview() {
    const bars = [40, 52, 47, 65, 72, 84];

    return (
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div>
                <p className="font-bold text-slate-950">Interview readiness</p>
                <p className="mt-1 text-sm text-slate-400">
                    Performance across recent sessions
                </p>
            </div>

            <div className="mt-7 flex h-52 items-end gap-3">
                {bars.map((height, index) => (
                    <div
                        key={index}
                        className="flex flex-1 items-end rounded-xl bg-violet-50"
                        style={{ height: `${height}%` }}
                    >
                        <div className="h-full w-full rounded-xl bg-gradient-to-t from-violet-600 to-violet-400" />
                    </div>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3">
                <span className="text-sm font-semibold text-emerald-700">
                    Readiness improved
                </span>
                <span className="font-bold text-emerald-700">+12%</span>
            </div>
        </div>
    );
}

function AnalysisRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div>
            <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">{label}</span>
                <span className="font-semibold text-slate-500">{value}</span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                    className="h-full rounded-full bg-violet-600"
                    style={{ width: value }}
                />
            </div>
        </div>
    );
}