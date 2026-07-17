import BackToDashboard from "@/components/navigation/BackToDashboard";

export default function ResumeHeader() {
    return (
        <header className="mb-8">
            <BackToDashboard />

            <div className="mt-8">
                <p className="text-sm font-semibold text-violet-600">
                    Resume
                </p>

                <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-950">
                    Resume Intelligence
                </h1>

                <p className="mt-3 max-w-3xl text-base leading-7 text-slate-500">
                    Upload your resume to receive AI-powered ATS scoring,
                    skill extraction, detailed analysis, and personalized
                    recommendations.
                </p>
            </div>
        </header>
    );
}