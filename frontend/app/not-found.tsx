import Link from "next/link";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-violet-50 px-6">
            <div className="max-w-lg text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                    <SearchX size={44} />
                </div>

                <h1 className="mt-8 text-5xl font-bold text-slate-900">
                    404
                </h1>

                <h2 className="mt-3 text-2xl font-semibold text-slate-800">
                    Page not found
                </h2>

                <p className="mt-4 text-slate-600 leading-7">
                    The page you're looking for doesn't exist or may have been moved.
                </p>

                <Link
                    href="/dashboard"
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700"
                >
                    <Home size={18} />
                    Back to Dashboard
                </Link>
            </div>
        </main>
    );
}