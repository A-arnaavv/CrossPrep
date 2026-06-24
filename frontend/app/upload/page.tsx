"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/lib/api";
import ATSScoreCard from "@/components/resume/ATSScoreCard";

export default function UploadPage() {
    const { user } = useUser();

    const [file, setFile] =
        useState<File | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [analysis, setAnalysis] =
        useState<any>(null);

    const [activeTab, setActiveTab] =
        useState("overview");

    useEffect(() => {
        const syncUser = async () => {
            if (!user) return;

            try {
                const response =
                    await api.post(
                        "/api/users/sync",
                        {
                            clerk_id: user.id,
                            email:
                                user.primaryEmailAddress
                                    ?.emailAddress || "",
                            name:
                                user.fullName ||
                                "User",
                        }
                    );

                console.log(
                    "User Sync:",
                    response.data
                );
            } catch (error) {
                console.error(
                    "User sync failed:",
                    error
                );
            }
        };

        syncUser();
    }, [user]);

    const handleUpload = async () => {
        if (!file) return;

        if (!user) {
            setMessage(
                "Please sign in first."
            );
            return;
        }

        try {
            setLoading(true);

            const formData =
                new FormData();

            formData.append(
                "file",
                file
            );

            formData.append(
                "clerk_id",
                user.id
            );

            const response =
                await api.post(
                    "/api/resumes/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );

            console.log(
                response.data
            );

            if (
                response.data.error
            ) {
                setMessage(
                    response.data.error
                );
                return;
            }

            setAnalysis(
                response.data
            );

            setMessage(
                "Resume uploaded successfully!"
            );

        } catch (error) {
            console.error(error);

            setMessage(
                "Upload failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-10">

            <h1 className="text-3xl font-bold mb-6">
                Upload Resume
            </h1>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                    setFile(
                        e.target.files?.[0] ||
                        null
                    )
                }
            />

            {file && (
                <p className="mt-3 text-gray-600">
                    Selected: {file.name}
                </p>
            )}

            <div className="mt-6">
                <button
                    onClick={handleUpload}
                    disabled={
                        !file ||
                        loading ||
                        !user
                    }
                    className="px-5 py-2 rounded bg-black text-white"
                >
                    {loading
                        ? "Uploading..."
                        : "Upload Resume"}
                </button>
            </div>

            {message && (
                <div className="mt-6 p-4 border rounded">
                    {message}
                </div>
            )}

            {analysis && (
                <div className="mt-8 space-y-8">
                    <div className="border rounded-xl p-6 bg-white text-black dark:bg-zinc-900 dark:text-white">

                        <h2 className="text-2xl font-bold mb-4">
                            Resume Intelligence
                        </h2>
                        <div className="flex gap-3 mb-8">

                            {[
                                "overview",
                                "skills",
                                "projects",
                                "experience",
                                "education",
                            ].map((tab) => (

                                <button
                                    key={tab}
                                    onClick={() =>
                                        setActiveTab(tab)
                                    }
                                    className={`
                                            px-4
                                            py-2
                                            rounded-xl
                                            transition
                                            ${activeTab === tab
                                            ? "bg-violet-600 text-white"
                                            : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                                        }
            `}
                                >
                                    {tab.charAt(0).toUpperCase() +
                                        tab.slice(1)}
                                </button>

                            ))}

                        </div>
                        {activeTab === "overview" && (
                            <>
                                <ATSScoreCard
                                    score={analysis.ats_score}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div
                                        className="
                                            border
                                            rounded-xl
                                            p-6
                                            bg-white
                                            shadow-sm
                                            min-h-[650px]
                                        "
                                    >

                                        <h3 className="font-bold text-green-800 mb-4">
                                            Strengths
                                        </h3>

                                        <ul className="space-y-3">

                                            {analysis.strengths?.map(
                                                (
                                                    item: string,
                                                    index: number
                                                ) => (
                                                    <li
                                                        key={index}
                                                        className="text-green-700"
                                                    >
                                                        {item}
                                                    </li>
                                                )
                                            )}

                                        </ul>

                                    </div>

                                    <div
                                        className="
                                            bg-red-50
                                            border
                                            border-red-200
                                            rounded-2xl
                                            p-6
                                        "
                                    >

                                        <h3 className="font-bold text-red-800 mb-4">
                                            Weaknesses
                                        </h3>

                                        <ul className="space-y-3">

                                            {analysis.weaknesses?.map(
                                                (
                                                    item: string,
                                                    index: number
                                                ) => (
                                                    <li
                                                        key={index}
                                                        className="text-red-700"
                                                    >
                                                        {item}
                                                    </li>
                                                )
                                            )}

                                        </ul>

                                    </div>

                                </div>

                                <div className="mt-8">

                                    <h3 className="font-semibold mb-3">
                                        Missing Skills
                                    </h3>

                                    <div className="flex flex-wrap gap-2">

                                        {analysis.missing_skills?.map(
                                            (
                                                skill: string,
                                                index: number
                                            ) => (
                                                <span
                                                    key={index}
                                                    className="border rounded-full px-3 py-1 text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            )
                                        )}

                                    </div>

                                </div>

                                <div>

                                    <h2 className="text-2xl font-bold mb-4">
                                        Recommendations
                                    </h2>

                                    <div className="space-y-4">

                                        {analysis.recommendations?.map(
                                            (
                                                recommendation: string,
                                                index: number
                                            ) => (
                                                <div
                                                    key={index}
                                                    className="
                                                        bg-white
                                                        border-l-4
                                                        border-violet-500
                                                        rounded-r-2xl
                                                        p-5
                                                        shadow-sm
                                                    "
                                                >

                                                    <div className="flex items-start gap-3">

                                                        <div className="text-xl">
                                                        </div>

                                                        <div className="text-zinc-700 leading-relaxed">
                                                            {recommendation
                                                                .replace(/\*\*/g, "")}
                                                        </div>

                                                    </div>

                                                </div>
                                            )
                                        )}

                                    </div>

                                </div>
                            </>
                        )}

                    </div>

                    {activeTab === "skills" && (
                        <div>

                            <h2 className="text-2xl font-bold mb-4">
                                Skills
                            </h2>

                            <div className="flex flex-wrap gap-3">

                                {analysis.skills?.map(
                                    (
                                        skill: string,
                                        index: number
                                    ) => (
                                        <span
                                            key={index}
                                            className="
                                            px-4
                                            py-2
                                            rounded-full
                                            bg-violet-100
                                            text-violet-700
                                            text-sm
                                            font-medium
                                            hover:bg-violet-200
                                            transition
                                            "
                                        >
                                            {skill}
                                        </span>
                                    )
                                )}

                            </div>

                        </div>
                    )}

                    {activeTab === "projects" && (
                        <div className="border rounded-xl p-6 bg-white text-zinc-900 shadow-sm">

                            <h2 className="text-2xl font-bold mb-4">
                                Projects
                            </h2>

                            <div className="space-y-4">

                                {analysis.projects?.map(
                                    (
                                        project: any,
                                        index: number
                                    ) => (
                                        <div
                                            key={index}
                                            className="
                                                border
                                                rounded-xl
                                                p-6
                                                bg-white
                                                shadow-sm
                                                min-h-[650px]
                                            "
                                        >

                                            <h3 className="text-xl font-bold text-zinc-900">
                                                {project.name}
                                            </h3>

                                            <p className="mt-3 text-zinc-600">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mt-4">

                                                {project.technologies?.map(
                                                    (
                                                        tech: string,
                                                        techIndex: number
                                                    ) => (
                                                        <span
                                                            key={techIndex}
                                                            className="
                                                                bg-violet-100
                                                                text-violet-700
                                                                px-3
                                                                py-1
                                                                rounded-full
                                                                text-sm
                                                            "
                                                        >
                                                            {tech}
                                                        </span>
                                                    )
                                                )}

                                            </div>

                                        </div>
                                    )
                                )}

                            </div>

                        </div>
                    )}

                    {activeTab === "experience" && (
                        <div className="border rounded-xl p-6 bg-white text-zinc-900 shadow-sm">

                            <h2 className="text-2xl font-bold mb-4">
                                Experience
                            </h2>

                            <div className="space-y-4">

                                {analysis.experience?.map(
                                    (
                                        item: any,
                                        index: number
                                    ) => (
                                        <div
                                            key={index}
                                            className="
                                                border
                                                rounded-xl
                                                p-6
                                                bg-white
                                                shadow-sm
                                                min-h-[650px]
                                            "
                                        >

                                            <h3 className="text-xl font-semibold">
                                                {item.title}
                                            </h3>

                                            <p className="text-zinc-600 mt-1">
                                                {item.company}
                                            </p>

                                            <p className="text-sm text-zinc-500 mt-1">
                                                {item.dates}
                                            </p>

                                            <p className="mt-4 text-zinc-700">
                                                {item.description}
                                            </p>

                                        </div>
                                    )
                                )}

                            </div>

                        </div>
                    )}

                    {activeTab === "education" && (
                        <div className="border rounded-xl p-6 bg-white text-zinc-900 shadow-sm">

                            <h2 className="text-2xl font-bold mb-4">
                                Education
                            </h2>

                            <div className="space-y-4">

                                {analysis.education?.map(
                                    (
                                        item: any,
                                        index: number
                                    ) => (
                                        <div
                                            key={index}
                                            className="
                                                border
                                                rounded-xl
                                                p-6
                                                bg-white
                                                shadow-sm
                                                min-h-[180px]
                                            "
                                        >

                                            <h3 className="text-xl font-semibold">
                                                {item.degree}
                                            </h3>

                                            <p className="text-zinc-600 mt-1">
                                                {item.institution}
                                            </p>

                                            <p className="text-sm text-zinc-500 mt-1">
                                                {item.dates}
                                            </p>

                                            {item.score && (
                                                <p className="mt-3 text-zinc-700">
                                                    {item.score}
                                                </p>
                                            )}

                                        </div>
                                    )
                                )}

                            </div>

                        </div>
                    )}

                </div>
            )}

        </div>
    );
}