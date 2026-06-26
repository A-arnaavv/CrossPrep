import ProgressDots from "./ProgressDots";

type QuestionPanelProps = {
    question: any;
    activeTab: string;
    setActiveTab: (value: string) => void;
    questionNumber: number;
    totalQuestions: number;
};

export default function QuestionPanel({
    question,
    activeTab,
    setActiveTab,
    questionNumber,
    totalQuestions,
}: QuestionPanelProps) {
    return (
        <div className="border rounded-2xl p-6 overflow-y-auto">
            <ProgressDots
                questionNumber={questionNumber}
                totalQuestions={totalQuestions}
            />

            <h2 className="text-3xl font-bold mt-2">
                {question.title}
            </h2>

            <div className="flex gap-2 mb-5 mt-5">
                <button
                    onClick={() => setActiveTab("description")}
                    className={`
                        px-4
                        py-2
                        rounded-lg
                        ${activeTab === "description"
                            ? "bg-violet-600 text-white"
                            : "bg-zinc-100"
                        }
                    `}
                >
                    Description
                </button>

                <button
                    onClick={() => setActiveTab("hints")}
                    className={`
                        px-4
                        py-2
                        rounded-lg
                        ${activeTab === "hints"
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
                                (example: any, index: number) => (
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
    );
}