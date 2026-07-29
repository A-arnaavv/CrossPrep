"use client";

import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/lib/api";

import HistoryHeader from "./components/HistoryHeader";
import HistoryStats from "./components/HistoryStats";
import HistoryFilters, {
    type HistorySortOption,
} from "./components/HistoryFilters";
import InterviewHistoryCard from "./components/InterviewHistoryCard";
import EmptyHistoryState from "./components/EmptyHistoryState";
import HistorySkeleton from "./components/HistorySkeleton";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Alert from "@/components/ui/Alert";

import type {
    InterviewHistoryItem,
} from "./components/types";

export default function HistoryPage() {
    const { user, isLoaded } = useUser();

    const [interviews, setInterviews] =
        useState<InterviewHistoryItem[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const [searchQuery, setSearchQuery] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("all");

    const [levelFilter, setLevelFilter] =
        useState("all");

    const [sortOption, setSortOption] =
        useState<HistorySortOption>("newest");

    useEffect(() => {
        const loadHistory = async () => {
            if (!isLoaded) {
                return;
            }

            if (!user) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const response = await api.get(
                    `/api/interviews/user`
                );

                const historyData = Array.isArray(response.data)
                    ? response.data
                    : [];

                setInterviews(historyData);
            } catch (error) {
                console.error(
                    "Failed to load interview history:",
                    error
                );

                setError(
                    "Unable to load your interview history right now."
                );
            } finally {
                setLoading(false);
            }
        };

        loadHistory();
    }, [user, isLoaded]);

    const statuses = useMemo(() => {
        return Array.from(
            new Set(
                interviews
                    .map((interview) =>
                        interview.status
                            ?.trim()
                            .toLowerCase()
                    )
                    .filter(
                        (status): status is string =>
                            Boolean(status)
                    )
            )
        ).sort();
    }, [interviews]);

    const levels = useMemo(() => {
        return Array.from(
            new Set(
                interviews
                    .map((interview) =>
                        interview.level
                            ?.trim()
                            .toLowerCase()
                    )
                    .filter(
                        (level): level is string =>
                            Boolean(level)
                    )
            )
        ).sort();
    }, [interviews]);

    const filteredInterviews = useMemo(() => {
        const normalizedSearch =
            searchQuery.trim().toLowerCase();

        const filtered = interviews.filter((interview) => {
            const role =
                interview.role?.toLowerCase() ?? "";

            const level =
                interview.level?.toLowerCase() ?? "";

            const status =
                interview.status?.toLowerCase() ?? "";

            const matchesSearch =
                normalizedSearch === "" ||
                role.includes(normalizedSearch) ||
                level.includes(normalizedSearch) ||
                status.includes(normalizedSearch);

            const matchesStatus =
                statusFilter === "all" ||
                status === statusFilter;

            const matchesLevel =
                levelFilter === "all" ||
                level === levelFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesLevel
            );
        });

        return [...filtered].sort((a, b) => {
            switch (sortOption) {
                case "oldest":
                    return (
                        new Date(a.created_at).getTime() -
                        new Date(b.created_at).getTime()
                    );

                case "role-asc":
                    return a.role.localeCompare(b.role);

                case "role-desc":
                    return b.role.localeCompare(a.role);

                case "newest":
                default:
                    return (
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    );
            }
        });
    }, [
        interviews,
        searchQuery,
        statusFilter,
        levelFilter,
        sortOption,
    ]);

    const clearFilters = () => {
        setSearchQuery("");
        setStatusFilter("all");
        setLevelFilter("all");
        setSortOption("newest");
    };

    if (!isLoaded || loading) {
        return (
            <DashboardLayout>
                <div className="mx-auto max-w-6xl">
                    <HistorySkeleton />
                </div>
            </DashboardLayout>
        );
    }

    if (!user) {
        return (
            <DashboardLayout>
                <div className="mx-auto max-w-6xl">
                    <section className="rounded-3xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
                        <h1 className="text-2xl font-bold text-slate-950">
                            Sign in to view your history
                        </h1>

                        <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-500">
                            Your interview sessions and performance insights
                            will appear here after you sign in.
                        </p>
                    </section>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-6xl">
                <HistoryHeader />

                <div className="mt-8">
                    <HistoryStats interviews={interviews} />
                </div>

                {interviews.length > 0 && (
                    <div className="mt-8">
                        <HistoryFilters
                            searchQuery={searchQuery}
                            statusFilter={statusFilter}
                            levelFilter={levelFilter}
                            sortOption={sortOption}
                            statuses={statuses}
                            levels={levels}
                            resultCount={
                                filteredInterviews.length
                            }
                            onSearchChange={
                                setSearchQuery
                            }
                            onStatusChange={
                                setStatusFilter
                            }
                            onLevelChange={
                                setLevelFilter
                            }
                            onSortChange={
                                setSortOption
                            }
                            onClearFilters={
                                clearFilters
                            }
                        />
                    </div>
                )}

                <section className="mt-8">
                    {error ? (
                        <Alert variant="error">
                            <p className="font-semibold">
                                Interview history could not be loaded
                            </p>

                            <p className="mt-1">
                                {error}
                            </p>
                        </Alert>
                    ) : interviews.length === 0 ? (
                        <EmptyHistoryState />
                    ) : filteredInterviews.length === 0 ? (
                        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
                            <h2 className="text-xl font-bold text-slate-950">
                                No matching interviews
                            </h2>

                            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
                                Try changing your search,
                                status, level, or sorting
                                options.
                            </p>

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="mt-5 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {filteredInterviews.map(
                                (
                                    interview,
                                    index
                                ) => (
                                    <InterviewHistoryCard
                                        key={
                                            interview.interview_id ||
                                            interview.id ||
                                            `${interview.role}-${interview.created_at}-${index}`
                                        }
                                        interview={
                                            interview
                                        }
                                    />
                                )
                            )}
                        </div>
                    )}
                </section>
            </div>
        </DashboardLayout>
    );
}