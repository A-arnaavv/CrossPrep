import {
    BarChart3,
    TrendingUp,
} from "lucide-react";

export default function AnalyticsHeader() {
    return (
        <section className="mb-8 overflow-hidden rounded-[2rem] border border-violet-100 bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-700 p-8 text-white shadow-xl">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
                        <BarChart3 className="h-4 w-4" />
                        Performance Intelligence
                    </div>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                        Analytics Dashboard
                    </h1>

                    <p className="mt-4 max-w-xl text-base leading-7 text-violet-100">
                        Monitor your interview performance, identify
                        improvement trends, and measure your readiness
                        through detailed analytics from every completed
                        mock interview.
                    </p>
                </div>

                <div className="flex h-24 w-24 items-center justify-center self-start rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm lg:h-28 lg:w-28">
                    <TrendingUp className="h-12 w-12 text-white" />
                </div>
            </div>
        </section>
    );
}