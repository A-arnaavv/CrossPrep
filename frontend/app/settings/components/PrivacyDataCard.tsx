"use client";

import {
    Download,
    FileText,
    ShieldCheck,
    Trash2,
} from "lucide-react";

type PrivacyDataCardProps = {
    onExportData: () => void;
    onDeleteInterviewHistory: () => void;
    onDeleteResumeHistory: () => void;
    onDeleteAccount: () => void;
};

export default function PrivacyDataCard({
    onExportData,
    onDeleteInterviewHistory,
    onDeleteResumeHistory,
    onDeleteAccount,
}: PrivacyDataCardProps) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div>
                <p className="text-sm font-semibold text-violet-600">
                    Your information
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-950">
                    Privacy & Data
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                    Export your information or manage data stored by
                    InterviewGPT.
                </p>
            </div>

            <div className="mt-6 space-y-4">
                <ActionRow
                    icon={
                        <Download
                            size={18}
                            aria-hidden="true"
                        />
                    }
                    title="Export your data"
                    description="Download a copy of your profile, resumes, interviews, and saved preferences."
                    actionLabel="Export Data"
                    onAction={onExportData}
                />

                <ActionRow
                    icon={
                        <FileText
                            size={18}
                            aria-hidden="true"
                        />
                    }
                    title="Delete interview history"
                    description="Remove your saved interview sessions and related feedback."
                    actionLabel="Delete Interviews"
                    destructive
                    onAction={onDeleteInterviewHistory}
                />

                <ActionRow
                    icon={
                        <FileText
                            size={18}
                            aria-hidden="true"
                        />
                    }
                    title="Delete resume history"
                    description="Remove uploaded resumes and associated AI analysis."
                    actionLabel="Delete Resumes"
                    destructive
                    onAction={onDeleteResumeHistory}
                />
            </div>

            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-red-600 ring-1 ring-red-200">
                        <ShieldCheck
                            size={18}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="font-bold text-red-900">
                            Danger Zone
                        </p>

                        <p className="mt-1 text-sm leading-6 text-red-700">
                            Deleting your account permanently removes your
                            InterviewGPT data and cannot be undone.
                        </p>

                        <button
                            type="button"
                            onClick={onDeleteAccount}
                            className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                        >
                            <Trash2
                                size={16}
                                aria-hidden="true"
                            />
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

type ActionRowProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    actionLabel: string;
    destructive?: boolean;
    onAction: () => void;
};

function ActionRow({
    icon,
    title,
    description,
    actionLabel,
    destructive = false,
    onAction,
}: ActionRowProps) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
                <div
                    className={[
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1",
                        destructive
                            ? "text-red-600 ring-red-200"
                            : "text-violet-700 ring-slate-200",
                    ].join(" ")}
                >
                    {icon}
                </div>

                <div>
                    <p className="font-semibold text-slate-900">
                        {title}
                    </p>

                    <p className="mt-1 text-sm leading-5 text-slate-500">
                        {description}
                    </p>
                </div>
            </div>

            <button
                type="button"
                onClick={onAction}
                className={[
                    "shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition",
                    destructive
                        ? "border border-red-200 bg-white text-red-600 hover:bg-red-50"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100",
                ].join(" ")}
            >
                {actionLabel}
            </button>
        </div>
    );
}