import type {
    InterviewHistoryItem,
} from "./types";

type InterviewHistoryCardProps = {
    interview: InterviewHistoryItem;
};

function getStatusStyle(
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

export default function InterviewHistoryCard({
    interview,
}: InterviewHistoryCardProps) {
    const interviewId =
        interview.interview_id ||
        interview.id;

    return (
        <div className="bg-white border rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all">

            <div className="flex items-start justify-between gap-4">

                <div>

                    <h2 className="text-xl font-bold">
                        {interview.role}
                    </h2>

                    <p className="text-zinc-500 mt-1">
                        {interview.level || "Practice Interview"}
                    </p>

                    <p className="text-sm text-zinc-400 mt-3">
                        {new Date(
                            interview.created_at
                        ).toLocaleString()}
                    </p>

                </div>

                <span
                    className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium
                        ${getStatusStyle(
                        interview.status
                    )}
                    `}
                >
                    {interview.status || "practice"}
                </span>

            </div>

            <button
                onClick={() => {
                    if (!interviewId) return;

                    window.location.href =
                        `/coding-interview/report/${interviewId}`;

                }}
                className="mt-6 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-xl"
            >
                View Report
            </button>

        </div>
    );
}