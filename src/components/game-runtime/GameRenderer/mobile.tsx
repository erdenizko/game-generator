'use client';

import { GameConfig } from '@/lib/types';
import { useGameLogic, GameRendererBaseProps } from './base';
import { ColorThemeProvider } from '@/components/game-builder/color-theme-provider';
import { Music, Volume2, VolumeX, Info, Settings, Menu, Minus, Plus, Play, RotateCcw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { cn, getButtonStyle } from '@/lib/utils';
import { useState } from 'react';

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
    } = useGameLogic(props);

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
                        <div className="w-full h-1/5 flex justify-center">
                            <img src="/placeholder-symbol.svg" alt="Game Mascot" className="w-full h-full" />
                        </div>
                    )}

                    {/* Game Area */}
                    <div className="w-full h-2/5 flex items-center justify-center">
                        <div className="bg-black bg-opacity-40 rounded-lg p-2 w-full h-full">
                            <div className="w-full h-full flex flex-row rounded-lg bg-white">
                                {Array.from({ length: props.gameConfig.columns }).map((_, colIndex) => (
                                    <div
                                        key={colIndex}
                                        ref={el => { if (el) reelsRef.current[colIndex] = el; }}
                                        className={cn("h-full flex flex-col")}
                                        style={{ width: `${100 / props.gameConfig.columns}%` }}
                                    >
                                        {Array.from({ length: props.gameConfig.rows }).map((_, rowIndex) => {
                                            const symbolId = gameMatrix[rowIndex]?.[colIndex] || props.gameConfig.slotItems[0]?.id;
                                            const isWinning = winningLines.some(line => line.some(pos => Math.floor(pos / props.gameConfig.columns) === rowIndex && pos % props.gameConfig.columns === colIndex));
                                            const slotItem = getEnhancedSlotItem(symbolId);
                                            return (
                                                <div
                                                    key={`${colIndex}-${rowIndex}`}
                                                    className={cn(
                                                        "relative bg-white flex items-center justify-center",
                                                        isWinning && "ring-2 ring-yellow-400"
                                                    )}
                                                    style={{ height: `${100 / props.gameConfig.rows}%` }}
                                                >
                                                    <img src={slotItem?.imageKey || '/placeholder-symbol.svg'} alt={slotItem?.name || 'Unknown'} className="w-full h-full object-contain" />
                                                    {isWinning && <div className="absolute inset-0 bg-yellow-400 bg-opacity-20 animate-pulse" />}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
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
                    <div className="grid grid-cols-3 gap-2 items-center">
                        <div className="flex flex-col items-center space-y-1">
                            <div className="text-xs text-gray-300 text-center">BET</div>
                            <div className="flex items-center justify-center space-x-1">
                                <button onClick={() => adjustBet(-regionSettings.betStep)} disabled={currentBet <= regionSettings.minBet || isSpinning} className="w-8 h-8 bg-red-600 rounded text-white text-sm">
                                    <Minus className="w-4 h-4 mx-auto" />
                                </button>
                                <div className="text-white text-sm font-bold">{currentBet}</div>
                                <button onClick={() => adjustBet(regionSettings.betStep)} disabled={currentBet >= regionSettings.maxBet || isSpinning} className="w-8 h-8 bg-green-600 rounded text-white text-sm">
                                    <Plus className="w-4 h-4 mx-auto" />
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleSpin}
                            disabled={isSpinning || currentBet > balance}
                            style={getButtonStyle('primary', props.gameConfig.styling)}
                            className="aspect-square font-bold text-sm w-20 flex items-center justify-center"
                        >
                            {isSpinning ? <RotateCcw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
                        </button>

                        <div className="flex flex-col items-center space-y-1">
                            <div className="text-xs text-gray-300 text-center">AUTO</div>
                            <Switch
                                checked={isAutoSpin}
                                onCheckedChange={setIsAutoSpin}
                                disabled={isSpinning}
                                className={cn("scale-75", isAutoSpin && "ring-2 ring-white")}
                            />
                        </div>
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
