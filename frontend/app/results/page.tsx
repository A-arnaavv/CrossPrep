"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function ResultsPage() {
    const [results, setResults] =
        useState<any>(null);

    useEffect(() => {
        loadResults();
    }, []);

    const loadResults =
        async () => {
            try {
                const interviewId =
                    localStorage.getItem(
                        "interview_id"
                    );

                const response =
                    await api.get(
                        `/api/interviews/${interviewId}/report`
                    );

                console.log(
                    response.data
                );

                setResults(
                    response.data
                );

            } catch (error) {
                console.error(error);
            }
        };

    if (!results) {
        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-10">

            <h1 className="text-4xl font-bold mb-8">
                Interview Results
            </h1>

            <div className="grid md:grid-cols-2 gap-4 mb-8">

                <div className="border rounded-2xl p-6">
                    <div className="text-zinc-500">
                        Role
                    </div>

                    <div className="text-xl font-bold">
                        {results.role}
                    </div>
                </div>

                <div className="border rounded-2xl p-6">
                    <div className="text-zinc-500">
                        Level
                    </div>

                    <div className="text-xl font-bold">
                        {results.level}
                    </div>
                </div>

                <div className="border rounded-2xl p-6">
                    <div className="text-zinc-500">
                        Questions Answered
                    </div>

                    <div className="text-xl font-bold">
                        {results.questions_answered}
                        {" / "}
                        {results.total_questions}
                    </div>
                </div>

                <div className="border rounded-2xl p-6">
                    <div className="text-zinc-500">
                        Completion
                    </div>

                    <div className="text-xl font-bold">
                        {results.completion_percentage}%
                    </div>
                </div>

            </div>

            <div
                className="
                    bg-violet-600
                    text-white
                    rounded-3xl
                    p-8
                    mb-8
                "
            >

                <div className="text-lg">
                    Average Score
                </div>

                <div className="text-6xl font-bold mt-2">
                    {results.average_score}
                    <span className="text-3xl">
                        /10
                    </span>
                </div>
                <div className="mt-4">

                    <span
                        className="
            inline-block
            bg-white/20
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
        "
                    >
                        {results.average_score >= 8
                            ? "Interview Ready"
                            : results.average_score >= 6
                                ? "Almost Ready"
                                : "Needs Practice"}
                    </span>

                </div>
            </div>

            <div>

                <h2 className="text-2xl font-bold mb-6">
                    Question Breakdown
                </h2>

                <div className="space-y-4">

                    {results.questions?.map(
                        (
                            item: any,
                            index: number
                        ) => (
                            <div
                                key={index}
                                className="
                                    border
                                    rounded-2xl
                                    p-6
                                "
                            >

                                <div className="flex justify-between">

                                    <h3 className="font-bold">
                                        Question {index + 1}
                                    </h3>

                                    <span
                                        className={`
                                                font-bold
                                                ${item.score >= 8
                                                ? "text-green-600"
                                                : item.score >= 6
                                                    ? "text-yellow-600"
                                                    : "text-red-600"
                                            }`}
                                    >
                                        {item.score}/10
                                    </span>

                                </div>

                                <div className="mt-4">

                                    <div className="font-semibold">
                                        Your Answer
                                    </div>

                                    <p className="text-zinc-700 mt-1">
                                        {item.answer}
                                    </p>

                                </div>

                                <div className="mt-4">

                                    <div className="font-semibold">
                                        Feedback
                                    </div>

                                    <p className="text-zinc-700 mt-1">
                                        {item.feedback}
                                    </p>

                                </div>
                                <div className="mt-4">

                                    <div className="font-semibold">
                                        Ideal Answer
                                    </div>

                                    <p className="text-zinc-700 mt-1">
                                        {item.ideal_answer}
                                    </p>

                                </div>

                            </div>
                        )
                    )}

                </div>

            </div>
            <div className="flex gap-4 mt-10">

                <button
                    onClick={() =>
                        window.location.href =
                        "/interview/create"
                    }
                    className="
                        bg-violet-600
                        text-white
                        px-6
                        py-3
                        rounded-2xl
                    "
                >
                    Take Another Interview
                </button>

                <button
                    onClick={() =>
                        window.location.href =
                        "/dashboard"
                    }
                    className="
                        border
                        px-6
                        py-3
                        rounded-2xl
                    "
                >
                    Back to Dashboard
                </button>

            </div>
        </div>
    );
}