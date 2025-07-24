"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
    children: React.ReactNode;
}

export function ModernButton({
    className,
    variant = "primary",
    size = "md",
    children,
    ...props
}: ModernButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-white text-black hover:bg-gray-100 focus-visible:ring-gray-400 shadow-sm hover:shadow-md",
        secondary: "bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-600 border border-gray-700",
        ghost: "text-gray-300 hover:text-white hover:bg-gray-800/50 focus-visible:ring-gray-600",
        outline: "border border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:border-gray-500 focus-visible:ring-gray-600"
    };

    const sizes = {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg"
    };

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}