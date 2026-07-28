"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
    onAction?: () => void;
};

export default function EmptyState({
    icon: Icon,
    title,
    description,
    actionLabel,
    actionHref,
    onAction,
}: EmptyStateProps) {
    const actionClasses =
        "inline-flex items-center justify-center rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2";

    return (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <Icon
                    size={30}
                    aria-hidden="true"
                />
            </div>

            <h2 className="mt-6 text-xl font-bold text-slate-950">
                {title}
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
                {description}
            </p>

            {actionLabel && actionHref && (
                <Link
                    href={actionHref}
                    className={`mt-6 ${actionClasses}`}
                >
                    {actionLabel}
                </Link>
            )}

            {actionLabel && !actionHref && onAction && (
                <button
                    type="button"
                    onClick={onAction}
                    className={`mt-6 ${actionClasses}`}
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
}