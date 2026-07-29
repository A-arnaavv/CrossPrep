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

    const [role, setRole] =
        useState("");

    const [language, setLanguage] =
        useState("Python");

    const [question, setQuestion] =
        useState<CodingInterviewQuestion | null>(null);

    const [code, setCode] =
        useState("");

    const [loadingAction, setLoadingAction] =
        useState<
            "start" | "run" | "submit" | null
        >(null);

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

            if (!role) {
                return;
            }

            try {

                setLoadingAction("start");

                const response =
                    await api.post(
                        "/api/coding-interviews/start-session",
                        null,
                        {
                            params: {
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

                setLoadingAction(null);

            }
        };

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
                !code
            ) {
                return;
            }

            try {

                setLoadingAction("submit");

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

                setLoadingAction(null);

            }
        };

    const runCode =
        async () => {

            if (!code || !question) {
                return;
            }

            try {

                setLoadingAction("run");

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

                setLoadingAction(null);

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
            <main className="min-h-screen bg-[#f8f9ff] px-3 py-6">
                <div className="mx-auto max-w-7xl">
                    <FinalReport
                        report={finalReport}
                        role={role}
                        language={language}
                        onRestart={() =>
                            window.location.reload()
                        }
                    />
                </div>
            </main>
        );
    }

    return (
        <main className="h-dvh overflow-hidden bg-[#f8f9ff] p-3">
            <div className="mx-auto flex h-full max-w-[1440px] flex-col">
                <InterviewHeader
                    question={question}
                    role={role}
                    setRole={setRole}
                    language={language}
                    setLanguage={setLanguage}
                    loading={loadingAction == "start"}
                    startInterview={startInterview}
                />

                {question && !interviewComplete && (
                    <div
                        className="
                            grid min-h-0 flex-1
                            grid-cols-[minmax(0,2fr)_minmax(0,3fr)]
                            gap-3 overflow-hidden
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
                            editorLanguageMap={
                                editorLanguageMap
                            }
                            testResults={testResults}
                            runOutput={runOutput}
                            runningCode={loadingAction === "run"}
                            submittingCode={loadingAction === "submit"}
                            runCode={runCode}
                            submitCode={submitCode}
                        />
                    </div>
                )}
            </div>
        </main>
    );

    function CreatingInterviewLoader({
        role,
        language,
    }: {
        role: string;
        language: string;
    }) {
        return (
            <main className="flex min-h-dvh items-center justify-center bg-[#f8f9ff] px-4">
                <section className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg shadow-violet-100/60">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
                    </div>

                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">
                        Preparing your session
                    </p>

                    <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                        Creating your coding interview
                    </h1>

                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                        We are generating four role-specific
                        questions that gradually increase in
                        difficulty.
                    </p>

                    <div className="mt-7 grid grid-cols-2 gap-3 text-left">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                            <p className="text-xs font-medium text-slate-500">
                                Target role
                            </p>

                            <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                                {role}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                            <p className="text-xs font-medium text-slate-500">
                                Language
                            </p>

                            <p className="mt-1 text-sm font-semibold text-slate-900">
                                {language}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-2">
                        {[0, 1, 2, 3].map((index) => (
                            <span
                                key={index}
                                className="h-2.5 w-2.5 animate-pulse rounded-full bg-violet-500"
                                style={{
                                    animationDelay: `${index * 180}ms`,
                                }}
                            />
                        ))}
                    </div>

                    <p className="mt-4 text-xs text-slate-400">
                        This may take a few seconds.
                    </p>
                </section>
            </main>
        );
    }
}