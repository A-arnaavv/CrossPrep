"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
    ArrowLeft,
    ArrowRight,
    BriefcaseBusiness,
    Check,
    Clock3,
    LoaderCircle,
    MessageSquareText,
    Sparkles,
    Target,
    Users,
} from "lucide-react";

import { api } from "@/lib/api";

const experienceLevels = [
    {
        value: "Beginner",
        title: "Beginner",
        description: "Entry-level and early-career roles",
        icon: Users,
    },
    {
        value: "Intermediate",
        title: "Intermediate",
        description: "Professional roles with some experience",
        icon: BriefcaseBusiness,
    },
    {
        value: "Advanced",
        title: "Advanced",
        description: "Senior, lead, and management roles",
        icon: Target,
    },
] as const;

export default function CreateInterviewPage() {
    const router = useRouter();
    const { user, isLoaded } = useUser();

    const [role, setRole] = useState("");
    const [level, setLevel] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const trimmedRole = role.trim();

    const canStart =
        isLoaded &&
        Boolean(user) &&
        Boolean(trimmedRole) &&
        Boolean(level) &&
        !loading;

    const handleCreateInterview = async () => {
        if (!user) {
            setError("Please sign in before creating an interview.");
            return;
        }

        if (!trimmedRole || !level) {
            setError("Please enter a role and select an experience level.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await api.post(
                "/api/interviews/create",
                null,
                {
                    params: {
                        clerk_id: user.id,
                        role: trimmedRole,
                        level,
                    },
                }
            );

            const interviewId = response.data?.interview_id;

            if (!interviewId) {
                throw new Error(
                    "The server did not return an interview ID."
                );
            }

            sessionStorage.setItem(
                "interview_id",
                String(interviewId)
            );

            sessionStorage.setItem(
                "interview_role",
                trimmedRole
            );

            sessionStorage.setItem(
                "interview_level",
                level
            );

            router.push("/interview/session");
        } catch (error: unknown) {
            console.error("Failed to create interview:", error);

            let message =
                "We couldn't generate your interview. Please try again.";

            if (
                typeof error === "object" &&
                error !== null &&
                "response" in error
            ) {
                const apiError = error as {
                    response?: {
                        data?: {
                            detail?: string;
                            message?: string;
                        };
                    };
                };

                message =
                    apiError.response?.data?.detail ??
                    apiError.response?.data?.message ??
                    message;
            } else if (error instanceof Error) {
                message = error.message;
            }

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            className="
                min-h-screen bg-[#f8f9ff] px-5 py-5
                sm:px-8
                lg:h-screen lg:overflow-hidden lg:px-10 lg:py-5
            "
        >
            <div className="mx-auto flex h-full max-w-6xl flex-col">
                <button
                    type="button"
                    onClick={() => router.push("/interviews")}
                    className="
                        inline-flex w-fit items-center gap-2
                        text-sm font-semibold text-violet-600
                        transition-colors hover:text-violet-800
                    "
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Interview Hub
                </button>

                <header className="mt-4">
                    <p className="text-sm font-semibold text-violet-600">
                        Behavioral interview
                    </p>

                    <h1 className="mt-1.5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Create your interview
                    </h1>

                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
                        Configure a personalized behavioral interview for your
                        target role and experience level.
                    </p>
                </header>

                <div
                    className="
                        mt-5 grid gap-5
                        lg:min-h-0
                        lg:grid-cols-[1.4fr_0.8fr]
                    "
                >
                    <section
                        className="
                            rounded-3xl border border-slate-200
                            bg-white p-6 shadow-sm
                        "
                    >
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                <MessageSquareText className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-950">
                                    Interview configuration
                                </h2>

                                <p className="mt-0.5 text-sm leading-5 text-slate-500">
                                    Tell the AI what role you are preparing for.
                                </p>
                            </div>
                        </div>

                        <div className="mt-5">
                            <label
                                htmlFor="role"
                                className="text-sm font-semibold text-slate-800"
                            >
                                Target role
                            </label>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Enter the position you want to practice for.
                            </p>

                            <div className="relative mt-2.5">
                                <BriefcaseBusiness className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                                <input
                                    id="role"
                                    type="text"
                                    value={role}
                                    onChange={(event) => {
                                        setRole(event.target.value);
                                        setError("");
                                    }}
                                    onKeyDown={(event) => {
                                        if (
                                            event.key === "Enter" &&
                                            canStart
                                        ) {
                                            handleCreateInterview();
                                        }
                                    }}
                                    disabled={loading}
                                    placeholder="For example: Backend Developer"
                                    autoComplete="off"
                                    className="
                                        w-full rounded-2xl border
                                        border-slate-200 bg-white
                                        py-3.5 pl-12 pr-4 text-sm
                                        font-medium text-slate-900
                                        outline-none transition
                                        placeholder:text-slate-400
                                        focus:border-violet-500
                                        focus:ring-4 focus:ring-violet-100
                                        disabled:cursor-not-allowed
                                        disabled:bg-slate-50
                                    "
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <p className="text-sm font-semibold text-slate-800">
                                Experience level
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Choose the level that best matches your target
                                position.
                            </p>

                            <div className="mt-3 grid gap-3 md:grid-cols-3">
                                {experienceLevels.map((option) => {
                                    const Icon = option.icon;
                                    const isSelected =
                                        level === option.value;

                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            disabled={loading}
                                            onClick={() => {
                                                setLevel(option.value);
                                                setError("");
                                            }}
                                            className={`
                                                relative rounded-2xl border
                                                p-3 text-left transition-all
                                                disabled:cursor-not-allowed
                                                ${isSelected
                                                    ? "border-violet-500 bg-violet-50 shadow-sm ring-2 ring-violet-100"
                                                    : "border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50/40"
                                                }
                                            `}
                                        >
                                            {isSelected && (
                                                <div className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-white">
                                                    <Check className="h-3 w-3" />
                                                </div>
                                            )}

                                            <div
                                                className={`
                                                    flex h-9 w-9 items-center
                                                    justify-center rounded-xl
                                                    ${isSelected
                                                        ? "bg-violet-600 text-white"
                                                        : "bg-slate-100 text-slate-600"
                                                    }
                                                `}
                                            >
                                                <Icon className="h-4.5 w-4.5" />
                                            </div>

                                            <h3 className="mt-3 text-sm font-bold text-slate-950">
                                                {option.title}
                                            </h3>

                                            <p className="mt-0.5 text-xs leading-4 text-slate-500">
                                                {option.description}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {error && (
                            <div
                                role="alert"
                                className="
                                    mt-4 rounded-2xl border border-red-200
                                    bg-red-50 px-4 py-2.5
                                    text-sm font-medium text-red-700
                                "
                            >
                                {error}
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleCreateInterview}
                            disabled={!canStart}
                            className="
                                mt-5 inline-flex w-full items-center
                                justify-center gap-2 rounded-2xl
                                bg-violet-600 px-6 py-3.5
                                text-sm font-semibold text-white
                                shadow-lg shadow-violet-200
                                transition-all duration-200
                                hover:-translate-y-0.5 hover:bg-violet-700
                                disabled:cursor-not-allowed
                                disabled:bg-slate-300
                                disabled:shadow-none
                                disabled:hover:translate-y-0
                            "
                        >
                            {loading ? (
                                <>
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                    Creating your interview...
                                </>
                            ) : (
                                <>
                                    Generate and start interview
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </section>

                    <aside
                        className="
                            rounded-3xl border border-slate-200
                            bg-white p-6 shadow-sm
                            lg:min-h-0
                        "
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                                <Sparkles className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-600">
                                    Live preview
                                </p>

                                <h2 className="mt-0.5 text-lg font-bold text-slate-950">
                                    Interview summary
                                </h2>
                            </div>
                        </div>

                        <div className="mt-5 space-y-3">
                            <SummaryItem
                                label="Target role"
                                value={trimmedRole || "Not selected"}
                                icon={BriefcaseBusiness}
                            />

                            <SummaryItem
                                label="Experience level"
                                value={level || "Not selected"}
                                icon={Target}
                            />

                            <SummaryItem
                                label="Interview format"
                                value="Behavioral questions"
                                icon={MessageSquareText}
                            />

                            <SummaryItem
                                label="Estimated duration"
                                value="15–20 minutes"
                                icon={Clock3}
                            />
                        </div>

                        <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50 p-4">
                            <div className="flex items-start gap-3">
                                <Sparkles className="mt-0.5 h-4.5 w-4.5 shrink-0 text-violet-600" />

                                <div>
                                    <h3 className="text-sm font-bold text-violet-950">
                                        Personalized by AI
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-violet-700">
                                        Questions are generated for your role
                                        and revealed one at a time during the
                                        interview.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-6 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-3xl border border-white/30 bg-white p-7 text-center shadow-2xl">
                        <div className="mx-auto flex h-13 w-13 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                            <LoaderCircle className="h-7 w-7 animate-spin" />
                        </div>

                        <h2 className="mt-5 text-xl font-bold text-slate-950">
                            Creating your interview
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Generating personalized behavioral questions for
                            your role and experience level.
                        </p>

                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full w-2/3 animate-pulse rounded-full bg-violet-600" />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

type SummaryItemProps = {
    label: string;
    value: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
};

function SummaryItem({
    label,
    value,
    icon: Icon,
}: SummaryItemProps) {
    return (
        <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
                <Icon className="h-4.5 w-4.5" />
            </div>

            <div className="min-w-0">
                <p className="text-[11px] font-medium text-slate-500">
                    {label}
                </p>

                <p className="mt-0.5 truncate text-sm font-bold text-slate-900">
                    {value}
                </p>
            </div>
        </div>
    );
}