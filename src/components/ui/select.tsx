'use client';

import React from 'react';

interface SelectProps {
    value: string;
    onValueChange: (value: string) => void;
    children: React.ReactNode;
}

interface SelectTriggerProps {
    children: React.ReactNode;
    className?: string;
}

interface SelectContentProps {
    children: React.ReactNode;
}

interface SelectItemProps {
    value: string;
    children: React.ReactNode;
}

export function Select({ value, onValueChange, children }: SelectProps) {
    return (
        <div className="relative">
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { value, onValueChange } as any);
                }
                return child;
            })}
        </div>
    );
}

export function SelectTrigger({ children, className = "" }: SelectTriggerProps) {
    return (
        <div className={`inline-flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}>
            {children}
            <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
    );
}

export function SelectContent({ children }: SelectContentProps) {
    return (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {children}
        </div>
    );
}

export function SelectItem({ value, children }: SelectItemProps) {
    return (
        <div 
            className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
            data-value={value}
        >
            {children}
        </div>
    );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
    return <span className="text-gray-500">{placeholder}</span>;
}