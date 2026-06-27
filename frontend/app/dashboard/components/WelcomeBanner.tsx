import Link from "next/link";

type WelcomeBannerProps = {
    firstName?: string | null;
};

export default function WelcomeBanner({
    firstName,
}: WelcomeBannerProps) {
    return (
        <div className="rounded-3xl p-8 mb-6 bg-gradient-to-r from-slate-950 via-slate-900 to-violet-950 text-white shadow-xl">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                <div>

                    <p className="text-violet-300 text-sm font-medium">
                        AI Interview Preparation Platform
                    </p>

                    <h1 className="text-5xl font-bold mt-2">
                        Welcome back, {firstName || "there"}
                    </h1>

                    <p className="text-slate-300 mt-3 max-w-2xl">
                        Track your resume strength, coding performance,
                        interview readiness, and AI-powered improvement areas
                        from one place.
                    </p>

                </div>

                <div className="flex gap-3">

                    <Link
                        href="/coding-interview"
                        className="bg-white text-black px-6 py-3 rounded-2xl font-semibold"
                    >
                        Start Coding
                    </Link>

                    <Link
                        href="/upload"
                        className="border border-white/30 text-white px-6 py-3 rounded-2xl font-semibold"
                    >
                        Upload Resume
                    </Link>

                </div>

            </div>

        </div>
    );
}