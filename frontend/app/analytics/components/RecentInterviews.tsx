import type {
    AnalyticsInterview,
} from "../types";

type RecentInterviewsProps = {
    interviews: AnalyticsInterview[];
};

export default function RecentInterviews({
    interviews,
}: RecentInterviewsProps) {
    return (
        <div
            className="
                sticky
                top-6
                bg-white
                border
                rounded-3xl
                p-6
                shadow-sm
            "
        >

            <h2 className="text-2xl font-bold mb-6">
                Recent Interviews
            </h2>

            <div
                className="
                    space-y-4
                    max-h-[700px]
                    overflow-y-auto
                    pr-2
                "
            >

                {interviews.map(
                    (
                        interview,
                        index
                    ) => (
                        <div
                            key={index}
                            className="
                                bg-white
                                border
                                rounded-2xl
                                p-5
                                shadow-sm
                            "
                        >

                            <div className="flex justify-between items-start">

                                <div>

                                    <h3 className="font-bold">
                                        {interview.role}
                                    </h3>

                                    <p className="text-zinc-500 text-sm">
                                        {interview.level}
                                    </p>

                                    <p className="text-xs text-zinc-400 mt-1">
                                        {new Date(
                                            interview.created_at
                                        ).toLocaleDateString()}
                                    </p>

                                </div>

                                <div className="font-bold text-violet-600">
                                    {interview.average_score}/10
                                </div>

                            </div>

                        </div>
                    )
                )}

            </div>

        </div>
    );
}