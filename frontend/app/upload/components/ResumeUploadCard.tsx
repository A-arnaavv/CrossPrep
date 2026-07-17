import {
    FileText,
    UploadCloud,
    CheckCircle2,
    ShieldCheck,
} from "lucide-react";

type ResumeUploadCardProps = {
    file: File | null;
    loading: boolean;
    message: string;
    userReady: boolean;
    onFileChange: (file: File | null) => void;
    onUpload: () => void;
};

export default function ResumeUploadCard({
    file,
    loading,
    message,
    userReady,
    onFileChange,
    onUpload,
}: ResumeUploadCardProps) {
    const success =
        message.toLowerCase().includes("success");

    return (
        <section
            className="
                rounded-3xl
                border
                border-slate-100
                bg-white
                p-6
                shadow-sm
            "
        >
            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">

                <label
                    className="
                        group
                        flex
                        min-h-[250px]
                        cursor-pointer
                        flex-col
                        items-center
                        justify-center
                        rounded-3xl
                        border-2
                        border-dashed
                        border-slate-200
                        bg-slate-50
                        px-6
                        text-center
                        transition-all
                        hover:border-violet-300
                        hover:bg-violet-50/40
                    "
                >
                    <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(event) =>
                            onFileChange(
                                event.target.files?.[0] ??
                                null
                            )
                        }
                    />

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                        <UploadCloud className="h-8 w-8" />
                    </div>

                    <h2 className="mt-5 text-xl font-bold text-slate-900">
                        Upload your resume
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Drag and drop your PDF here, or browse from your device.
                    </p>

                    <span
                        className="
                            mt-5
                            rounded-xl
                            bg-white
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-violet-700
                            shadow-sm
                        "
                    >
                        Browse files
                    </span>

                    <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-400">
                        <span className="inline-flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5" />
                            PDF only
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            ATS-friendly analysis
                        </span>

                        <span>Maximum 5 MB</span>
                    </div>
                </label>

                <div
                    className="
                        flex
                        flex-col
                        justify-between
                        rounded-3xl
                        border
                        border-slate-100
                        bg-white
                        p-5
                        shadow-sm
                    "
                >
                    <div>
                        <p className="text-sm font-semibold text-slate-500">
                            Selected file
                        </p>

                        {file ? (
                            <div className="rounded-2xl border border-violet-100 bg-violet-50/60 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm">
                                        <FileText className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-slate-900">
                                            {file.name}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>

                                    <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-emerald-500" />
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-5">
                                <p className="text-sm text-slate-400">
                                    No resume selected yet.
                                </p>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onUpload}
                        disabled={!file || loading || !userReady}
                        className="
                            mt-auto
                            inline-flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-2xl
                            bg-violet-600
                            px-5
                            py-4
                            text-sm
                            font-semibold
                            text-white
                            shadow-lg
                            shadow-violet-200
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                            hover:bg-violet-700
                            disabled:cursor-not-allowed
                            disabled:bg-slate-300
                            disabled:shadow-none
                            disabled:hover:translate-y-0
                        "
                    >
                        {loading ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                Analyzing resume...
                            </>
                        ) : (
                            <>
                                <UploadCloud className="h-4 w-4" />
                                Analyze Resume
                            </>
                        )}
                    </button>
                </div>
            </div>

            {message && (
                <div
                    className={`
                        mt-6
                        rounded-2xl
                        border
                        px-4
                        py-3
                        text-sm
                        font-medium
                        ${success
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-red-200 bg-red-50 text-red-700"
                        }
                    `}
                >
                    {message}
                </div>
            )}
        </section>
    );
}