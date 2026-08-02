import {
    ArrowRight,
    BarChart3,
    Bell,
    Bot,
    Check,
    Code2,
    FileSearch,
    History,
    LayoutDashboard,
    MessagesSquare,
    Play,
    Settings,
    Target,
    TrendingUp,
    User,
} from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-[-20rem] h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-violet-200/70 blur-[140px]" />
                <div className="absolute right-[-14rem] top-48 h-[34rem] w-[34rem] rounded-full bg-blue-100/80 blur-[140px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-20 sm:px-6 lg:px-8 lg:pb-32 lg:pt-28">
                <div className="landing-reveal-up mx-auto max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-40" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-600" />
                        </span>
                        Your complete AI career preparation workspace
                    </div>

                    <h1 className="mt-8 text-5xl font-bold leading-[1.03] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-[5.2rem]">
                        Prepare smarter.
                        <span className="block text-violet-600">
                            Perform with confidence.
                        </span>
                    </h1>

                    <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
                        CrossPrep brings resume intelligence, mock interviews, coding
                        practice, AI coaching, job matching, and progress analytics into
                        one focused platform.
                    </p>

                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/sign-up"
                            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-7 py-4 font-semibold text-white shadow-xl shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
                        >
                            Start preparing
                            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="#features"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 shadow-sm transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                        >
                            <Play className="h-4 w-4 fill-current" />
                            Explore CrossPrep
                        </Link>
                    </div>

                    <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
                        <TrustItem label="Personalized preparation" />
                        <TrustItem label="Instant AI feedback" />
                        <TrustItem label="Measurable progress" />
                    </div>
                </div>

                <div className="landing-reveal-up-delay relative mx-auto mt-16 max-w-7xl">
                    <div className="absolute inset-8 rounded-[3rem] bg-violet-200/70 blur-3xl" />

                    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_40px_100px_rgba(76,29,149,0.16)]">
                        <div className="grid min-h-[680px] bg-[#f8f9ff] lg:grid-cols-[238px_1fr]">
                            <DashboardSidebar />

                            <div className="p-5 sm:p-7 lg:p-9">
                                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                                    <div>
                                        <p className="text-sm font-semibold text-violet-600">
                                            Dashboard
                                        </p>

                                        <h2 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">
                                            Welcome back, Candidate
                                        </h2>

                                        <p className="mt-2 text-sm text-slate-500 sm:text-base">
                                            Track your resume, interviews, and preparation progress.
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            aria-label="Notifications"
                                            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm"
                                        >
                                            <Bell className="h-5 w-5" />
                                        </button>

                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200"
                                        >
                                            <FileSearch className="h-4 w-4" />
                                            Upload Resume
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                    <MetricCard
                                        icon={<FileSearch className="h-5 w-5" />}
                                        iconClass="bg-violet-100 text-violet-700"
                                        label="Resumes"
                                        value="3"
                                        detail="Total uploaded"
                                    />

                                    <MetricCard
                                        icon={<MessagesSquare className="h-5 w-5" />}
                                        iconClass="bg-emerald-100 text-emerald-700"
                                        label="Interviews"
                                        value="8"
                                        detail="Total sessions"
                                    />

                                    <MetricCard
                                        icon={<Target className="h-5 w-5" />}
                                        iconClass="bg-blue-100 text-blue-700"
                                        label="Average Score"
                                        value="8.4"
                                        detail="Across interviews"
                                    />

                                    <MetricCard
                                        icon={<TrendingUp className="h-5 w-5" />}
                                        iconClass="bg-orange-100 text-orange-600"
                                        label="Completion"
                                        value="72%"
                                        detail="Progress rate"
                                    />
                                </div>

                                <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
                                    <ProgressCard />
                                    <RecentActivity />
                                </div>
                            </div>
                        </div>
                    </div>

                    <FloatingPreviewCard
                        className="landing-float -left-8 top-40 hidden xl:block"
                        icon={<FileSearch className="h-5 w-5" />}
                        title="Resume analyzed"
                        detail="Profile insights updated"
                    />

                    <FloatingPreviewCard
                        className="landing-float -right-8 bottom-36 hidden xl:block"
                        icon={<TrendingUp className="h-5 w-5" />}
                        title="Progress updated"
                        detail="Readiness increased by 12%"
                    />
                </div>
            </div>
        </section>
    );
}

function DashboardSidebar() {
    const links = [
        {
            icon: LayoutDashboard,
            label: "Dashboard",
            active: true,
        },
        {
            icon: FileSearch,
            label: "Resume Intelligence",
        },
        {
            icon: MessagesSquare,
            label: "Interviews",
        },
        {
            icon: Bot,
            label: "AI Coach",
        },
        {
            icon: History,
            label: "History",
        },
        {
            icon: BarChart3,
            label: "Analytics",
        },
        {
            icon: User,
            label: "Profile",
        },
        {
            icon: Settings,
            label: "Settings",
        },
    ];

    return (
        <aside className="hidden flex-col justify-between border-r border-slate-100 bg-white lg:flex">
            <div>
                <div className="flex items-center gap-3 px-6 py-7">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-600 text-white">
                        <Bot className="h-5 w-5" />
                    </div>

                    <div>
                        <p className="text-xl font-bold text-slate-950">
                            CrossPrep
                        </p>

                        <p className="text-xs text-slate-400">
                            AI Career Platform
                        </p>
                    </div>
                </div>

                <nav className="space-y-2 px-4">
                    {links.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.label}
                                className={[
                                    "flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-semibold",
                                    item.active
                                        ? "bg-violet-100 text-violet-700 shadow-sm"
                                        : "text-slate-500",
                                ].join(" ")}
                            >
                                <Icon className="h-5 w-5" />
                                {item.label}
                            </div>
                        );
                    })}
                </nav>
            </div>

            <div className="border-t border-slate-100 p-5">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 font-bold text-white">
                        D
                    </div>

                    <div className="min-w-0">
                        <p className="truncate font-bold text-slate-900">
                            Demo Candidate
                        </p>

                        <p className="truncate text-xs text-slate-500">
                            Software Engineer
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

