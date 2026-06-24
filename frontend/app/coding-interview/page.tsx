"use client";

import { useState } from "react";

import { api } from "@/lib/api";

import { useEffect } from "react";

import { useUser } from "@clerk/nextjs";

import Editor from "@monaco-editor/react";

export default function CodingInterviewPage() {

    const { user } = useUser();

    const [dbUserId, setDbUserId] =
        useState("");

    const [role, setRole] =
        useState("");

    const [language, setLanguage] =
        useState("Python");

    const [question, setQuestion] =
        useState<any>(null);

    const [code, setCode] =
        useState("");

    const [result, setResult] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(false);

    const [activeTab, setActiveTab] =
        useState("description");

    const [sessionId, setSessionId] =
        useState("");

    const [questionId, setQuestionId] =
        useState("");

    const [questionNumber, setQuestionNumber] =
        useState(1);

    const [totalQuestions] =
        useState(4);

    const [interviewComplete, setInterviewComplete] =
        useState(false);

    const [finalReport, setFinalReport] =
        useState<any>(null);

    const [runOutput, setRunOutput] =
        useState("");

    const [testResults, setTestResults] =
        useState<any[]>([]);

    const startInterview =
        async () => {

            if (
                !role ||
                !dbUserId
            ) {
                return;
            }

            try {

                setLoading(true);

                const response =
                    await api.post(
                        "/api/coding-interviews/start-session",
                        null,
                        {
                            params: {
                                user_id:
                                    dbUserId,
                                role,
                                language,
                            },
                        }
                    );

                setSessionId(
                    response.data.session_id
                );

                setQuestion(
                    normalizeQuestion(
                        response.data.current_question
                    )
                );

                setQuestionId(
                    response.data.current_question.id
                );

                setQuestionNumber(
                    response.data.current_question.question_number
                );

                setCode(
                    normalizeQuestion(
                        response.data.current_question
                    ).starter_code ||
                    starterTemplates[
                    language as keyof typeof starterTemplates
                    ]
                );

                setResult(null);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }
        };

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

    useEffect(() => {

        if (!question) {
            return;
        }

        setCode(
            starterTemplates[
            language as keyof typeof starterTemplates
            ]
        );

    }, [language]);

    const submitCode =
        async () => {

            if (
                !question ||
                !code ||
                !dbUserId
            ) {
                return;
            }

            try {

                setLoading(true);

                const response =
                    await api.post(
                        "/api/coding-interviews/session-submit",
                        null,
                        {
                            params: {
                                session_id:
                                    sessionId,
                                question_id:
                                    questionId,
                                code,
                            },
                        }
                    );

                if (
                    response.data.completed
                ) {

                    setInterviewComplete(
                        true
                    );

                    setFinalReport(
                        response.data
                    );

                }
                else {

                    setResult(null);

                    setQuestion(
                        normalizeQuestion(
                            response.data.next_question
                        )
                    );

                    setQuestionId(
                        response.data.next_question.id
                    );

                    setQuestionNumber(
                        response.data.next_question.question_number
                    );

                    setCode(
                        normalizeQuestion(
                            response.data.next_question
                        ).starter_code ||
                        starterTemplates[
                        language as keyof typeof starterTemplates
                        ]
                    );

                }

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }
        };

    const runCode =
        async () => {

            if (!code || !question) {
                return;
            }

            try {

                setLoading(true);

                const response =
                    await api.post(
                        "/api/coding-interviews/run-code",
                        null,
                        {
                            params: {
                                language,
                                code,
                                function_name:
                                    question.function_name,
                                test_cases:
                                    JSON.stringify(
                                        question.test_cases || []
                                    ),
                            },
                        }
                    );

                const rawOutput =
                    response.data.output || "";

                setRunOutput(
                    rawOutput
                );

                try {

                    setTestResults(
                        JSON.parse(
                            rawOutput
                                .split("__TEST_RESULTS_START__")
                                .pop()
                                ?.trim() || "[]"
                        )
                    );

                } catch {

                    setTestResults([]);

                }

            } catch (error) {

                console.error(error);

                setRunOutput(
                    "Execution failed."
                );

                setTestResults([]);

            } finally {

                setLoading(false);

            }
        };

    const starterTemplates = {

        Python: `def solution():
    pass`,

        JavaScript: `function solution() {

}`,

        Java: `public class Solution {

    public static void solution() {

    }

}`,

        "C++": `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:

    void solution() {

    }

};`

    };

    const editorLanguageMap = {

        Python: "python",

        JavaScript: "javascript",

        Java: "java",

        "C++": "cpp",

    };

    const normalizeQuestion =
        (item: any) => {

            if (
                typeof item.question === "string"
            ) {
                try {
                    const parsed =
                        JSON.parse(
                            item.question
                        );

                    return {
                        ...item,
                        ...parsed,
                    };
                } catch {
                    return item;
                }
            }

            return item;
        };

    return (
        <div className="h-screen p-4">

            <div
                className="
                    flex
                    items-center
                    justify-between
                    mb-6
                "
            >

                <div>

                    <h1 className="text-3xl font-bold">
                        Coding Interview
                    </h1>

                    <p className="text-zinc-500 mt-1">
                        Practice coding interviews with AI evaluation
                    </p>

                </div>

                <div className="flex items-center gap-3">

                    {question && (

                        <div
                            className="
                                px-4
                                py-2
                                rounded-lg
                                bg-zinc-100
                                font-medium
                            "
                        >
                            {role}
                        </div>

                    )}

                    {!question && (

                        <input
                            type="text"
                            placeholder="Enter Role"
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                            className="
                                border
                                rounded-lg
                                px-4
                                py-2
                                w-64
                            "
                        />

                    )}

                    <select
                        value={language}
                        onChange={(e) =>
                            setLanguage(
                                e.target.value
                            )
                        }
                        className="
                            border
                            rounded-lg
                            px-4
                            py-2
                        "
                    >
                        <option>Python</option>
                        <option>JavaScript</option>
                        <option>Java</option>
                        <option>C++</option>
                    </select>

                    {!question && (
                        <button
                            onClick={startInterview}
                            disabled={loading || !role || !dbUserId}
                            className="
                            bg-violet-600
                            text-white
                            px-5
                            py-2
                            rounded-lg
                        "
                        >
                            {loading
                                ? "Generating 4 questions..."
                                : "Start Interview"}
                        </button>
                    )}
                </div>

            </div>

            {loading && !question && (

                <div
                    className="
                        mb-4
                        border
                        rounded-2xl
                        p-6
                        bg-violet-50
                        text-violet-700
                    "
                >
                    <div
                        className="
                            h-6
                            w-6
                            border-4
                            border-violet-300
                            border-t-violet-700
                            rounded-full
                            animate-spin
                            mb-3
                        "
                    />
                    <div className="font-semibold">
                        Generating your coding interview...
                    </div>

                    <p className="text-sm mt-2">
                        Creating 4 questions: 1 easy, 2 medium, and 1 hard.
                        This may take a few seconds.
                    </p>
                </div>

            )}
            {question && (

                <div
                    className="
                        grid
                        grid-cols-[42%_58%]
                        gap-4
                        h-[75vh]
                    "
                >

                    {/* LEFT PANEL */}

                    <div
                        className="
                            border
                            rounded-2xl
                            p-6
                            overflow-y-auto
                        "
                    >
                        <div className="flex gap-2 mb-5">

                            {[1, 2, 3, 4].map(
                                (step) => (

                                    <div
                                        key={step}
                                        className={`
                                            h-3
                                            w-3
                                            rounded-full

                    ${step <= questionNumber
                                                ? "bg-violet-600"
                                                : "bg-zinc-300"
                                            }
                `}
                                    />

                                )
                            )}

                        </div>

                        <h2
                            className="
                                text-3xl
                                font-bold
                                mt-2
                            "
                        >
                            {question.title}
                        </h2>

                        <div className="flex gap-2 mb-5">

                            <button
                                onClick={() =>
                                    setActiveTab(
                                        "description"
                                    )
                                }
                                className={`
                                    px-4
                                    py-2
                                    rounded-lg

            ${activeTab ===
                                        "description"
                                        ? "bg-violet-600 text-white"
                                        : "bg-zinc-100"
                                    }
        `}
                            >
                                Description
                            </button>

                            <button
                                onClick={() =>
                                    setActiveTab(
                                        "hints"
                                    )
                                }
                                className={`
                                    px-4
                                    py-2
                                    rounded-lg

            ${activeTab ===
                                        "hints"
                                        ? "bg-violet-600 text-white"
                                        : "bg-zinc-100"
                                    }
        `}
                            >
                                Hints
                            </button>

                        </div>

                        <div
                            className={`
                                inline-flex
                                items-center
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                font-medium
                                mt-4

        ${question.difficulty === "Easy"
                                    ? "bg-green-100 text-green-700"
                                    : question.difficulty === "Hard"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }
    `}
                        >
                            {question.difficulty}
                        </div>
                        <span
                            className="
                                text-sm
                                text-zinc-500
                                ml-3
                            "
                        >
                        </span>
                        <div className="mt-6">

                            {activeTab === "description" && (

                                <>

                                    <div className="mb-8">

                                        <h3 className="text-lg font-semibold mb-3">
                                            Description
                                        </h3>

                                        <p className="leading-8 text-zinc-700">
                                            {question.description}
                                        </p>

                                    </div>

                                    <div className="mb-8">

                                        <h3 className="text-lg font-semibold mb-3">
                                            Examples
                                        </h3>

                                        {question.examples?.map(
                                            (
                                                example: any,
                                                index: number
                                            ) => (

                                                <div
                                                    key={index}
                                                    className="
                                border
                                rounded-xl
                                p-4
                                mb-4
                                bg-zinc-50
                            "
                                                >

                                                    <div className="font-semibold mb-2">
                                                        Example {index + 1}
                                                    </div>

                                                    <div className="mb-2">
                                                        Input
                                                    </div>

                                                    <pre
                                                        className="
                                    bg-zinc-900
                                    text-white
                                    p-3
                                    rounded
                                    overflow-x-auto
                                "
                                                    >
                                                        {example.input}
                                                    </pre>

                                                    <div className="mt-3 mb-2">
                                                        Output
                                                    </div>

                                                    <pre
                                                        className="
                                    bg-zinc-900
                                    text-white
                                    p-3
                                    rounded
                                    overflow-x-auto
                                "
                                                    >
                                                        {example.output}
                                                    </pre>

                                                    <div className="mt-3 mb-2">
                                                        Explanation
                                                    </div>

                                                    <p>
                                                        {example.explanation}
                                                    </p>

                                                </div>

                                            )
                                        )}

                                    </div>

                                    <div>

                                        <h3 className="text-lg font-semibold mb-3">
                                            Constraints
                                        </h3>

                                        <ul className="list-disc pl-6 space-y-2">

                                            {question.constraints?.map(
                                                (
                                                    item: string,
                                                    index: number
                                                ) => (

                                                    <li key={index}>
                                                        {item}
                                                    </li>

                                                )
                                            )}

                                        </ul>

                                    </div>

                                </>

                            )}

                            {activeTab === "hints" && (

                                <div className="text-zinc-500">
                                    AI hints coming soon...
                                </div>

                            )}

                        </div>

                    </div>

                    {/* RIGHT PANEL */}

                    <div
                        className="
                            border
                            rounded-2xl
                            overflow-hidden
                            flex
                            flex-col
                        "
                    >

                        <div
                            className="
                                p-4
                                border-b
                                flex
                                items-center
                                justify-between
                                bg-white
                            "
                        >

                            <span
                                className="
                                    font-semibold
                                    text-lg
                                "
                            >
                                Solution
                            </span>

                            <span
                                className="
                                    text-sm
                                    text-zinc-500
                                "
                            >
                                {language}
                            </span>

                        </div>


                        <div
                            className="
                                flex-1
                                min-h-0
                            "
                        >

                            <Editor
                                height="100%"
                                language={
                                    editorLanguageMap[
                                    language as keyof typeof editorLanguageMap
                                    ]
                                }
                                value={code}
                                onChange={(value) =>
                                    setCode(
                                        value || ""
                                    )
                                }
                                theme="vs-dark"
                            />

                        </div>
                        {testResults.length > 0 && (

                            <div
                                className="
                                    border-t
                                    bg-zinc-950
                                    text-white
                                    p-4
                                    max-h-60
                                    overflow-y-auto
                                    text-sm
                                "
                            >

                                <div className="text-zinc-400 mb-3">
                                    Test Results
                                </div>

                                <div className="space-y-3">

                                    {testResults.map(
                                        (
                                            item: any,
                                            index: number
                                        ) => (

                                            <div
                                                key={index}
                                                className="
                            border
                            border-zinc-800
                            rounded-lg
                            p-3
                        "
                                            >

                                                <div className="font-semibold mb-2">

                                                    {item.passed
                                                        ? "✅ Passed"
                                                        : "❌ Failed"}

                                                </div>

                                                <div
                                                    className="
                                grid
                                grid-cols-2
                                gap-4
                            "
                                                >

                                                    <div>

                                                        <div className="text-zinc-400 mb-1">
                                                            Expected
                                                        </div>

                                                        <pre>
                                                            {JSON.stringify(
                                                                item.expected_output,
                                                                null,
                                                                2
                                                            )}
                                                        </pre>

                                                    </div>

                                                    <div>

                                                        <div className="text-zinc-400 mb-1">
                                                            Actual
                                                        </div>

                                                        <pre>
                                                            {JSON.stringify(
                                                                item.actual_output,
                                                                null,
                                                                2
                                                            )}
                                                        </pre>

                                                    </div>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>

                            </div>

                        )}
                        {runOutput && testResults.length === 0 && (

                            <div
                                className="
                                    border-t
                                    bg-zinc-950
                                    text-white
                                    p-4
                                    max-h-52
                                    overflow-y-auto
                                    font-mono
                                    text-sm
                                "
                            >
                                <div className="text-zinc-400 mb-2">
                                    Console Output
                                </div>

                                <pre className="whitespace-pre-wrap">
                                    {runOutput}
                                </pre>
                            </div>

                        )}
                        <div
                            className="
                                p-4
                                border-t
                                flex
                                justify-end
                                gap-3
                            "
                        >
                            <button
                                onClick={runCode}
                                className="
                                    border
                                    px-6
                                    py-3
                                    rounded-lg
                                "
                            >
                                Run Code
                            </button>
                            <button
                                onClick={
                                    submitCode
                                }
                                disabled={
                                    loading ||
                                    !code
                                }
                                className="
                                    bg-violet-600
                                    text-white
                                    px-6
                                    py-3
                                    rounded-lg
                                "
                            >
                                {loading
                                    ? "Evaluating..."
                                    : "Submit Code"}
                            </button>

                        </div>

                    </div>

                </div>

            )}
            {result && (

                <div
                    className="
            mt-4
            border
            rounded-2xl
            p-6
            bg-zinc-50
        "
                >

                    <div className="flex items-center justify-between">

                        <h2 className="text-xl font-bold">
                            Evaluation
                        </h2>

                        <div
                            className="
                    text-3xl
                    font-bold
                    text-violet-600
                "
                        >
                            {result.score}/10
                        </div>

                    </div>

                    <div className="mt-4">

                        <h3 className="font-semibold">
                            Feedback
                        </h3>

                        <p className="mt-2 text-zinc-700">
                            {result.feedback}
                        </p>

                    </div>

                </div>

            )}
        </div>

    );
}