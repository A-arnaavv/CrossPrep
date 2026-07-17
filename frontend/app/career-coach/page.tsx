"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

import { api } from "@/lib/api";
import AICoach from "../dashboard/components/AICoach";
import BackToDashboard from "@/components/navigation/BackToDashboard";

import type {
    CareerCoachReport,
} from "../dashboard/components/types";

export default function CareerCoachPage() {
    const { user, isLoaded } =
        useUser();

    const [report, setReport] =
        useState<CareerCoachReport | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const loadCoach =
            async () => {
                if (!isLoaded || !user) {
                    return;
                }

                try {
                    const response =
                        await api.get(
                            `/api/career-coach/${user.id}`
                        );

                    setReport(
                        response.data
                    );
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

        loadCoach();
    }, [user, isLoaded]);

    return (
        <div className="min-h-screen bg-[#f8f9ff] text-slate-950">

            <main className="max-w-5xl mx-auto px-8 py-10">

                <div className="mb-8">
                    <BackToDashboard />

                    <h1 className="text-4xl font-bold mt-6">
                        AI Career Coach
                    </h1>

                    <p className="text-slate-500 mt-3 text-lg">
                        Personalized guidance generated from your resume,
                        interviews, and performance history.
                    </p>

                </div>

                <AICoach
                    report={report}
                    loading={loading}
                />

            </main>

        </div>
    );
}