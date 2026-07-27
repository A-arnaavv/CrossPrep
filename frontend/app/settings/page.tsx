"use client";

import { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { api } from "@/lib/api";

import DashboardLayout from "@/components/layout/DashboardLayout";
import AccountCard from "./components/AccountCard";
import AIPreferencesCard from "./components/AIPreferencesCard";
import InterviewPreferencesCard from "./components/InterviewPreferencesCard";
import SettingsHeader from "./components/SettingsHeader";
import SettingsPreviewCard from "./components/SettingsPreviewCard";
import NotificationsCard from "./components/NotificationsCard";
import AppearanceCard from "./components/AppearanceCard";
import PrivacyDataCard from "./components/PrivacyDataCard";
import AboutSettingsCard from "./components/AboutSettingsCard";

type SettingsData = {
    default_interview_duration: number;
    default_difficulty: string;
    preferred_language: string;
    coaching_style: string;
    feedback_detail: string;
    weekly_summary: boolean;
    interview_reminders: boolean;
    resume_notifications: boolean;
    product_updates: boolean;
    theme: string;
};

export default function SettingsPage() {
    const { user, isLoaded } = useUser();
    const { openUserProfile, signOut } = useClerk();

    const [defaultDuration, setDefaultDuration] =
        useState("30");

    const [defaultDifficulty, setDefaultDifficulty] =
        useState("medium");

    const [preferredLanguage, setPreferredLanguage] =
        useState("English");

    const [
        isSavingInterviewPreferences,
        setIsSavingInterviewPreferences,
    ] = useState(false);

    const [
        interviewPreferencesMessage,
        setInterviewPreferencesMessage,
    ] = useState("");

    const [coachingStyle, setCoachingStyle] =
        useState("balanced");

    const [feedbackDetail, setFeedbackDetail] =
        useState("standard");

    const [
        isSavingAIPreferences,
        setIsSavingAIPreferences,
    ] = useState(false);

    const [
        aiPreferencesMessage,
        setAIPreferencesMessage,
    ] = useState("");

    const [weeklySummary, setWeeklySummary] =
        useState(true);

    const [interviewReminders, setInterviewReminders] =
        useState(true);

    const [resumeNotifications, setResumeNotifications] =
        useState(true);

    const [productUpdates, setProductUpdates] =
        useState(false);

    const [
        isSavingNotifications,
        setIsSavingNotifications,
    ] = useState(false);

    const [
        notificationsMessage,
        setNotificationsMessage,
    ] = useState("");

    const [privacyMessage, setPrivacyMessage] =
        useState("");

    const [isLoadingSettings, setIsLoadingSettings] =
        useState(true);

    const [settingsError, setSettingsError] =
        useState("");

    const fullName =
        user?.fullName ||
        user?.firstName ||
        "InterviewGPT User";

    const email =
        user?.primaryEmailAddress?.emailAddress ||
        "Email unavailable";

    const memberSince = user?.createdAt
        ? new Intl.DateTimeFormat("en-US", {
            month: "long",
            year: "numeric",
        }).format(user.createdAt)
        : "Not available";

    const [theme, setTheme] =
        useState("system");

    const [
        isSavingAppearance,
        setIsSavingAppearance,
    ] = useState(false);

    const [
        appearanceMessage,
        setAppearanceMessage,
    ] = useState("");

    useEffect(() => {
        const loadSettings = async () => {
            if (!user) {
                setIsLoadingSettings(false);
                return;
            }

            try {
                setIsLoadingSettings(true);
                setSettingsError("");

                const response = await api.get<SettingsData>(
                    "/api/settings",
                    {
                        params: {
                            clerk_id: user.id,
                        },
                    }
                );

                const data = response.data;

                setDefaultDuration(
                    String(data.default_interview_duration)
                );
                setDefaultDifficulty(
                    data.default_difficulty
                );
                setPreferredLanguage(
                    data.preferred_language
                );
                setCoachingStyle(
                    data.coaching_style
                );
                setFeedbackDetail(
                    data.feedback_detail
                );
                setWeeklySummary(
                    data.weekly_summary
                );
                setInterviewReminders(
                    data.interview_reminders
                );
                setResumeNotifications(
                    data.resume_notifications
                );
                setProductUpdates(
                    data.product_updates
                );
                setTheme(data.theme);
            } catch (error) {
                console.error(
                    "Settings loading failed:",
                    error
                );

                setSettingsError(
                    "We could not load your settings."
                );
            } finally {
                setIsLoadingSettings(false);
            }
        };

        loadSettings();
    }, [user]);

    if (
        !isLoaded ||
        (user && isLoadingSettings)
    ) {
        return (
            <DashboardLayout>
                <div className="mx-auto max-w-6xl animate-pulse space-y-8">
                    <div className="space-y-3">
                        <div className="h-4 w-32 rounded bg-slate-200" />
                        <div className="h-10 w-52 rounded-lg bg-slate-200" />
                        <div className="h-5 w-96 max-w-full rounded bg-slate-200" />
                    </div>

                    <div className="h-64 rounded-3xl bg-white" />

                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="h-72 rounded-3xl bg-white" />
                        <div className="h-72 rounded-3xl bg-white" />
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    const saveAllSettings = async () => {
        if (!user) {
            throw new Error(
                "You must be signed in to save settings."
            );
        }

        await api.put("/api/settings", {
            clerk_id: user.id,
            default_interview_duration:
                Number(defaultDuration),
            default_difficulty:
                defaultDifficulty,
            preferred_language:
                preferredLanguage,
            coaching_style:
                coachingStyle,
            feedback_detail:
                feedbackDetail,
            weekly_summary:
                weeklySummary,
            interview_reminders:
                interviewReminders,
            resume_notifications:
                resumeNotifications,
            product_updates:
                productUpdates,
            theme,
        });
    };

    const handleSaveInterviewPreferences = async () => {
        try {
            setIsSavingInterviewPreferences(true);
            setInterviewPreferencesMessage("");
            setSettingsError("");

            await saveAllSettings();

            setInterviewPreferencesMessage(
                "Interview preferences saved successfully."
            );
        } catch (error) {
            console.error(
                "Interview preferences save failed:",
                error
            );

            setSettingsError(
                "We could not save your interview preferences."
            );
        } finally {
            setIsSavingInterviewPreferences(false);
        }
    };

    const handleSaveAIPreferences = async () => {
        try {
            setIsSavingAIPreferences(true);
            setAIPreferencesMessage("");
            setSettingsError("");

            await saveAllSettings();

            setAIPreferencesMessage(
                "AI preferences saved successfully."
            );
        } catch (error) {
            console.error(
                "AI preferences save failed:",
                error
            );

            setSettingsError(
                "We could not save your AI preferences."
            );
        } finally {
            setIsSavingAIPreferences(false);
        }
    };

    const handleSaveNotifications = async () => {
        try {
            setIsSavingNotifications(true);
            setNotificationsMessage("");
            setSettingsError("");

            await saveAllSettings();

            setNotificationsMessage(
                "Notification preferences saved successfully."
            );
        } catch (error) {
            console.error(
                "Notification preferences save failed:",
                error
            );

            setSettingsError(
                "We could not save your notification preferences."
            );
        } finally {
            setIsSavingNotifications(false);
        }
    };

    const handleSaveAppearance = async () => {
        try {
            setIsSavingAppearance(true);
            setAppearanceMessage("");
            setSettingsError("");

            await saveAllSettings();

            setAppearanceMessage(
                "Appearance preference saved successfully."
            );
        } catch (error) {
            console.error(
                "Appearance save failed:",
                error
            );

            setSettingsError(
                "We could not save your appearance preference."
            );
        } finally {
            setIsSavingAppearance(false);
        }
    };

    const handleExportData = () => {
        setPrivacyMessage(
            "Data export will be connected during the backend integration step."
        );
    };

    const handleDeleteInterviewHistory = () => {
        const confirmed = window.confirm(
            "Delete all interview history? This action cannot be undone."
        );

        if (!confirmed) {
            return;
        }

        setPrivacyMessage(
            "Interview history deletion will be connected during backend integration."
        );
    };

    const handleDeleteResumeHistory = () => {
        const confirmed = window.confirm(
            "Delete all resume history? This action cannot be undone."
        );

        if (!confirmed) {
            return;
        }

        setPrivacyMessage(
            "Resume history deletion will be connected during backend integration."
        );
    };

    const handleDeleteAccount = () => {
        const confirmed = window.confirm(
            "Permanently delete your account and all InterviewGPT data?"
        );

        if (!confirmed) {
            return;
        }

        setPrivacyMessage(
            "Account deletion will be connected after the data-deletion workflow is finalized."
        );
    };

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-6xl space-y-8">
                <SettingsHeader />

                <AccountCard
                    fullName={fullName}
                    email={email}
                    memberSince={memberSince}
                    imageUrl={user?.imageUrl}
                    onManageAccount={() => openUserProfile()}
                    onSignOut={() =>
                        signOut({
                            redirectUrl: "/sign-in",
                        })
                    }
                />

                {settingsError && (
                    <p
                        role="alert"
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                    >
                        {settingsError}
                    </p>
                )}

                <div className="grid gap-6 lg:grid-cols-2">
                    <InterviewPreferencesCard
                        duration={defaultDuration}
                        difficulty={defaultDifficulty}
                        language={preferredLanguage}
                        isSaving={isSavingInterviewPreferences}
                        message={interviewPreferencesMessage}
                        onDurationChange={(value) => {
                            setDefaultDuration(value);
                            setInterviewPreferencesMessage("");
                        }}
                        onDifficultyChange={(value) => {
                            setDefaultDifficulty(value);
                            setInterviewPreferencesMessage("");
                        }}
                        onLanguageChange={(value) => {
                            setPreferredLanguage(value);
                            setInterviewPreferencesMessage("");
                        }}
                        onSave={
                            handleSaveInterviewPreferences
                        }
                    />

                    <AIPreferencesCard
                        coachingStyle={coachingStyle}
                        feedbackDetail={feedbackDetail}
                        isSaving={isSavingAIPreferences}
                        message={aiPreferencesMessage}
                        onCoachingStyleChange={(value) => {
                            setCoachingStyle(value);
                            setAIPreferencesMessage("");
                        }}
                        onFeedbackDetailChange={(value) => {
                            setFeedbackDetail(value);
                            setAIPreferencesMessage("");
                        }}
                        onSave={handleSaveAIPreferences}
                    />

                    <NotificationsCard
                        weeklySummary={weeklySummary}
                        interviewReminders={interviewReminders}
                        resumeNotifications={resumeNotifications}
                        productUpdates={productUpdates}
                        isSaving={isSavingNotifications}
                        message={notificationsMessage}
                        onWeeklySummaryChange={(value) => {
                            setWeeklySummary(value);
                            setNotificationsMessage("");
                        }}
                        onInterviewRemindersChange={(value) => {
                            setInterviewReminders(value);
                            setNotificationsMessage("");
                        }}
                        onResumeNotificationsChange={(value) => {
                            setResumeNotifications(value);
                            setNotificationsMessage("");
                        }}
                        onProductUpdatesChange={(value) => {
                            setProductUpdates(value);
                            setNotificationsMessage("");
                        }}
                        onSave={handleSaveNotifications}
                    />

                    <AppearanceCard
                        theme={theme}
                        isSaving={isSavingAppearance}
                        message={appearanceMessage}
                        onThemeChange={(value) => {
                            setTheme(value);
                            setAppearanceMessage("");
                        }}
                        onSave={handleSaveAppearance}
                    />

                    <div className="lg:col-span-2">
                        <PrivacyDataCard
                            onExportData={handleExportData}
                            onDeleteInterviewHistory={
                                handleDeleteInterviewHistory
                            }
                            onDeleteResumeHistory={
                                handleDeleteResumeHistory
                            }
                            onDeleteAccount={handleDeleteAccount}
                        />

                        {privacyMessage && (
                            <p
                                role="status"
                                className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700"
                            >
                                {privacyMessage}
                            </p>
                        )}
                    </div>

                    <AboutSettingsCard version="1.0.0" />
                </div>
            </div>
        </DashboardLayout>
    );
}