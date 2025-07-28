'use client';

import { GameConfig, SpinResult } from '@/lib/types';
import { useGameLogic, GameRendererBaseProps } from './base';
import { ColorThemeProvider } from '@/components/game-builder/color-theme-provider';
import { Music, Volume2, VolumeX, Info, Settings, Minus, Plus, Play, RotateCcw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { cn, getButtonStyle } from '@/lib/utils';
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

interface DesktopGameRendererProps extends GameRendererBaseProps {
    gameConfig: GameConfig;
}

export default function DesktopGameRenderer({
    gameConfig,
    sessionId,
    onSpin,
    onBalanceUpdate,
    initialBalance,
}: DesktopGameRendererProps) {
    const {
        gameContainerRef,
        reelsRef,
        balance,
        currentBet,
        isSpinning,
        lastWin,
        gameMatrix,
        winningLines,
        soundEnabled,
        musicEnabled,
        isAutoSpin,
        regionSettings,
        setSoundEnabled,
        setMusicEnabled,
        setIsAutoSpin,
        handleSpin,
        handleBetChange,
        handleMaxBet,
        adjustBet,
        getEnhancedSlotItem,
        formatCurrency,
        colorTheme,
        setGameMatrix,
        setBalance,
        setLastWin,
        setWinningLines,
        setIsSpinning,
    } = useGameLogic({
        gameConfig,
        onSpin,
        onBalanceUpdate,
        initialBalance,
    });

    // 3D cylinder spinning state
    const [reelStates, setReelStates] = useState<Array<{
        rotation: number;
        symbols: string[];
        isSpinning: boolean;
    }>>([]);

    // Initialize reel states
    useEffect(() => {
        const initialStates = Array.from({ length: gameConfig.columns }, (_, colIndex) => ({
            rotation: 0,
            symbols: Array.from({ length: gameConfig.rows }, (_, rowIndex) =>
                gameMatrix[rowIndex]?.[colIndex] || gameConfig.slotItems[0]?.id || 'default'
            ),
            isSpinning: false
        }));
        setReelStates(initialStates);
    }, [gameConfig.columns, gameConfig.rows, gameConfig.slotItems, gameMatrix]);

    // 3D cylinder spinning animation
    const animateReelSpin3D = useCallback((reelIndex: number, finalSymbols: string[], duration: number = 2) => {
        const reel = reelsRef.current[reelIndex];
        if (!reel) return Promise.resolve();

        const symbolHeight = reel.offsetHeight / gameConfig.rows;
        const radius = (symbolHeight * gameConfig.rows) / (2 * Math.PI); // Calculate cylinder radius
        const symbolAngle = 360 / gameConfig.rows; // Angle per symbol

        return new Promise<void>((resolve) => {
            // Update reel state to spinning
            setReelStates(prev => prev.map((state, index) =>
                index === reelIndex ? { ...state, isSpinning: true } : state
            ));

            const tl = gsap.timeline({ onComplete: resolve });

            // Phase 1: Spin up (slow to fast)
            tl.to(reel, {
                rotationX: `+=${360 * 5}`, // 5 full rotations
                duration: duration * 0.6,
                ease: 'power2.in',
                onUpdate: function () {
                    const currentRotation = this.targets()[0]._gsap.rotationX || 0;
                    setReelStates(prev => prev.map((state, index) =>
                        index === reelIndex ? { ...state, rotation: currentRotation } : state
                    ));
                },
                onComplete: () => {
                    // Update symbols to final state
                    setReelStates(prev => prev.map((state, index) =>
                        index === reelIndex ? { ...state, symbols: finalSymbols } : state
                    ));
                }
            });

            // Phase 2: Slow down and land
            tl.to(reel, {
                rotationX: `+=${360 * 2}`, // 2 more rotations
                duration: duration * 0.4,
                ease: 'bounce.out',
                onUpdate: function () {
                    const currentRotation = this.targets()[0]._gsap.rotationX || 0;
                    setReelStates(prev => prev.map((state, index) =>
                        index === reelIndex ? { ...state, rotation: currentRotation } : state
                    ));
                },
                onComplete: () => {
                    // Stop spinning
                    setReelStates(prev => prev.map((state, index) =>
                        index === reelIndex ? { ...state, isSpinning: false } : state
                    ));
                }
            });
        });
    }, [gameConfig.rows, reelsRef]);

    // Override the spin animation to use 3D
    const handleSpin3D = useCallback(async () => {
        if (isSpinning || currentBet > balance) return;

        setIsSpinning(true);
        setWinningLines([]);
        setLastWin(0);

        try {
            let spinResult: SpinResult;
            if (onSpin) {
                spinResult = await onSpin(currentBet);
            } else {
                throw new Error('No spin handler provided');
            }

            const spinPromises = [];
            for (let col = 0; col < gameConfig.columns; col++) {
                const columnSymbols = spinResult.view.map((row: string[]) => row[col]);
                spinPromises.push(animateReelSpin3D(col, columnSymbols, 2 + col * 0.2));
            }

            await Promise.all(spinPromises);

            setGameMatrix(spinResult.view);
            setBalance(spinResult.balance);
            setLastWin(spinResult.winAmount);
            setWinningLines(spinResult.lines);

            if (onBalanceUpdate) {
                onBalanceUpdate(spinResult.balance);
            }
        } catch (error) {
            console.error('Spin failed:', error);
        } finally {
            setIsSpinning(false);
        }
    }, [isSpinning, currentBet, balance, onSpin, onBalanceUpdate, gameConfig.columns, animateReelSpin3D, setGameMatrix, setBalance, setLastWin, setWinningLines, setIsSpinning]);

    return (
        <ColorThemeProvider theme={colorTheme}>
            <div
                ref={gameContainerRef}
                className="w-full h-full flex flex-col bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden"
                style={{
                    backgroundImage: gameConfig.backgroundImageKey ? `url(https://game-manager-dakik.s3.eu-north-1.amazonaws.com/${gameConfig.backgroundImageKey})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {/* Top Row: Game Name */}
                <div className={cn("flex justify-center items-center py-4 h-1/7", gameConfig.mascot.enabled ? 'pl-20' : 'pl-0')}>
                    <h2 className="game-title text-3xl font-bold text-white  py-2 rounded-lg">
                        {gameConfig.title}
                    </h2>
                </div>

                {/* Center Row: Mascot and Game Area side by side */}
                <div className="flex items-center justify-center px-4 w-full h-5/7">
                    <div className="flex items-end space-x-8 h-full w-full">
                        {/* Mascot - Left side */}
                        {gameConfig.mascot.enabled && (
                            <div className="w-1/5 h-full">
                                <img
                                    src={'/placeholder-symbol.svg'}
                                    alt="Game Mascot"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}

                        {/* Game Area - Right side */}
                        <div
                            className={cn('w-full max-w-4/5 h-full bg-black bg-opacity-40 rounded-lg p-2',
                                !gameConfig.mascot.enabled && 'mx-auto'
                            )}
                            style={{
                                backgroundImage: gameConfig.frameImageKey ? `url(${gameConfig.frameImageKey})` : undefined,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <div className="reels-grid h-full rounded-lg overflow-hidden bg-white flex flex-row perspective-1000">
                                {Array.from({ length: gameConfig.columns }).map((_, colIndex) => {
                                    const reelState = reelStates[colIndex];
                                    const symbolHeight = 100 / gameConfig.rows;
                                    const radius = (100 * gameConfig.rows) / (2 * Math.PI); // Calculate cylinder radius
                                    const symbolAngle = 360 / gameConfig.rows; // Angle per symbol

                                    return (
                                        <div
                                            key={colIndex}
                                            ref={el => { if (el) reelsRef.current[colIndex] = el; }}
                                            className="reel h-full flex flex-col relative"
                                            style={{
                                                width: `${100 / gameConfig.columns}%`,
                                                transformStyle: 'preserve-3d',
                                                transform: `rotateX(${reelState?.rotation || 0}deg)`,
                                                transformOrigin: `50% 50% -${symbolHeight * 4}px`
                                            }}
                                        >
                                            {Array.from({ length: 20 }).map((_, rowIndex) => {
                                                const symbolId = reelState?.symbols?.[rowIndex] || gameMatrix[rowIndex]?.[colIndex] || gameConfig.slotItems[0]?.id;
                                                const isWinning = winningLines.some(line =>
                                                    line.some(pos => Math.floor(pos / gameConfig.columns) === rowIndex && pos % gameConfig.columns === colIndex)
                                                );
                                                const slotItem = getEnhancedSlotItem(symbolId);
                                                const angle = rowIndex * symbolAngle;

                                                return (
                                                    <div
                                                        key={`${colIndex}-${rowIndex}`}
                                                        className={`symbol absolute bg-white flex items-center justify-center overflow-hidden transition-all duration-300 ${isWinning ? 'ring-4 ring-yellow-400 shadow-lg shadow-yellow-400/50' : ''}`}
                                                        style={{
                                                            height: `${symbolHeight}%`,
                                                            transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
                                                            transformOrigin: '50% 50%',
                                                            backfaceVisibility: 'hidden'
                                                        }}
                                                    >
                                                        <img
                                                            src={slotItem?.imageKey || '/placeholder-symbol.svg'}
                                                            alt={slotItem?.name || 'Unknown'}
                                                            className="w-full h-full object-cover"
                                                            loading="lazy"
                                                        />
                                                        {isWinning && (
                                                            <div className="absolute inset-0 bg-yellow-400 bg-opacity-20 animate-pulse" />
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: All controls in one row */}
                <div className={cn("flex items-center justify-center space-x-4 p-4 h-1/7", gameConfig.mascot.enabled ? 'pl-20' : 'pl-4')}>
                    {/* Settings & Music */}
                    <div className="flex flex-row space-x-2">
                        <button className="p-3 bg-black bg-opacity-50 rounded-lg text-white hover:bg-opacity-70 transition-all">
                            <Settings className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setMusicEnabled(!musicEnabled)}
                            className="p-3 bg-black bg-opacity-50 rounded-lg text-white hover:bg-opacity-70 transition-all"
                        >
                            <Music className={`w-5 h-5 ${musicEnabled ? 'text-green-400' : 'text-gray-400'}`} />
                        </button>
                    </div>

                    {/* Credit/Bet Information */}
                    <div className="min-w-[120px] grid grid-cols-2 space-y-1 gap-1 items-center text-sm font-black leading-none tracking-tighter text-nowrap">
                        <div className="text-gray-300 text-right">CREDIT</div>
                        <div className="text-green-400 text-left text-nowrap">{formatCurrency(balance)}</div>
                        <div className="text-gray-300 text-right">BET</div>
                        <div className="text-white text-left">{formatCurrency(currentBet)}</div>
                    </div>

                    {/* Commercial Area */}
                    <div className="w-full text-center rounded-lg px-4 py-2 min-w-[200px] font-black leading-none tracking-tighter">
                        {lastWin > 0 ? (
                            <div className='flex flex-row gap-1'>
                                <div className="text-xl text-yellow-400">WIN!</div>
                                <div className="text-xl text-white">$1,90{lastWin.toFixed(2)}</div>
                            </div>
                        ) : (
                            <div className="text-md text-white">
                                Press SPACE for turbo spin
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => adjustBet(-regionSettings.betStep)}
                            disabled={currentBet <= regionSettings.minBet || isSpinning}
                            className="w-10 h-10 bg-black/20  rounded-full border-2 font-bold transition-all border-white text-white hover:bg-black/50 disabled:bg-black/80  disabled:text-white/40 disabled:border-white/40"
                        >
                            <Minus className="w-5 h-5 mx-auto" />
                        </button>

                        <div className='flex flex-col items-center space-y-2 relative -top-4'>
                            <button
                                onClick={handleSpin3D}
                                disabled={isSpinning || currentBet > balance || currentBet < regionSettings.minBet}
                                style={getButtonStyle('primary', gameConfig.styling)}
                                className="w-20 aspect-square rounded-lg font-bold transition-all flex items-center justify-center"
                            >
                                {isSpinning ? <RotateCcw className="w-6 h-6 animate-spin" /> : <Play className="w-6 h-6" />}
                            </button>

                            <div className="absolute bottom-0 flex items-center space-x-2">
                                <span className="text-xs text-white">AUTO</span>
                                <Switch
                                    checked={isAutoSpin}
                                    onCheckedChange={setIsAutoSpin}
                                    disabled={isSpinning}
                                    className={cn(
                                        "scale-75",
                                        isAutoSpin && "ring-2 ring-white"
                                    )}
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => adjustBet(regionSettings.betStep)}
                            disabled={currentBet >= regionSettings.maxBet || isSpinning}
                            className="w-10 h-10 bg-black/20  rounded-full border-2 font-bold transition-all border-white text-white hover:bg-black/50 disabled:bg-black/80  disabled:text-white/40 disabled:border-white/40"
                        >
                            <Plus className="w-5 h-5 mx-auto" />
                        </button>
                    </div>
                </div>

                {/* Error Messages */}
                <div className="flex justify-center">
                    {currentBet > balance && (
                        <div className="px-4 py-2 bg-red-600 text-center rounded-lg text-sm">
                            Insufficient balance
                        </div>
                    )}
                    {currentBet < regionSettings.minBet && (
                        <div className="px-4 py-2 bg-yellow-600 text-center rounded-lg text-sm">
                            Bet below minimum
                        </div>
                    )}
                </div>
            </div>
        </ColorThemeProvider>
    );
}