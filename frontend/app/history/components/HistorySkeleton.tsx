export default function HistorySkeleton() {
    return (
        <div className="animate-pulse space-y-8">
            {/* Header */}
            <div>
                <div className="h-5 w-40 rounded-full bg-slate-200" />

                <div className="mt-4 h-10 w-72 rounded-xl bg-slate-200" />

                <div className="mt-3 h-4 w-full max-w-xl rounded bg-slate-100" />
            </div>

            {/* Stats */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
                    >
                        <div className="h-10 w-10 rounded-2xl bg-slate-100" />

                        <div className="mt-6 h-8 w-20 rounded bg-slate-100" />

                        <div className="mt-3 h-4 w-28 rounded bg-slate-100" />
                    </div>
                ))}
            </div>

            {/* Interview cards */}
            <div className="grid gap-6 md:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="h-6 w-44 rounded bg-slate-100" />

                                <div className="mt-3 h-4 w-28 rounded bg-slate-100" />
                            </div>

                            <div className="h-8 w-20 rounded-full bg-slate-100" />
                        </div>

                        <div className="mt-8 space-y-3">
                            <div className="h-4 w-full rounded bg-slate-100" />

                            <div className="h-4 w-5/6 rounded bg-slate-100" />

                            <div className="h-4 w-2/3 rounded bg-slate-100" />
                        </div>

                        <div className="mt-8 flex justify-between">
                            <div className="h-10 w-24 rounded-xl bg-slate-100" />

                            <div className="h-10 w-28 rounded-xl bg-slate-100" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}