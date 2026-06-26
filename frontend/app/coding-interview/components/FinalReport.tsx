type FinalReportProps = {
    report: any;
    role: string;
    language: string;
    onRestart: () => void;
};

export default function FinalReport({
    report,
    role,
    language,
    onRestart,
}: FinalReportProps) {
    return (
        <div className="max-w-4xl mx-auto mt-10 border rounded-3xl p-8 bg-white shadow-sm">

            <div className="text-sm text-violet-600 font-semibold">
                Coding Interview Complete
            </div>

            <h1 className="text-4xl font-bold mt-2">
                {role} Interview Report
            </h1>

            <p className="text-zinc-500 mt-2">
                Language: {language}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">

                <div className="border rounded-2xl p-6">
                    <div className="text-zinc-500">
                        Total Score
                    </div>

                    <div className="text-5xl font-bold text-violet-600 mt-2">
                        {report.total_score}
                        <span className="text-2xl text-zinc-500">
                            /40
                        </span>
                    </div>
                </div>

                <div className="border rounded-2xl p-6">
                    <div className="text-zinc-500">
                        Average Score
                    </div>

                    <div className="text-5xl font-bold text-violet-600 mt-2">
                        {report.average_score}
                        <span className="text-2xl text-zinc-500">
                            /10
                        </span>
                    </div>
                </div>

            </div>

            <div className="mt-8">

                <h2 className="text-2xl font-bold mb-4">
                    Question Breakdown
                </h2>

                <div className="space-y-4">

                    {report.questions?.map(
                        (
                            item: any,
                            index: number
                        ) => (
                            <div
                                key={index}
                                className="border rounded-2xl p-5 flex items-center justify-between"
                            >
                                <div>
                                    <div className="font-semibold">
                                        Question {item.number}
                                    </div>

                                    <div className="text-sm text-zinc-500">
                                        Coding challenge
                                    </div>
                                </div>

                                <div className="text-2xl font-bold text-violet-600">
                                    {item.score}/10
                                </div>
                            </div>
                        )
                    )}

                </div>

            </div>

            <div className="mt-8 border rounded-2xl p-6 bg-zinc-50">

                <h2 className="text-xl font-bold">
                    Overall Summary
                </h2>

                <p className="text-zinc-600 mt-3 leading-7">
                    Your coding interview has been completed. Review your
                    question-wise scores and use them to identify areas for
                    improvement.
                </p>

            </div>

            <button
                onClick={onRestart}
                className="mt-8 bg-violet-600 text-white px-6 py-3 rounded-xl"
            >
                Start New Coding Interview
            </button>

        </div>
    );
}