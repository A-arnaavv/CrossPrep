import type { ResumeAnalysis } from "../types";

type ResumeAnalysisPanelProps = {
    analysis: ResumeAnalysis;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    children: React.ReactNode;
};

export default function ResumeAnalysisPanel({
    analysis,
    activeTab,
    setActiveTab,
    children,
}: ResumeAnalysisPanelProps) {
    return (
        <section
            className="
                mt-10
                rounded-3xl
                border
                border-slate-100
                bg-white
                shadow-sm
            "
        >
            <div className="border-b border-slate-100 p-6">

                <div className="flex items-center justify-between">

                    <div>

                        <p className="text-sm font-semibold text-violet-600">
                            Analysis complete
                        </p>

                        <h2 className="mt-2 text-4xl font-bold">
                            AI Resume Analysis
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Review your ATS score, skills,
                            projects, education and AI
                            recommendations.
                        </p>

                    </div>

                    <div
                        className="
                            rounded-full
                            bg-emerald-100
                            px-5
                            py-3
                            font-semibold
                            text-emerald-700
                        "
                    >
                        ✓ Analysis Ready
                    </div>

                </div>

            </div>

            <div className="border-b border-slate-100 px-6 py-4">

                <div className="flex flex-wrap gap-3">

                    {[
                        "overview",
                        "skills",
                        "projects",
                        "experience",
                        "education",
                    ].map((tab) => (

                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                rounded-full
                px-5
                py-2
                text-sm
                font-semibold
                transition
                ${activeTab === tab
                                    ? "bg-violet-600 text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }
            `}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>

                    ))}

                </div>

            </div>

            <div className="p-6">

                {children}

            </div>

        </section>
    );
}