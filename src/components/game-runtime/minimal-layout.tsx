import React, { useEffect, useRef, useState } from 'react';
import GameControls from './game-controls';
import { GameControlsProps } from './dynamic-control-renderer';

interface MinimalLayoutProps extends GameControlsProps {
    isMobile?: boolean;
}

const AUTO_HIDE_DELAY = 3000; // 3 seconds

const MinimalLayout: React.FC<MinimalLayoutProps> = ({ isMobile = false, balance, currentBet, ...gameControls }) => {
    const [visible, setVisible] = useState(true);
    const hideTimeout = useRef<NodeJS.Timeout | null>(null);
    const lastValues = useRef({ balance, currentBet });

    // Show controls on user interaction
    useEffect(() => {
        const showControls = () => {
            setVisible(true);
            if (hideTimeout.current) clearTimeout(hideTimeout.current);
            hideTimeout.current = setTimeout(() => setVisible(false), AUTO_HIDE_DELAY);
        };
        window.addEventListener('mousemove', showControls);
        window.addEventListener('mousedown', showControls);
        window.addEventListener('touchstart', showControls);
        window.addEventListener('keydown', showControls);
        return () => {
            window.removeEventListener('mousemove', showControls);
            window.removeEventListener('mousedown', showControls);
            window.removeEventListener('touchstart', showControls);
            window.removeEventListener('keydown', showControls);
            if (hideTimeout.current) clearTimeout(hideTimeout.current);
        };
    }, []);

    // Show controls if balance or bet changes
    useEffect(() => {
        if (
            lastValues.current.balance !== balance ||
            lastValues.current.currentBet !== currentBet
        ) {
            setVisible(true);
            if (hideTimeout.current) clearTimeout(hideTimeout.current);
            hideTimeout.current = setTimeout(() => setVisible(false), AUTO_HIDE_DELAY);
            lastValues.current = { balance, currentBet };
        }
    }, [balance, currentBet]);

    // Start auto-hide timer on mount
    useEffect(() => {
        hideTimeout.current = setTimeout(() => setVisible(false), AUTO_HIDE_DELAY);
        return () => {
            if (hideTimeout.current) clearTimeout(hideTimeout.current);
        };
    }, []);

    return (
        <div
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 rounded-xl px-4 md:px-6 py-2 md:py-3 shadow-lg flex items-center gap-2 md:gap-4 transition-all duration-500 ease-in-out ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            style={{ zIndex: 50 }}
        >
            <GameControls balance={balance} currentBet={currentBet} {...gameControls} />
            <span className="font-bold text-white text-base md:text-lg">${balance.toFixed(2)}</span>
        </div>
    );
};

export default MinimalLayout; 