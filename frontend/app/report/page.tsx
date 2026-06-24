"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function ReportPage() {
    const [report, setReport] =
        useState<any>(null);

    useEffect(() => {
        loadReport();
    }, []);

    const loadReport =
        async () => {
            try {
                const interviewId =
                    localStorage.getItem(
                        "interview_id"
                    );

                const response =
                    await api.get(
                        `/api/interviews/${interviewId}/report`
                    );

                setReport(
                    response.data
                );

            } catch (error) {
                console.error(error);
            }
        };

    if (!report) {
        return (
            <div className="p-10">
                Loading Report...
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-10">

            <h1 className="text-3xl font-bold mb-2">
                Interview Report
            </h1>

            <p className="text-gray-600 mb-8">
                Detailed AI evaluation report
            </p>

            <div className="border rounded p-4 mb-8">
                <p>
                    <strong>Role:</strong>{" "}
                    {report.role}
                </p>

                <p>
                    <strong>Level:</strong>{" "}
                    {report.level}
                </p>

                <p>
                    <strong>Average Score:</strong>{" "}
                    {report.average_score}/10
                </p>
            </div>

            <div className="space-y-6">

                {report.questions?.map(
                    (
                        item: any,
                        index: number
                    ) => (
                        <div
                            key={index}
                            className="border rounded p-6"
                        >
                            <h2 className="text-xl font-semibold mb-4">
                                Question {index + 1}
                            </h2>

                            <div className="mb-4">
                                <strong>
                                    Your Answer
                                </strong>

                                <p className="mt-2">
                                    {item.answer}
                                </p>
                            </div>

                            <div className="mb-4">
                                <strong>
                                    Score
                                </strong>

                                <p className="mt-2">
                                    {item.score}/10
                                </p>
                            </div>

                            <div className="mb-4">
                                <strong>
                                    Feedback
                                </strong>

                                <p className="mt-2">
                                    {item.feedback}
                                </p>
                            </div>

                            <div>
                                <strong>
                                    Ideal Answer
                                </strong>

                                <p className="mt-2">
                                    {item.ideal_answer}
                                </p>
                            </div>

                        </div>
                    )
                )}

            </div>

        </div>
    );
}