'use client';

import { GameConfig, SpinResult } from '@/lib/types';
import { useGameLogic, GameRendererBaseProps } from './base';
import { ColorThemeProvider } from '@/components/game-builder/color-theme-provider';
import { Music, Volume2, VolumeX, Info, Settings, Menu, Minus, Plus, Play, RotateCcw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { cn, getButtonStyle } from '@/lib/utils';
import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

interface MobileGameRendererProps extends GameRendererBaseProps {
    gameConfig: GameConfig;
}

export default function MobileGameRenderer(props: MobileGameRendererProps) {
    const [showMenu, setShowMenu] = useState(false);
    console.log(props.gameConfig)

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
        adjustBet,
        getEnhancedSlotItem,
        formatCurrency,
        colorTheme,
        setGameMatrix,
        setBalance,
        setLastWin,
        setWinningLines,
        setIsSpinning,
    } = useGameLogic(props);

    // 3D cylinder spinning state
    const [reelStates, setReelStates] = useState<Array<{
        rotation: number;
        symbols: string[];
        isSpinning: boolean;
    }>>([]);

    // Initialize reel states
    useEffect(() => {
        const initialStates = Array.from({ length: props.gameConfig.columns }, (_, colIndex) => ({
            rotation: 0,
            symbols: Array.from({ length: props.gameConfig.rows }, (_, rowIndex) =>
                gameMatrix[rowIndex]?.[colIndex] || props.gameConfig.slotItems[0]?.id || 'default'
            ),
            isSpinning: false
        }));
        setReelStates(initialStates);
    }, [props.gameConfig.columns, props.gameConfig.rows, props.gameConfig.slotItems, gameMatrix]);

    // 3D cylinder spinning animation
    const animateReelSpin3D = useCallback((reelIndex: number, finalSymbols: string[], duration: number = 2) => {
        const reel = reelsRef.current[reelIndex];
        if (!reel) return Promise.resolve();

        const symbolHeight = reel.offsetHeight / props.gameConfig.rows;
        const radius = (symbolHeight * props.gameConfig.rows) / (2 * Math.PI); // Calculate cylinder radius
        const symbolAngle = 360 / props.gameConfig.rows; // Angle per symbol

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
    }, [props.gameConfig.rows, reelsRef]);

    // Override the spin animation to use 3D
    const handleSpin3D = useCallback(async () => {
        if (isSpinning || currentBet > balance) return;

        setIsSpinning(true);
        setWinningLines([]);
        setLastWin(0);

        try {
            let spinResult: SpinResult;
            if (props.onSpin) {
                spinResult = await props.onSpin(currentBet);
            } else {
                throw new Error('No spin handler provided');
            }

            const spinPromises = [];
            for (let col = 0; col < props.gameConfig.columns; col++) {
                const columnSymbols = spinResult.view.map((row: string[]) => row[col]);
                spinPromises.push(animateReelSpin3D(col, columnSymbols, 2 + col * 0.2));
            }

            await Promise.all(spinPromises);

            setGameMatrix(spinResult.view);
            setBalance(spinResult.balance);
            setLastWin(spinResult.winAmount);
            setWinningLines(spinResult.lines);

            if (props.onBalanceUpdate) {
                props.onBalanceUpdate(spinResult.balance);
            }
        } catch (error) {
            console.error('Spin failed:', error);
        } finally {
            setIsSpinning(false);
        }
    }, [isSpinning, currentBet, balance, props.onSpin, props.onBalanceUpdate, props.gameConfig.columns, animateReelSpin3D, setGameMatrix, setBalance, setLastWin, setWinningLines, setIsSpinning]);

    return (
        <ColorThemeProvider theme={colorTheme}>
            <div
                ref={gameContainerRef}
                className="w-full h-full flex flex-col bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden"
                style={{
                    backgroundImage: props.gameConfig.backgroundImageKey ? `url(${props.gameConfig.backgroundImageKey})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >

                <div className="flex flex-col space-y-4 h-full">

                    {/* Mascot */}
                    {props.gameConfig.mascot.enabled && (
                        <div className="w-full h-1/7 flex justify-center">
                            <img src="/placeholder-symbol.svg" alt="Game Mascot" className="w-full h-full" />
                        </div>
                    )}

                    {/* Game Area */}
                    <div className="w-full h-2/5 flex items-center justify-center">
                        <div className="bg-black bg-opacity-40 rounded-lg p-2 w-full h-full">
                            <div className="w-full h-full flex flex-row rounded-lg bg-white perspective-1000">
                                {Array.from({ length: props.gameConfig.columns }).map((_, colIndex) => {
                                    const reelState = reelStates[colIndex];
                                    const symbolHeight = 100 / props.gameConfig.rows;
                                    const radius = (100 * props.gameConfig.rows) / (2 * Math.PI); // Calculate cylinder radius
                                    const symbolAngle = 360 / props.gameConfig.rows; // Angle per symbol

                                    return (
                                        <div
                                            key={colIndex}
                                            ref={el => { if (el) reelsRef.current[colIndex] = el; }}
                                            className="reel h-full flex flex-col relative"
                                            style={{
                                                width: `${100 / props.gameConfig.columns}%`,
                                                transformStyle: 'preserve-3d',
                                                transform: `rotateX(${reelState?.rotation || 0}deg)`,
                                                transformOrigin: '50% 0%'
                                            }}
                                        >
                                            {Array.from({ length: props.gameConfig.rows }).map((_, rowIndex) => {
                                                const symbolId = reelState?.symbols?.[rowIndex] || gameMatrix[rowIndex]?.[colIndex] || props.gameConfig.slotItems[0]?.id;
                                                const isWinning = winningLines.some(line => line.some(pos => Math.floor(pos / props.gameConfig.columns) === rowIndex && pos % props.gameConfig.columns === colIndex));
                                                const slotItem = getEnhancedSlotItem(symbolId);
                                                const angle = rowIndex * symbolAngle;

                                                return (
                                                    <div
                                                        key={`${colIndex}-${rowIndex}`}
                                                        className={cn(
                                                            "symbol absolute bg-white flex items-center justify-center overflow-hidden transition-all duration-300",
                                                            isWinning && "ring-2 ring-yellow-400"
                                                        )}
                                                        style={{
                                                            height: `${symbolHeight}%`,
                                                            transform: `rotateX(${angle}deg) translateZ(${radius}px)`,
                                                            transformOrigin: '50% 50%',
                                                            backfaceVisibility: 'hidden'
                                                        }}
                                                    >
                                                        <img src={slotItem?.imageKey || '/placeholder-symbol.svg'} alt={slotItem?.name || 'Unknown'} className="w-full h-full object-contain" />
                                                        {isWinning && <div className="absolute inset-0 bg-yellow-400 bg-opacity-20 animate-pulse" />}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Win Display / Commercial Area */}
                    <div className="text-center flex flex-row items-center justify-center space-x-2 min-h-[60px]">
                        {lastWin > 0 ? (
                            <>
                                <div className="text-2xl font-bold text-yellow-400 animate-bounce">WIN!</div>
                                <div className="text-lg font-bold text-white">${lastWin.toFixed(2)}</div>
                            </>
                        ) : (
                            <div className="text-lg font-bold text-white">
                                Hold spin button for turbo spin
                            </div>
                        )}
                    </div>

                    {/* Controls */}

                    <div className="flex items-center space-x-2 mx-auto mt-auto">
                        <button
                            onClick={() => adjustBet(-regionSettings.betStep)}
                            disabled={currentBet <= regionSettings.minBet || isSpinning}
                            className="w-10 h-10 bg-black/20  rounded-full border-2 font-bold transition-all border-white text-white hover:bg-black/50 disabled:opacity-20 "
                        >
                            <Minus className="w-5 h-5 mx-auto" />
                        </button>

                        <div className='flex flex-col items-center space-y-2'>
                            <button
                                onClick={handleSpin3D}
                                disabled={isSpinning || currentBet > balance || currentBet < regionSettings.minBet}
                                className="text-white rounded-full w-24 aspect-square font-bold transition-all flex items-center justify-center border-2 border-white"
                            >
                                {isSpinning ? <RotateCcw className="w-8 h-8 animate-spin" /> : <Play className="w-8 h-8" />}
                            </button>

                            <div className="flex flex-row gap-2 items-center justify-between bg-black/30 rounded-full py-1 px-2">
                                <span className="text-xs font-bold text-white">Autoplay</span>
                                <Switch
                                    checked={isAutoSpin}
                                    onCheckedChange={setIsAutoSpin}
                                    disabled={isSpinning}
                                    className={cn(
                                        "h-4 w-6 [&>span]:h-3 [&>span]:w-3 [&>span]:bg-white [.peer]:bg-white/30",
                                        isAutoSpin && "ring-2 ring-white/20"
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

                    {/* Info Row */}
                    <div className="w-full flex flex-row gap-4 items-center pb-4 px-4">

                        {/* Menu Button */}
                        <div className='relative'>
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="z-50 p-2 bg-black/20 rounded-full text-white"
                            >
                                <Settings className="w-5 h-5 mx-auto" />
                            </button>

                            {showMenu && (
                                <div className="absolute top-16 right-4 z-40 bg-black bg-opacity-80 rounded-lg p-2 space-y-2">
                                    <button onClick={() => setSoundEnabled(!soundEnabled)} className="flex items-center space-x-2 p-2 text-white rounded w-full">
                                        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                                        <span className="text-sm">Sound</span>
                                    </button>
                                    <button onClick={() => setMusicEnabled(!musicEnabled)} className="flex items-center space-x-2 p-2 text-white rounded w-full">
                                        <Music className={`w-4 h-4 ${musicEnabled ? 'text-green-400' : 'text-gray-400'}`} />
                                        <span className="text-sm">Music</span>
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="text-center grid grid-cols-2 w-full gap-1 items-center">
                            <div className="text-sm text-gray-300 text-right">BALANCE</div>
                            <div className="text-white font-bold text-sm text-left">{formatCurrency(balance)}</div>
                            <div className="text-sm text-gray-300 text-right">BET</div>
                            <div className="text-white font-bold text-sm text-left">{formatCurrency(currentBet)}</div>
                        </div>
                        <div>
                            <button className="p-2 bg-black/20 rounded-full text-white"><Info className="w-5 h-5 mx-auto" /></button>
                        </div>
                    </div>

                    {/* Error Messages */}
                    {currentBet > balance && (
                        <div className="px-2 py-1 bg-red-600 text-center rounded text-xs">Insufficient balance</div>
                    )}
                    {currentBet < regionSettings.minBet && (
                        <div className="px-2 py-1 bg-yellow-600 text-center rounded text-xs">Bet below minimum</div>
                    )}
                </div>
            </div>
        </ColorThemeProvider>
    );
}
