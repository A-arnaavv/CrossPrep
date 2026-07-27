import { SlidersHorizontal } from "lucide-react";

type SettingsPreviewCardProps = {
    icon: React.ReactNode;
    eyebrow: string;
    title: string;
    description: string;
};

export default function SettingsPreviewCard({
    icon,
    eyebrow,
    title,
    description,
}: SettingsPreviewCardProps) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                    {icon}
                </div>

                <div>
                    <p className="text-sm font-semibold text-violet-600">
                        {eyebrow}
                    </p>

                    <h2 className="mt-1 text-xl font-bold text-slate-950">
                        {title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                        {description}
                    </p>
                </div>
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-4">
                <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <SlidersHorizontal
                        size={16}
                    />

                    Settings controls will appear here.
                </p>
            </div>
        </section>
    );
}