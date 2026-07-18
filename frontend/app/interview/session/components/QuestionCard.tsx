import { MessageSquareText } from "lucide-react";

type QuestionCardProps = {
    question: string;
    currentQuestion: number;
};

export default function QuestionCard({
    question,
    currentQuestion,
}: QuestionCardProps) {
    return (
        <section
            className="
                rounded-2xl
                border border-slate-200
                bg-white
                px-5 py-4
                shadow-sm
            "
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className="
                            flex h-9 w-9
                            items-center
                            justify-center
                            rounded-lg
                            bg-violet-100
                            text-violet-600
                        "
                    >
                        <MessageSquareText className="h-4 w-4" />
                    </div>

                    <div>
                        <p
                            className="
                                text-[11px]
                                font-semibold
                                uppercase
                                tracking-[0.15em]
                                text-violet-600
                            "
                        >
                            AI Interviewer
                        </p>

                        <p className="text-sm text-slate-500">
                            Question {currentQuestion}
                        </p>
                    </div>
                </div>

                <div
                    className="
                        rounded-full
                        bg-green-50
                        px-2.5 py-1
                        text-xs
                        font-semibold
                        text-green-700
                    "
                >
                    Live
                </div>
            </div>

            <div className="mt-4">
                <p
                    className="
                        text-xl
                        font-semibold
                        leading-8
                        text-slate-900
                    "
                >
                    {question}
                </p>
            </div>
        </section>
    );
}