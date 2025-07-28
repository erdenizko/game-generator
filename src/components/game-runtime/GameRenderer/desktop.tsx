'use client';

import { GameConfig, SpinResult } from '@/lib/types';
import { useGameLogic, GameRendererBaseProps } from './base';
import { ColorThemeProvider } from '@/components/game-builder/color-theme-provider';
import { Music, Settings, Minus, Plus, Play, RotateCcw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { cn, getButtonStyle } from '@/lib/utils';
import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { gsap } from 'gsap';

interface DesktopGameRendererProps extends GameRendererBaseProps {
    gameConfig: GameConfig;
}

export default function DesktopGameRenderer({
    gameConfig,
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
        musicEnabled,
        isAutoSpin,
        regionSettings,
        setMusicEnabled,
        setIsAutoSpin,
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

    // High-performance reel state - minimal React state
    const [isAnimating, setIsAnimating] = useState(false);
    const animationRefs = useRef<gsap.core.Timeline[]>([]);
    const reelDataRef = useRef<{
        symbols: string[][];
        finalSymbols: string[][] | null;
    }>({
        symbols: [],
        finalSymbols: null
    });

    // Performance constants
    const VISIBLE_SYMBOLS = gameConfig.rows; // Only render visible symbols
    const BUFFER_SYMBOLS = 20; // Minimal buffer for smooth transitions
    const TOTAL_SYMBOLS = VISIBLE_SYMBOLS + BUFFER_SYMBOLS;

    // Memoized symbol data to prevent recalculations
    const symbolData = useMemo(() => {
        const data: string[][] = [];
        for (let col = 0; col < gameConfig.columns; col++) {
            const columnSymbols: string[] = [];
            for (let row = 0; row < TOTAL_SYMBOLS; row++) {
                if (row < gameConfig.rows) {
                    columnSymbols.push(gameMatrix[row]?.[col] || gameConfig.slotItems[0]?.id || 'default');
                } else {
                    // Buffer symbols
                    const symbolIndex = (row - gameConfig.rows) % gameConfig.slotItems.length;
                    columnSymbols.push(gameConfig.slotItems[symbolIndex]?.id || 'default');
                }
            }
            data.push(columnSymbols);
        }
        return data;
    }, [gameConfig, gameMatrix]);

    // Initialize reel data
    useEffect(() => {
        reelDataRef.current.symbols = symbolData;
    }, [symbolData]);

    // High-performance animation using direct DOM manipulation
    const animateReelSpin = useCallback((reelIndex: number, finalSymbols: string[], delay: number = 0) => {
        const reel = reelsRef.current[reelIndex];
        if (!reel) return Promise.resolve();

        return new Promise<void>((resolve) => {
            // Clean up any existing animation
            const existingAnimation = animationRefs.current[reelIndex];
            if (existingAnimation) {
                existingAnimation.kill();
            }

            // Pre-calculate animation values for better performance
            const duration = 1.5;
            const totalRotations = 5 + (reelIndex * 0.5);
            const finalRotation = totalRotations * 360;

            // Create optimized timeline with minimal callbacks
            const tl = gsap.timeline({
                delay,
                onComplete: () => {
                    // Update symbols only once at the end
                    if (reelDataRef.current.finalSymbols) {
                        reelDataRef.current.symbols[reelIndex] = [...reelDataRef.current.finalSymbols[reelIndex]];

                        // Force re-render only for this reel's symbols
                        const symbols = reel.querySelectorAll('.symbol');
                        symbols.forEach((symbolEl, symbolIndex) => {
                            if (symbolIndex < TOTAL_SYMBOLS) {
                                const symbolId = finalSymbols[symbolIndex];
                                const slotItem = getEnhancedSlotItem(symbolId);
                                const img = symbolEl.querySelector('img');
                                if (img && slotItem?.imageKey) {
                                    img.src = 'https://placehold.co/100x100';
                                    img.alt = slotItem.name || 'Unknown';
                                }
                            }
                        });
                    }

                    // Reset transform for next animation
                    gsap.set(reel, { rotationX: 0 });
                    resolve();
                }
            });

            // Single smooth animation with GPU acceleration
            tl.to(reel, {
                rotationX: finalRotation,
                duration,
                ease: "power3.out",
                force3D: true, // Force GPU acceleration
                transformOrigin: "50% 50% 0px"
            });

            // Add elastic bounce only at the end
            tl.to(reel, {
                rotationX: finalRotation,
                duration: 0.4,
                ease: "elastic.out(0.8, 0.3)",
                force3D: true
            });

            animationRefs.current[reelIndex] = tl;
        });
    }, [reelsRef, getEnhancedSlotItem, TOTAL_SYMBOLS]);

    // Optimized spin handler
    const handleSpin3D = useCallback(async () => {
        if (isAnimating || currentBet > balance) return;

        setIsAnimating(true);
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

            // Prepare final symbols
            const finalSymbolsData: string[][] = [];
            for (let col = 0; col < gameConfig.columns; col++) {
                const columnSymbols = spinResult.view.map((row: string[]) => row[col]);
                // Add buffer symbols
                const bufferSymbols = gameConfig.slotItems.slice(0, BUFFER_SYMBOLS).map(item => item.id);
                finalSymbolsData.push([...columnSymbols, ...bufferSymbols]);
            }

            reelDataRef.current.finalSymbols = finalSymbolsData;

            // Animate all reels with staggered delays
            const spinPromises = Array.from({ length: gameConfig.columns }, (_, col) =>
                animateReelSpin(col, finalSymbolsData[col], col * 0.1)
            );

            await Promise.all(spinPromises);

            // Update game state once at the end
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
            setIsAnimating(false);
            setIsSpinning(false);
        }
    }, [isAnimating, currentBet, balance, onSpin, onBalanceUpdate, gameConfig.columns, animateReelSpin, setGameMatrix, setBalance, setLastWin, setWinningLines, setIsSpinning, gameConfig.slotItems, BUFFER_SYMBOLS]);

    // Cleanup animations on unmount
    useEffect(() => {
        return () => {
            animationRefs.current.forEach(tl => tl?.kill());
        };
    }, []);

    // Memoized symbol component for better performance
    const renderSymbol = useCallback((symbolId: string, symbolIndex: number, colIndex: number, isWinning: boolean) => {
        const slotItem = getEnhancedSlotItem(symbolId);
        const angle = (symbolIndex / TOTAL_SYMBOLS) * 360;
        const isVisible = symbolIndex < gameConfig.rows;

        return (
            <div
                key={`${colIndex}-${symbolIndex}`}
                className={cn(
                    "symbol absolute w-full bg-white flex items-center justify-center overflow-hidden",
                    isWinning && "ring-2 ring-yellow-400"
                )}
                style={{
                    height: `${100 / gameConfig.rows}%`,
                    transform: `${isVisible ? 'rotateX(0deg) translateZ(0px)' : `rotateX(${angle}deg) translateZ(80px)`}`, // Reduced radius for better performance
                    transformOrigin: '50% 50%',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform',
                    opacity: isVisible ? 1 : 0,
                    top: `${isVisible ? ((100 / gameConfig.rows) * symbolIndex) : 0}%`
                }}
            >
                <img
                    src={'https://placehold.co/100x100'}
                    alt={slotItem?.name || 'Unknown'}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    draggable={false}
                />
                {isWinning && (
                    <div className="absolute inset-0 bg-yellow-400 bg-opacity-20" />
                )}
            </div>
        );
    }, [getEnhancedSlotItem, gameConfig.rows, TOTAL_SYMBOLS]);

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
                    <h2 className="game-title text-3xl font-bold text-white py-2 rounded-lg">
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
                                    src={'https://placehold.co/100x100'}
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
                            {/* High-Performance Reels Grid */}
                            <div
                                className="reels-grid h-full rounded-lg overflow-hidden bg-white flex flex-row"
                                style={{
                                    perspective: '1200px', // Optimized perspective
                                    perspectiveOrigin: '50% 50%'
                                }}
                            >
                                {Array.from({ length: gameConfig.columns }).map((_, colIndex) => (
                                    <div
                                        key={colIndex}
                                        className="reel-container h-full relative"
                                        style={{
                                            width: `${100 / gameConfig.columns}%`,
                                            transform: 'translateZ(0)', // Force GPU layer
                                        }}
                                    >
                                        <div
                                            ref={el => { if (el) reelsRef.current[colIndex] = el; }}
                                            className="reel h-full relative"
                                            style={{
                                                transformStyle: 'preserve-3d',
                                                transformOrigin: '50% 50% 0px',
                                                backfaceVisibility: 'hidden',
                                                willChange: 'transform'
                                            }}
                                        >
                                            {/* Optimized Symbol Rendering - Only visible + buffer */}
                                            {symbolData[colIndex]?.slice(0, TOTAL_SYMBOLS).map((symbolId, symbolIndex) => {
                                                const isVisible = symbolIndex < gameConfig.rows;
                                                const isWinning = isVisible && winningLines.some(line =>
                                                    line.some(pos =>
                                                        Math.floor(pos / gameConfig.columns) === symbolIndex &&
                                                        pos % gameConfig.columns === colIndex
                                                    )
                                                );
                                                return renderSymbol(symbolId, symbolIndex, colIndex, isWinning);
                                            })}
                                        </div>
                                    </div>
                                ))}
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
                            disabled={currentBet <= regionSettings.minBet || isAnimating}
                            className="w-10 h-10 bg-black/20 rounded-full border-2 font-bold transition-all border-white text-white hover:bg-black/50 disabled:bg-black/80 disabled:text-white/40 disabled:border-white/40"
                        >
                            <Minus className="w-5 h-5 mx-auto" />
                        </button>

                        <div className='flex flex-col items-center space-y-2 relative -top-4'>
                            <button
                                onClick={handleSpin3D}
                                disabled={isAnimating || currentBet > balance || currentBet < regionSettings.minBet}
                                style={getButtonStyle('primary', gameConfig.styling)}
                                className="w-20 aspect-square rounded-lg font-bold transition-all flex items-center justify-center"
                            >
                                {isAnimating ? <RotateCcw className="w-6 h-6 animate-spin" /> : <Play className="w-6 h-6" />}
                            </button>

                            <div className="absolute bottom-0 flex items-center space-x-2">
                                <span className="text-xs text-white">AUTO</span>
                                <Switch
                                    checked={isAutoSpin}
                                    onCheckedChange={setIsAutoSpin}
                                    disabled={isAnimating}
                                    className={cn(
                                        "scale-75",
                                        isAutoSpin && "ring-2 ring-white"
                                    )}
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => adjustBet(regionSettings.betStep)}
                            disabled={currentBet >= regionSettings.maxBet || isAnimating}
                            className="w-10 h-10 bg-black/20 rounded-full border-2 font-bold transition-all border-white text-white hover:bg-black/50 disabled:bg-black/80 disabled:text-white/40 disabled:border-white/40"
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