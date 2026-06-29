import type {
    CodeTestResult,
} from "../types";

type TestResultsPanelProps = {
    testResults: CodeTestResult[];
    runOutput: string;
};

export default function TestResultsPanel({
    testResults,
    runOutput,
}: TestResultsPanelProps) {
    return (
        <>
            {testResults.length > 0 && (
                <div className="border-t bg-zinc-950 text-white p-4 max-h-60 overflow-y-auto text-sm">
                    <div className="text-zinc-400 mb-3">
                        Test Results
                    </div>

                    <div className="space-y-3">
                        {testResults.map((item, index) => (
                            <div
                                key={index}
                                className="border border-zinc-800 rounded-lg p-3"
                            >
                                <div className="font-semibold mb-2">
                                    {item.passed ? "✅ Passed" : "❌ Failed"}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
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
                        ))}
                    </div>
                </div>
            )}

            {runOutput && testResults.length === 0 && (
                <div className="border-t bg-zinc-950 text-white p-4 max-h-52 overflow-y-auto font-mono text-sm">
                    <div className="text-zinc-400 mb-2">
                        Console Output
                    </div>

                    <pre className="whitespace-pre-wrap">
                        {runOutput}
                    </pre>
                </div>
            )}
        </>
    );
}