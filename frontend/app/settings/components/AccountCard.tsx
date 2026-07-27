"use client";

import {
    CalendarDays,
    LogOut,
    Mail,
    UserRound,
} from "lucide-react";

type AccountCardProps = {
    fullName: string;
    email: string;
    memberSince: string;
    imageUrl?: string | null;
    onManageAccount: () => void;
    onSignOut: () => void;
};

export default function AccountCard({
    fullName,
    email,
    memberSince,
    imageUrl,
    onManageAccount,
    onSignOut,
}: AccountCardProps) {
    const initials = fullName
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div>
                <p className="text-sm font-semibold text-violet-600">
                    Your account
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-950">
                    Account
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                    Review your account details and manage your sign-in
                    information.
                </p>
            </div>

            <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={`${fullName}'s profile`}
                            className="h-16 w-16 rounded-2xl object-cover"
                        />
                    ) : (
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-xl font-bold text-white">
                            {initials || "U"}
                        </div>
                    )}

                    <div className="min-w-0">
                        <p className="truncate text-lg font-bold text-slate-950">
                            {fullName}
                        </p>

                        <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                            <Mail
                                size={15}
                                aria-hidden="true"
                            />
                            <span className="truncate">
                                {email}
                            </span>
                        </p>

                        <p className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                            <CalendarDays
                                size={14}
                                aria-hidden="true"
                            />
                            Member since {memberSince}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={onManageAccount}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        <UserRound
                            size={17}
                            aria-hidden="true"
                        />
                        Manage Account
                    </button>

                    <button
                        type="button"
                        onClick={onSignOut}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                        <LogOut
                            size={17}
                            aria-hidden="true"
                        />
                        Sign Out
                    </button>
                </div>
            </div>
        </section>
    );
}