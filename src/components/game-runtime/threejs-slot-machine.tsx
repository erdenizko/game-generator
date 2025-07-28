"use client";

import React, { useRef, useEffect, useState, useMemo, memo, useCallback } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Plane, Box } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { Play, RotateCcwIcon } from 'lucide-react';

// Slot machine symbols data
const SYMBOLS = [
    { name: 'cherry', texture: '/images/fluid-letter-s.png' },
    { name: 'slotty', texture: '/images/fluid-letter-l.png' },
    { name: 'banana', texture: '/images/fluid-letter-o.png' },
    { name: 'banana', texture: '/images/fluid-letter-t.png' },
    { name: 'banana', texture: '/images/fluid-letter-y.png' },
    { name: 'banana', texture: '/images/fluid-sphere.png' },
    { name: 'banana', texture: '/images/fluid-heart.png' },
    { name: 'banana', texture: '/images/fluid-dollar.png' },
];

// Individual reel component - Memoized for performance
const SlotReel = memo(({
    position,
    delay = 0,
    index,
    spinCount,
    onSpinComplete,
}: {
    position: [number, number, number];
    delay?: number;
    index: number;
    spinCount: number;
    onSpinComplete?: () => void;
}) => {
    const meshRef = useRef<THREE.Group>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [_symbolOrder, setSymbolOrder] = useState<number[]>([]);

    useEffect(() => {
        if (index === 0) {
            setSymbolOrder([
                7, 0, 5
            ])
        } else if (index === 1) {
            setSymbolOrder([
                6, 1, 7
            ])
        } else if (index === 2) {
            setSymbolOrder([
                5, 2, 6
            ])
        } else if (index === 3) {
            setSymbolOrder([
                7, 3, 6
            ])
        } else if (index === 4) {
            setSymbolOrder([
                5, 3, 7
            ])
        } else if (index === 5) {
            setSymbolOrder([
                6, 4, 5
            ])
        }
    }, []);

    // Load textures
    const textures = useLoader(THREE.TextureLoader, SYMBOLS.map(s => s.texture));

    // Ensure textures are correctly configured for rendering (fix black square issue)
    useEffect(() => {
        if (textures && Array.isArray(textures)) {
            textures.forEach((texture) => {
                if (texture) {
                    texture.colorSpace = THREE.SRGBColorSpace;
                    texture.needsUpdate = true;
                }
            });
        }
    }, [textures]);

    // Create symbol meshes
    const symbolMeshes = useMemo(() => {
        return _symbolOrder.map((symbolIndex, index) => {
            const texture = textures[symbolIndex];

            return (
                <Plane
                    key={index}
                    args={[1, 1]}
                    position={[0, index * 1.2, 0]}
                >
                    <meshBasicMaterial
                        map={texture}
                        transparent={true}
                        toneMapped={false}
                    />
                </Plane>
            );
        });
    }, [textures, _symbolOrder]);

    const spinReel = () => {
        if (isSpinning || !meshRef.current) return;

        setIsSpinning(true);

        // Create spinning animation
        const timeline = gsap.timeline({
            onComplete: () => {
                setIsSpinning(false);
                onSpinComplete?.();
            }
        });

        // Phase 1: Spin up (slow to fast)
        timeline.to(meshRef.current.position, {
            y: -1.2,
            duration: 0,
            delay: 0,
            onComplete: () => {
                if (index === 0) {
                    setSymbolOrder([
                        7, 0, 5, 5, 7, 5, 6, 7, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 6, 7, 0, 5
                    ])
                } else if (index === 1) {
                    setSymbolOrder([
                        6, 1, 7, 7, 5, 6, 7, 5, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 6, 6, 1, 7
                    ])
                } else if (index === 2) {
                    setSymbolOrder([
                        5, 2, 6, 5, 6, 7, 5, 6, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 5, 5, 2, 6
                    ])
                } else if (index === 3) {
                    setSymbolOrder([
                        7, 3, 6, 6, 7, 5, 6, 7, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 6, 3, 7
                    ])
                } else if (index === 4) {
                    setSymbolOrder([
                        5, 3, 7, 7, 5, 6, 7, 5, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 7, 3, 5
                    ])
                } else if (index === 5) {
                    setSymbolOrder([
                        6, 4, 5, 5, 7, 6, 5, 7, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 5, 4, 6
                    ])
                }
            }
        });

        // Phase 2: Fast spinning
        timeline.to(meshRef.current.position, {
            y: -50,
            duration: 2,
            ease: "power2.in",
            onComplete: () => {
                setSymbolOrder(prev => {
                    const newOrder = [...prev];
                    newOrder.splice(0, 3);
                    if (index === 0) {
                        newOrder.push(5, 0, 7);
                    } else if (index === 1) {
                        newOrder.push(6, 1, 6);
                    } else if (index === 2) {
                        newOrder.push(7, 2, 5);
                    } else if (index === 3) {
                        newOrder.push(5, 3, 7);
                    } else if (index === 4) {
                        newOrder.push(6, 3, 6);
                    } else if (index === 5) {
                        newOrder.push(7, 4, 5);
                    }
                    return newOrder;
                });
            },
            delay: delay
        });

        // Phase 3: Slow down and land
        timeline.to(meshRef.current.position, {
            y: -55.2,
            duration: 2,
            ease: "elastic.out(1, 0.4)",
        }, delay + 2);
    };

    // Auto-spin after component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            spinReel();
        }, 1000 + delay * 1000);

        return () => clearTimeout(timer);
    }, [spinCount]);

    return (
        <group ref={meshRef} position={position}>
            {symbolMeshes}
        </group>
    );
});

