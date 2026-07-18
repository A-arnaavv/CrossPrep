export type InterviewQuestion = {
    id: string;
    question: string;
};

export type AnswerEvaluation = {
    score?: number;
    feedback?: string;
    ideal_answer?: string;
};