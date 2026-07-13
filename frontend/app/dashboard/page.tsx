"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import StatsCards from "./components/StatsCards";
import PerformanceTrend from "./components/PerformanceTrend";
import RecentInterviews from "./components/RecentInterviews";

import {
    LayoutDashboard,
    FileText,
    MessagesSquare,
    Bot,
    History,
    BarChart3,
    User,
    Settings,
    BadgeCheck,
    Target,
    TrendingUp,
    Bell,
} from "lucide-react";

import { api } from "@/lib/api";

import type {
    DashboardStats,
    DashboardActivity,
} from "./components/types";

export default function DashboardPage() {
    const { user, isLoaded } = useUser();

    const [stats, setStats] =
        useState<DashboardStats>({
            total_resumes: 0,
            total_interviews: 0,
            average_score: 0,
            completion_percentage: 0,
        });

    const [activity, setActivity] =
        useState<DashboardActivity[]>([]);

    const [loading, setLoading] =
        useState(true);

    const progressData =
        activity.length > 0
            ? activity
                .slice()
                .reverse()
                .map((item, index) => ({
                    day: item.created_at
                        ? new Date(
                            item.created_at
                        ).toLocaleDateString(
                            "en-US",
                            {
                                month: "short",
                                day: "numeric",
                            }
                        )
                        : `Session ${index + 1}`,
                    score: stats.average_score
                        ? Math.min(
                            100,
                            Math.round(
                                Number(stats.average_score) * 10
                            )
                        )
                        : 0,
                }))
            : [
                {
                    day: "No data",
                    score: 0,
                },
            ];

    const navigation = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            label: "Resumes",
            href: "/upload",
            icon: FileText,
        },
        {
            label: "Interviews",
            href: "/interview/new",
            icon: MessagesSquare,
        },
        {
            label: "AI Coach",
            href: "/career-coach",
            icon: Bot,
        },
        {
            label: "History",
            href: "/history",
            icon: History,
        },
        {
            label: "Analytics",
            href: "/analytics",
            icon: BarChart3,
        },
        {
            label: "Profile",
            href: "/profile",
            icon: User,
        },
        {
            label: "Settings",
            href: "/settings",
            icon: Settings,
        },
    ];

    useEffect(() => {
        const loadDashboard = async () => {
            if (!isLoaded) {
                return;
            }

            if (!user) {
                setLoading(false);
                return;
            }

            setLoading(true);

            const [
                statsResult,
                activityResult,
            ] = await Promise.allSettled([
                api.get(
                    `/api/dashboard/stats/${user.id}`
                ),
                api.get(
                    `/api/dashboard/activity/${user.id}`
                ),
            ]);

            if (
                statsResult.status ===
                "fulfilled"
            ) {
                console.log(
                    "Dashboard stats:",
                    statsResult.value.data
                );

                setStats(
                    statsResult.value.data
                );
            } else {
                console.error(
                    "Dashboard stats failed:",
                    statsResult.reason
                );
            }

            if (
                activityResult.status ===
                "fulfilled"
            ) {
                console.log(
                    "Dashboard activity:",
                    activityResult.value.data
                );

                setActivity(
                    Array.isArray(
                        activityResult.value.data
                    )
                        ? activityResult.value.data
                        : []
                );
            } else {
                console.error(
                    "Dashboard activity failed:",
                    activityResult.reason
                );
            }

            setLoading(false);
        };

        loadDashboard();
    }, [isLoaded, user?.id]);
    return (
        <div className="h-screen overflow-hidden bg-[#f8f9ff] text-slate-950">

            <aside className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-slate-100 flex flex-col justify-between">

                <div>

                    <div className="flex items-center gap-3 px-6 py-7">

                        <div className="h-10 w-10 rounded-2xl bg-violet-600 text-white flex items-center justify-center">
                            <Bot
                                size={24}
                                strokeWidth={2.2}
                            />
                        </div>

                        <div>
                            <div className="text-xl font-bold">
                                HirePilot
                            </div>

                            <div className="text-xs text-slate-400">
                                AI Career Platform
                            </div>
                        </div>

                    </div>

                    <nav className="px-4 space-y-2">

                        {navigation.map((item) => {
                            const Icon = item.icon;

                            const active =
                                item.label === "Dashboard";

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`
                                            group
                                            flex
                                            items-center
                                            gap-4
                                            px-4
                                            py-3
                                            rounded-2xl
                                            font-semibold
                                            transition-all
                                            duration-200

                            ${active
                                            ? "bg-violet-100 text-violet-700 shadow-sm"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        }
                        `}
                                >

                                    <Icon
                                        size={20}
                                        strokeWidth={2}
                                        className={`
                                transition
                                ${active
                                                ? "text-violet-700"
                                                : "text-slate-400 group-hover:text-slate-700"
                                            }
                            `}
                                    />

                                    <span>
                                        {item.label}
                                    </span>

                                </Link>
                            );
                        })}

                    </nav>

                </div>

                <div className="border-t border-slate-100 p-5">

                    <div className="rounded-2xl bg-slate-50 p-4">

                        <div className="flex items-center gap-3">

                            <div className="h-11 w-11 rounded-full bg-violet-600 text-white flex items-center justify-center text-lg font-bold">
                                {user?.firstName?.[0] || "A"}
                            </div>

                            <div className="min-w-0">

                                <div className="font-bold truncate">
                                    {user?.fullName || "User"}
                                </div>

                                <div className="text-xs text-slate-500 truncate">
                                    {user?.primaryEmailAddress?.emailAddress}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </aside>

            <main
                className="
                    ml-64
                    h-screen
                    overflow-hidden
                    px-10
                    pt-6
                    pb-8
                    flex
                    flex-col
                "
            >

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-sm font-semibold text-violet-600">
                            Dashboard
                        </p>

                        <h1 className="text-3xl font-bold mt-1">
                            Welcome back, {user?.firstName || "there"}
                        </h1>

                        <p className="text-slate-500 mt-2 text-base">
                            Track your resume, interviews, and preparation progress.
                        </p>

                    </div>

                    <div className="flex items-center gap-4">

                        <button
                            className="
                                h-11
                                w-11
                                rounded-2xl
                                bg-white
                                border
                                border-slate-100
                                flex
                                items-center
                                justify-center
                                shadow-sm
                                hover:bg-violet-50
                                hover:border-violet-200
                                transition-all
                            "
                        >
                            <Bell
                                size={20}
                                strokeWidth={2}
                                className="text-slate-600"
                            />
                        </button>

                        <Link
                            href="/upload"
                            className="
                                flex
                                items-center
                                gap-2
                                bg-violet-600
                                text-white
                                px-6
                                py-3
                                rounded-2xl
                                font-semibold
                                shadow-lg
                                shadow-violet-200
                                hover:bg-violet-700
                                transition-all
                            "
                        >
                            <FileText size={18} />
                            Upload Resume
                        </Link>

                    </div>

                </div>

                <div className="max-w-6xl">
                    <StatsCards
                        stats={stats}
                        loading={loading}
                    />
                </div>

                <div
                    className="
                        grid
                        grid-cols-1
                        xl:grid-cols-3
                        gap-5
                        mt-6
                        mb-5
                        flex-1
                        min-h-0
                    "
                >

                    <div className="xl:col-span-2 min-h-0">
                        <PerformanceTrend
                            activity={activity}
                        />
                    </div>

                    <div className="min-h-0">
                        <RecentInterviews
                            activity={activity}
                        />
                    </div>

                </div>
            </main>

        </div>
    );
}

type StatCardProps = {
    icon: string;
    color: string;
    value: string | number;
    title: string;
    subtitle: string;
};

function StatCard({
    icon,
    color,
    value,
    title,
    subtitle,
}: StatCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
            <div
                className={`
                    h-16
                    w-16
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    text-2xl
                    ${color}
                `}
            >
                {icon}
            </div>

            <div>
                <div className="text-3xl font-bold">
                    {value}
                </div>

                <div className="font-bold mt-1">
                    {title}
                </div>

                <div className="text-sm text-slate-500 mt-1">
                    {subtitle}
                </div>
            </div>
        </div>
    );
}