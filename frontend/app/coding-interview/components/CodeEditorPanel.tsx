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
    loading: boolean;
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
    loading,
    runCode,
    submitCode,
}: CodeEditorPanelProps) {
    return (
        <div className="border rounded-2xl overflow-hidden flex flex-col">

            <div className="p-4 border-b flex items-center justify-between bg-white">
                <span className="font-semibold text-lg">
                    Solution
                </span>

                <span className="text-sm text-zinc-500">
                    {language}
                </span>
            </div>

            <div className="flex-1 min-h-0">
                <Editor
                    height="100%"
                    language={editorLanguageMap[language]}
                    value={code}
                    onChange={(value) =>
                        setCode(value || "")
                    }
                    theme="vs-dark"
                />
            </div>

            <TestResultsPanel
                testResults={testResults}
                runOutput={runOutput}
            />

            <div className="p-4 border-t flex justify-end gap-3">
                <button
                    onClick={runCode}
                    className="border px-6 py-3 rounded-lg"
                >
                    Run Code
                </button>

                <button
                    onClick={submitCode}
                    disabled={loading || !code}
                    className="bg-violet-600 text-white px-6 py-3 rounded-lg"
                >
                    {loading
                        ? "Evaluating..."
                        : "Submit Code"}
                </button>
            </div>

        </div>
    );
}