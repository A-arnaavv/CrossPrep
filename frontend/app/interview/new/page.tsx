"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/lib/api";

export default function CreateInterviewPage() {
    const { user } = useUser();

    const [role, setRole] =
        useState("");

    const [level, setLevel] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [interview, setInterview] =
        useState<any>(null);

    const handleCreateInterview =
        async () => {
            if (!user) {
                alert(
                    "Please sign in first."
                );
                return;
            }

            try {
                setLoading(true);

                const response =
                    await api.post(
                        "/api/interviews/create",
                        null,
                        {
                            params: {
                                clerk_id:
                                    user.id,
                                role,
                                level,
                            },
                        }
                    );

                console.log(
                    response.data
                );

                localStorage.setItem(
                    "interview_id",
                    response.data.interview_id
                );

                setInterview(
                    response.data
                );

            } catch (error: any) {
                console.error(error);

                console.log(
                    error?.response?.data
                );

                alert(
                    JSON.stringify(
                        error?.response?.data
                    )
                );
            }
        };

    return (
        <div className="max-w-4xl mx-auto p-10">

            <h1 className="text-3xl font-bold mb-8">
                Create Interview
            </h1>

            <div className="space-y-4">

                <div>
                    <label className="block mb-2 font-medium">
                        Role
                    </label>

                    <input
                        type="text"
                        placeholder="Backend Developer"
                        value={role}
                        onChange={(e) =>
                            setRole(
                                e.target.value
                            )
                        }
                        className="w-full border rounded p-3"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Level
                    </label>

                    <select
                        value={level}
                        onChange={(e) =>
                            setLevel(
                                e.target.value
                            )
                        }
                        className="w-full border rounded p-3"
                    >
                        <option value="">
                            Select Level
                        </option>

                        <option value="Beginner">
                            Beginner
                        </option>

                        <option value="Intermediate">
                            Intermediate
                        </option>

                        <option value="Advanced">
                            Advanced
                        </option>
                    </select>
                </div>

                <button
                    onClick={
                        handleCreateInterview
                    }
                    disabled={
                        !role ||
                        !level ||
                        loading ||
                        !user
                    }
                    className="bg-black text-white px-6 py-3 rounded"
                >
                    {loading
                        ? "Generating..."
                        : "Generate Interview"}
                </button>

            </div>

            {interview && (
                <div className="mt-10">

                    <h2 className="text-2xl font-bold mb-4">
                        Generated Questions
                    </h2>

                    <div className="space-y-4">

                        {interview.questions?.map(
                            (
                                question: string,
                                index: number
                            ) => (
                                <div
                                    key={index}
                                    className="border rounded p-4"
                                >
                                    <span className="font-bold">
                                        Q{index + 1}
                                    </span>

                                    <p className="mt-2">
                                        {question}
                                    </p>
                                </div>
                            )
                        )}

                    </div>

                    <button
                        onClick={() =>
                            window.location.href =
                            "/interview/session"
                        }
                        className="mt-6 bg-green-600 text-white px-6 py-3 rounded"
                    >
                        Start Interview
                    </button>

                </div>
            )}

        </div>
    );
}