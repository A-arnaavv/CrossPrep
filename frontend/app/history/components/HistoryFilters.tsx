"use client";

import {
    ArrowDownAZ,
    ArrowUpAZ,
    Search,
    SlidersHorizontal,
    X,
} from "lucide-react";

export type HistorySortOption =
    | "newest"
    | "oldest"
    | "role-asc"
    | "role-desc";

type HistoryFiltersProps = {
    searchQuery: string;
    statusFilter: string;
    levelFilter: string;
    sortOption: HistorySortOption;
    statuses: string[];
    levels: string[];
    resultCount: number;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onLevelChange: (value: string) => void;
    onSortChange: (value: HistorySortOption) => void;
    onClearFilters: () => void;
};

export default function HistoryFilters({
    searchQuery,
    statusFilter,
    levelFilter,
    sortOption,
    statuses,
    levels,
    resultCount,
    onSearchChange,
    onStatusChange,
    onLevelChange,
    onSortChange,
    onClearFilters,
}: HistoryFiltersProps) {
    const hasActiveFilters =
        searchQuery.trim() !== "" ||
        statusFilter !== "all" ||
        levelFilter !== "all" ||
        sortOption !== "newest";

    return (
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="h-5 w-5 text-violet-600" />

                        <h2 className="text-lg font-bold text-slate-950">
                            Browse interviews
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                        {resultCount}{" "}
                        {resultCount === 1
                            ? "interview"
                            : "interviews"}{" "}
                        found
                    </p>
                </div>

                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={onClearFilters}
                        className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                    >
                        <X className="h-4 w-4" />
                        Clear filters
                    </button>
                )}
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-[minmax(260px,1.5fr)_1fr_1fr_1fr]">
                <label className="relative block">
                    <span className="sr-only">
                        Search interview history
                    </span>

                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(event) =>
                            onSearchChange(
                                event.target.value
                            )
                        }
                        placeholder="Search by role or level..."
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    />
                </label>

                <label>
                    <span className="sr-only">
                        Filter by status
                    </span>

                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            onStatusChange(
                                event.target.value
                            )
                        }
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    >
                        <option value="all">
                            All statuses
                        </option>

                        {statuses.map((status) => (
                            <option
                                key={status}
                                value={status}
                            >
                                {formatLabel(status)}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    <span className="sr-only">
                        Filter by level
                    </span>

                    <select
                        value={levelFilter}
                        onChange={(event) =>
                            onLevelChange(
                                event.target.value
                            )
                        }
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    >
                        <option value="all">
                            All levels
                        </option>

                        {levels.map((level) => (
                            <option
                                key={level}
                                value={level}
                            >
                                {formatLabel(level)}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="relative">
                    <span className="sr-only">
                        Sort interview history
                    </span>

                    {sortOption === "role-desc" ? (
                        <ArrowDownAZ className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    ) : (
                        <ArrowUpAZ className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    )}

                    <select
                        value={sortOption}
                        onChange={(event) =>
                            onSortChange(
                                event.target
                                    .value as HistorySortOption
                            )
                        }
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
                    >
                        <option value="newest">
                            Newest first
                        </option>

                        <option value="oldest">
                            Oldest first
                        </option>

                        <option value="role-asc">
                            Role A–Z
                        </option>

                        <option value="role-desc">
                            Role Z–A
                        </option>
                    </select>
                </label>
            </div>
        </section>
    );
}

function formatLabel(value: string) {
    return value
        .replaceAll("_", " ")
        .replaceAll("-", " ")
        .replace(/\b\w/g, (character) =>
            character.toUpperCase()
        );
}