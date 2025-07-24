import React from 'react';
import GameControls from './game-controls';
import { GameControlsProps } from './dynamic-control-renderer';

interface ClassicLayoutProps extends GameControlsProps {
    isMobile?: boolean;
}

const ClassicLayout: React.FC<ClassicLayoutProps> = ({ isMobile = false, ...gameControls }) => (
    <div className={`flex flex-col md:flex-row items-end justify-between w-full transition-all duration-500 ease-in-out gap-4 md:gap-0 p-2 md:p-0`}>
        <div className="flex-1 flex items-center justify-start mb-2 md:mb-0">
            <span className="font-bold mr-4 text-base md:text-lg">Balance: ${gameControls.balance.toFixed(2)}</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
            <GameControls {...gameControls} />
        </div>
    </div>
);

export default ClassicLayout; 