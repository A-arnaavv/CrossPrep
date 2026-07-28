type PageSkeletonProps = {
    showHero?: boolean;
    cardCount?: number;
};

export default function PageSkeleton({
    showHero = true,
    cardCount = 4,
}: PageSkeletonProps) {
    return (
        <div className="mx-auto max-w-6xl animate-pulse space-y-8">
            <div className="space-y-3">
                <div className="h-4 w-32 rounded bg-slate-200" />
                <div className="h-10 w-56 rounded-lg bg-slate-200" />
                <div className="h-5 w-96 max-w-full rounded bg-slate-200" />
            </div>

            {showHero && (
                <div className="h-56 rounded-3xl border border-slate-200 bg-white" />
            )}

            <div className="grid gap-6 lg:grid-cols-2">
                {Array.from({
                    length: cardCount,
                }).map((_, index) => (
                    <div
                        key={index}
                        className="h-72 rounded-3xl border border-slate-200 bg-white"
                    />
                ))}
            </div>
        </div>
    );
}