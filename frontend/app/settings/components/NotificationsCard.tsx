"use client";

import { Bell, Mail } from "lucide-react";

type NotificationsCardProps = {
    weeklySummary: boolean;
    interviewReminders: boolean;
    resumeNotifications: boolean;
    productUpdates: boolean;
    onWeeklySummaryChange: (value: boolean) => void;
    onInterviewRemindersChange: (value: boolean) => void;
    onResumeNotificationsChange: (value: boolean) => void;
    onProductUpdatesChange: (value: boolean) => void;
};

export default function NotificationsCard({
    weeklySummary,
    interviewReminders,
    resumeNotifications,
    productUpdates,
    onWeeklySummaryChange,
    onInterviewRemindersChange,
    onResumeNotificationsChange,
    onProductUpdatesChange,
}: NotificationsCardProps) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div>
                <p className="text-sm font-semibold text-violet-600">
                    Communication
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-950">
                    Notifications
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                    Choose which reminders, summaries, and product updates
                    you want to receive.
                </p>
            </div>

            <div className="mt-6 space-y-3">
                <NotificationRow
                    icon={
                        <Mail
                            size={18}
                            aria-hidden="true"
                        />
                    }
                    title="Weekly progress summary"
                    description="Receive a weekly overview of your interview preparation activity."
                    checked={weeklySummary}
                    onChange={onWeeklySummaryChange}
                />

                <NotificationRow
                    icon={
                        <Bell
                            size={18}
                            aria-hidden="true"
                        />
                    }
                    title="Interview reminders"
                    description="Receive reminders before scheduled practice sessions."
                    checked={interviewReminders}
                    onChange={onInterviewRemindersChange}
                />

                <NotificationRow
                    icon={
                        <Bell
                            size={18}
                            aria-hidden="true"
                        />
                    }
                    title="Resume analysis updates"
                    description="Receive a notification when resume analysis is complete."
                    checked={resumeNotifications}
                    onChange={onResumeNotificationsChange}
                />

                <NotificationRow
                    icon={
                        <Mail
                            size={18}
                            aria-hidden="true"
                        />
                    }
                    title="Product updates"
                    description="Receive occasional updates about new HirePilot features."
                    checked={productUpdates}
                    onChange={onProductUpdatesChange}
                />
            </div>

            <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="text-sm text-slate-500">
                    You can update these preferences at any time.
                </p>
            </div>
        </section>
    );
}

type NotificationRowProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    checked: boolean;
    onChange: (value: boolean) => void;
};

function NotificationRow({
    icon,
    title,
    description,
    checked,
    onChange,
}: NotificationRowProps) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-violet-700 shadow-sm ring-1 ring-slate-200">
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
                role="switch"
                aria-checked={checked}
                aria-label={title}
                onClick={() => onChange(!checked)}
                className={[
                    "relative h-7 w-12 shrink-0 rounded-full transition focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2",
                    checked
                        ? "bg-violet-600"
                        : "bg-slate-300",
                ].join(" ")}
            >
                <span
                    className={[
                        "absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all",
                        checked
                            ? "left-6"
                            : "left-1",
                    ].join(" ")}
                />
            </button>
        </div>
    );
}