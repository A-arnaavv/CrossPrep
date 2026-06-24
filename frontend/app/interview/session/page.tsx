"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function InterviewSessionPage() {
    const [questions, setQuestions] =
        useState<any[]>([]);

    const [currentIndex, setCurrentIndex] =
        useState(0);

    const [answer, setAnswer] =
        useState("");

    const [evaluation, setEvaluation] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {
        loadInterview();
    }, []);

    const loadInterview =
        async () => {
            try {
                const interviewId =
                    localStorage.getItem(
                        "interview_id"
                    );

                const response =
                    await api.get(
                        `/api/interviews/${interviewId}`
                    );

                setQuestions(
                    response.data.questions
                );

            } catch (error) {
                console.error(error);
            }
        };

    const submitAnswer =
        async () => {
            try {
                setLoading(true);

                const question =
                    questions[currentIndex];

                const response =
                    await api.post(
                        "/api/answers/submit",
                        null,
                        {
                            params: {
                                question_id:
                                    question.id,
                                answer_text:
                                    answer,
                            },
                        }
                    );

                setEvaluation(
                    response.data
                );

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

    const nextQuestion = () => {
        setEvaluation(null);
        setAnswer("");

        setCurrentIndex(
            currentIndex + 1
        );
    };

    if (!questions.length) {
        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    const question =
        questions[currentIndex];

    const progress =
        ((currentIndex + 1) /
            questions.length) *
        100;
    return (
        <div className="max-w-6xl mx-auto p-10">

            <div className="mb-8">

                <h1 className="text-4xl font-bold">
                    AI Interview Session
                </h1>

                <p className="text-zinc-500 mt-2">
                    Personalized interview generated from your resume.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-8">

                    <div className="bg-white border rounded-2xl p-4">
                        <div className="text-xs text-zinc-500">
                            Role
                        </div>

                        <div className="font-semibold mt-1">
                            Backend Developer
                        </div>
                    </div>

                    <div className="bg-white border rounded-2xl p-4">
                        <div className="text-xs text-zinc-500">
                            Level
                        </div>

                        <div className="font-semibold mt-1">
                            Beginner
                        </div>
                    </div>

                    <div className="bg-white border rounded-2xl p-4">
                        <div className="text-xs text-zinc-500">
                            Questions
                        </div>

                        <div className="font-semibold mt-1">
                            {questions.length}
                        </div>
                    </div>

                    <div className="bg-white border rounded-2xl p-4">
                        <div className="text-xs text-zinc-500">
                            Powered By
                        </div>

                        <div className="font-semibold mt-1">
                            Gemini AI
                        </div>
                    </div>

                </div>
            </div>
            <div className="bg-white border rounded-2xl p-6 shadow-sm mb-8">

                <div className="flex justify-between mb-3">

                    <span className="font-medium">
                        Question {currentIndex + 1} of {questions.length}
                    </span>

                    <span className="text-zinc-500">
                        {Math.round(progress)}%
                    </span>

                </div>

                <div className="w-full h-3 bg-zinc-200 rounded-full overflow-hidden">

                    <div
                        className="h-full bg-violet-600 transition-all duration-500"
                        style={{
                            width: `${progress}%`,
                        }}
                    />

                </div>

            </div>
            <div
                className="
                    bg-white
                    border
                    rounded-3xl
                    p-8
                    shadow-sm
                    "
            >

                <div className="flex items-center justify-between mb-6">

                    <h2 className="text-sm uppercase tracking-wide text-violet-600 font-semibold">
                        Question {currentIndex + 1}
                    </h2>

                    <span className="text-sm text-zinc-500">
                        {currentIndex + 1}/{questions.length}
                    </span>

                </div>

                <p className="text-xl leading-relaxed font-medium text-zinc-800">
                    {question.question}
                </p>

            </div>

            <textarea
                value={answer}
                onChange={(e) =>
                    setAnswer(
                        e.target.value
                    )
                }
                className="
                    w-full
                    border
                    rounded-3xl
                    p-6
                    mt-6
                    bg-white
                    shadow-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-violet-500
                "
                rows={12}
                placeholder="Type your answer..."
            />

            {!evaluation && (
                <button
                    onClick={submitAnswer}
                    disabled={
                        loading ||
                        !answer
                    }
                    className="
                        mt-6
                        bg-gradient-to-r
                        from-violet-600
                        to-purple-600
                        hover:scale-[1.02]
                        text-white
                        px-8
                        py-4
                        rounded-2xl
                        font-semibold
                        transition-all
                        duration-300
                        shadow-lg
                    "
                >
                    {loading
                        ? "Evaluating..."
                        : "Submit Answer"}
                </button>
            )}

            {evaluation && (
                <div
                    className="
                        mt-8
                        bg-white
                        border
                        rounded-3xl
                        p-8
                        shadow-sm
                    "
                >

                    <div className="flex items-center gap-4">

                        <div
                            className="
                                w-20
                                h-20
                                rounded-full
                                bg-violet-100
                                flex
                                items-center
                                justify-center
                                text-2xl
                                font-bold
                                text-violet-700
                            "
                        >
                            {evaluation.score}
                        </div>

                        <div>

                            <h3 className="text-2xl font-bold">
                                Interview Feedback
                            </h3>

                            <p className="text-zinc-500">
                                AI evaluation completed
                            </p>

                        </div>

                    </div>

                    <div className="mt-4">
                        <strong>
                            Feedback
                        </strong>

                        <p>
                            {evaluation.feedback}
                        </p>
                    </div>

                    <div className="mt-4">
                        <strong>
                            Ideal Answer
                        </strong>

                        <p>
                            {evaluation.ideal_answer}
                        </p>
                    </div>

                    {currentIndex <
                        questions.length - 1 ? (
                        <button
                            onClick={
                                nextQuestion
                            }
                            className="mt-6 bg-green-600 text-white px-6 py-3 rounded"
                        >
                            Next Question
                        </button>
                    ) : (
                        <button
                            onClick={() =>
                                window.location.href =
                                "/results"
                            }
                            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
                        >
                            View Results
                        </button>
                    )}

                </div>
            )}

        </div>
    );
}