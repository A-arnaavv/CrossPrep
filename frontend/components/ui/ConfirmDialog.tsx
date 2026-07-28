"use client";

import { AlertTriangle, X } from "lucide-react";

type ConfirmDialogProps = {
    open: boolean;
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    destructive?: boolean;
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmDialog({
    open,
    title,
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    destructive = false,
    isLoading = false,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    if (!open) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onCancel();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
                className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-7"
            >
                <div className="flex items-start justify-between gap-4">
                    <div
                        className={[
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                            destructive
                                ? "bg-red-100 text-red-600"
                                : "bg-amber-100 text-amber-700",
                        ].join(" ")}
                    >
                        <AlertTriangle
                            size={22}
                            aria-hidden="true"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        aria-label="Close confirmation dialog"
                        className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <X
                            size={19}
                            aria-hidden="true"
                        />
                    </button>
                </div>

                <h2
                    id="confirm-dialog-title"
                    className="mt-5 text-xl font-bold text-slate-950"
                >
                    {title}
                </h2>

                <p
                    id="confirm-dialog-description"
                    className="mt-3 text-sm leading-6 text-slate-600"
                >
                    {description}
                </p>

                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {cancelLabel}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={[
                            "rounded-xl px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60",
                            destructive
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-violet-600 hover:bg-violet-700",
                        ].join(" ")}
                    >
                        {isLoading
                            ? "Processing..."
                            : confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}