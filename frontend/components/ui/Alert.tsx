"use client";

import {
    AlertCircle,
    CheckCircle2,
    Info,
    TriangleAlert,
} from "lucide-react";

type AlertVariant =
    | "success"
    | "error"
    | "warning"
    | "info";

type AlertProps = {
    variant: AlertVariant;
    children: React.ReactNode;
};

const styles = {
    success: {
        icon: CheckCircle2,
        container:
            "border-emerald-200 bg-emerald-50 text-emerald-700",
    },
    error: {
        icon: AlertCircle,
        container:
            "border-red-200 bg-red-50 text-red-700",
    },
    warning: {
        icon: TriangleAlert,
        container:
            "border-amber-200 bg-amber-50 text-amber-700",
    },
    info: {
        icon: Info,
        container:
            "border-blue-200 bg-blue-50 text-blue-700",
    },
};

export default function Alert({
    variant,
    children,
}: AlertProps) {
    const config = styles[variant];
    const Icon = config.icon;

    return (
        <div
            className={[
                "flex items-start gap-3 rounded-xl border px-4 py-3 text-sm font-medium",
                config.container,
            ].join(" ")}
        >
            <Icon
                size={18}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
            />

            <div>{children}</div>
        </div>
    );
}