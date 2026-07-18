import {
    BriefcaseBusiness,
    Clock3,
    Gauge,
} from "lucide-react";

type InterviewSidebarProps = {
    role: string;
    level: string;
    totalQuestions: number;
};

export default function InterviewSidebar({
    role,
    level,
    totalQuestions,
}: InterviewSidebarProps) {
    return (
        <aside className="space-y-3 lg:sticky lg:top-4">
            <InterviewDetails
                role={role}
                level={level}
                totalQuestions={totalQuestions}
            />

            <StarFramework />

            <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4">
                <div className="flex items-start gap-3">
                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />

                    <div>
                        <h3 className="text-sm font-bold text-violet-950">
                            Take your time
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-violet-700">
                            Focus on clarity and specific examples rather than
                            writing the longest possible response.
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

type InterviewDetailsProps = {
    role: string;
    level: string;
    totalQuestions: number;
};

function InterviewDetails({
    role,
    level,
    totalQuestions,
}: InterviewDetailsProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                    <BriefcaseBusiness className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                    <p className="text-[11px] font-medium text-slate-500">
                        Interview
                    </p>

                    <p className="truncate text-sm font-bold text-slate-900">
                        {role}
                    </p>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
                <DetailItem
                    icon={Gauge}
                    label="Level"
                    value={level}
                />

                <DetailItem
                    icon={BriefcaseBusiness}
                    label="Questions"
                    value={String(totalQuestions)}
                />
            </div>
        </section>
    );
}

type DetailItemProps = {
    label: string;
    value: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
};

function DetailItem({
    label,
    value,
    icon: Icon,
}: DetailItemProps) {
    return (
        <div className="rounded-xl bg-slate-50 px-3 py-2.5">
            <div className="flex items-center gap-1.5 text-slate-400">
                <Icon className="h-3.5 w-3.5" />

                <p className="text-[9px] font-semibold uppercase tracking-wider">
                    {label}
                </p>
            </div>

            <p className="mt-1 truncate text-xs font-bold text-slate-800">
                {value}
            </p>
        </div>
    );
}

function StarFramework() {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-600">
                    Answering framework
                </p>

                <h2 className="mt-1 text-sm font-bold text-slate-950">
                    Use the STAR method
                </h2>
            </div>

            <div className="mt-3 space-y-1.5">
                <FrameworkItem
                    letter="S"
                    title="Situation"
                    description="Set the context."
                />

                <FrameworkItem
                    letter="T"
                    title="Task"
                    description="Explain your responsibility."
                />

                <FrameworkItem
                    letter="A"
                    title="Action"
                    description="Describe what you did."
                />

                <FrameworkItem
                    letter="R"
                    title="Result"
                    description="Share the outcome."
                />
            </div>
        </section>
    );
}

type FrameworkItemProps = {
    letter: string;
    title: string;
    description: string;
};

function FrameworkItem({
    letter,
    title,
    description,
}: FrameworkItemProps) {
    return (
        <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3 py-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-[11px] font-bold text-violet-700">
                {letter}
            </div>

            <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800">
                    {title}
                </p>

                <p className="text-[10px] leading-4 text-slate-500">
                    {description}
                </p>
            </div>
        </div>
    );
}