SlotReel.displayName = 'SlotReel';

// Slot machine frame component - Memoized for performance
const SlotMachineFrame = memo(() => {
    return (
        <group>
            {/* Main frame */}
            <Box args={[3.2, 3.8, 1]} position={[0, 0, 0]}>
                <meshStandardMaterial
                    color="#2a2a2a"
                    metalness={1}
                    roughness={1}
                />
            </Box>

            {/* Reel windows */}
            <Box args={[3.2, 3.8, 0.1]} position={[0, 0, 0]}>
                <meshStandardMaterial
                    color="#1a1a1a"
                    metalness={0}
                    roughness={1}
                    opacity={1}
                />
            </Box>

            {/* Divider lines with glow */}
            <Box args={[0.05, 3.8, 0.05]} position={[-1.05, 0, 0.05]}>
                <meshStandardMaterial
                    color="#ffff00"
                    emissive="#ffff00"
                    emissiveIntensity={1}
                    metalness={1}
                    roughness={1}
                />
            </Box>
            <Box args={[0.05, 3.8, 0.05]} position={[1.05, 0, 0.05]}>
                <meshStandardMaterial
                    color="#ffff00"
                    emissive="#ffff00"
                    emissiveIntensity={1}
                    metalness={1}
                    roughness={1}
                />
            </Box>

            {/* Enhanced glow effect */}
            <Box args={[3, 2, 0.1]} position={[0, 0, -0.2]}>
                <meshStandardMaterial
                    color="#ffff00"
                    emissive="#ffff00"
                    emissiveIntensity={1}
                    transparent
                    opacity={1}
                />
            </Box>

            {/* Additional glow layers */}
            <Box args={[3.8, 2, 0.05]} position={[0, 0, -0.3]}>
                <meshStandardMaterial
                    color="#00ffff"
                    emissive="#00ffff"
                    emissiveIntensity={1}
                    transparent
                    opacity={1}
                />
            </Box>

            <Box args={[3.8, 2, 0.05]} position={[2, 2, -0.4]}>
                <meshStandardMaterial
                    color="#ff00ff"
                    emissive="#ff00ff"
                    emissiveIntensity={1}
                    transparent
                    opacity={1}
                />
            </Box>
        </group>
    );
});

SlotMachineFrame.displayName = 'SlotMachineFrame';

