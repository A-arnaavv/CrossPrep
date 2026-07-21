import { Archive, BarChart3, TrendingUp } from "lucide-react";

export default function HistoryHeader() {
    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-10">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-100/70 blur-3xl" />
            <div className="absolute -bottom-20 left-1/3 h-44 w-44 rounded-full bg-indigo-100/60 blur-3xl" />

            <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-sm font-semibold text-violet-700">
                    <Archive className="h-4 w-4" />
                    Interview Archive
                </div>

                <div className="mt-5 max-w-3xl">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                        Interview History
                    </h1>

                    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                        Review completed mock interviews, revisit detailed
                        feedback, and track how your performance improves over
                        time.
                    </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                    <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-medium text-slate-700">
                        <BarChart3 className="h-4 w-4 text-violet-600" />
                        Performance reports
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-medium text-slate-700">
                        <TrendingUp className="h-4 w-4 text-violet-600" />
                        Progress tracking
                    </div>
                </div>
            </div>
        </section>
    );
}