"use client";

import { Check, RotateCcw, Save } from "lucide-react";
import Alert from "@/components/ui/Alert";

type SaveSettingsBarProps = {
    hasUnsavedChanges: boolean;
    isSaving: boolean;
    message: string;
    error: string;
    onReset: () => void;
    onSave: () => void;
};

export default function SaveSettingsBar({
    hasUnsavedChanges,
    isSaving,
    message,
    error,
    onReset,
    onSave,
}: SaveSettingsBarProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="font-semibold text-slate-900">
                        Settings changes
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        {hasUnsavedChanges
                            ? "You have unsaved changes."
                            : "Your settings are up to date."}
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={onReset}
                        disabled={
                            isSaving ||
                            !hasUnsavedChanges
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <RotateCcw
                            size={16}
                            aria-hidden="true"
                        />
                        Reset
                    </button>

                    <button
                        type="button"
                        onClick={onSave}
                        disabled={
                            isSaving ||
                            !hasUnsavedChanges
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSaving ? (
                            <>
                                <Save
                                    size={16}
                                    aria-hidden="true"
                                />
                                Saving...
                            </>
                        ) : hasUnsavedChanges ? (
                            <>
                                <Save
                                    size={16}
                                    aria-hidden="true"
                                />
                                Save Changes
                            </>
                        ) : (
                            <>
                                <Check
                                    size={16}
                                    aria-hidden="true"
                                />
                                Saved
                            </>
                        )}
                    </button>
                </div>
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