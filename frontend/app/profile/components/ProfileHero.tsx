"use client";

import {
    CalendarDays,
    Mail,
    UserRound,
} from "lucide-react";

type ProfileHeroProps = {
    fullName: string;
    email: string;
    memberSince: string;
    imageUrl?: string | null;
    onManageAccount: () => void;
};

export default function ProfileHero({
    fullName,
    email,
    memberSince,
    imageUrl,
    onManageAccount,
}: ProfileHeroProps) {
    const initials = fullName
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="h-28 bg-gradient-to-r from-violet-100 via-blue-100 to-indigo-100" />

            <div className="px-6 pb-8 sm:px-8">
                <div className="-mt-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={`${fullName}'s profile`}
                                className="h-28 w-28 rounded-3xl border-4 border-white object-cover shadow-lg"
                            />
                        ) : (
                            <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-4 border-white bg-slate-900 text-3xl font-bold text-white shadow-lg">
                                {initials || "U"}
                            </div>
                        )}

                        <div className="pb-1">
                            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">
                                {fullName}
                            </h2>

                            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                                <Mail
                                    size={16}
                                    aria-hidden="true"
                                />
                                {email}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onManageAccount}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                    >
                        <UserRound
                            size={17}
                            aria-hidden="true"
                        />
                        Manage Account
                    </button>
                </div>

                <div className="mt-8 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-5">
                        <p className="text-sm font-medium text-slate-500">
                            Account email
                        </p>

                        <p className="mt-2 break-all font-semibold text-slate-900">
                            {email}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-5">
                        <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
                            <CalendarDays
                                size={16}
                                aria-hidden="true"
                            />
                            Member since
                        </p>

                        <p className="mt-2 font-semibold text-slate-900">
                            {memberSince}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}