// Main slot machine component - Memoized for performance
const ThreeJSSlotMachine = memo(() => {
    const [spinCount, setSpinCount] = useState(0);

    const handleSpinComplete = useCallback(() => {
    }, []);

    // Memoize the Canvas props to prevent re-renders
    const canvasProps = useMemo(() => ({
        camera: { position: [0, 0, 5] as [number, number, number], fov: 50 },
        style: {
            background: 'transparent',
            width: '100%',
            height: '100%'
        },
        gl: {
            antialias: true,
            alpha: true,
            powerPreference: "high-performance" as const
        },
        dpr: [1, 2] as [number, number],
        performance: { min: 0.5 }
    }), []);

    return (
        <div className="container relative flex flex-col rounded-4xl justify-center items-start shadow-2xl shadow-zinc-800" style={{
            width: '100%',
            willChange: 'transform',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'translateZ(0)', // Force GPU layer
        }}>
            <div className="relative bg-zinc-800 aspect-2/1 w-full h-auto border-4 border-zinc-700 rounded-4xl overflow-hidden" style={{
                boxShadow: 'rgb(0 0 0) 0px 0px 20px 0px inset',
            }}>
                <Canvas {...canvasProps}>


                    {/* Reels */}
                    <SlotReel
                        index={0}
                        position={[-2.98, -2.41, 1.25]}
                        delay={0}
                        onSpinComplete={handleSpinComplete}
                        spinCount={spinCount}
                    />
                    <SlotReel
                        index={1}
                        position={[-1.77, -2.41, 1.25]}
                        delay={0.1}
                        onSpinComplete={handleSpinComplete}
                        spinCount={spinCount}
                    />
                    <SlotReel
                        index={2}
                        position={[-0.58, -2.41, 1.25]}
                        delay={0.2}
                        onSpinComplete={handleSpinComplete}
                        spinCount={spinCount}
                    />
                    <SlotReel
                        index={3}
                        position={[0.61, -2.41, 1.25]}
                        delay={0.2}
                        onSpinComplete={handleSpinComplete}
                        spinCount={spinCount}
                    />
                    <SlotReel
                        index={4}
                        position={[1.79, -2.41, 1.25]}
                        delay={0.2}
                        onSpinComplete={handleSpinComplete}
                        spinCount={spinCount}
                    />
                    <SlotReel
                        index={5}
                        position={[2.98, -2.41, 1.25]}
                        delay={0.2}
                        onSpinComplete={handleSpinComplete}
                        spinCount={spinCount}
                    />

                </Canvas>

                <div className="absolute inset-0">
                    {/* Reel separators */}
                    <div
                        className="absolute left-1/6 top-0 bottom-0 w-1 pointer-events-none shadow-2xl shadow-purple-600 bg-radial bg-from-zinc-800 via-zinc-900 to-zinc-800"
                    />
                    <div
                        className="absolute left-2/6 top-0 bottom-0 w-1 pointer-events-none shadow-2xl shadow-purple-600 bg-radial bg-from-zinc-800 via-zinc-900 to-zinc-800"
                    />
                    <div
                        className="absolute left-3/6 top-0 bottom-0 w-1 pointer-events-none shadow-2xl shadow-purple-600 bg-radial bg-from-zinc-800 via-zinc-900 to-zinc-800"
                    />
                    <div
                        className="absolute left-4/6 top-0 bottom-0 w-1 pointer-events-none shadow-2xl shadow-purple-600 bg-radial bg-from-zinc-800 via-zinc-900 to-zinc-800"
                    />
                    <div
                        className="absolute left-5/6 top-0 bottom-0 w-1 pointer-events-none shadow-2xl shadow-purple-600 bg-radial bg-from-zinc-800 via-zinc-900 to-zinc-800"
                    />

                    {/* Center highlight */}
                    <div
                        className="absolute blur-lg top-1/3 left-0 right-0 h-1/3 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent shadow-2xl shadow-black/10"
                    />
                </div>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-50 flex justify-center items-center">
                <button
                    className="rounded-full bg-foreground text-background p-8 transition-all duration-500 relative overflow-hidden group"
                    onClick={() => {
                        setSpinCount(prev => prev + 1);
                    }}
                >
                    <span className='absolute inset-0 bg-radial from-rose-400 via-rose-500 to-orange-500 pointer-none border-4 border-rose-400 rounded-full'></span>
                    <span className="relative z-10 flex items-center gap-2 justify-center">
                        <Play className='w-8 h-8' />
                        <span className='text-3xl font-mono'>Start Building Now!</span>
                    </span>
                </button>
            </div>


        </div>
    );
});

ThreeJSSlotMachine.displayName = 'ThreeJSSlotMachine';

export default ThreeJSSlotMachine; 