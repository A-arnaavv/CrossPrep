import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type BackToDashboardProps = {
    className?: string;
};

export default function BackToDashboard({
    className = "",
}: BackToDashboardProps) {
    return (
        <Link
            href="/dashboard"
            className={`
                inline-flex
                items-center
                gap-1.5
                text-sm
                font-semibold
                text-violet-600
                transition-colors
                hover:text-violet-800
                ${className}
            `}
        >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
        </Link>
    );
}