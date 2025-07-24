import React, { useState, useMemo } from 'react';
import ClassicLayout from './classic-layout';
import CompactLayout from './compact-layout';
import ModernLayout from './modern-layout';
import MinimalLayout from './minimal-layout';
import { validateControlLayoutResponsiveness, controlLayoutResponsivenessWarning } from '@/lib/validation/enhanced-validation';

// Define GameControlsProps locally to match the props used in GameControls
export interface GameControlsProps {
    balance: number;
    currentBet: number;
    minBet: number;
    maxBet: number;
    betStep: number;
    isSpinning: boolean;
    soundEnabled: boolean;
    musicEnabled: boolean;
    onBetChange: (bet: number) => void;
    onSpin: () => void;
    onToggleSound: () => void;
    onToggleMusic: () => void;
    onMaxBet: () => void;
    lastWin?: number;
    totalWin?: number;
    isPreview?: boolean;
    showBetOnly?: boolean;
    showSpinOnly?: boolean;
    minimal?: boolean;
    buttonStyle?: 'rounded' | 'square' | 'pill' | 'neon';
}

export type ControlLayoutType = 'classic' | 'compact' | 'modern' | 'minimal';

export interface DynamicControlRendererProps {
    layout: ControlLayoutType;
    gameControls: GameControlsProps;
    onLayoutChange?: (layout: ControlLayoutType) => void;
    isMobile?: boolean;
    buttonStyle?: 'rounded' | 'square' | 'pill' | 'neon';
}

const layoutOptions: { label: string; value: ControlLayoutType }[] = [
    { label: 'Classic', value: 'classic' },
    { label: 'Compact', value: 'compact' },
    { label: 'Modern', value: 'modern' },
    { label: 'Minimal', value: 'minimal' },
];

export const DynamicControlRenderer: React.FC<DynamicControlRendererProps> = ({
    layout: initialLayout,
    gameControls,
    onLayoutChange,
    isMobile = false,
    buttonStyle = 'rounded',
}) => {
    const [activeLayout, setActiveLayout] = useState<ControlLayoutType>(initialLayout);

    // Validate layout responsiveness
    const layoutValidation = useMemo(() => validateControlLayoutResponsiveness({
        type: activeLayout,
        buttonStyle: buttonStyle,
        position: 'bottom', // Assume bottom for now, could be passed as prop
        autoHide: activeLayout === 'minimal',
        customStyles: undefined,
    }), [activeLayout, buttonStyle]);
    const layoutWarning = controlLayoutResponsivenessWarning(layoutValidation);
    const shouldFallback = !layoutValidation.isResponsive;

    const handleLayoutChange = (newLayout: ControlLayoutType) => {
        setActiveLayout(newLayout);
        if (onLayoutChange) onLayoutChange(newLayout);
    };

    // Layout renderers
    const renderControls = () => {
        const controlsWithStyle = { ...gameControls, buttonStyle };
        if (shouldFallback && activeLayout !== 'classic') {
            return <ClassicLayout {...controlsWithStyle} isMobile={isMobile} />;
        }
        switch (activeLayout) {
            case 'classic':
                return <ClassicLayout {...controlsWithStyle} isMobile={isMobile} />;
            case 'compact':
                return <CompactLayout {...controlsWithStyle} isMobile={isMobile} />;
            case 'modern':
                return <ModernLayout {...controlsWithStyle} isMobile={isMobile} />;
            case 'minimal':
                return <MinimalLayout {...controlsWithStyle} isMobile={isMobile} />;
            default:
                return <ClassicLayout {...controlsWithStyle} isMobile={isMobile} />;
        }
    };

    // Demo layout switcher (can be removed in production)
    return (
        <div className="w-full relative">
            {layoutWarning && (
                <div className="w-full bg-yellow-500 text-black text-center py-2 text-sm font-semibold">
                    {layoutWarning} Fallback to Classic layout applied.
                </div>
            )}
            <div className="flex gap-2 mb-4">
                {layoutOptions.map(opt => (
                    <button
                        key={opt.value}
                        className={`px-3 py-1 rounded ${activeLayout === opt.value ? 'bg-primary text-white' : 'bg-muted'}`}
                        onClick={() => handleLayoutChange(opt.value)}
                        type="button"
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
            {renderControls()}
        </div>
    );
};

export default DynamicControlRenderer; 