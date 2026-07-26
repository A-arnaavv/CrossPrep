"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useState } from "react";
import ProfileHero from "./components/ProfileHero";
import AboutCard from "./components/AboutCard";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CareerPreferencesCard from "./components/CareerPreferencesCard";
import ProfessionalLinksCard from "./components/ProfessionalLinksCard";

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

    if (!isLoaded) {
        return (
            <DashboardLayout>
                <div className="mx-auto max-w-6xl animate-pulse space-y-8">
                    <div className="space-y-3">
                        <div className="h-4 w-32 rounded bg-slate-200" />
                        <div className="h-10 w-48 rounded-lg bg-slate-200" />
                        <div className="h-5 w-96 max-w-full rounded bg-slate-200" />
                    </div>

                    <div className="h-72 rounded-3xl bg-white" />
                </div>
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
            </div>
        </DashboardLayout>
    );
}