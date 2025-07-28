'use client';

import { GameConfig, SpinResult } from '@/lib/types';
import { useGameLogic, GameRendererBaseProps } from './base';
import { ColorThemeProvider } from '@/components/game-builder/color-theme-provider';
import { Music, Settings, Minus, Plus, Play, RotateCcw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { cn, getButtonStyle } from '@/lib/utils';
import { useEffect, useState, useCallback } from 'react';
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

    // Enhanced 3D cylinder spinning state
    const [reelStates, setReelStates] = useState<Array<{
        rotation: number;
        symbols: string[];
        isSpinning: boolean;
        velocity: number;
    }>>([]);

    // Calculate optimal dimensions for crisp rendering
    const SYMBOLS_PER_REEL = 12; // Reduced for better performance
    const CYLINDER_RADIUS = 120; // Fixed radius for consistent perspective
    const SYMBOL_ANGLE = 360 / SYMBOLS_PER_REEL;

    // Initialize reel states with better symbol distribution
    useEffect(() => {
        const initialStates = Array.from({ length: gameConfig.columns }, (_, colIndex) => {
            // Create a pool of symbols with proper distribution
            const symbolPool = [...gameConfig.slotItems];
            const extendedPool: typeof symbolPool = [];
            
            // Ensure we have enough symbols by repeating the pool
            while (extendedPool.length < SYMBOLS_PER_REEL) {
                extendedPool.push(...symbolPool);
            }
            
            // Take random symbols from the pool
            const symbols = Array.from({ length: SYMBOLS_PER_REEL }, (_, index) => {
                if (index < gameConfig.rows) {
                    return gameMatrix[index]?.[colIndex] || symbolPool[0]?.id || 'default';
                }
                return extendedPool[index % extendedPool.length]?.id || 'default';
            });

            return {
                rotation: 0,
                symbols,
                isSpinning: false,
                velocity: 0
            };
        });
        setReelStates(initialStates);
    }, [gameConfig.columns, gameConfig.rows, gameConfig.slotItems, gameMatrix]);

    // Enhanced 3D cylinder spinning animation with elastic bounce
    const animateReelSpin3D = useCallback((reelIndex: number, finalSymbols: string[]) => {
        const reel = reelsRef.current[reelIndex];
        if (!reel) return Promise.resolve();

        return new Promise<void>((resolve) => {
            // Update reel state to spinning
            setReelStates(prev => prev.map((state, index) =>
                index === reelIndex ? { ...state, isSpinning: true, velocity: 1 } : state
            ));

            // Create main timeline
            const tl = gsap.timeline({ 
                onComplete: () => {
                    // Final state update
                    setReelStates(prev => prev.map((state, index) =>
                        index === reelIndex ? { 
                            ...state, 
                            isSpinning: false, 
                            velocity: 0,
                            symbols: finalSymbols,
                            rotation: 0
                        } : state
                    ));
                    resolve();
                }
            });

            // Calculate final position to land on correct symbols
            const totalSpins = 3 + (reelIndex * 0.3); // Staggered stopping
            const finalRotation = totalSpins * 360;
            
            // Phase 1: Accelerate (0.3s)
            tl.to(reel, {
                rotationX: finalRotation * 0.2,
                duration: 0.3,
                ease: 'power2.out',
                onUpdate: function () {
                    const currentRotation = this.targets()[0]._gsap.rotationX || 0;
                    const velocity = Math.abs(this.progress() - (this.prevProgress || 0));
                    setReelStates(prev => prev.map((state, index) =>
                        index === reelIndex ? { 
                            ...state, 
                            rotation: currentRotation,
                            velocity: velocity * 10
                        } : state
                    ));
                    this.prevProgress = this.progress();
                }
            });

            // Phase 2: Constant speed (0.6s)
            tl.to(reel, {
                rotationX: finalRotation * 0.8,
                duration: 0.6,
                ease: 'none',
                onUpdate: function () {
                    const currentRotation = this.targets()[0]._gsap.rotationX || 0;
                    setReelStates(prev => prev.map((state, index) =>
                        index === reelIndex ? { 
                            ...state, 
                            rotation: currentRotation,
                            velocity: 1
                        } : state
                    ));
                },
                onStart: () => {
                    // Update symbols during constant speed phase for smooth transition
                    setReelStates(prev => prev.map((state, index) =>
                        index === reelIndex ? { ...state, symbols: finalSymbols } : state
                    ));
                }
            });

            // Phase 3: Elastic deceleration with bounce (0.9s)
            tl.to(reel, {
                rotationX: finalRotation,
                duration: 0.9,
                ease: 'elastic.out(1, 0.6)', // Strong elastic bounce
                onUpdate: function () {
                    const currentRotation = this.targets()[0]._gsap.rotationX || 0;
                    const velocity = Math.abs(this.progress() - (this.prevProgress || 0));
                    setReelStates(prev => prev.map((state, index) =>
                        index === reelIndex ? { 
                            ...state, 
                            rotation: currentRotation,
                            velocity: velocity * 5
                        } : state
                    ));
                    this.prevProgress = this.progress();
                }
            });
        });
    }, [reelsRef]);

    // Enhanced spin handler
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

            // Create staggered animations for each reel
            const spinPromises: Promise<void>[] = [];
            for (let col = 0; col < gameConfig.columns; col++) {
                const columnSymbols = spinResult.view.map((row: string[]) => row[col]);
                
                // Extend column symbols to fill the cylinder
                const extendedSymbols = [...columnSymbols];
                while (extendedSymbols.length < SYMBOLS_PER_REEL) {
                    extendedSymbols.push(...gameConfig.slotItems.map(item => item.id));
                }
                
                const finalSymbols = extendedSymbols.slice(0, SYMBOLS_PER_REEL);
                const delay = col * 0.1; // Stagger start times
                
                setTimeout(() => {
                    spinPromises.push(animateReelSpin3D(col, finalSymbols));
                }, delay * 1000);
            }

            // Wait for all reels to finish
            await Promise.all(spinPromises);

            // Update game state
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
    }, [isSpinning, currentBet, balance, onSpin, onBalanceUpdate, gameConfig.columns, gameConfig.slotItems, animateReelSpin3D, setGameMatrix, setBalance, setLastWin, setWinningLines, setIsSpinning]);

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
                            {/* Enhanced Reels Grid with better 3D perspective */}
                            <div className="reels-grid h-full rounded-lg overflow-hidden bg-white flex flex-row"
                                style={{
                                    perspective: '2000px', // Increased perspective for less distortion
                                    perspectiveOrigin: '50% 50%'
                                }}
                            >
                                {Array.from({ length: gameConfig.columns }).map((_, colIndex) => {
                                    const reelState = reelStates[colIndex];

                                    return (
                                        <div
                                            key={colIndex}
                                            className="reel-container h-full relative"
                                            style={{
                                                width: `${100 / gameConfig.columns}%`,
                                            }}
                                        >
                                            <div
                                                ref={el => { if (el) reelsRef.current[colIndex] = el; }}
                                                className="reel h-full relative"
                                                style={{
                                                    transformStyle: 'preserve-3d',
                                                    transform: `rotateX(${reelState?.rotation || 0}deg)`,
                                                    transformOrigin: `50% 50% 0px`,
                                                    // Enhanced rendering for crisp visuals
                                                    backfaceVisibility: 'hidden',
                                                    willChange: 'transform',
                                                    filter: reelState?.isSpinning ? 
                                                        `blur(${Math.min(reelState.velocity * 2, 4)}px)` : 'none',
                                                    transition: reelState?.isSpinning ? 'none' : 'filter 0.3s ease-out'
                                                }}
                                            >
                                                {/* Enhanced Symbol Rendering */}
                                                {Array.from({ length: SYMBOLS_PER_REEL }).map((_, symbolIndex) => {
                                                    const symbolId = reelState?.symbols?.[symbolIndex] || 
                                                                   gameMatrix[symbolIndex % gameConfig.rows]?.[colIndex] || 
                                                                   gameConfig.slotItems[0]?.id;
                                                    
                                                    const isVisible = symbolIndex < gameConfig.rows;
                                                    const isWinning = isVisible && winningLines.some(line =>
                                                        line.some(pos => 
                                                            Math.floor(pos / gameConfig.columns) === symbolIndex && 
                                                            pos % gameConfig.columns === colIndex
                                                        )
                                                    );
                                                    
                                                    const slotItem = getEnhancedSlotItem(symbolId);
                                                    const angle = symbolIndex * SYMBOL_ANGLE;

                                                    return (
                                                        <div
                                                            key={`${colIndex}-${symbolIndex}`}
                                                            className={cn(
                                                                "symbol absolute w-full bg-white flex items-center justify-center overflow-hidden border-b border-gray-200",
                                                                "transition-all duration-300",
                                                                isWinning && "ring-4 ring-yellow-400 shadow-lg shadow-yellow-400/50 z-10"
                                                            )}
                                                            style={{
                                                                height: `${100 / gameConfig.rows}%`,
                                                                transform: `rotateX(${angle}deg) translateZ(${CYLINDER_RADIUS}px)`,
                                                                transformOrigin: '50% 50%',
                                                                backfaceVisibility: 'hidden',
                                                                // Enhanced visual quality
                                                                imageRendering: 'crisp-edges',
                                                                WebkitFontSmoothing: 'antialiased',
                                                                opacity: isVisible ? 1 : 0.7
                                                            }}
                                                        >
                                                            <img
                                                                src={slotItem?.imageKey || '/placeholder-symbol.svg'}
                                                                alt={slotItem?.name || 'Unknown'}
                                                                className="w-full h-full object-contain p-1"
                                                                loading="lazy"
                                                                style={{
                                                                    imageRendering: 'crisp-edges',
                                                                    maxWidth: '90%',
                                                                    maxHeight: '90%'
                                                                }}
                                                            />
                                                            {isWinning && (
                                                                <div className="absolute inset-0 bg-yellow-400 bg-opacity-20 animate-pulse" />
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
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