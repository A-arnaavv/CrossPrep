type ProgressDotsProps = {
    questionNumber: number;
    totalQuestions: number;
};

export default function ProgressDots({
    questionNumber,
    totalQuestions,
}: ProgressDotsProps) {
    return (
        <div className="flex items-center gap-2 mb-5">

            {Array.from(
                { length: totalQuestions },
                (_, index) => {
                    const step = index + 1;

                    return (
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
                    );
                }
            )}

            <span className="ml-3 text-sm text-zinc-500">
                Question {questionNumber} of {totalQuestions}
            </span>

        </div>
    );
}