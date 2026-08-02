import { Bot } from "lucide-react";
import Link from "next/link";

export default function LandingFooter() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr] lg:px-8">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-600 text-white">
                            <Bot className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="font-bold text-slate-950">
                                CrossPrep
                            </p>

                            <p className="text-xs text-slate-400">
                                AI Career Platform
                            </p>
                        </div>
                    </div>

                    <p className="mt-5 max-w-md leading-7 text-slate-500">
                        A focused workspace for resume intelligence, interview practice,
                        coding preparation, AI coaching, and measurable progress.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
                    <FooterColumn
                        title="Product"
                        links={[
                            ["Features", "#features"],
                            ["How it works", "#workflow"],
                        ]}
                    />

                    <FooterColumn
                        title="Account"
                        links={[
                            ["Sign in", "/sign-in"],
                            ["Get started", "/sign-up"],
                        ]}
                    />

                    <FooterColumn
                        title="Platform"
                        links={[
                            ["FAQ", "#faq"],
                            ["Dashboard", "/dashboard"],
                        ]}
                    />
                </div>
            </div>

            <div className="border-t border-slate-100">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                    <p>
                        © {new Date().getFullYear()} CrossPrep. All rights reserved.
                    </p>

                    <p>
                        AI-powered career preparation.
                    </p>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({
    title,
    links,
}: {
    title: string;
    links: [string, string][];
}) {
    return (
        <div>
            <p className="font-bold text-slate-900">
                {title}
            </p>

            <div className="mt-4 space-y-3">
                {links.map(([label, href]) => (
                    <Link
                        key={label}
                        href={href}
                        className="block text-slate-500 transition hover:text-violet-700"
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </div>
    );
}