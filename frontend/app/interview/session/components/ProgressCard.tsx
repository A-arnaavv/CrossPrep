type ProgressCardProps = {
    currentIndex: number;
    totalQuestions: number;
};

export default function ProgressCard({
    currentIndex,
    totalQuestions,
}: ProgressCardProps) {
    const currentQuestion = currentIndex + 1;

    const progress =
        totalQuestions > 0
            ? (currentQuestion / totalQuestions) * 100
            : 0;

    const remainingQuestions =
        totalQuestions - currentQuestion;

    const isLastQuestion =
        currentQuestion === totalQuestions;

    return (
        <section
            className="
                mt-5 rounded-3xl border border-slate-200
                bg-white px-5 py-4 shadow-sm
            "
        >
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-bold text-slate-900">
                        Question {currentQuestion} of {totalQuestions}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                        {isLastQuestion
                            ? "Final question"
                            : `${remainingQuestions} ${remainingQuestions === 1
                                ? "question"
                                : "questions"
                            } remaining`}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-lg font-bold text-violet-600">
                        {Math.round(progress)}%
                    </p>

                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                        Completed
                    </p>
                </div>
            </div>

            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                    className="
                        h-full rounded-full bg-violet-600
                        transition-all duration-500 ease-out
                    "
                    style={{
                        width: `${progress}%`,
                    }}
                />
            </div>
        </section>
    );
}