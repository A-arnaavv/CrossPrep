"use client";

import { Pencil } from "lucide-react";

type AboutCardProps = {
    bio: string;
    draftBio: string;
    isEditing: boolean;
    onDraftChange: (value: string) => void;
    onEdit: () => void;
    onCancel: () => void;
    onSave: () => void;
};

export default function AboutCard({
    bio,
    draftBio,
    isEditing,
    onDraftChange,
    onEdit,
    onCancel,
    onSave,
}: AboutCardProps) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-violet-600">
                        Introduction
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-slate-950">
                        About Me
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                        Share a short professional introduction about your
                        background, interests, and career goals.
                    </p>
                </div>

                {!isEditing && (
                    <button
                        type="button"
                        onClick={onEdit}
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                        <Pencil size={16} aria-hidden="true" />
                        Edit
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="mt-6">
                    <label htmlFor="profile-bio" className="sr-only">
                        About me
                    </label>

                    <textarea
                        id="profile-bio"
                        value={draftBio}
                        onChange={(event) =>
                            onDraftChange(event.target.value)
                        }
                        maxLength={500}
                        rows={6}
                        placeholder="Tell recruiters and interviewers about your background, interests, and career goals."
                        className="w-full resize-none rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                    />

                    <div className="mt-2 flex items-center justify-between gap-4">
                        <p className="text-xs text-slate-500">
                            Keep it concise and professional.
                        </p>

                        <p className="text-xs font-medium text-slate-500">
                            {draftBio.length}/500
                        </p>
                    </div>

                    <div className="mt-5 flex justify-end gap-3">
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
            ) : bio ? (
                <p className="mt-6 whitespace-pre-line text-sm leading-7 text-slate-700 sm:text-base">
                    {bio}
                </p>
            ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">
                    <p className="font-semibold text-slate-900">
                        No bio added yet
                    </p>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                        Add a short introduction so recruiters, hiring
                        managers, and interviewers can understand your
                        professional background and ambitions.
                    </p>
                </div>
            )}
        </section>
    );
}