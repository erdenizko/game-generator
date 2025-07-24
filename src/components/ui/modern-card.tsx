"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ModernCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    variant?: "default" | "elevated" | "outlined";
}

export function ModernCard({
    className,
    children,
    variant = "default",
    ...props
}: ModernCardProps) {
    const baseStyles = "rounded-xl transition-all duration-200";

    const variants = {
        default: "bg-gray-900/50 border border-gray-800 hover:border-gray-700",
        elevated: "bg-gray-900/50 border border-gray-800 shadow-lg hover:shadow-xl hover:border-gray-700",
        outlined: "border border-gray-700 hover:border-gray-600"
    };

    return (
        <div
            className={cn(
                baseStyles,
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}