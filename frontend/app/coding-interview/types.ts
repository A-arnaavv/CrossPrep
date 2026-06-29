export type CodingExample = {
    input: string;
    output: string;
    explanation: string;
};

export type CodingTestCase = {
    input: Record<string, unknown>;
    expected_output: unknown;
};

export type CodingInterviewQuestion = {
    id: string;
    question_number: number;
    total_questions?: number;
    title: string;
    difficulty: "Easy" | "Medium" | "Hard" | string;
    question?: string;
    description?: string;
    examples?: CodingExample[];
    constraints?: string[];
    function_name?: string;
    starter_code?: string;
    test_cases?: CodingTestCase[];
};

export type ReportQuestion = {
    number: number;
    title?: string;
    difficulty?: string;
    score: number;
    feedback?: string;
    code?: string;
    completed?: boolean;
};

export type CodingInterviewReport = {
    session_id?: string;
    role: string;
    language: string;
    status?: string;
    total_score: number;
    average_score: number;
    summary?: string;
    strengths?: string[];
    improvements?: string[];
    recommendations?: string[];
    questions?: ReportQuestion[];
};

export type CodeTestResult = {
    test_case: number;
    passed: boolean;
    actual_output: unknown;
    expected_output: unknown;
};