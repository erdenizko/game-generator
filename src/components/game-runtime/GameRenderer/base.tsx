'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { GameConfig, SpinResult, EnhancedSlotItem } from '@/lib/types';
import { SoundManager } from '@/lib/sound-manager';

export interface GameRendererBaseProps {
    gameConfig: GameConfig;
    sessionId: string;
    onSpin?: (bet: number) => Promise<SpinResult>;
    onBalanceUpdate?: (balance: number) => void;
    initialBalance?: number;
}

// Type guard for ColorTheme
export function isColorTheme(obj: unknown): obj is {
    primaryColor: string;
    secondaryColor: string;
    accentColor?: string;
    backgroundColor?: string;
    textColor?: string;
    contrastRatio: number;
    isAccessible: boolean;
} {
    if (!obj || typeof obj !== 'object') return false;
    const o = obj as Record<string, unknown>;
    return (
        typeof o.primaryColor === 'string' &&
        typeof o.secondaryColor === 'string' &&
        typeof o.contrastRatio === 'number' &&
        typeof o.isAccessible === 'boolean'
    );
}

// Extracted hook for shared game logic
export function useGameLogic({
    gameConfig,
    onSpin,
    onBalanceUpdate,
    initialBalance = 1000,
}: {
    gameConfig: GameConfig;
    onSpin?: (bet: number) => Promise<SpinResult>;
    onBalanceUpdate?: (balance: number) => void;
    initialBalance?: number;
}) {
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const reelsRef = useRef<HTMLDivElement[]>([]);
    const soundManagerRef = useRef<SoundManager | null>(null);

    const [balance, setBalance] = useState(initialBalance);
    const [currentBet, setCurrentBet] = useState(1);
    const [isSpinning, setIsSpinning] = useState(false);
    const [lastWin, setLastWin] = useState(0);
    const [gameMatrix, setGameMatrix] = useState<string[][]>([]);
    const [winningLines, setWinningLines] = useState<number[][]>([]);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [musicEnabled, setMusicEnabled] = useState(true);
    const [isAutoSpin, setIsAutoSpin] = useState(false);

    // Get region settings for bet limits
    const getRegionSettings = useCallback(() => {
        const defaultRegion = gameConfig.availableRegions[0];
        return {
            minBet: defaultRegion?.minBet || 1,
            maxBet: defaultRegion?.maxBet || 100,
            betStep: defaultRegion?.step || 1
        };
    }, [gameConfig.availableRegions]);

    const regionSettings = getRegionSettings();

    // Initialize game matrix with random symbols
    const initializeMatrix = useCallback(() => {
        const matrix: string[][] = [];
        for (let row = 0; row < gameConfig.rows; row++) {
            matrix[row] = [];
            for (let col = 0; col < gameConfig.columns; col++) {
                const randomItem = gameConfig.slotItems[Math.floor(Math.random() * gameConfig.slotItems.length)];
                matrix[row][col] = randomItem?.id || 'default';
            }
        }
        setGameMatrix(matrix);
    }, [gameConfig]);

    // Initialize sound manager and game
    useEffect(() => {
        soundManagerRef.current = new SoundManager(gameConfig.sounds);
        initializeMatrix();
        if (musicEnabled) {
            soundManagerRef.current.startBackgroundMusic();
        }
        return () => {
            if (soundManagerRef.current) {
                soundManagerRef.current.cleanup();
            }
        };
    }, [gameConfig, initializeMatrix, musicEnabled]);

    // Play sound effect
    const playSound = useCallback((soundType: string) => {
        if (soundManagerRef.current && soundEnabled) {
            soundManagerRef.current.playSound(soundType);
        }
    }, [soundEnabled]);

    // Format currency helper
    const formatCurrency = useCallback((amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(amount);
    }, []);

    // Animate reel spin
    const animateReelSpin = useCallback((reelIndex: number, finalSymbols: string[], duration: number = 2) => {
        const reel = reelsRef.current[reelIndex];
        if (!reel) return Promise.resolve();

        const symbols = reel.querySelectorAll('.symbol');
        if (symbols.length === 0) return Promise.resolve();
        const symbolHeight = (symbols[0] as HTMLElement).offsetHeight;

        return new Promise<void>((resolve) => {
            const tl = gsap.timeline({ onComplete: resolve });
            tl.to(symbols, {
                y: `+=${symbolHeight * 15}`,
                duration: 1.2 + reelIndex * 0.1,
                ease: 'power2.in',
                stagger: 0.05,
                onComplete: () => {
                    gsap.set(symbols, { y: -symbolHeight * 3 });
                    symbols.forEach((symbol, symbolIndex) => {
                        const finalSymbolId = finalSymbols[symbolIndex];
                        const img = symbol.querySelector('img');
                        const slotItem = gameConfig.slotItems.find(item => item.id === finalSymbolId);
                        if (img && slotItem) {
                            img.src = slotItem.imageKey;
                            img.alt = slotItem.name;
                        }
                    });
                }
            });
            tl.to(symbols, {
                y: 0,
                duration: 1.2,
                ease: 'bounce.out',
                stagger: 0.05,
            });
        });
    }, [gameConfig.slotItems, gameConfig.rows]);

    // Handle spin action
    const handleSpin = useCallback(async () => {
        if (isSpinning || currentBet > balance) return;

        setIsSpinning(true);
        setWinningLines([]);
        setLastWin(0);

        playSound('click');
        playSound('spin');

        try {
            let spinResult: SpinResult;
            if (onSpin) {
                spinResult = await onSpin(currentBet);
            } else {
                throw new Error('No spin handler provided');
            }

            const spinPromises = [];
            for (let col = 0; col < gameConfig.columns; col++) {
                const columnSymbols = spinResult.view.map(row => row[col]);
                spinPromises.push(animateReelSpin(col, columnSymbols, 2 + col * 0.2));
            }

            await Promise.all(spinPromises);

            setGameMatrix(spinResult.view);
            setBalance(spinResult.balance);
            setLastWin(spinResult.winAmount);
            setWinningLines(spinResult.lines);

            if (spinResult.isWin) {
                playSound('win');
            } else {
                playSound('lose');
            }

            if (onBalanceUpdate) {
                onBalanceUpdate(spinResult.balance);
            }
        } catch (error) {
            console.error('Spin failed:', error);
        } finally {
            setIsSpinning(false);
        }
    }, [isSpinning, currentBet, balance, onSpin, onBalanceUpdate, gameConfig, playSound, animateReelSpin]);

    // Handle bet change
    const handleBetChange = useCallback((newBet: number) => {
        playSound('click');
        setCurrentBet(Math.max(regionSettings.minBet, Math.min(regionSettings.maxBet, newBet)));
    }, [regionSettings, playSound]);

    // Handle max bet
    const handleMaxBet = useCallback(() => {
        playSound('click');
        setCurrentBet(Math.min(regionSettings.maxBet, balance));
    }, [regionSettings, balance, playSound]);

    // Adjust bet amount
    const adjustBet = useCallback((delta: number) => {
        playSound('click');
        setCurrentBet(prev => {
            const newBet = Math.max(regionSettings.minBet, Math.min(regionSettings.maxBet, prev + delta));
            return Math.min(newBet, balance);
        });
    }, [regionSettings, balance, playSound]);

    // Get enhanced slot item
    const getEnhancedSlotItem = useCallback((symbolId: string): EnhancedSlotItem | undefined => {
        return (gameConfig.slotItems as EnhancedSlotItem[]).find(item => item.id === symbolId);
    }, [gameConfig.slotItems]);

    // Extract color theme
    const colorTheme = (('colorTheme' in gameConfig) && isColorTheme(gameConfig.colorTheme))
        ? {
            primaryColor: gameConfig.colorTheme.primaryColor,
            secondaryColor: gameConfig.colorTheme.secondaryColor,
            accentColor: gameConfig.colorTheme.accentColor || gameConfig.colorTheme.primaryColor,
            backgroundColor: gameConfig.colorTheme.backgroundColor || '#ffffff',
            textColor: gameConfig.colorTheme.textColor || '#222222',
            contrastRatio: gameConfig.colorTheme.contrastRatio,
            isAccessible: gameConfig.colorTheme.isAccessible,
        }
        : {
            primaryColor: gameConfig.styling?.primaryColor || '#1976d2',
            secondaryColor: gameConfig.styling?.secondaryColor || '#ff9800',
            accentColor: '#e91e63',
            backgroundColor: '#ffffff',
            textColor: '#222222',
            contrastRatio: 0,
            isAccessible: true,
        };

    return {
        // Refs
        gameContainerRef,
        reelsRef,

        // State
        balance,
        currentBet,
        isSpinning,
        lastWin,
        gameMatrix,
        winningLines,
        soundEnabled,
        musicEnabled,
        isAutoSpin,

        // Settings
        regionSettings,

        // Actions
        setBalance,
        setCurrentBet,
        setIsSpinning,
        setLastWin,
        setGameMatrix,
        setWinningLines,
        setSoundEnabled,
        setMusicEnabled,
        setIsAutoSpin,

        // Handlers
        handleSpin,
        handleBetChange,
        handleMaxBet,
        adjustBet,
        playSound,
        getEnhancedSlotItem,
        formatCurrency,

        // Theme
        colorTheme,

        // Initialization
        initializeMatrix,
    };
}