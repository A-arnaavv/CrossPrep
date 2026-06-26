type InterviewHeaderProps = {
    question: any;
    role: string;
    setRole: (value: string) => void;
    language: string;
    setLanguage: (value: string) => void;
    loading: boolean;
    dbUserId: string;
    startInterview: () => void;
};

export default function InterviewHeader({
    question,
    role,
    setRole,
    language,
    setLanguage,
    loading,
    dbUserId,
    startInterview,
}: InterviewHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Coding Interview
                </h1>

                <p className="text-zinc-500 mt-1">
                    Practice coding interviews with AI evaluation
                </p>
            </div>

            <div className="flex items-center gap-3">
                {question && (
                    <div className="px-4 py-2 rounded-lg bg-zinc-100 font-medium">
                        {role}
                    </div>
                )}

                {!question && (
                    <input
                        type="text"
                        placeholder="Enter Role"
                        value={role}
                        onChange={(e) =>
                            setRole(e.target.value)
                        }
                        className="border rounded-lg px-4 py-2 w-64"
                    />
                )}

                <select
                    value={language}
                    onChange={(e) =>
                        setLanguage(e.target.value)
                    }
                    className="border rounded-lg px-4 py-2"
                >
                    <option>Python</option>
                    <option>JavaScript</option>
                    <option>Java</option>
                    <option>C++</option>
                </select>

                {!question && (
                    <button
                        onClick={startInterview}
                        disabled={loading || !role || !dbUserId}
                        className="bg-violet-600 text-white px-5 py-2 rounded-lg"
                    >
                        {loading
                            ? "Generating 4 questions..."
                            : "Start Interview"}
                    </button>
                )}
            </div>
        </div>
    );
}