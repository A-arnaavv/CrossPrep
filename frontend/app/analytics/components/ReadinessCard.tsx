type ReadinessCardProps = {
    averageScore: string;
};

export default function ReadinessCard({
    averageScore,
}: ReadinessCardProps) {

    const readiness =
        Math.min(
            100,
            Math.round(
                Number(
                    averageScore
                ) * 10
            )
        );

    const status =
        Number(averageScore) >= 8
            ? "Ready"
            : Number(averageScore) >= 6
                ? "Almost Ready"
                : "Needs Practice";

    return (
        <div
            className="
                bg-gradient-to-r
                from-violet-600
                to-purple-600
                text-white
                rounded-3xl
                p-6
                shadow-lg
            "
        >

            <div className="text-lg opacity-90">
                Interview Readiness
            </div>

            <div className="flex items-center justify-between mt-6">

                <div>

                    <div className="text-5xl font-bold">
                        {readiness}%
                    </div>

                    <div className="text-xl mt-2">
                        {status}
                    </div>

                </div>

            </div>

            <p className="mt-4 opacity-80">
                Based on your overall interview performance.
            </p>

        </div>
    );
}