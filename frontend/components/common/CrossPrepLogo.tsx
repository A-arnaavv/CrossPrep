import Image from "next/image";

type CrossPrepLogoProps = {
    showText?: boolean;
    showSubtitle?: boolean;
    size?: number;
    className?: string;
};

export default function CrossPrepLogo({
    showText = true,
    showSubtitle = false,
    size = 40,
    className = "",
}: CrossPrepLogoProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <Image
                src="/icon.png"
                alt="CrossPrep"
                width={size}
                height={size}
                className="shrink-0"
                priority
            />

            {showText && (
                <div>
                    <span className="block text-xl font-bold tracking-tight text-slate-950">
                        CrossPrep
                    </span>

                    {showSubtitle && (
                        <span className="block text-xs text-slate-400">
                            AI Career Platform
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}