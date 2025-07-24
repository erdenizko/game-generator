import React, { useEffect, useMemo, useState } from 'react';
import { ColorTheme } from '@/lib/types';

export interface ColorThemeProviderProps {
    theme: ColorTheme;
    children: React.ReactNode;
    onThemeValidation?: (isValid: boolean, issues: string[]) => void;
}

const DEFAULT_THEME: ColorTheme = {
    primaryColor: '#1976d2',
    secondaryColor: '#ff9800',
    accentColor: '#e91e63',
    backgroundColor: '#ffffff',
    textColor: '#222222',
    contrastRatio: 4.5,
    isAccessible: true,
};

function isValidHex(color: string) {
    return /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(color);
}

function luminance(hex: string) {
    let c = hex.substring(1);
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const rgb = [0, 1, 2].map(i => parseInt(c.substr(i * 2, 2), 16) / 255);
    const a = rgb.map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}
function contrastRatio(hex1: string, hex2: string) {
    const l1 = luminance(hex1);
    const l2 = luminance(hex2);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export const ColorThemeProvider: React.FC<ColorThemeProviderProps> = ({ theme, children, onThemeValidation }) => {
    const [fallback, setFallback] = useState(false);
    const { isValid, issues, cssVars } = useMemo(() => {
        const issues: string[] = [];
        const requiredColors = [theme.primaryColor, theme.secondaryColor, theme.backgroundColor, theme.textColor];
        requiredColors.forEach((color, i) => {
            if (!isValidHex(color || '#000000')) issues.push(`Color ${i + 1} (${color}) is not a valid hex.`);
        });
        if (isValidHex(theme.textColor || '#000000') && isValidHex(theme.backgroundColor || '#ffffff')) {
            const ratio = contrastRatio(theme.textColor || '#000000', theme.backgroundColor || '#ffffff');
            if (ratio < 4.5) issues.push(`Text/Background contrast ratio is ${ratio.toFixed(2)} (should be >= 4.5)`);
        }
        const cssVars = {
            '--color-primary': theme.primaryColor || '#000000',
            '--color-secondary': theme.secondaryColor || '#000000',
            '--color-accent': theme.accentColor || theme.primaryColor || '#000000',
            '--color-background': theme.backgroundColor || '#ffffff',
            '--color-text': theme.textColor || '#000000',
        } as Record<string, string>;
        return { isValid: issues.length === 0, issues, cssVars };
    }, [theme]);

    useEffect(() => {
        if (onThemeValidation) onThemeValidation(isValid, issues);
        setFallback(!isValid);
    }, [isValid, issues, onThemeValidation]);

    const activeCssVars = fallback ? {
        '--color-primary': DEFAULT_THEME.primaryColor,
        '--color-secondary': DEFAULT_THEME.secondaryColor,
        '--color-accent': DEFAULT_THEME.accentColor,
        '--color-background': DEFAULT_THEME.backgroundColor,
        '--color-text': DEFAULT_THEME.textColor,
    } : cssVars;

    return (
        <div className='h-full' style={activeCssVars as React.CSSProperties}>
            {!isValid && (
                <div className="w-full bg-red-600 text-white text-center py-2 text-sm font-semibold">
                    Theme validation failed. Using default theme.<br />
                    {issues.map((issue, i) => <div key={i}>{issue}</div>)}
                </div>
            )}
            {children}
        </div>
    );
}; 