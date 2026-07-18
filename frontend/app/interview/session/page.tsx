"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type {
    InterviewQuestion,
} from "./types";

import InterviewHeader from "./components/InterviewHeader";
import ProgressCard from "./components/ProgressCard";
import QuestionCard from "./components/QuestionCard";
import AnswerEditor from "./components/AnswerEditor";
import InterviewSidebar from "./components/InterviewSidebar";
import PageLoader from "./components/PageLoader";
import EmptyState from "./components/EmptyState";
import LoadingOverlay from "./components/LoadingOverlay";
import {
    getStoredInterviewSession,
} from "./lib/interview-storage";

import { api } from "@/lib/api";

export default function InterviewSessionPage() {
    const router = useRouter();

    const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState("");

    const [role, setRole] = useState("Behavioral Interview");
    const [level, setLevel] = useState("Not selected");
    const [interviewId, setInterviewId] = useState("");

    const [pageLoading, setPageLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const resetQuestionState = () => {
        setAnswer("");
        setError("");
    };

    useEffect(() => {
        void loadInterview();
    }, []);

    const loadInterview = async () => {
        try {
            setPageLoading(true);
            setError("");

            const storedSession = getStoredInterviewSession();

            if (!storedSession) {
                router.push("/interview");
                return;
            }

            const {
                interviewId: storedInterviewId,
                role: storedRole,
                level: storedLevel,
            } = storedSession;

            setInterviewId(storedInterviewId);
            setRole(storedRole);
            setLevel(storedLevel);

            const response = await api.get(
                `/api/interviews/${storedInterviewId}`
            );

            const loadedQuestions =
                response.data?.questions ?? [];

            if (!Array.isArray(loadedQuestions)) {
                throw new Error(
                    "The interview questions could not be loaded."
                );
            }

            if (loadedQuestions.length === 0) {
                throw new Error(
                    "No questions were generated for this interview."
                );
            }

            setQuestions(loadedQuestions);
        } catch (error: unknown) {
            console.error("Failed to load interview:", error);

            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(
                    "We couldn't load your interview. Please try again."
                );
            }
        } finally {
            setPageLoading(false);
        }
    };

    const handleAnswerChange = (updatedAnswer: string) => {
        setAnswer(updatedAnswer);

        if (error) {
            setError("");
        }
    };

    const submitAnswer = async () => {
        if (!answer.trim()) {
            setError("Please enter your answer.");
            return;
        }

        if (!question) {
            setError("The current question could not be found.");
            return;
        }

        try {
            setSubmitting(true);
            setError("");

            await api.post("/api/answers/submit", {
                question_id: question.id,
                answer_text: answer.trim(),
            });

            const isLastQuestion =
                currentIndex === questions.length - 1;

            if (isLastQuestion) {
                sessionStorage.setItem(
                    "completed_interview_id",
                    interviewId
                );

                router.push("/results");
                return;
            }

            resetQuestionState();

            setCurrentIndex((previous) => previous + 1);

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } catch (error) {
            console.error("Failed to submit answer:", error);

            setError(
                "Failed to submit answer. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (pageLoading) {
        return <PageLoader />;
    }

    if (error && questions.length === 0) {
        return (
            <EmptyState
                title="Interview unavailable"
                description={error}
                primaryLabel="Create new interview"
                secondaryLabel="Try again"
                onPrimary={() => router.push("/interview/new")}
                onSecondary={loadInterview}
            />
        );
    }

    const question = questions[currentIndex];

    return (
        <main className="min-h-dvh bg-[#f8f9ff] px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <InterviewHeader
                    role={role}
                    level={level}
                    onExit={() => router.push("/interviews")}
                />

                <div className="mt-3">
                    <ProgressCard
                        currentIndex={currentIndex}
                        totalQuestions={questions.length}
                    />
                </div>

                <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
                    <section className="space-y-4">
                        <QuestionCard
                            question={question.question}
                            currentQuestion={currentIndex + 1}
                        />

                        <AnswerEditor
                            answer={answer}
                            onAnswerChange={handleAnswerChange}
                            onSubmit={submitAnswer}
                            submitting={submitting}
                            error={error}
                            isEvaluated={false}
                        />
                    </section>

                    <aside className="lg:sticky lg:top-4">
                        <InterviewSidebar
                            role={role}
                            level={level}
                            totalQuestions={questions.length}
                        />
                    </aside>
                </div>
            </div>

            <LoadingOverlay open={submitting} />
        </main>
    );
}
