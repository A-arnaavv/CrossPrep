import {
    BarChart3,
    BrainCircuit,
    FileSearch,
    Sparkles,
} from "lucide-react";

const items = [
    {
        icon: Sparkles,
        value: "6",
        label: "AI-powered tools",
    },
    {
        icon: FileSearch,
        value: "1",
        label: "Unified preparation workspace",
    },
    {
        icon: BrainCircuit,
        value: "Personalized",
        label: "Practice based on your profile",
    },
    {
        icon: BarChart3,
        value: "Measurable",
        label: "Progress across every session",
    },
];

export default function SocialProof() {
    return (
        <section className="border-y border-slate-200/70 bg-white">
            <div className="mx-auto grid max-w-7xl divide-y divide-slate-100 px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-6 lg:grid-cols-4 lg:px-8">
                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.label}
                            className="group flex items-center gap-4 px-4 py-8 sm:px-6 lg:justify-center"
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 transition duration-300 group-hover:bg-violet-600 group-hover:text-white">
                                <Icon className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="font-bold text-slate-950">
                                    {item.value}
                                </p>

                                <p className="mt-1 text-sm text-slate-500">
                                    {item.label}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}