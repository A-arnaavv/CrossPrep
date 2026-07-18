import Link from "next/link";
import {
    ArrowRight,
    Brain,
    Code2,
    MessageSquareText,
    Sparkles,
    Target,
} from "lucide-react";

import BackToDashboard from "@/components/navigation/BackToDashboard";

const interviewTypes = [
    {
        title: "Behavioral Interview",
        description:
            "Practice HR and behavioral questions with role-based AI feedback.",
        href: "/interview/new",
        icon: MessageSquareText,
        accent: "violet",
        features: [
            {
                icon: Brain,
                label: "AI-generated questions",
            },
            {
                icon: Target,
                label: "STAR response feedback",
            },
            {
                icon: Sparkles,
                label: "Communication insights",
            },
        ],
    },
    {
        title: "Coding Interview",
        description:
            "Solve technical interview problems in a focused coding environment.",
        href: "/coding-interview",
        icon: Code2,
        accent: "blue",
        features: [
            {
                icon: Code2,
                label: "DSA challenges",
            },
            {
                icon: Sparkles,
                label: "AI-powered code review",
            },
            {
                icon: Target,
                label: "Performance evaluation",
            },
        ],
    },
] as const;

export default function InterviewsPage() {
    return (
        <main className="min-h-screen bg-[#f8f9ff] px-6 py-8 sm:px-10 lg:py-10">
            <div className="mx-auto max-w-6xl">
                <header>
                    <BackToDashboard />

                    <div className="mt-7">
                        <p className="text-sm font-semibold text-violet-600">
                            Interview practice
                        </p>

                        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                            Interview Hub
                        </h1>

                        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
                            Choose the interview experience you want to
                            practice.
                        </p>
                    </div>
                </header>

                <section className="mt-8 grid gap-6 lg:grid-cols-2">
                    {interviewTypes.map((interview) => {
                        const InterviewIcon = interview.icon;
                        const isBehavioral =
                            interview.accent === "violet";

                        return (
                            <article
                                key={interview.title}
                                className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div
                                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${isBehavioral
                                                ? "bg-violet-100 text-violet-600"
                                                : "bg-blue-100 text-blue-600"
                                            }`}
                                    >
                                        <InterviewIcon className="h-7 w-7" />
                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${isBehavioral
                                                ? "bg-violet-50 text-violet-700"
                                                : "bg-blue-50 text-blue-700"
                                            }`}
                                    >
                                        AI-powered
                                    </span>
                                </div>

                                <div className="mt-6">
                                    <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                                        {interview.title}
                                    </h2>

                                    <p className="mt-3 text-sm leading-6 text-slate-500">
                                        {interview.description}
                                    </p>
                                </div>

                                <div className="mt-6 space-y-3">
                                    {interview.features.map((feature) => {
                                        const FeatureIcon = feature.icon;

                                        return (
                                            <div
                                                key={feature.label}
                                                className="flex items-center gap-3"
                                            >
                                                <div
                                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${isBehavioral
                                                            ? "bg-violet-50 text-violet-600"
                                                            : "bg-blue-50 text-blue-600"
                                                        }`}
                                                >
                                                    <FeatureIcon className="h-4 w-4" />
                                                </div>

                                                <span className="text-sm font-medium text-slate-700">
                                                    {feature.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <Link
                                    href={interview.href}
                                    className={`mt-7 inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 group-hover:gap-3 ${isBehavioral
                                            ? "bg-violet-600 shadow-violet-200 hover:bg-violet-700"
                                            : "bg-blue-600 shadow-blue-200 hover:bg-blue-700"
                                        }`}
                                >
                                    Start {interview.title}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </article>
                        );
                    })}
                </section>
            </div>
        </main>
    );
}