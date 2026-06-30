"use client";

import { useState } from "react";

import { api } from "@/lib/api";

import { useEffect } from "react";

import { useUser } from "@clerk/nextjs";

import Editor from "@monaco-editor/react";

import ProgressDots from "./components/ProgressDots";
import TestResultsPanel from "./components/TestResultsPanel";
import InterviewHeader from "./components/InterviewHeader";
import QuestionPanel from "./components/QuestionPanel";
import CodeEditorPanel from "./components/CodeEditorPanel";
import FinalReport from "./components/FinalReport";

import type {
    CodingInterviewQuestion,
    CodingInterviewReport,
    CodeTestResult,
} from "./types";

export default function CodingInterviewPage() {

    const { user } = useUser();

    const [dbUserId, setDbUserId] =
        useState("");

    const [role, setRole] =
        useState("");

    const [language, setLanguage] =
        useState("Python");

    const [question, setQuestion] =
        useState<CodingInterviewQuestion | null>(null);

    const [code, setCode] =
        useState("");

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
        useState<CodingInterviewReport | null>(null);

    const [runOutput, setRunOutput] =
        useState("");

    const [testResults, setTestResults] =
        useState<CodeTestResult[]>([]);

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
                    setRunOutput("");
                    setTestResults([]);

                    setInterviewComplete(
                        true
                    );

                    setFinalReport(
                        response.data
                    );

                }
                else {

                    setRunOutput("");
                    setTestResults([]);

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

    const normalizeQuestion = (
        item: CodingInterviewQuestion
    ): CodingInterviewQuestion => {

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

    if (interviewComplete && finalReport) {

        return (
            <div className="h-screen p-4">
                <FinalReport
                    report={finalReport}
                    role={role}
                    language={language}
                    onRestart={() =>
                        window.location.reload()
                    }
                />
            </div>
        );

    }

    return (
        <div className="h-screen p-4">

            <InterviewHeader
                question={question}
                role={role}
                setRole={setRole}
                language={language}
                setLanguage={setLanguage}
                loading={loading}
                dbUserId={dbUserId}
                startInterview={startInterview}
            />

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
            {question && !interviewComplete && (

                <div
                    className="
                        grid
                        grid-cols-[42%_58%]
                        gap-4
                        h-[75vh]
                    "
                >

                    <QuestionPanel
                        question={question}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        questionNumber={questionNumber}
                        totalQuestions={totalQuestions}
                    />

                    <CodeEditorPanel
                        language={language}
                        code={code}
                        setCode={setCode}
                        editorLanguageMap={editorLanguageMap}
                        testResults={testResults}
                        runOutput={runOutput}
                        loading={loading}
                        runCode={runCode}
                        submitCode={submitCode}
                    />

                </div>

            )}
        </div>

    );
}