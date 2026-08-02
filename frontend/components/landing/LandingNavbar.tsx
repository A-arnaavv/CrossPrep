import { ArrowRight, Bot } from "lucide-react";
import Link from "next/link";

export default function LandingNavbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 shadow-sm shadow-slate-200/40 backdrop-blur-xl">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200">
                        <Bot className="h-5 w-5" strokeWidth={2.2} />
                    </div>

                    <div>
                        <span className="block text-xl font-bold tracking-tight text-slate-950">
                            CrossPrep
                        </span>

                        <span className="hidden text-xs text-slate-400 sm:block">
                            AI Career Platform
                        </span>
                    </div>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        href="#features"
                        className="text-sm font-medium text-slate-500 transition hover:text-violet-700"
                    >
                        Features
                    </Link>

                    <Link
                        href="#workflow"
                        className="text-sm font-medium text-slate-500 transition hover:text-violet-700"
                    >
                        How it works
                    </Link>

                    <Link
                        href="#faq"
                        className="text-sm font-medium text-slate-500 transition hover:text-violet-700"
                    >
                        FAQ
                    </Link>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <Link
                        href="/sign-in"
                        className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-violet-50 hover:text-violet-700 sm:px-4"
                    >
                        Sign in
                    </Link>

                    <Link
                        href="/sign-up"
                        className="group inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
                    >
                        Get started

                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </nav>
        </header>
    );
}