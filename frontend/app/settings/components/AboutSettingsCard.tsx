"use client";

import {
    ExternalLink,
    FileText,
    HelpCircle,
    Info,
    Mail,
} from "lucide-react";

type AboutSettingsCardProps = {
    version?: string;
};

export default function AboutSettingsCard({
    version = "1.0.0",
}: AboutSettingsCardProps) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div>
                <p className="text-sm font-semibold text-violet-600">
                    HirePilot
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-950">
                    About
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                    View product information, support options, and legal
                    resources.
                </p>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white">
                        <Info
                            size={21}
                            aria-hidden="true"
                        />
                    </div>

                    <div>
                        <p className="font-bold text-slate-950">
                            HirePilot
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                            AI Career Platform
                        </p>
                    </div>

                    <span className="ml-auto rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                        Version {version}
                    </span>
                </div>
            </div>

            <div className="mt-4 space-y-3">
                <AboutLink
                    icon={
                        <HelpCircle
                            size={18}
                            aria-hidden="true"
                        />
                    }
                    label="Help & Support"
                    description="Get assistance with HirePilot."
                    href="mailto:support@hirepilot.com"
                />

                <AboutLink
                    icon={
                        <Mail
                            size={18}
                            aria-hidden="true"
                        />
                    }
                    label="Contact"
                    description="Send questions or feedback."
                    href="mailto:support@hirepilot.com"
                />

                <AboutLink
                    icon={
                        <FileText
                            size={18}
                            aria-hidden="true"
                        />
                    }
                    label="Privacy Policy"
                    description="Learn how your information is handled."
                    href="/privacy"
                />

                <AboutLink
                    icon={
                        <FileText
                            size={18}
                            aria-hidden="true"
                        />
                    }
                    label="Terms of Service"
                    description="Review the terms for using HirePilot."
                    href="/terms"
                />
            </div>
        </section>
    );
}

type AboutLinkProps = {
    icon: React.ReactNode;
    label: string;
    description: string;
    href: string;
};

function AboutLink({
    icon,
    label,
    description,
    href,
}: AboutLinkProps) {
    const opensExternally =
        href.startsWith("http") ||
        href.startsWith("mailto:");

    return (
        <a
            href={href}
            target={opensExternally ? "_blank" : undefined}
            rel={opensExternally ? "noreferrer" : undefined}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-violet-200 hover:bg-violet-50"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                {icon}
            </div>

            <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900">
                    {label}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                    {description}
                </p>
            </div>

            <ExternalLink
                size={16}
                className="shrink-0 text-slate-400"
                aria-hidden="true"
            />
        </a>
    );
}