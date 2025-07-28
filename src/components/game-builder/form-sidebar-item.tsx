'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface FormSidebarItemProps {
    step: number | string;
    label: string;
    selected: boolean;
    onClick: () => void;
}

export function FormSidebarItem({
    step,
    label,
    onClick,
}: FormSidebarItemProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                'flex flex-row items-center cursor-pointer text-lg text-slate-500 gap-8 bg-white rounded-full p-2 pr-8 hover:shadow-lg transition-all duration-300'
            )}
        >
            <span className="icon w-12 h-12 rounded-full border border-slate-200 bg-slate-100 font-black flex items-center justify-center">
                {step}
            </span>
            {label}
        </div>
    );
}