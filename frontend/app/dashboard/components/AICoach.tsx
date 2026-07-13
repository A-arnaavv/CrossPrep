"use client";

import { useState } from "react";

import type {
    CareerCoachReport,
} from "./types";

type AICoachProps = {
    report: CareerCoachReport | null;
    loading: boolean;
};

export default function AICoach({
    report,
    loading,
}: AICoachProps) {

    const [completedTasks, setCompletedTasks] =
        useState<number[]>([]);

    const toggleTask =
        (index: number) => {
            setCompletedTasks((current) =>
                current.includes(index)
                    ? current.filter(
                        (item) => item !== index
                    )
                    : [...current, index]
            );
        };

    if (loading) {
        return (
            <div className="bg-white border rounded-3xl p-6 shadow-sm">
                <div className="h-6 w-40 bg-zinc-100 rounded mb-4" />
                <div className="h-4 w-full bg-zinc-100 rounded mb-3" />
                <div className="h-4 w-3/4 bg-zinc-100 rounded" />
            </div>
        );
    }

    if (!report) {
        return (
            <div className="bg-white border rounded-3xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold">
                    AI Career Coach
                </h2>

                <p className="text-zinc-500 mt-3">
                    Complete a resume upload or interview to generate personalized coaching.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white border rounded-3xl p-6 shadow-sm">

            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-2xl font-bold">
                        AI Career Coach
                    </h2>

                    <p className="text-zinc-500 mt-1">
                        Personalized guidance from your resume and interview data.
                    </p>
                    {report.created_at && (
                        <p className="text-xs text-zinc-400 mt-2">
                            Last updated:{" "}
                            {new Date(
                                report.created_at
                            ).toLocaleString()}
                        </p>
                    )}
                </div>

            </div>

            <div className="mt-6 rounded-2xl bg-violet-50 p-5">

                <div className="flex items-center justify-between">

                    <div>
                        <div className="text-sm font-semibold text-violet-700">
                            Career Readiness
                        </div>

                        <div className="text-4xl font-bold text-violet-700 mt-2">
                            {report.career_readiness}%
                        </div>
                    </div>

                    <div className="text-violet-700 font-semibold">
                        Target: 90%
                    </div>

                </div>

                <div className="mt-5 h-3 bg-white rounded-full overflow-hidden">

                    <div
                        className="h-full bg-violet-600 rounded-full"
                        style={{
                            width: `${report.career_readiness}%`,
                        }}
                    />

                </div>

            </div>

            <p className="text-zinc-600 mt-5 leading-7">
                {report.summary}
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>

                    <h3 className="font-semibold">
                        Top Strengths
                    </h3>

                    <div className="mt-4 space-y-4">

                        {report.strengths?.slice(0, 3).map(
                            (
                                item,
                                index
                            ) => (

                                <div key={index}>

                                    <div className="flex justify-between mb-2">

                                        <span className="text-zinc-700">
                                            {item}
                                        </span>

                                        <span className="text-sm text-violet-600 font-semibold">
                                            Expert
                                        </span>

                                    </div>

                                    <div className="h-2 rounded-full bg-zinc-100 overflow-hidden">

                                        <div
                                            className="h-full rounded-full bg-emerald-500"
                                            style={{
                                                width: `${90 - index * 10}%`,
                                            }}
                                        />

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </div>

                <div>
                    <h3 className="font-semibold">
                        Focus Areas
                    </h3>

                    <ul className="mt-3 space-y-2 text-zinc-600">
                        {report.focus_areas?.slice(0, 3).map(
                            (
                                item,
                                index
                            ) => (
                                <li key={index}>
                                    • {item}
                                </li>
                            )
                        )}
                    </ul>
                </div>

            </div>

            <div className="mt-6 border-t pt-5">

                <h3 className="font-semibold">
                    Weekly Plan
                </h3>

                <div className="mt-4 space-y-3">

                    {report.weekly_plan?.slice(0, 4).map(
                        (
                            item,
                            index
                        ) => (

                            <button
                                key={index}
                                onClick={() =>
                                    toggleTask(index)
                                }
                                className="
                                    w-full
                                    text-left
                                    flex
                                    items-start
                                    gap-3
                                    rounded-2xl
                                    bg-zinc-50
                                    p-4
                                    hover:bg-violet-50
                                    transition
                                "
                            >

                                <div
                                    className="
                            h-8
                            w-8
                            flex
                            items-center
                            justify-center
                            rounded-full
                            bg-violet-600
                            text-white
                            text-sm
                            font-bold
                        "
                                >
                                    {completedTasks.includes(index)
                                        ? "✓"
                                        : index + 1}
                                </div>

                                <p
                                    className={`
                                            leading-6
                                            ${completedTasks.includes(index)
                                            ? "text-zinc-400 line-through"
                                            : "text-zinc-700"
                                        }
    `}
                                >
                                    {item}
                                </p>

                            </button>

                        )
                    )}

                </div>

            </div>
            <div className="mt-6 border-t pt-5">

                <h3 className="font-semibold">
                    Company Readiness
                </h3>

                <div className="mt-4 space-y-4">

                    {report.target_roles?.map(
                        (
                            item,
                            index
                        ) => (

                            <div
                                key={index}
                                className="rounded-2xl border p-4"
                            >

                                <div className="flex items-center justify-between">

                                    <div>

                                        <div className="font-semibold">
                                            {item.company}
                                        </div>

                                        <div className="text-sm text-zinc-500">
                                            {item.role}
                                        </div>

                                    </div>

                                    <div className="font-bold text-violet-600">
                                        {item.readiness}%
                                    </div>

                                </div>

                                <div className="mt-3 h-2 bg-zinc-100 rounded-full overflow-hidden">

                                    <div
                                        className="h-full bg-violet-600 rounded-full"
                                        style={{
                                            width: `${item.readiness}%`,
                                        }}
                                    />

                                </div>

                            </div>

                        )
                    )}

                </div>

            </div>
        </div>
    );
}