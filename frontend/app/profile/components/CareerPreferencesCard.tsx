"use client";

import { Pencil } from "lucide-react";

type CareerPreferencesCardProps = {
    targetRole: string;
    experienceLevel: string;
    preferredCompanies: string;

    draftTargetRole: string;
    draftExperienceLevel: string;
    draftPreferredCompanies: string;

    isEditing: boolean;

    onDraftTargetRoleChange: (value: string) => void;
    onDraftExperienceLevelChange: (value: string) => void;
    onDraftPreferredCompaniesChange: (value: string) => void;

    onEdit: () => void;
    onCancel: () => void;
    onSave: () => void;
};

export default function CareerPreferencesCard({
    targetRole,
    experienceLevel,
    preferredCompanies,
    draftTargetRole,
    draftExperienceLevel,
    draftPreferredCompanies,
    isEditing,
    onDraftTargetRoleChange,
    onDraftExperienceLevelChange,
    onDraftPreferredCompaniesChange,
    onEdit,
    onCancel,
    onSave,
}: CareerPreferencesCardProps) {
    const companies = preferredCompanies
        .split(",")
        .map((company) => company.trim())
        .filter(Boolean);

    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-blue-600">
                        Career goals
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-slate-950">
                        Career Preferences
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                        Define the roles and companies you are preparing for.
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
                            htmlFor="target-role"
                            className="text-sm font-semibold text-slate-700"
                        >
                            Target role
                        </label>

                        <input
                            id="target-role"
                            type="text"
                            value={draftTargetRole}
                            onChange={(event) =>
                                onDraftTargetRoleChange(event.target.value)
                            }
                            placeholder="e.g. Software Engineer"
                            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="experience-level"
                            className="text-sm font-semibold text-slate-700"
                        >
                            Experience level
                        </label>

                        <select
                            id="experience-level"
                            value={draftExperienceLevel}
                            onChange={(event) =>
                                onDraftExperienceLevelChange(
                                    event.target.value
                                )
                            }
                            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                        >
                            <option value="">
                                Select experience level
                            </option>

                            <option value="Student">
                                Student
                            </option>

                            <option value="Entry Level">
                                Entry Level
                            </option>

                            <option value="Mid Level">
                                Mid Level
                            </option>

                            <option value="Senior Level">
                                Senior Level
                            </option>

                            <option value="Leadership">
                                Leadership
                            </option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="preferred-companies"
                            className="text-sm font-semibold text-slate-700"
                        >
                            Preferred companies
                        </label>

                        <input
                            id="preferred-companies"
                            type="text"
                            value={draftPreferredCompanies}
                            onChange={(event) =>
                                onDraftPreferredCompaniesChange(
                                    event.target.value
                                )
                            }
                            placeholder="e.g. Google, Microsoft, Amazon"
                            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                        />

                        <p className="mt-2 text-xs text-slate-500">
                            Separate multiple companies with commas.
                        </p>
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
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <p className="text-sm font-medium text-slate-500">
                            Target role
                        </p>

                        <p className="mt-2 font-semibold text-slate-900">
                            {targetRole || "Not added"}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <p className="text-sm font-medium text-slate-500">
                            Experience level
                        </p>

                        <p className="mt-2 font-semibold text-slate-900">
                            {experienceLevel || "Not added"}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <p className="text-sm font-medium text-slate-500">
                            Preferred companies
                        </p>

                        {companies.length > 0 ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {companies.map((company) => (
                                    <span
                                        key={company}
                                        className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200"
                                    >
                                        {company}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-2 font-semibold text-slate-900">
                                Not added
                            </p>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}