import Link from "next/link";

import {
    ArrowLeft,
    BriefcaseBusiness,
    Code2,
    Play,
    Sparkles,
} from "lucide-react";

import type {
    CodingInterviewQuestion,
} from "../types";

type InterviewHeaderProps = {
    question: CodingInterviewQuestion | null;
    role: string;
    setRole: (value: string) => void;
    language: string;
    setLanguage: (value: string) => void;
    loading: boolean;
    startInterview: () => void;
};

export default function InterviewHeader({
    question,
    role,
    setRole,
    language,
    setLanguage,
    loading,
    startInterview,
}: InterviewHeaderProps) {
    if (question) {
        return (
            <header className="mb-3 shrink-0 rounded-2xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
                <Link
                    href="/interviews"
                    className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-700"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Interview Hub
                </Link>

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">
                            Coding Interview
                        </p>

                        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                            {role}
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                            Solve each problem carefully, test your
                            implementation, and explain your approach before
                            optimizing.
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2.5 rounded-xl border border-violet-100 bg-violet-50 px-4 py-2.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                            <Code2 className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-xs font-medium text-slate-500">
                                Language
                            </p>

                            <p className="font-semibold text-slate-900">
                                {language}
                            </p>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <section className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-gradient-to-br from-violet-600 via-violet-600 to-indigo-700 px-6 py-8 text-white sm:px-8">
                <Link
                    href="/interviews"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-violet-100 transition hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Interview Hub
                </Link>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur">
                    <Sparkles className="h-3.5 w-3.5" />
                    AI-powered coding interview
                </div>

                <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    Coding Interview
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-violet-100 sm:text-base">
                    Practice realistic coding interviews with AI-generated
                    questions, an in-browser editor, automated test execution,
                    and detailed feedback after every session.
                </p>
            </div>

            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.3fr_420px]">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                        Start a coding interview
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                        Choose your target role and preferred programming
                        language. We will generate four interview questions
                        that gradually increase in difficulty.
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        <article className="rounded-2xl border border-slate-200 bg-white p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                <BriefcaseBusiness className="h-5 w-5" />
                            </div>

                            <h3 className="mt-4 font-semibold text-slate-900">
                                Role-specific problems
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Practice questions tailored to the software
                                engineering position you are targeting.
                            </p>
                        </article>

                        <article className="rounded-2xl border border-slate-200 bg-white p-5">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                <Code2 className="h-5 w-5" />
                            </div>

                            <h3 className="mt-4 font-semibold text-slate-900">
                                AI code evaluation
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Receive test results, code-quality feedback,
                                complexity analysis, and improvement guidance.
                            </p>
                        </article>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <h3 className="text-xl font-bold text-slate-950">
                        Interview setup
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Configure your interview before getting started.
                    </p>

                    <div className="mt-6 space-y-5">
                        <div>
                            <label
                                htmlFor="coding-role"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Target role
                            </label>

                            <input
                                id="coding-role"
                                type="text"
                                value={role}
                                onChange={(event) =>
                                    setRole(event.target.value)
                                }
                                onKeyDown={(event) => {
                                    if (
                                        event.key === "Enter" &&
                                        !loading &&
                                        role.trim()
                                    ) {
                                        startInterview();
                                    }
                                }}
                                placeholder="Backend Engineer"
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="coding-language"
                                className="mb-2 block text-sm font-semibold text-slate-700"
                            >
                                Programming language
                            </label>

                            <select
                                id="coding-language"
                                value={language}
                                onChange={(event) =>
                                    setLanguage(event.target.value)
                                }
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                            >
                                <option value="Python">
                                    Python
                                </option>

                                <option value="JavaScript">
                                    JavaScript
                                </option>

                                <option value="Java">
                                    Java
                                </option>

                                <option value="C++">
                                    C++
                                </option>
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={startInterview}
                            disabled={
                                loading ||
                                !role.trim()
                            }
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                    Generating interview...
                                </>
                            ) : (
                                <>
                                    <Play className="h-4 w-4" />
                                    Start Coding Interview
                                </>
                            )}
                        </button>

                    </div>
                </div>
            </div>
        </section>
    );
}