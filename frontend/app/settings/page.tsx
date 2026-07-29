"use client";

import { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import DashboardLayout from "@/components/layout/DashboardLayout";

import AboutSettingsCard from "./components/AboutSettingsCard";
import AccountCard from "./components/AccountCard";
import AIPreferencesCard from "./components/AIPreferencesCard";
import AppearanceCard from "./components/AppearanceCard";
import InterviewPreferencesCard from "./components/InterviewPreferencesCard";
import NotificationsCard from "./components/NotificationsCard";
import PrivacyDataCard from "./components/PrivacyDataCard";
import SaveSettingsBar from "./components/SaveSettingsBar";
import SettingsHeader from "./components/SettingsHeader";
import Alert from "@/components/ui/Alert";
import PageSkeleton from "@/components/ui/PageSkeleton";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

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

type SavedSettingsSnapshot = {
    defaultDuration: string;
    defaultDifficulty: string;
    preferredLanguage: string;
    coachingStyle: string;
    feedbackDetail: string;
    weeklySummary: boolean;
    interviewReminders: boolean;
    resumeNotifications: boolean;
    productUpdates: boolean;
    theme: string;
};

const defaultSettings: SavedSettingsSnapshot = {
    defaultDuration: "30",
    defaultDifficulty: "medium",
    preferredLanguage: "English",
    coachingStyle: "balanced",
    feedbackDetail: "standard",
    weeklySummary: true,
    interviewReminders: true,
    resumeNotifications: true,
    productUpdates: false,
    theme: "system",
};

type ConfirmationAction =
    | "delete-interviews"
    | "delete-resumes"
    | "delete-account"
    | null;

export default function SettingsPage() {
    const { user, isLoaded } = useUser();
    const { openUserProfile, signOut } = useClerk();

    const [defaultDuration, setDefaultDuration] =
        useState(defaultSettings.defaultDuration);

    const [defaultDifficulty, setDefaultDifficulty] =
        useState(defaultSettings.defaultDifficulty);

    const [preferredLanguage, setPreferredLanguage] =
        useState(defaultSettings.preferredLanguage);

    const [coachingStyle, setCoachingStyle] =
        useState(defaultSettings.coachingStyle);

    const [feedbackDetail, setFeedbackDetail] =
        useState(defaultSettings.feedbackDetail);

    const [weeklySummary, setWeeklySummary] =
        useState(defaultSettings.weeklySummary);

    const [interviewReminders, setInterviewReminders] =
        useState(defaultSettings.interviewReminders);

    const [resumeNotifications, setResumeNotifications] =
        useState(defaultSettings.resumeNotifications);

    const [productUpdates, setProductUpdates] =
        useState(defaultSettings.productUpdates);

    const [theme, setTheme] =
        useState(defaultSettings.theme);

    const [savedSettings, setSavedSettings] =
        useState<SavedSettingsSnapshot>(defaultSettings);

    const [isLoadingSettings, setIsLoadingSettings] =
        useState(true);

    const [isSavingSettings, setIsSavingSettings] =
        useState(false);

    const [settingsMessage, setSettingsMessage] =
        useState("");

    const [settingsError, setSettingsError] =
        useState("");

    const [privacyMessage, setPrivacyMessage] =
        useState("");

    const [
        confirmationAction,
        setConfirmationAction,
    ] = useState<ConfirmationAction>(null);

    const [
        isProcessingPrivacyAction,
        setIsProcessingPrivacyAction,
    ] = useState(false);

    const router = useRouter();

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
                    "/api/settings"
                );

                const data = response.data;

                const loadedSettings: SavedSettingsSnapshot = {
                    defaultDuration: String(
                        data.default_interview_duration
                    ),
                    defaultDifficulty:
                        data.default_difficulty,
                    preferredLanguage:
                        data.preferred_language,
                    coachingStyle:
                        data.coaching_style,
                    feedbackDetail:
                        data.feedback_detail,
                    weeklySummary:
                        data.weekly_summary,
                    interviewReminders:
                        data.interview_reminders,
                    resumeNotifications:
                        data.resume_notifications,
                    productUpdates:
                        data.product_updates,
                    theme:
                        data.theme,
                };

                applySettings(loadedSettings);
                setSavedSettings(loadedSettings);
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

    const applySettings = (
        settings: SavedSettingsSnapshot
    ) => {
        setDefaultDuration(
            settings.defaultDuration
        );
        setDefaultDifficulty(
            settings.defaultDifficulty
        );
        setPreferredLanguage(
            settings.preferredLanguage
        );
        setCoachingStyle(
            settings.coachingStyle
        );
        setFeedbackDetail(
            settings.feedbackDetail
        );
        setWeeklySummary(
            settings.weeklySummary
        );
        setInterviewReminders(
            settings.interviewReminders
        );
        setResumeNotifications(
            settings.resumeNotifications
        );
        setProductUpdates(
            settings.productUpdates
        );
        setTheme(
            settings.theme
        );
    };

    const currentSettings: SavedSettingsSnapshot = {
        defaultDuration,
        defaultDifficulty,
        preferredLanguage,
        coachingStyle,
        feedbackDetail,
        weeklySummary,
        interviewReminders,
        resumeNotifications,
        productUpdates,
        theme,
    };

    const hasUnsavedChanges =
        currentSettings.defaultDuration !==
        savedSettings.defaultDuration ||
        currentSettings.defaultDifficulty !==
        savedSettings.defaultDifficulty ||
        currentSettings.preferredLanguage !==
        savedSettings.preferredLanguage ||
        currentSettings.coachingStyle !==
        savedSettings.coachingStyle ||
        currentSettings.feedbackDetail !==
        savedSettings.feedbackDetail ||
        currentSettings.weeklySummary !==
        savedSettings.weeklySummary ||
        currentSettings.interviewReminders !==
        savedSettings.interviewReminders ||
        currentSettings.resumeNotifications !==
        savedSettings.resumeNotifications ||
        currentSettings.productUpdates !==
        savedSettings.productUpdates ||
        currentSettings.theme !==
        savedSettings.theme;

    if (
        !isLoaded ||
        (user && isLoadingSettings)
    ) {
        return (
            <DashboardLayout>
                <PageSkeleton
                    showHero
                    cardCount={4}
                />
            </DashboardLayout>
        );
    }

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

    const clearFeedback = () => {
        setSettingsMessage("");
        setSettingsError("");
    };

    const handleSaveSettings = async () => {
        if (!user) {
            setSettingsError(
                "Please sign in before saving settings."
            );
            return;
        }

        try {
            setIsSavingSettings(true);
            setSettingsMessage("");
            setSettingsError("");

            await api.put("/api/settings", {
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

            setSavedSettings(currentSettings);

            setSettingsMessage(
                "Your settings have been saved successfully."
            );
        } catch (error) {
            console.error(
                "Settings save failed:",
                error
            );

            setSettingsError(
                "We could not save your settings. Please try again."
            );
        } finally {
            setIsSavingSettings(false);
        }
    };

    const handleResetSettings = () => {
        applySettings(savedSettings);
        setSettingsMessage("");
        setSettingsError("");
    };

    const handleExportData = async () => {
        if (!user) {
            setPrivacyMessage(
                "Please sign in before exporting your data."
            );
            return;
        }

        try {
            setPrivacyMessage("");

            const response = await api.get(
                "/api/settings/export",
                {
                    responseType: "blob",
                }
            );

            const blob = new Blob(
                [response.data],
                {
                    type: "application/json",
                }
            );

            const downloadUrl =
                window.URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = downloadUrl;
            link.download =
                `hirepilot-data-${new Date()
                    .toISOString()
                    .slice(0, 10)}.json`;

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(
                downloadUrl
            );

            setPrivacyMessage(
                "Your data export has been downloaded."
            );
        } catch (error) {
            console.error(
                "Data export failed:",
                error
            );

            setPrivacyMessage(
                "We could not export your data. Please try again."
            );
        }
    };

    const handleDeleteInterviewHistory = () => {
        setPrivacyMessage("");
        setConfirmationAction(
            "delete-interviews"
        );
    };

    const handleDeleteResumeHistory = () => {
        setPrivacyMessage("");
        setConfirmationAction(
            "delete-resumes"
        );
    };

    const handleDeleteAccount = () => {
        setPrivacyMessage("");
        setConfirmationAction(
            "delete-account"
        );
    };

    const handleConfirmPrivacyAction = async () => {
        if (!user || !confirmationAction) {
            return;
        }

        try {
            setIsProcessingPrivacyAction(true);
            setPrivacyMessage("");

            if (
                confirmationAction ===
                "delete-interviews"
            ) {
                const response = await api.delete(
                    "/api/settings/interviews"
                );

                const deletedCount =
                    response.data.deleted_count ?? 0;

                setPrivacyMessage(
                    deletedCount > 0
                        ? `${deletedCount} interview ${deletedCount === 1
                            ? "record was"
                            : "records were"
                        } deleted successfully.`
                        : "There was no interview history to delete."
                );
            }

            if (
                confirmationAction ===
                "delete-resumes"
            ) {
                const response = await api.delete(
                    "/api/settings/resumes"
                );

                const deletedCount =
                    response.data.deleted_count ?? 0;

                const deletedFiles =
                    response.data.deleted_files ?? 0;

                setPrivacyMessage(
                    deletedCount > 0
                        ? `${deletedCount} resume ${deletedCount === 1
                            ? "record was"
                            : "records were"
                        } deleted successfully. ${deletedFiles} stored ${deletedFiles === 1
                            ? "file was"
                            : "files were"
                        } removed.`
                        : "There was no resume history to delete."
                );
            }

            if (
                confirmationAction ===
                "delete-account"
            ) {
                await api.delete(
                    "/api/settings/account"
                );

                setConfirmationAction(null);

                await user.delete();

                window.location.replace("/sign-up");

                return;
            }

            setConfirmationAction(null);
        } catch (error) {
            console.error(
                "Privacy action failed:",
                error
            );

            setPrivacyMessage(
                "We could not complete that action. Please try again."
            );
        } finally {
            setIsProcessingPrivacyAction(false);
        }
    };

    const confirmationConfig = {
        "delete-interviews": {
            title: "Clear interview history?",
            description:
                "This will permanently remove all saved interview sessions and feedback. This action cannot be undone.",
            confirmLabel: "Clear Interviews",
        },
        "delete-resumes": {
            title: "Clear resume history?",
            description:
                "This will permanently remove uploaded resumes and their analysis. This action cannot be undone.",
            confirmLabel: "Clear Resumes",
        },
        "delete-account": {
            title: "Delete your account?",
            description:
                "This will permanently remove your HirePilot account and all associated data. This action cannot be undone.",
            confirmLabel: "Delete Account",
        },
    } as const;

    const activeConfirmation =
        confirmationAction
            ? confirmationConfig[
            confirmationAction
            ]
            : null;

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-6xl space-y-8">
                <SettingsHeader />

                <AccountCard
                    fullName={fullName}
                    email={email}
                    memberSince={memberSince}
                    imageUrl={user?.imageUrl}
                    onManageAccount={() =>
                        openUserProfile()
                    }
                    onSignOut={() =>
                        signOut({
                            redirectUrl: "/sign-in",
                        })
                    }
                />

                <div className="grid gap-6 lg:grid-cols-2">
                    <InterviewPreferencesCard
                        duration={defaultDuration}
                        difficulty={defaultDifficulty}
                        language={preferredLanguage}
                        onDurationChange={(value) => {
                            setDefaultDuration(value);
                            clearFeedback();
                        }}
                        onDifficultyChange={(value) => {
                            setDefaultDifficulty(value);
                            clearFeedback();
                        }}
                        onLanguageChange={(value) => {
                            setPreferredLanguage(value);
                            clearFeedback();
                        }}
                    />

                    <AIPreferencesCard
                        coachingStyle={coachingStyle}
                        feedbackDetail={feedbackDetail}
                        onCoachingStyleChange={(value) => {
                            setCoachingStyle(value);
                            clearFeedback();
                        }}
                        onFeedbackDetailChange={(value) => {
                            setFeedbackDetail(value);
                            clearFeedback();
                        }}
                    />

                    <NotificationsCard
                        weeklySummary={weeklySummary}
                        interviewReminders={
                            interviewReminders
                        }
                        resumeNotifications={
                            resumeNotifications
                        }
                        productUpdates={productUpdates}
                        onWeeklySummaryChange={(value) => {
                            setWeeklySummary(value);
                            clearFeedback();
                        }}
                        onInterviewRemindersChange={(value) => {
                            setInterviewReminders(value);
                            clearFeedback();
                        }}
                        onResumeNotificationsChange={(value) => {
                            setResumeNotifications(value);
                            clearFeedback();
                        }}
                        onProductUpdatesChange={(value) => {
                            setProductUpdates(value);
                            clearFeedback();
                        }}
                    />

                    <AppearanceCard
                        theme={theme}
                        onThemeChange={(value) => {
                            setTheme(value);
                            clearFeedback();
                        }}
                    />

                    <div className="lg:col-span-2">
                        <AboutSettingsCard version="1.0.0" />
                    </div>

                    <div className="lg:col-span-2">
                        <PrivacyDataCard
                            onExportData={handleExportData}
                            onDeleteInterviewHistory={
                                handleDeleteInterviewHistory
                            }
                            onDeleteResumeHistory={
                                handleDeleteResumeHistory
                            }
                            onDeleteAccount={
                                handleDeleteAccount
                            }
                        />

                        {privacyMessage && (
                            <Alert variant="info">
                                {privacyMessage}
                            </Alert>
                        )}
                    </div>

                    <div className="lg:col-span-2">
                        <SaveSettingsBar
                            hasUnsavedChanges={
                                hasUnsavedChanges
                            }
                            isSaving={
                                isSavingSettings
                            }
                            message={
                                settingsMessage
                            }
                            error={
                                settingsError
                            }
                            onReset={
                                handleResetSettings
                            }
                            onSave={
                                handleSaveSettings
                            }
                        />
                    </div>
                </div>
            </div>

            {activeConfirmation && (
                <ConfirmDialog
                    open
                    title={activeConfirmation.title}
                    description={
                        activeConfirmation.description
                    }
                    confirmLabel={
                        activeConfirmation.confirmLabel
                    }
                    destructive
                    isLoading={
                        isProcessingPrivacyAction
                    }
                    onCancel={() =>
                        setConfirmationAction(null)
                    }
                    onConfirm={
                        handleConfirmPrivacyAction
                    }
                />
            )}
        </DashboardLayout>
    );
}