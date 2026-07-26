"use client";

import {
    Code2,
    ExternalLink,
    Globe,
    LinkIcon,
    Pencil,
} from "lucide-react";

type ProfessionalLinksCardProps = {
    linkedinUrl: string;
    githubUrl: string;
    portfolioUrl: string;

    draftLinkedinUrl: string;
    draftGithubUrl: string;
    draftPortfolioUrl: string;

    isEditing: boolean;

    onDraftLinkedinUrlChange: (value: string) => void;
    onDraftGithubUrlChange: (value: string) => void;
    onDraftPortfolioUrlChange: (value: string) => void;

    onEdit: () => void;
    onCancel: () => void;
    onSave: () => void;
};

export default function ProfessionalLinksCard({
    linkedinUrl,
    githubUrl,
    portfolioUrl,
    draftLinkedinUrl,
    draftGithubUrl,
    draftPortfolioUrl,
    isEditing,
    onDraftLinkedinUrlChange,
    onDraftGithubUrlChange,
    onDraftPortfolioUrlChange,
    onEdit,
    onCancel,
    onSave,
}: ProfessionalLinksCardProps) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-emerald-600">
                        Professional presence
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-slate-950">
                        Professional Links
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                        Add the profiles that showcase your experience,
                        projects, and professional work.
                    </p>
                </div>

                {!isEditing && (
                    <button
                        type="button"
                        onClick={onEdit}
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        <Pencil
                            size={16}
                            aria-hidden="true"
                        />
                        Edit
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="mt-6 space-y-5">
                    <div>
                        <label
                            htmlFor="linkedin-url"
                            className="text-sm font-semibold text-slate-700"
                        >
                            LinkedIn
                        </label>

                        <input
                            id="linkedin-url"
                            type="url"
                            value={draftLinkedinUrl}
                            onChange={(event) =>
                                onDraftLinkedinUrlChange(
                                    event.target.value
                                )
                            }
                            placeholder="linkedin.com/in/your-profile"
                            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="github-url"
                            className="text-sm font-semibold text-slate-700"
                        >
                            GitHub
                        </label>

                        <input
                            id="github-url"
                            type="url"
                            value={draftGithubUrl}
                            onChange={(event) =>
                                onDraftGithubUrlChange(
                                    event.target.value
                                )
                            }
                            placeholder="github.com/your-username"
                            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="portfolio-url"
                            className="text-sm font-semibold text-slate-700"
                        >
                            Portfolio
                        </label>

                        <input
                            id="portfolio-url"
                            type="url"
                            value={draftPortfolioUrl}
                            onChange={(event) =>
                                onDraftPortfolioUrlChange(
                                    event.target.value
                                )
                            }
                            placeholder="yourportfolio.com"
                            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-1">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={onSave}
                            className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Save
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <LinkCard
                        label="LinkedIn"
                        url={linkedinUrl}
                        actionLabel="View profile"
                        icon={
                            <LinkIcon
                                size={19}
                                aria-hidden="true"
                            />
                        }
                    />

                    <LinkCard
                        label="GitHub"
                        url={githubUrl}
                        actionLabel="View profile"
                        icon={
                            <Code2
                                size={19}
                                aria-hidden="true"
                            />
                        }
                    />

                    <LinkCard
                        label="Portfolio"
                        url={portfolioUrl}
                        actionLabel="Visit website"
                        icon={
                            <Globe
                                size={19}
                                aria-hidden="true"
                            />
                        }
                    />
                </div>
            )}
        </section>
    );
}

type LinkCardProps = {
    label: string;
    url: string;
    actionLabel: string;
    icon: React.ReactNode;
};

function LinkCard({
    label,
    url,
    actionLabel,
    icon,
}: LinkCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm ring-1 ring-slate-200">
                    {icon}
                </div>

                <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-500">
                        {label}
                    </p>

                    {url ? (
                        <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 flex items-center gap-1.5 truncate font-semibold text-slate-900 transition hover:text-violet-700"
                        >
                            {actionLabel}

                            <ExternalLink
                                size={14}
                                aria-hidden="true"
                            />
                        </a>
                    ) : (
                        <p className="mt-1 font-semibold text-slate-900">
                            Not added
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}