function MetricCard({
    icon,
    iconClass,
    label,
    value,
    detail,
}: {
    icon: React.ReactNode;
    iconClass: string;
    label: string;
    value: string;
    detail: string;
}) {
    return (
        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60">
            <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconClass}`}
            >
                {icon}
            </div>

            <p className="mt-5 text-sm text-slate-500">
                {label}
            </p>

            <p className="mt-1 text-3xl font-bold text-slate-950">
                {value}
            </p>

            <p className="mt-1 text-xs text-slate-400">
                {detail}
            </p>
        </div>
    );
}

function ProgressCard() {
    const violet = [1, 3, 2, 5, 7, 8];
    const green = [2, 4, 3, 6, 7, 7];

    return (
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div>
                <p className="text-2xl font-bold text-slate-950">
                    Your Progress
                </p>

                <p className="mt-1 text-sm text-slate-500">
                    Interview performance across coding and behavioural sessions.
                </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-4 text-xs">
                <span className="flex items-center gap-2 text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Behavioural
                </span>

                <span className="flex items-center gap-2 text-violet-600">
                    <span className="h-2 w-2 rounded-full bg-violet-500" />
                    Coding
                </span>
            </div>

            <div className="relative mt-5 h-56 overflow-hidden rounded-2xl bg-[linear-gradient(to_bottom,#ffffff_0%,#ffffff_19%,#e2e8f0_20%,#ffffff_21%,#ffffff_39%,#e2e8f0_40%,#ffffff_41%,#ffffff_59%,#e2e8f0_60%,#ffffff_61%,#ffffff_79%,#e2e8f0_80%,#ffffff_81%)]">
                <svg
                    viewBox="0 0 600 220"
                    className="h-full w-full"
                >
                    <polyline
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={green
                            .map(
                                (value, index) =>
                                    `${index * 120},${200 - value * 24}`
                            )
                            .join(" ")}
                    />

                    <polyline
                        fill="none"
                        stroke="#7c3aed"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={violet
                            .map(
                                (value, index) =>
                                    `${index * 120},${200 - value * 20}`
                            )
                            .join(" ")}
                    />
                </svg>
            </div>
        </div>
    );
}

function RecentActivity() {
    const items = [
        {
            icon: MessagesSquare,
            iconClass: "bg-emerald-100 text-emerald-700",
            title: "Behavioural Interview",
            detail: "Communication • Completed today",
            status: "Completed",
            statusClass: "bg-emerald-50 text-emerald-700",
        },
        {
            icon: Code2,
            iconClass: "bg-violet-100 text-violet-700",
            title: "Coding Practice",
            detail: "Arrays • 3 problems solved",
            status: "In progress",
            statusClass: "bg-orange-50 text-orange-600",
        },
        {
            icon: FileSearch,
            iconClass: "bg-blue-100 text-blue-700",
            title: "Resume Analysis",
            detail: "Software Engineer profile",
            status: "Updated",
            statusClass: "bg-blue-50 text-blue-700",
        },
    ];

    return (
        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-950">
                Recent Activity
            </h3>

            <p className="mt-1 text-sm text-slate-500">
                Your latest preparation activity.
            </p>

            <div className="mt-5 space-y-4">
                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="rounded-2xl border border-slate-100 p-4"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-2xl ${item.iconClass}`}
                                >
                                    <Icon className="h-4 w-4" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-bold text-slate-900">
                                        {item.title}
                                    </p>

                                    <p className="truncate text-sm text-slate-500">
                                        {item.detail}
                                    </p>
                                </div>

                                <span
                                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${item.statusClass}`}
                                >
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 rounded-2xl bg-violet-50 px-4 py-3 text-center text-sm font-semibold text-violet-700">
                View all activity
            </div>
        </div>
    );
}

function TrustItem({
    label,
}: {
    label: string;
}) {
    return (
        <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                <Check className="h-3 w-3 text-emerald-600" />
            </span>

            {label}
        </div>
    );
}

function FloatingPreviewCard({
    className,
    icon,
    title,
    detail,
}: {
    className: string;
    icon: React.ReactNode;
    title: string;
    detail: string;
}) {
    return (
        <div
            className={`absolute z-20 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-violet-100 ${className}`}
        >
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-violet-100 p-2.5 text-violet-700">
                    {icon}
                </div>

                <div>
                    <p className="text-sm font-bold text-slate-900">
                        {title}
                    </p>

                    <p className="text-xs text-slate-400">
                        {detail}
                    </p>
                </div>
            </div>
        </div>
    );
}