'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SlotConfig, SlotSymbol, SlotReel, SpinResult, PrizeType } from '@/types/casino';
import gsap from 'gsap';

interface SlotMachineProps {
    slotConfig: SlotConfig;
    onSpin: (result: SpinResult) => void;
    isSpinning: boolean;
    wallet: number;
    selectedBet: number;
    disabled?: boolean;
}

const SlotMachine: React.FC<SlotMachineProps> = ({
    slotConfig,
    onSpin,
    isSpinning,
    wallet,
    selectedBet,
    disabled = false
}) => {
    const [reelPositions, setReelPositions] = useState<number[]>([0, 0, 0]);
    const [spinResult, setSpinResult] = useState<SpinResult | null>(null);
    const reelRefs = useRef<(HTMLDivElement | null)[]>([]);

    const REEL_HEIGHT = 120;
    const SYMBOL_HEIGHT = 60;
    const SYMBOLS_PER_REEL = 20;

    const getRandomSymbolIndex = (symbols: SlotSymbol[]): number => {
        const totalWeight = symbols.reduce((sum, symbol) => sum + symbol.weight, 0);
        let random = Math.random() * totalWeight;

        for (let i = 0; i < symbols.length; i++) {
            if (random < symbols[i].weight) {
                return i;
            }
            random -= symbols[i].weight;
        }

        return 0; // Fallback
    };

    const generateReelSymbols = (): SlotSymbol[][] => {
        return slotConfig.reels.map(reel => {
            const symbols: SlotSymbol[] = [];
            for (let i = 0; i < SYMBOLS_PER_REEL; i++) {
                const randomIndex = getRandomSymbolIndex(slotConfig.symbols);
                symbols.push(slotConfig.symbols[randomIndex]);
            }
            return symbols;
        });
    };

    const [reelSymbols] = useState<SlotSymbol[][]>(generateReelSymbols());

    const checkWinningCombination = (positions: number[]): SpinResult | null => {
        // Get the visible symbols (middle row)
        const visibleSymbols = positions.map((pos, reelIndex) => {
            const symbolIndex = Math.floor(pos / SYMBOL_HEIGHT) % SYMBOLS_PER_REEL;
            return reelSymbols[reelIndex][symbolIndex];
        });

        // Check for winning paylines
        for (const payline of slotConfig.paylines) {
            const lineSymbols = payline.positions.map(pos => visibleSymbols[pos]);

            // Check if all symbols in payline are the same
            if (lineSymbols.every(symbol => symbol.id === lineSymbols[0].id)) {
                const symbol = lineSymbols[0];
                const reward = selectedBet * payline.multiplier * symbol.value;

                return {
                    prizeType: symbol.name.toUpperCase() as PrizeType,
                    reward,
                    multiplier: payline.multiplier * symbol.value
                };
            }
        }

        return null; // No win
    };

    const handleSpin = () => {
        if (isSpinning || disabled || wallet < selectedBet) return;

        // Generate random stop positions for each reel
        const newPositions = slotConfig.reels.map(() =>
            Math.floor(Math.random() * SYMBOLS_PER_REEL) * SYMBOL_HEIGHT
        );

        // Animate each reel
        reelRefs.current.forEach((reel, index) => {
            if (reel) {
                const spinDistance = SYMBOL_HEIGHT * SYMBOLS_PER_REEL * 3 + newPositions[index];

                gsap.to(reel, {
                    y: -spinDistance,
                    duration: 2 + index * 0.5, // Stagger the reel stops
                    ease: "power3.out",
                    onComplete: () => {
                        // Reset position and set final position
                        gsap.set(reel, { y: -newPositions[index] });

                        if (index === slotConfig.reels.length - 1) {
                            // Last reel finished, check for wins
                            setReelPositions(newPositions);

                            const result = checkWinningCombination(newPositions);
                            setSpinResult(result);

                            if (result) {
                                onSpin(result);
                            } else {
                                onSpin({
                                    prizeType: 'DUST',
                                    reward: 0,
                                    multiplier: 0
                                });
                            }
                        }
                    }
                });
            }
        });
    };

    return (
        <div className="flex flex-col items-center space-y-6">
            {/* Slot Machine Frame */}
            <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 p-6 rounded-2xl shadow-2xl">
                <div className="bg-gray-900 p-4 rounded-xl">
                    <div className="flex space-x-2">
                        {slotConfig.reels.map((reel, reelIndex) => (
                            <div
                                key={reel.id}
                                className="relative bg-white rounded-lg overflow-hidden"
                                style={{ width: '80px', height: `${REEL_HEIGHT}px` }}
                            >
                                {/* Reel mask */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-20 z-10 pointer-events-none" />

                                {/* Reel symbols */}
                                <div
                                    ref={el => { reelRefs.current[reelIndex] = el; }}
                                    className="flex flex-col"
                                    style={{ transform: `translateY(-${reelPositions[reelIndex]}px)` }}
                                >
                                    {/* Duplicate symbols for seamless scrolling */}
                                    {[...reelSymbols[reelIndex], ...reelSymbols[reelIndex]].map((symbol, symbolIndex) => (
                                        <div
                                            key={`${symbol.id}-${symbolIndex}`}
                                            className="flex items-center justify-center bg-white border-b border-gray-200"
                                            style={{ height: `${SYMBOL_HEIGHT}px` }}
                                        >
                                            {symbol.imageUrl ? (
                                                <img
                                                    src={symbol.imageUrl}
                                                    alt={symbol.name}
                                                    className="w-10 h-10 object-contain"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                                                    {symbol.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Winning line indicator */}
                                <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-red-500 opacity-0"
                                    style={{ display: spinResult ? 'block' : 'none' }} />
                            </div>
                        ))}
                    </div>

                    {/* Paylines indicator */}
                    <div className="mt-2 text-center">
                        <div className="text-white text-xs">
                            {slotConfig.paylines.length} PAYLINES
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center space-y-4">
                <button
                    onClick={handleSpin}
                    disabled={isSpinning || disabled || wallet < selectedBet}
                    className={`px-12 py-4 text-2xl font-bold rounded-lg transition-all duration-300 ${isSpinning || disabled || wallet < selectedBet
                            ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                            : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 hover:scale-105 shadow-lg hover:shadow-xl'
                        }`}
                >
                    {isSpinning ? 'SPINNING...' : `SPIN (${selectedBet} Credits)`}
                </button>

                {slotConfig.autoSpin && (
                    <button
                        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        disabled={isSpinning || disabled}
                    >
                        AUTO SPIN
                    </button>
                )}
            </div>

            {/* Paytable */}
            <div className="bg-gray-800 p-4 rounded-lg max-w-sm">
                <h3 className="text-white font-bold mb-2 text-center">PAYTABLE</h3>
                <div className="space-y-1">
                    {slotConfig.symbols.map(symbol => (
                        <div key={symbol.id} className="flex items-center justify-between text-white text-sm">
                            <div className="flex items-center space-x-2">
                                {symbol.imageUrl ? (
                                    <img src={symbol.imageUrl} alt={symbol.name} className="w-6 h-6" />
                                ) : (
                                    <div className="w-6 h-6 bg-gray-600 rounded text-xs flex items-center justify-center">
                                        {symbol.name.charAt(0)}
                                    </div>
                                )}
                                <span>{symbol.name}</span>
                            </div>
                            <span className="text-yellow-400">{symbol.value}x</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Last Result */}
            {spinResult && (
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-bold text-white mb-2">Last Spin</h3>
                    <div className="text-yellow-400 font-bold">
                        {spinResult.reward > 0
                            ? `WIN! ${spinResult.reward} Credits (${spinResult.multiplier}x)`
                            : 'No Win'
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default SlotMachine;