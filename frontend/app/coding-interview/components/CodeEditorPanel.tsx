import {
    LoaderCircle,
    Play,
    Send,
    TerminalSquare,
} from "lucide-react";

import Editor from "@monaco-editor/react";

import TestResultsPanel from "./TestResultsPanel";

import type {
    CodeTestResult,
} from "../types";

type CodeEditorPanelProps = {
    language: string;
    code: string;
    setCode: (value: string) => void;
    editorLanguageMap: Record<string, string>;
    testResults: CodeTestResult[];
    runOutput: string;
    runningCode: boolean;
    submittingCode: boolean;
    runCode: () => void;
    submitCode: () => void;
};

export default function CodeEditorPanel({
    language,
    code,
    setCode,
    editorLanguageMap,
    testResults,
    runOutput,
    runningCode,
    submittingCode,
    runCode,
    submitCode,
}: CodeEditorPanelProps) {
    const hasResults =
        testResults.length > 0 ||
        Boolean(runOutput.trim());

    return (
        <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <header className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
                <h2 className="text-base font-bold text-slate-950">
                    Solution
                </h2>

                <span className="text-sm font-medium text-slate-500">
                    {language}
                </span>
            </header>

            <div className="min-h-0 flex-1 bg-[#1e1e1e]">
                <Editor
                    height="100%"
                    language={
                        editorLanguageMap[
                        language
                        ]
                    }
                    value={code}
                    onChange={(value) =>
                        setCode(value || "")
                    }
                    theme="vs-dark"
                    options={{
                        minimap: {
                            enabled: false,
                        },
                        fontSize: 14,
                        lineHeight: 22,
                        padding: {
                            top: 12,
                            bottom: 12,
                        },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        wordWrap: "on",
                        tabSize: 4,
                        insertSpaces: true,
                        renderLineHighlight: "line",
                        smoothScrolling: true,
                        overviewRulerBorder: false,
                        hideCursorInOverviewRuler: true,
                        scrollbar: {
                            verticalScrollbarSize: 8,
                            horizontalScrollbarSize: 8,
                        },
                    }}
                />
            </div>

            {hasResults && (
                <div className="max-h-40 shrink-0 overflow-y-auto border-t border-slate-200 bg-white">
                    <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-slate-200 bg-white px-4 py-2.5">
                        <TerminalSquare className="h-4 w-4 text-violet-600" />

                        <h3 className="text-sm font-bold text-slate-900">
                            Test results
                        </h3>
                    </div>

                    <TestResultsPanel
                        testResults={testResults}
                        runOutput={runOutput}
                    />
                </div>
            )}

            <footer className="flex shrink-0 items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-4 py-2.5">
                <button
                    type="button"
                    onClick={runCode}
                    disabled={
                        runningCode ||
                        submittingCode ||
                        !code.trim()
                    }
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {runningCode ? (
                        <>
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                            Running...
                        </>
                    ) : (
                        <>
                            <Play className="h-4 w-4" />
                            Run Code
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={submitCode}
                    disabled={
                        runningCode ||
                        submittingCode ||
                        !code.trim()
                    }
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {submittingCode ? (
                        <>
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                            Evaluating...
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4" />
                            Submit Code
                        </>
                    )}
                </button>
            </footer>
        </section>
    );
}