"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { api } from "@/lib/api";

import FinalReport from "../../components/FinalReport";

import type {
    CodingInterviewReport,
} from "../../types";

export default function CodingInterviewReportPage() {

    const params =
        useParams();

    const sessionId =
        params.sessionId as string;

    const [report, setReport] =
        useState<CodingInterviewReport | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const loadReport =
            async () => {

                try {

                    const response =
                        await api.get(
                            `/api/coding-interviews/session-report/${sessionId}`
                        );

                    setReport(
                        response.data
                    );

                } catch (error) {

                    console.error(error);

                } finally {

                    setLoading(false);

                }

            };

        if (sessionId) {
            loadReport();
        }

    }, [sessionId]);

    if (loading) {

        return (
            <div className="max-w-6xl mx-auto p-10">
                Loading report...
            </div>
        );

    }

    if (!report) {

        return (
            <div className="max-w-6xl mx-auto p-10">
                Report not found.
            </div>
        );

    }

    return (

        <FinalReport
            report={report}
            role={report.role}
            language={report.language}
            onRestart={() => {
                window.location.href =
                    "/coding-interview";
            }}
        />

    );

}