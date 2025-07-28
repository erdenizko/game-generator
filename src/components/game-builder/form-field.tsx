'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormFieldProps {
    label: string;
    htmlFor?: string;
    helpText?: string;
    className?: string;
    children: React.ReactNode;
}

export function FormField({
    label,
    htmlFor,
    helpText,
    className,
    children,
}: FormFieldProps) {
    return (
        <div className={cn('space-y-2', className)}>
            <Label htmlFor={htmlFor} className="text-sm font-bold">
                {label}
            </Label>
            {children}
            {helpText && <p className="text-xs">{helpText}</p>}
        </div>
    );
}