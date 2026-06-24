"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/lib/api";

export default function JobMatchPage() {
    const { user } = useUser();

    const [dbUserId, setDbUserId] =
        useState("");

    const [jobTitle, setJobTitle] =
        useState("");

    const [jobDescription, setJobDescription] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [result, setResult] =
        useState<any>(null);

    const [history, setHistory] =
        useState<any[]>([]);

    useEffect(() => {
        const loadDatabaseUser =
            async () => {
                if (!user) return;

                try {
                    const response =
                        await api.get(
                            `/api/users/clerk/${user.id}`
                        );

                    setDbUserId(
                        response.data.id
                    );
                } catch (error) {
                    console.error(error);
                }
            };

        loadDatabaseUser();
    }, [user]);

    const loadHistory =
        async () => {
            if (!dbUserId) return;

            try {
                const response =
                    await api.get(
                        `/api/job-match/user/${dbUserId}`
                    );

                setHistory(
                    response.data
                );
            } catch (error) {
                console.error(error);
            }
        };

    useEffect(() => {
        if (dbUserId) {
            loadHistory();
        }
    }, [dbUserId]);

    const handleAnalyze =
        async () => {
            if (
                !jobTitle ||
                !jobDescription ||
                !dbUserId
            ) {
                return;
            }

            try {
                setLoading(true);

                const response =
                    await api.post(
                        "/api/job-match",
                        null,
                        {
                            params: {
                                user_id:
                                    dbUserId,
                                job_title:
                                    jobTitle,
                                job_description:
                                    jobDescription,
                            },
                        }
                    );

                setResult(
                    response.data
                );

                loadHistory();

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

    return (
        <div className="max-w-6xl mx-auto p-10">

            <h1 className="text-4xl font-bold mb-2">
                Job Match Analyzer
            </h1>

            <p className="text-gray-500 mb-8">
                Compare your resume against a job description.
            </p>

            <div className="space-y-4">

                <input
                    type="text"
                    placeholder="Microsoft Software Engineer Intern"
                    value={jobTitle}
                    onChange={(e) =>
                        setJobTitle(
                            e.target.value
                        )
                    }
                    className="w-full border rounded p-3"
                />

                <textarea
                    rows={10}
                    placeholder="Paste job description here..."
                    value={jobDescription}
                    onChange={(e) =>
                        setJobDescription(
                            e.target.value
                        )
                    }
                    className="w-full border rounded p-3"
                />

                <button
                    onClick={
                        handleAnalyze
                    }
                    disabled={
                        loading
                    }
                    className="bg-black text-white px-6 py-3 rounded"
                >
                    {loading
                        ? "Analyzing..."
                        : "Analyze Match"}
                </button>

            </div>

            {result && (
                <div className="mt-10 space-y-8">

                    <div className="border rounded-xl p-6">

                        <h2 className="text-xl font-semibold">
                            Match Score
                        </h2>

                        <div className="text-5xl font-bold mt-3">
                            {result.match_score}%
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="border rounded-xl p-6">

                            <h3 className="font-semibold mb-4">
                                Matched Skills
                            </h3>

                            <ul className="space-y-2">

                                {result.matched_skills?.map(
                                    (
                                        skill: string,
                                        index: number
                                    ) => (
                                        <li key={index}>
                                            ✅ {skill}
                                        </li>
                                    )
                                )}

                            </ul>

                        </div>

                        <div className="border rounded-xl p-6">

                            <h3 className="font-semibold mb-4">
                                Missing Skills
                            </h3>

                            <ul className="space-y-2">

                                {result.missing_skills?.map(
                                    (
                                        skill: string,
                                        index: number
                                    ) => (
                                        <li key={index}>
                                            ⚠️ {skill}
                                        </li>
                                    )
                                )}

                            </ul>

                        </div>

                    </div>

                    <div className="border rounded-xl p-6">

                        <h3 className="font-semibold mb-4">
                            Recommendations
                        </h3>

                        <ul className="space-y-2">

                            {result.recommendations?.map(
                                (
                                    item: string,
                                    index: number
                                ) => (
                                    <li key={index}>
                                        • {item}
                                    </li>
                                )
                            )}

                        </ul>

                    </div>

                </div>
            )}

            <div className="mt-12">

                <h2 className="text-2xl font-bold mb-6">
                    Previous Matches
                </h2>

                <div className="space-y-4">

                    {history.map(
                        (
                            match,
                            index
                        ) => (
                            <div
                                key={index}
                                className="border rounded-xl p-4"
                            >
                                <h3 className="font-semibold">
                                    {match.job_title}
                                </h3>

                                <p className="mt-2">
                                    Match Score:
                                    {" "}
                                    {match.match_score}%
                                </p>

                                <p className="text-sm text-gray-500 mt-2">
                                    {new Date(
                                        match.created_at
                                    ).toLocaleString()}
                                </p>

                            </div>
                        )
                    )}

                </div>

            </div>

        </div>
    );

}
