"use client";

import { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";

import { api } from "@/lib/api";

import HistoryHeader from "./components/HistoryHeader";
import InterviewHistoryCard from "./components/InterviewHistoryCard";
import EmptyHistoryState from "./components/EmptyHistoryState";

import type {
    InterviewHistoryItem,
} from "./components/types";

export default function HistoryPage() {
    const { user } = useUser();

    const [interviews, setInterviews] =
        useState<InterviewHistoryItem[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const loadHistory =
            async () => {
                if (!user) {
                    return;
                }

                try {
                    const response =
                        await api.get(
                            `/api/interviews/user/${user.id}`
                        );

                    setInterviews(
                        response.data
                    );

                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

        loadHistory();
    }, [user]);

    if (!user) {
        return (
            <div className="p-10">
                Loading user...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-10">

            <HistoryHeader />

            {loading ? (

                <div className="text-zinc-500">
                    Loading interviews...
                </div>

            ) : interviews.length === 0 ? (

                <EmptyHistoryState />

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {interviews.map(
                        (
                            interview,
                            index
                        ) => (

                            <InterviewHistoryCard
                                key={
                                    interview.interview_id ||
                                    interview.id ||
                                    index
                                }
                                interview={interview}
                            />

                        )
                    )}

                </div>

            )}

        </div>
    );
}