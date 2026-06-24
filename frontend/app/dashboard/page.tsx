"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { api } from "@/lib/api";

export default function DashboardPage() {
    const { user, isLoaded } =
        useUser();

    const [stats, setStats] =
        useState({
            total_resumes: 0,
            total_interviews: 0,
            average_score: 0,
            completion_percentage: 0,
        });

    const [activity, setActivity] =
        useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const loadDashboard =
            async () => {
                if (
                    !isLoaded ||
                    !user
                ) {
                    return;
                }

                try {
                    const statsResponse =
                        await api.get(
                            `/api/dashboard/stats/${user.id}`
                        );

                    setStats(
                        statsResponse.data
                    );

                    const activityResponse =
                        await api.get(
                            `/api/dashboard/activity/${user.id}`
                        );

                    setActivity(
                        activityResponse.data
                    );

                } catch (error) {
                    console.error(
                        error
                    );
                } finally {
                    setLoading(false);
                }
            };

        loadDashboard();
    }, [user, isLoaded]);

    return (
        <DashboardLayout>

            <div className="rounded-3xl p-6 mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-violet-900 text-white shadow-xl">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    <div>

                        <p className="text-violet-300 text-sm font-medium">
                            AI Career Platform
                        </p>

                        <h1 className="text-5xl font-bold mt-2">
                            Welcome back,
                            {" "}
                            {user?.firstName}
                        </h1>

                        <p className="text-slate-300 mt-2">
                            Practice interviews, improve your resume,
                            and land your dream role.
                        </p>

                    </div>

                    <Link
                        href="/upload"
                        className="bg-white text-black px-6 py-3 rounded-2xl font-semibold"
                    >
                        Upload Resume
                    </Link>

                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                <div className="bg-white border rounded-2xl p-6 shadow-sm">
                    <p className="text-sm text-zinc-500">
                        Resumes
                    </p>

                    <p className="text-4xl font-bold mt-3">
                        {loading
                            ? "..."
                            : stats.total_resumes}
                    </p>
                </div>

                <div className="bg-white border rounded-2xl p-6 shadow-sm">
                    <p className="text-sm text-zinc-500">
                        Interviews
                    </p>

                    <p className="text-4xl font-bold mt-3">
                        {loading
                            ? "..."
                            : stats.total_interviews}
                    </p>
                </div>

                <div className="bg-white border rounded-2xl p-6 shadow-sm">
                    <p className="text-sm text-zinc-500">
                        Avg Score
                    </p>

                    <p className="text-4xl font-bold mt-3">
                        {loading
                            ? "..."
                            : stats.average_score}
                    </p>
                </div>

                <div className="bg-white border rounded-2xl p-6 shadow-sm">
                    <p className="text-sm text-zinc-500">
                        Completion
                    </p>

                    <p className="text-4xl font-bold mt-3">
                        {loading
                            ? "..."
                            : `${stats.completion_percentage}%`}
                    </p>
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">

                <div className="lg:col-span-2 bg-white border rounded-2xl p-6">

                    <h2 className="text-xl font-bold mb-4">
                        Recent Activity
                    </h2>

                    {activity.length === 0 ? (
                        <div className="text-zinc-500">
                            No recent activity.
                        </div>
                    ) : (
                        <div className="space-y-4">

                            {activity.map(
                                (
                                    item,
                                    index
                                ) => (
                                    <div
                                        key={index}
                                        className="border rounded-xl p-4"
                                    >
                                        <div className="font-semibold">
                                            {item.role}
                                        </div>

                                        <div className="text-sm text-zinc-500 mt-1">
                                            {item.level}
                                            {" • "}
                                            {item.status}
                                        </div>

                                        <div className="text-xs text-zinc-400 mt-2">
                                            {new Date(
                                                item.created_at
                                            ).toLocaleString()}
                                        </div>
                                    </div>
                                )
                            )}

                        </div>
                    )}

                </div>

                <div className="bg-white border rounded-2xl p-6">

                    <h2 className="text-xl font-bold mb-4">
                        Quick Actions
                    </h2>

                    <div className="space-y-4">

                        <Link
                            href="/upload"
                            className="block border rounded-xl p-4 hover:bg-zinc-50 transition"
                        >
                            Resume Intelligence
                        </Link>

                        <Link
                            href="/interview/new"
                            className="block border rounded-xl p-4 hover:bg-zinc-50 transition"
                        >
                            Create Interview
                        </Link>

                        <Link
                            href="/job-match"
                            className="block border rounded-xl p-4 hover:bg-zinc-50 transition"
                        >
                            Job Match
                        </Link>

                        <Link
                            href="/history"
                            className="block border rounded-xl p-4 hover:bg-zinc-50 transition"
                        >
                            Interview History
                        </Link>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );

}
