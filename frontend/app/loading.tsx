export default function Loading() {
    return (
        <main className="min-h-screen bg-slate-50 px-6 py-10 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-6xl animate-pulse space-y-8">
                <div className="space-y-3">
                    <div className="h-4 w-32 rounded bg-slate-200" />
                    <div className="h-10 w-56 rounded-lg bg-slate-200" />
                    <div className="h-5 w-96 max-w-full rounded bg-slate-200" />
                </div>

                <div className="h-48 rounded-3xl border border-slate-200 bg-white" />

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="h-72 rounded-3xl border border-slate-200 bg-white" />
                    <div className="h-72 rounded-3xl border border-slate-200 bg-white" />
                </div>

                <div className="h-56 rounded-3xl border border-slate-200 bg-white" />
            </div>
        </main>
    );
}