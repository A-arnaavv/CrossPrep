"use client";

import Alert from "@/components/ui/Alert";

type SaveProfileBarProps = {
    isSaving: boolean;
    hasUnsavedChanges: boolean;
    message: string;
    error: string;
    onSave: () => void;
};

export default function SaveProfileBar({
    isSaving,
    hasUnsavedChanges,
    message,
    error,
    onSave,
}: SaveProfileBarProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="font-semibold text-slate-900">
                        Save profile changes
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        {hasUnsavedChanges
                            ? "You have unsaved changes."
                            : "Your profile is up to date."}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onSave}
                    disabled={
                        isSaving ||
                        !hasUnsavedChanges
                    }
                    className="inline-flex shrink-0 items-center justify-center rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSaving
                        ? "Saving..."
                        : hasUnsavedChanges
                            ? "Save Profile"
                            : "Saved"}
                </button>
            </div>

            {message && (
                <div className="mt-4">
                    <Alert variant="success">
                        {message}
                    </Alert>
                </div>
            )}

            {error && (
                <div className="mt-4">
                    <Alert variant="error">
                        {error}
                    </Alert>
                </div>
            )}
        </section>
    );
}