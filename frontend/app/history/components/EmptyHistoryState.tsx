import Link from "next/link";

export default function EmptyHistoryState() {
    return (
        <div className="bg-white border rounded-3xl p-10 text-center">

            <div className="text-5xl">
                🧠
            </div>

            <h2 className="text-2xl font-bold mt-4">
                No interviews yet
            </h2>

            <p className="text-zinc-500 mt-2">
                Start your first mock interview to see reports and progress here.
            </p>

            <Link
                href="/interview/new"
                className="inline-flex mt-6 bg-violet-600 text-white px-6 py-3 rounded-xl"
            >
                Start Interview
            </Link>

        </div>
    );
}