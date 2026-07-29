"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
    BrainCircuit,
    FileText,
    Route,
    Target,
} from "lucide-react";

import { api } from "@/lib/api";
import BackToDashboard from "@/components/navigation/BackToDashboard";

import AICoach from "../dashboard/components/AICoach";

import type {
    CareerCoachReport,
} from "../dashboard/components/types";

const coachFeatures = [
    {
        icon: FileText,
        title: "Resume Guidance",
        text: "Improve recruiter impact",
    },
    {
        icon: BrainCircuit,
        title: "Interview Insights",
        text: "Review performance trends",
    },
    {
        icon: Target,
        title: "Focused Growth",
        text: "Prioritize weak areas",
    },
    {
        icon: Route,
        title: "Career Roadmap",
        text: "Follow a practical plan",
    },
];

export default function CareerCoachPage() {
    const { user, isLoaded } = useUser();

    const [report, setReport] =
        useState<CareerCoachReport | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const loadCoach = async () => {
            if (!isLoaded) {
                return;
            }

            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const response = await api.get(
                    `/api/career-coach`
                );

                setReport(response.data);
            } catch (error) {
                console.error(
                    "Failed to load AI Coach report:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadCoach();
    }, [user, isLoaded]);

    return (
        <div className="min-h-screen bg-[#f8f9ff] text-slate-950">
            <main className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
                <BackToDashboard />

                <section className="relative mt-5 overflow-hidden rounded-[2rem] border border-violet-200/70 bg-gradient-to-br from-violet-600 via-violet-600 to-indigo-700 shadow-xl shadow-violet-200/40">
                    <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

                    <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-indigo-300/20 blur-3xl" />

                    <div className="relative px-6 py-8 sm:px-10 sm:py-9">
                        <div className="max-w-3xl">
                            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                AI Career Coach
                            </h1>

                            <p className="mt-3 max-w-2xl text-base leading-7 text-violet-100 sm:text-lg">
                                Turn your resume and
                                interview performance into a
                                focused improvement plan built
                                around your strengths,
                                weaknesses, and target roles.
                            </p>
                        </div>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {coachFeatures.map(
                                (feature) => {
                                    const Icon =
                                        feature.icon;

                                    return (
                                        <div
                                            key={
                                                feature.title
                                            }
                                            className="
                                                rounded-2xl
                                                border
                                                border-white/15
                                                bg-white/10
                                                p-4
                                                backdrop-blur-sm
                                                transition-all
                                                duration-200
                                                hover:-translate-y-0.5
                                                hover:bg-white/15
                                            "
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                                                    <Icon className="h-5 w-5 text-white" />
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="font-semibold text-white">
                                                        {
                                                            feature.title
                                                        }
                                                    </p>

                                                    <p className="mt-0.5 text-sm text-violet-100">
                                                        {
                                                            feature.text
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </section>

                <section className="mt-6">
                    <AICoach
                        report={report}
                        loading={loading}
                    />
                </section>
            </main>
        </div>
    );
}