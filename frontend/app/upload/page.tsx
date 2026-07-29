"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { api } from "@/lib/api";
import ResumeHeader from "./components/ResumeHeader";
import ResumeUploadCard from "./components/ResumeUploadCard";
import ResumeAnalysisPanel from "./components/ResumeAnalysisPanel";
import OverviewTab from "./components/OverviewTab";
import SkillsTab from "./components/SkillsTab";
import ProjectsTab from "./components/ProjectsTab";
import ExperienceSection from "./components/ExperienceSection";
import EducationTab from "./components/EducationTab";
import type { ResumeAnalysis } from "./types";

export default function UploadPage() {
    const { user } = useUser();

    const [file, setFile] =
        useState<File | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [analysis, setAnalysis] =
        useState<ResumeAnalysis | null>(null);

    const [activeTab, setActiveTab] =
        useState("overview");

    useEffect(() => {
        const syncUser = async () => {
            if (!user) return;

            try {
                const response =
                    await api.post(
                        "/api/users/sync",
                        {
                            email:
                                user.primaryEmailAddress
                                    ?.emailAddress || "",
                            name:
                                user.fullName || "User",
                        }
                    );

                console.log(
                    "User Sync:",
                    response.data
                );
            } catch (error) {
                console.error(
                    "User sync failed:",
                    error
                );
            }
        };

        syncUser();
    }, [user]);

    const handleUpload = async () => {
        if (!file) return;

        if (!user) {
            setMessage(
                "Please sign in first."
            );
            return;
        }

        try {
            setLoading(true);

            const formData =
                new FormData();

            formData.append(
                "file",
                file
            );

            const response =
                await api.post(
                    "/api/resumes/upload",
                    formData
                );

            console.log(
                response.data
            );

            if (
                response.data.error
            ) {
                setMessage(
                    response.data.error
                );
                return;
            }

            setAnalysis(
                response.data
            );

            setMessage(
                "Resume analyzed successfully. Your AI insights are ready!"
            );

        } catch (error) {
            console.error(error);

            setMessage(
                "Upload failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f8f9ff] px-6 py-8 sm:px-10 lg:py-10">

            <div className="mx-auto max-w-6xl">

                <ResumeHeader />

                <ResumeUploadCard
                    file={file}
                    loading={loading}
                    message={message}
                    userReady={Boolean(user)}
                    onFileChange={setFile}
                    onUpload={handleUpload}
                />

                {analysis && (
                    <ResumeAnalysisPanel
                        analysis={analysis}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    >
                        {activeTab === "overview" && (
                            <OverviewTab
                                analysis={analysis}
                            />
                        )}

                        {activeTab === "skills" && (
                            <SkillsTab
                                analysis={analysis}
                            />
                        )}

                        {activeTab === "projects" && (
                            <ProjectsTab
                                analysis={analysis}
                            />
                        )}

                        {activeTab === "experience" && (
                            <ExperienceSection analysis={analysis} />
                        )}

                        {activeTab === "education" && (
                            <EducationTab analysis={analysis} />
                        )}
                    </ResumeAnalysisPanel>
                )}

            </div>
        </main>

    );
}