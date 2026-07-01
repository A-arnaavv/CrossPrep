"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { api } from "@/lib/api";

import type {
    DashboardStats,
    DashboardActivity,
    CareerCoachReport,
} from "./components/types";


import WelcomeBanner from "./components/WelcomeBanner";
import StatsCards from "./components/StatsCards";
import InterviewReadiness from "./components/InterviewReadiness";
import PerformanceAnalytics from "./components/PerformanceAnalytics";
import AICoach from "./components/AICoach";
import ContinueJourney from "./components/ContinueJourney";
import RecentInterviews from "./components/RecentInterviews";
import PerformanceTrend from "./components/PerformanceTrend";

export default function DashboardPage() {
    const { user, isLoaded } =
        useUser();

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

    const [careerCoach, setCareerCoach] =
        useState<CareerCoachReport | null>(
            null
        );

    const [careerCoachLoading, setCareerCoachLoading] =
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

                    const coachResponse =
                        await api.get(
                            `/api/career-coach/${user.id}`
                        );

                    setCareerCoach(
                        coachResponse.data
                    );

                } catch (error) {
                    console.error(
                        error
                    );
                } finally {
                    setLoading(false);
                    setCareerCoachLoading(false);
                }
            };

        loadDashboard();
    }, [user, isLoaded]);

    return (
        <DashboardLayout>

            <WelcomeBanner
                firstName={user?.firstName}
            />

            <StatsCards
                stats={stats}
                loading={loading}
            />

            <InterviewReadiness
                stats={stats}
            />

            <PerformanceTrend
                stats={stats}
            />

            <ContinueJourney />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">

                <PerformanceAnalytics
                    stats={stats}
                />

                <AICoach
                    report={careerCoach}
                    loading={careerCoachLoading}
                />

                <RecentInterviews
                    activity={activity}
                />

            </div>

        </DashboardLayout>
    );

}
