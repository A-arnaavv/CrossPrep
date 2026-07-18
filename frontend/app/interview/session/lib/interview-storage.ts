export type StoredInterviewSession = {
    interviewId: string;
    role: string;
    level: string;
};

const STORAGE_KEYS = {
    interviewId: "interview_id",
    role: "interview_role",
    level: "interview_level",
} as const;

export function getStoredInterviewSession(): StoredInterviewSession | null {
    if (typeof window === "undefined") {
        return null;
    }

    const interviewId = sessionStorage.getItem(
        STORAGE_KEYS.interviewId,
    );

    const role = sessionStorage.getItem(STORAGE_KEYS.role);
    const level = sessionStorage.getItem(STORAGE_KEYS.level);

    if (!interviewId) {
        return null;
    }

    return {
        interviewId,
        role: role || "Software Engineer",
        level: level || "Mid-level",
    };
}

export function saveInterviewSession(
    session: StoredInterviewSession,
): void {
    if (typeof window === "undefined") {
        return;
    }

    sessionStorage.setItem(
        STORAGE_KEYS.interviewId,
        session.interviewId,
    );

    sessionStorage.setItem(
        STORAGE_KEYS.role,
        session.role,
    );

    sessionStorage.setItem(
        STORAGE_KEYS.level,
        session.level,
    );
}

export function clearInterviewSession(): void {
    if (typeof window === "undefined") {
        return;
    }

    sessionStorage.removeItem(STORAGE_KEYS.interviewId);
    sessionStorage.removeItem(STORAGE_KEYS.role);
    sessionStorage.removeItem(STORAGE_KEYS.level);
}