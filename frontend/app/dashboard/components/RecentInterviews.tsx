import type { DashboardActivity } from "./types";

type RecentInterviewsProps = {
    activity: DashboardActivity[];
};

function getStatusColor(
    status?: string
) {
    if (status === "completed") {
        return "bg-green-100 text-green-700";
    }

    if (status === "in_progress") {
        return "bg-yellow-100 text-yellow-700";
    }

    return "bg-zinc-100 text-zinc-600";
}

export default function RecentInterviews({
    activity,
}: RecentInterviewsProps) {
    return (
        <div className="mt-8 bg-white border rounded-3xl p-6 shadow-sm">

            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-2xl font-bold">
                        Recent Interviews
                    </h2>

                    <p className="text-zinc-500 mt-1">
                        Review your latest practice sessions.
                    </p>
                </div>

            </div>

            {activity.length === 0 ? (

                <div className="mt-6 rounded-2xl bg-zinc-50 p-6 text-zinc-500">
                    No recent interviews yet. Start a coding or behavioral
                    interview to see your history here.
                </div>

            ) : (

                <div className="mt-6 space-y-4">

                    {activity.slice(0, 5).map(
                        (
                            item,
                            index
                        ) => (

                            <div
                                key={index}
                                className="
                                    border
                                    rounded-2xl
                                    p-5
                                    flex
                                    items-center
                                    justify-between
                                    hover:bg-zinc-50
                                    transition
                                "
                            >

                                <div>

                                    <div className="font-semibold">
                                        {item.role || "Interview Session"}
                                    </div>

                                    <div className="text-sm text-zinc-500 mt-1">
                                        {item.level || "Practice"}
                                    </div>

                                    <div className="text-xs text-zinc-400 mt-2">
                                        {item.created_at
                                            ? new Date(
                                                item.created_at
                                            ).toLocaleString()
                                            : "Recently"}
                                    </div>

                                </div>

                                <div className="text-right">

                                    <div
                                        className={`
                                            inline-flex
                                            px-3
                                            py-1
                                            rounded-full
                                            text-sm
                                            font-medium
                                            ${getStatusColor(
                                            item.status
                                        )}
                                        `}
                                    >
                                        {item.status || "practice"}
                                    </div>

                                    <div className="text-violet-600 font-semibold mt-3">
                                        View →
                                    </div>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>
    );
}