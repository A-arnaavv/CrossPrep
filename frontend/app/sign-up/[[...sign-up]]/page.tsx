import { SignUp } from "@clerk/nextjs";
import {
    BarChart3,
    BrainCircuit,
    Code2,
    FileSearch,
} from "lucide-react";

import CrossPrepLogo from "@/components/common/CrossPrepLogo";

const highlights = [
    {
        icon: FileSearch,
        label: "Resume intelligence",
    },
    {
        icon: Code2,
        label: "Coding interview practice",
    },
    {
        icon: BrainCircuit,
        label: "Behavioral interview preparation",
    },
    {
        icon: BarChart3,
        label: "Performance analytics",
    },
];

export default function SignUpPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#f8f9ff]">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-violet-200/60 blur-[130px]" />
                <div className="absolute -bottom-44 -right-36 h-[36rem] w-[36rem] rounded-full bg-indigo-200/50 blur-[140px]" />
            </div>

            <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
                {/* Left side */}
                <section className="hidden lg:block">
                    <CrossPrepLogo showSubtitle />

                    <div className="mt-14 max-w-xl">
                        <span className="inline-flex rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
                            Get started with CrossPrep
                        </span>

                        <h1 className="mt-6 text-5xl font-bold leading-[1.06] tracking-[-0.04em] text-slate-950">
                            Prepare smarter for your
                            <span className="block text-violet-600">
                                next interview.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
                            Build your interview readiness with AI-powered resume insights,
                            coding practice, behavioral interviews, and actionable
                            performance feedback.
                        </p>

                        <div className="mt-10 grid gap-4 sm:grid-cols-2">
                            {highlights.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.label}
                                        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <span className="text-sm font-semibold text-slate-700">
                                            {item.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Clerk sign-up */}
                <section className="flex items-center justify-center">
                    <div className="w-full max-w-md">
                        {/* Mobile logo */}
                        <div className="mb-8 flex justify-center lg:hidden">
                            <CrossPrepLogo showSubtitle />
                        </div>

                        <SignUp
                            appearance={{
                                elements: {
                                    rootBox: "w-full",

                                    card:
                                        "w-full rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(76,29,149,0.15)]",

                                    headerTitle:
                                        "text-2xl font-bold tracking-tight text-slate-950",

                                    headerSubtitle:
                                        "text-sm text-slate-500",

                                    socialButtonsBlockButton:
                                        "rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50",

                                    socialButtonsBlockButtonText:
                                        "font-semibold",

                                    dividerLine:
                                        "bg-slate-200",

                                    dividerText:
                                        "text-slate-400",

                                    formFieldLabel:
                                        "font-semibold text-slate-700",

                                    formFieldInput:
                                        "rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm focus:border-violet-500 focus:ring-violet-500",

                                    formButtonPrimary:
                                        "rounded-xl bg-violet-600 font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700",

                                    footerActionText:
                                        "text-slate-500",

                                    footerActionLink:
                                        "font-semibold text-violet-600 hover:text-violet-700",

                                    identityPreviewEditButton:
                                        "text-violet-600 hover:text-violet-700",
                                },
                            }}
                        />
                    </div>
                </section>
            </div>
        </main>
    );
}