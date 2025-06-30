'use client';

import React, { useState, useRef, useEffect } from 'react';
import { WheelConfig, WheelSegment, SpinResult, PrizeType } from '@/types/casino';
import gsap from 'gsap';

interface CasinoWheelProps {
    wheelConfig: WheelConfig;
    onSpin: (result: SpinResult) => void;
    isSpinning: boolean;
    wallet: number;
    selectedBet: number;
    disabled?: boolean;
}

const CasinoWheel: React.FC<CasinoWheelProps> = ({
    wheelConfig,
    onSpin,
    isSpinning,
    wallet,
    selectedBet,
    disabled = false
}) => {
    const wheelRef = useRef<SVGGElement>(null);
    const [currentRotation, setCurrentRotation] = useState(0);
    const [selectedSegment, setSelectedSegment] = useState<WheelSegment | null>(null);

    const radius = 150;
    const centerX = 160;
    const centerY = 160;

    const generateSegmentPath = (startAngle: number, endAngle: number): string => {
        const x1 = centerX + radius * Math.cos(startAngle * Math.PI / 180);
        const y1 = centerY + radius * Math.sin(startAngle * Math.PI / 180);
        const x2 = centerX + radius * Math.cos(endAngle * Math.PI / 180);
        const y2 = centerY + radius * Math.sin(endAngle * Math.PI / 180);

        const largeArc = endAngle - startAngle > 180 ? 1 : 0;

        return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    };

    const getRandomSegment = (): WheelSegment => {
        const totalProbability = wheelConfig.segments.reduce((sum, segment) => sum + segment.probability, 0);
        let random = Math.random() * totalProbability;

        for (const segment of wheelConfig.segments) {
            if (random < segment.probability) {
                return segment;
            }
            random -= segment.probability;
        }

        return wheelConfig.segments[0]; // Fallback
    };

    const handleSpin = () => {
        if (isSpinning || disabled || wallet < selectedBet) return;

        const winningSegment = getRandomSegment();
        setSelectedSegment(winningSegment);

        // Calculate the target angle for the winning segment
        let cumulativeAngle = 0;
        let targetAngle = 0;

        for (let i = 0; i < wheelConfig.segments.length; i++) {
            const segment = wheelConfig.segments[i];
            const segmentAngle = (segment.probability / wheelConfig.segments.reduce((sum, s) => sum + s.probability, 0)) * 360;
            
            if (segment.id === winningSegment.id) {
                targetAngle = cumulativeAngle + segmentAngle / 2;
                break;
            }
            cumulativeAngle += segmentAngle;
        }

        // Add multiple rotations for effect
        const finalRotation = currentRotation + 360 * wheelConfig.speed + (360 - targetAngle);

        if (wheelRef.current) {
            gsap.to(wheelRef.current, {
                rotation: finalRotation,
                duration: wheelConfig.duration / 1000,
                ease: "power3.out",
                onComplete: () => {
                    setCurrentRotation(finalRotation % 360);
                    
                    // Calculate reward
                    const reward = selectedBet * winningSegment.multiplier;
                    
                    onSpin({
                        prizeType: winningSegment.prizeType,
                        reward,
                        multiplier: winningSegment.multiplier
                    });
                }
            });
        }
    };

    let cumulativeAngle = 0;

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="relative">
                <svg width="320" height="320" className="drop-shadow-lg">
                    {/* Wheel background */}
                    <circle
                        cx={centerX}
                        cy={centerY}
                        r={radius + 5}
                        fill="#1f2937"
                        stroke="#374151"
                        strokeWidth="3"
                    />
                    
                    {/* Wheel segments */}
                    <g ref={wheelRef} style={{ transformOrigin: `${centerX}px ${centerY}px` }}>
                        {wheelConfig.segments.map((segment, index) => {
                            const totalProbability = wheelConfig.segments.reduce((sum, s) => sum + s.probability, 0);
                            const segmentAngle = (segment.probability / totalProbability) * 360;
                            const startAngle = cumulativeAngle;
                            const endAngle = cumulativeAngle + segmentAngle;
                            
                            const path = generateSegmentPath(startAngle, endAngle);
                            
                            // Calculate text position
                            const textAngle = (startAngle + endAngle) / 2;
                            const textRadius = radius * 0.7;
                            const textX = centerX + textRadius * Math.cos(textAngle * Math.PI / 180);
                            const textY = centerY + textRadius * Math.sin(textAngle * Math.PI / 180);
                            
                            cumulativeAngle += segmentAngle;
                            
                            return (
                                <g key={segment.id}>
                                    <path
                                        d={path}
                                        fill={segment.color}
                                        stroke="#ffffff"
                                        strokeWidth="2"
                                        className="transition-opacity duration-300"
                                        style={{
                                            opacity: selectedSegment?.id === segment.id ? 0.8 : 1
                                        }}
                                    />
                                    <text
                                        x={textX}
                                        y={textY}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fill="white"
                                        fontSize="12"
                                        fontWeight="bold"
                                        className="pointer-events-none select-none"
                                    >
                                        {segment.label}
                                    </text>
                                    <text
                                        x={textX}
                                        y={textY + 15}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fill="white"
                                        fontSize="10"
                                        className="pointer-events-none select-none"
                                    >
                                        {segment.multiplier}x
                                    </text>
                                </g>
                            );
                        })}
                    </g>
                    
                    {/* Center circle */}
                    <circle
                        cx={centerX}
                        cy={centerY}
                        r="20"
                        fill="#fbbf24"
                        stroke="#f59e0b"
                        strokeWidth="3"
                    />
                    
                    {/* Pointer */}
                    <polygon
                        points={`${centerX},${centerY - radius - 15} ${centerX - 8},${centerY - radius - 5} ${centerX + 8},${centerY - radius - 5}`}
                        fill="#ef4444"
                        stroke="#dc2626"
                        strokeWidth="2"
                    />
                </svg>
            </div>
            
            <button
                onClick={handleSpin}
                disabled={isSpinning || disabled || wallet < selectedBet}
                className={`px-8 py-4 text-xl font-bold rounded-lg transition-all duration-300 ${
                    isSpinning || disabled || wallet < selectedBet
                        ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
            >
                {isSpinning ? 'Spinning...' : `SPIN (${selectedBet} Credits)`}
            </button>
            
            {selectedSegment && (
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-bold text-white mb-2">Last Result</h3>
                    <div className="flex items-center justify-center space-x-2">
                        <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: selectedSegment.color }}
                        />
                        <span className="text-white">{selectedSegment.label}</span>
                        <span className="text-yellow-400 font-bold">{selectedSegment.multiplier}x</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CasinoWheel;