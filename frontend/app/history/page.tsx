"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/lib/api";

export default function HistoryPage() {
    const { user } = useUser();

    const [interviews, setInterviews] =
        useState<any[]>([]);

    useEffect(() => {
        if (user) {
            loadHistory();
        }
    }, [user]);

    const loadHistory =
        async () => {
            if (!user) return;

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
            }
        };

    if (!user) {
        return (
            <div className="p-10">
                Loading user...
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-10">

            <h1 className="text-3xl font-bold mb-8">
                Interview History
            </h1>

            {interviews.length === 0 ? (
                <p>
                    No interviews found.
                </p>
            ) : (
                <div className="space-y-4">

                    {interviews.map(
                        (
                            interview,
                            index
                        ) => (
                            <div
                                key={index}
                                className="
                                    bg-white
                                    border
                                    rounded-2xl
                                    p-6
                                    shadow-sm
                                "
                            >
                                <h2 className="font-semibold text-lg">
                                    {interview.role}
                                </h2>

                                <p>
                                    Level:
                                    {" "}
                                    {interview.level}
                                </p>

                                <p>
                                    Status:
                                    {" "}
                                    {interview.status}
                                </p>

                                <p>
                                    Created:
                                    {" "}
                                    {new Date(
                                        interview.created_at
                                    ).toLocaleString()}
                                </p>

                                <button
                                    onClick={() => {
                                        localStorage.setItem(
                                            "interview_id",
                                            interview.interview_id
                                        );

                                        window.location.href =
                                            "/report";
                                    }}
                                    className="
                                        mt-4
                                        bg-violet-600
                                        hover:bg-violet-700
                                        text-white
                                        px-5
                                        py-2
                                        rounded-xl
                                    "
                                >
                                    View Report
                                </button>

                            </div>
                        )
                    )}

                </div>
            )}

        </div>
    );
}
