"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import ProfileHero from "./components/ProfileHero";
import AboutCard from "./components/AboutCard";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CareerPreferencesCard from "./components/CareerPreferencesCard";
import ProfessionalLinksCard from "./components/ProfessionalLinksCard";
import SaveProfileBar from "./components/SaveProfileBar";
import Alert from "@/components/ui/Alert";
import PageSkeleton from "@/components/ui/PageSkeleton";
import { api } from "@/lib/api";

type ProfileData = {
    bio: string;
    target_role: string;
    experience_level: string;
    preferred_companies: string[];
    linkedin_url: string;
    github_url: string;
    portfolio_url: string;
};

type SavedProfileSnapshot = {
    bio: string;
    targetRole: string;
    experienceLevel: string;
    preferredCompanies: string;
    linkedinUrl: string;
    githubUrl: string;
    portfolioUrl: string;
};

export default function ProfilePage() {
    const { user, isLoaded } = useUser();
    const { openUserProfile } = useClerk();
    const [bio, setBio] = useState("");
    const [draftBio, setDraftBio] = useState("");
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [targetRole, setTargetRole] = useState("");
    const [experienceLevel, setExperienceLevel] = useState("");
    const [preferredCompanies, setPreferredCompanies] = useState("");

    const [draftTargetRole, setDraftTargetRole] = useState("");
    const [draftExperienceLevel, setDraftExperienceLevel] = useState("");
    const [draftPreferredCompanies, setDraftPreferredCompanies] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [portfolioUrl, setPortfolioUrl] = useState("");

    const [draftLinkedinUrl, setDraftLinkedinUrl] = useState("");
    const [draftGithubUrl, setDraftGithubUrl] = useState("");
    const [draftPortfolioUrl, setDraftPortfolioUrl] = useState("");

    const [isEditingLinks, setIsEditingLinks] = useState(false);

    const [isEditingCareer, setIsEditingCareer] = useState(false);

    const [isLoadingProfile, setIsLoadingProfile] =
        useState(true);

    const [isSavingProfile, setIsSavingProfile] =
        useState(false);

    const [profileMessage, setProfileMessage] =
        useState("");

    const [profileError, setProfileError] =
        useState("");

    const [savedProfile, setSavedProfile] =
        useState<SavedProfileSnapshot>({
            bio: "",
            targetRole: "",
            experienceLevel: "",
            preferredCompanies: "",
            linkedinUrl: "",
            githubUrl: "",
            portfolioUrl: "",
        });

    useEffect(() => {
        const loadProfile = async () => {
            if (!user) {
                return;
            }

            try {
                setIsLoadingProfile(true);
                setProfileError("");

                const response = await api.get<ProfileData>(
                    "/api/profile"
                );

                const data = response.data;

                const loadedProfile = {
                    bio: data.bio || "",
                    targetRole: data.target_role || "",
                    experienceLevel: data.experience_level || "",
                    preferredCompanies:
                        (data.preferred_companies || []).join(", "),
                    linkedinUrl: data.linkedin_url || "",
                    githubUrl: data.github_url || "",
                    portfolioUrl: data.portfolio_url || "",
                };

                setBio(loadedProfile.bio);
                setTargetRole(loadedProfile.targetRole);
                setExperienceLevel(loadedProfile.experienceLevel);
                setPreferredCompanies(
                    loadedProfile.preferredCompanies
                );
                setLinkedinUrl(loadedProfile.linkedinUrl);
                setGithubUrl(loadedProfile.githubUrl);
                setPortfolioUrl(loadedProfile.portfolioUrl);

                setSavedProfile(loadedProfile);

            } catch (error) {
                console.error(
                    "Profile loading failed:",
                    error
                );

                setProfileError(
                    "We could not load your profile."
                );
            } finally {
                setIsLoadingProfile(false);
            }
        };

        loadProfile();
    }, [user]);

    const hasUnsavedChanges =
        bio !== savedProfile.bio ||
        targetRole !== savedProfile.targetRole ||
        experienceLevel !== savedProfile.experienceLevel ||
        preferredCompanies !==
        savedProfile.preferredCompanies ||
        linkedinUrl !== savedProfile.linkedinUrl ||
        githubUrl !== savedProfile.githubUrl ||
        portfolioUrl !== savedProfile.portfolioUrl;
    useEffect(() => {
        const handleBeforeUnload = (
            event: BeforeUnloadEvent
        ) => {
            if (!hasUnsavedChanges) {
                return;
            }

            event.preventDefault();
            event.returnValue = "";
        };

        window.addEventListener(
            "beforeunload",
            handleBeforeUnload
        );

        return () => {
            window.removeEventListener(
                "beforeunload",
                handleBeforeUnload
            );
        };
    }, [hasUnsavedChanges]);

    if (
        !isLoaded ||
        (user && isLoadingProfile)
    ) {
        return (
            <DashboardLayout>
                <PageSkeleton
                    showHero
                    cardCount={3}
                />
            </DashboardLayout>
        );
    }

    const fullName =
        user?.fullName ||
        user?.firstName ||
        "CrossPrep Member";

    const email =
        user?.primaryEmailAddress?.emailAddress ||
        "Email unavailable";

    const memberSince = user?.createdAt
        ? new Intl.DateTimeFormat("en-US", {
            month: "long",
            year: "numeric",
        }).format(user.createdAt)
        : "Not available";

    const normalizeUrl = (value: string) => {
        const trimmedValue = value.trim();

        if (!trimmedValue) {
            return "";
        }

        if (
            trimmedValue.startsWith("http://") ||
            trimmedValue.startsWith("https://")
        ) {
            return trimmedValue;
        }

        return `https://${trimmedValue}`;
    };

    const handleSaveProfile = async () => {
        if (!user) {
            setProfileError(
                "Please sign in before saving your profile."
            );
            return;
        }

        const companies = preferredCompanies
            .split(",")
            .map((company) => company.trim())
            .filter(Boolean);

        try {
            setIsSavingProfile(true);
            setProfileMessage("");
            setProfileError("");

            await api.put("/api/profile", {
                bio: bio || null,
                target_role: targetRole || null,
                experience_level:
                    experienceLevel || null,
                preferred_companies: companies,
                linkedin_url: linkedinUrl || null,
                github_url: githubUrl || null,
                portfolio_url: portfolioUrl || null,
            });

            setSavedProfile({
                bio,
                targetRole,
                experienceLevel,
                preferredCompanies,
                linkedinUrl,
                githubUrl,
                portfolioUrl,
            });

            setProfileMessage(
                "Your profile has been saved successfully."
            );
        } catch (error) {
            console.error(
                "Profile saving failed:",
                error
            );

            setProfileError(
                "We could not save your profile. Please try again."
            );
        } finally {
            setIsSavingProfile(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-6xl space-y-8">
                <header>
                    <p className="text-sm font-semibold text-violet-600">
                        Candidate profile
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                        Profile
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                        Manage your professional identity and career goals.
                    </p>
                </header>

                <ProfileHero
                    fullName={fullName}
                    email={email}
                    memberSince={memberSince}
                    imageUrl={user?.imageUrl}
                    onManageAccount={() => openUserProfile()}
                />

                <AboutCard
                    bio={bio}
                    draftBio={draftBio}
                    isEditing={isEditingBio}
                    onDraftChange={setDraftBio}
                    onEdit={() => {
                        setDraftBio(bio);
                        setProfileMessage("");
                        setProfileError("");
                        setIsEditingBio(true);
                    }}
                    onCancel={() => {
                        setDraftBio(bio);
                        setIsEditingBio(false);
                    }}
                    onSave={() => {
                        setBio(draftBio.trim());
                        setIsEditingBio(false);
                    }}
                />

                <CareerPreferencesCard
                    targetRole={targetRole}
                    experienceLevel={experienceLevel}
                    preferredCompanies={preferredCompanies}
                    draftTargetRole={draftTargetRole}
                    draftExperienceLevel={draftExperienceLevel}
                    draftPreferredCompanies={draftPreferredCompanies}
                    isEditing={isEditingCareer}
                    onDraftTargetRoleChange={setDraftTargetRole}
                    onDraftExperienceLevelChange={setDraftExperienceLevel}
                    onDraftPreferredCompaniesChange={
                        setDraftPreferredCompanies
                    }
                    onEdit={() => {
                        setDraftTargetRole(targetRole);
                        setDraftExperienceLevel(experienceLevel);
                        setDraftPreferredCompanies(preferredCompanies);
                        setProfileMessage("");
                        setProfileError("");
                        setIsEditingCareer(true);
                    }}
                    onCancel={() => {
                        setDraftTargetRole(targetRole);
                        setDraftExperienceLevel(experienceLevel);
                        setDraftPreferredCompanies(preferredCompanies);
                        setIsEditingCareer(false);
                    }}
                    onSave={() => {
                        setTargetRole(draftTargetRole.trim());
                        setExperienceLevel(draftExperienceLevel);
                        setPreferredCompanies(
                            draftPreferredCompanies.trim()
                        );
                        setIsEditingCareer(false);
                    }}
                />

                <ProfessionalLinksCard
                    linkedinUrl={linkedinUrl}
                    githubUrl={githubUrl}
                    portfolioUrl={portfolioUrl}
                    draftLinkedinUrl={draftLinkedinUrl}
                    draftGithubUrl={draftGithubUrl}
                    draftPortfolioUrl={draftPortfolioUrl}
                    isEditing={isEditingLinks}
                    onDraftLinkedinUrlChange={setDraftLinkedinUrl}
                    onDraftGithubUrlChange={setDraftGithubUrl}
                    onDraftPortfolioUrlChange={setDraftPortfolioUrl}
                    onEdit={() => {
                        setDraftLinkedinUrl(linkedinUrl);
                        setDraftGithubUrl(githubUrl);
                        setDraftPortfolioUrl(portfolioUrl);
                        setProfileMessage("");
                        setProfileError("");
                        setIsEditingLinks(true);
                    }}
                    onCancel={() => {
                        setDraftLinkedinUrl(linkedinUrl);
                        setDraftGithubUrl(githubUrl);
                        setDraftPortfolioUrl(portfolioUrl);
                        setIsEditingLinks(false);
                    }}
                    onSave={() => {
                        setLinkedinUrl(
                            normalizeUrl(draftLinkedinUrl)
                        );
                        setGithubUrl(
                            normalizeUrl(draftGithubUrl)
                        );
                        setPortfolioUrl(
                            normalizeUrl(draftPortfolioUrl)
                        );
                        setIsEditingLinks(false);
                    }}
                />

                <SaveProfileBar
                    isSaving={isSavingProfile}
                    hasUnsavedChanges={hasUnsavedChanges}
                    message={profileMessage}
                    error={profileError}
                    onSave={handleSaveProfile}
                />
            </div>
        </DashboardLayout>
    );
}