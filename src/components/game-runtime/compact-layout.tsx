import React from 'react';
import GameControls from './game-controls';
import { GameControlsProps } from './dynamic-control-renderer';

interface CompactLayoutProps extends GameControlsProps {
    isMobile?: boolean;
}

const CompactLayout: React.FC<CompactLayoutProps> = ({ isMobile = false, ...gameControls }) => (
    <div className="flex flex-col items-end w-full transition-all duration-500 ease-in-out gap-2 p-2 md:p-0">
        <span className="font-bold mb-2 text-base md:text-lg">Balance: ${gameControls.balance.toFixed(2)}</span>
        <div className="w-full max-w-xs">
            <GameControls {...gameControls} />
        </div>
    </div>
);

export default CompactLayout; 