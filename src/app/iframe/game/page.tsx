'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import axios from 'axios';

interface Hex {
    id: string;
    q: number;
    r: number;
}

interface GameMap {
    hexes: Hex[];
}

type RewardType = 'DUST' | 'ROCK' | 'OIL' | 'GOLD' | 'DIAMOND';

interface SelectionResult {
    resultType: RewardType;
    reward: number;
}

interface ToastMessage extends SelectionResult {
    id: number;
}

interface InitResponse {
    sessionId: string;
    partner: { name: string };
    gameConfig: {
        defaultBid?: number | null;
        bidAmounts: number[];
        assets: {
            backgroundUrl?: string;
            diamondImageUrl?: string;
            dustImageUrl?: string;
            goldImageUrl?: string;
            oilImageUrl?: string;
            rockImageUrl?: string;
            mascotImageUrl?: string;
            mascotOnDustImageUrl?: string;
            mascotOnRockImageUrl?: string;
            mascotOnOilImageUrl?: string;
            mascotOnGoldImageUrl?: string;
            mascotOnDiamondImageUrl?: string;
        };
        sounds: {
            win?: string;
            lose?: string;
        }
    };
}

const HexagonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 100 86.6" {...props}>
        <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" />
    </svg>
);

const GamePage = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const isPreview = searchParams.get('preview') === 'true';

    const [loading, setLoading] = useState(true);
    const [gameMap, setGameMap] = useState<GameMap | null>(null);
    const [gameAssets, setGameAssets] = useState<InitResponse['gameConfig']['assets'] & { sounds?: InitResponse['gameConfig']['sounds'] }>({});
    const [balance, setBalance] = useState(0);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [selectedHexResults, setSelectedHexResults] = useState<Map<string, SelectionResult>>(new Map());
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentMascot, setCurrentMascot] = useState<string | null>(null);
    const [bidAmounts, setBidAmounts] = useState<number[]>([]);
    const [selectedBid, setSelectedBid] = useState<number>(0);

    const loadingScreenRef = useRef<HTMLDivElement>(null);
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const balanceRef = useRef<HTMLSpanElement>(null);
    const mascotTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const winSoundRef = useRef<HTMLAudioElement | null>(null);
    const loseSoundRef = useRef<HTMLAudioElement | null>(null);

    const generateHexagonalMap = (radius: number): GameMap => {
        const hexes: Hex[] = [];
        // q, r, s are cubic coordinates for a hexagon grid. s is implicit (-q-r).
        // Loop through a cube and only take points that are in the hexagon.
        for (let q = -radius; q <= radius; q++) {
            const r1 = Math.max(-radius, -q - radius);
            const r2 = Math.min(radius, -q + radius);
            for (let r = r1; r <= r2; r++) {
                hexes.push({ id: `${q}-${r}`, q, r });
            }
        }
        return { hexes };
    };

    const getPreviewConfig = () => {
        const config = {
            defaultBid: Number(searchParams.get('defaultBid') ?? 5),
            bidAmounts: (searchParams.get('bidAmounts') ?? '1,5,10,20').split(',').map(Number),
            assets: {
                backgroundUrl: searchParams.get('backgroundUrl') ?? undefined,
                diamondImageUrl: searchParams.get('diamondImageUrl') ?? undefined,
                dustImageUrl: searchParams.get('dustImageUrl') ?? undefined,
                goldImageUrl: searchParams.get('goldImageUrl') ?? undefined,
                oilImageUrl: searchParams.get('oilImageUrl') ?? undefined,
                rockImageUrl: searchParams.get('rockImageUrl') ?? undefined,
                mascotImageUrl: searchParams.get('mascotImageUrl') ?? undefined,
            },
            probabilities: {
                probDust: Number(searchParams.get('probDust') ?? 40),
                probRock: Number(searchParams.get('probRock') ?? 30),
                probOil: Number(searchParams.get('probOil') ?? 15),
                probGold: Number(searchParams.get('probGold') ?? 10),
                probDiamond: Number(searchParams.get('probDiamond') ?? 5),
            },
            multipliers: {
                multOil: Number(searchParams.get('multOil') ?? 1.5),
                multGold: Number(searchParams.get('multGold') ?? 2),
                multDiamond: Number(searchParams.get('multDiamond') ?? 5),
            }
        };
        return config;
    };

    useEffect(() => {
        if (isPreview) {
            const previewConfig = getPreviewConfig();
            setGameAssets(previewConfig.assets);
            setCurrentMascot(previewConfig.assets.mascotImageUrl || null);
            setBidAmounts(previewConfig.bidAmounts || []);
            setSelectedBid(previewConfig.defaultBid || previewConfig.bidAmounts[0] || 0);
            setBalance(10000);
            setGameMap(generateHexagonalMap(1));
            setLoading(false);
            if (gameContainerRef.current) {
                gsap.fromTo(
                    gameContainerRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5 }
                );
            }
            return;
        }

        if (token) {
            const initializeSession = async () => {
                try {
                    // In a real app, username and balance would come from the partner
                    const response = await axios.post<InitResponse>('/api/partner/init', {
                        token,
                        username: 'player123',
                        currentBalance: 10000,
                        currency: 'USD',
                    });

                    const { sessionId, gameConfig } = response.data;
                    setSessionId(sessionId);
                    setBalance(10000); // Set balance from init data
                    setGameAssets({ ...gameConfig.assets, sounds: gameConfig.sounds });
                    setCurrentMascot(gameConfig.assets.mascotImageUrl || null);
                    setBidAmounts(gameConfig.bidAmounts || []);
                    setSelectedBid(gameConfig.defaultBid || gameConfig.bidAmounts[0] || 0);

                    if (gameConfig.sounds?.win) {
                        winSoundRef.current = new Audio(gameConfig.sounds.win);
                    }
                    if (gameConfig.sounds?.lose) {
                        loseSoundRef.current = new Audio(gameConfig.sounds.lose);
                    }

                    // Now fetch the map
                    const mapResponse = await axios.get<GameMap>(`/api/game/map?token=${token}`);
                    setGameMap(mapResponse.data);

                } catch (error) {
                    console.error('Failed to initialize session or fetch map:', error);
                } finally {
                    if (loadingScreenRef.current) {
                        gsap.to(loadingScreenRef.current, {
                            opacity: 0,
                            duration: 0.5,
                            onComplete: () => {
                                setLoading(false);
                                if (gameContainerRef.current) {
                                    gsap.fromTo(
                                        gameContainerRef.current,
                                        { opacity: 0, y: 20 },
                                        { opacity: 1, y: 0, duration: 0.5 }
                                    );
                                }
                            },
                        });
                    }
                }
            };

            initializeSession();
        } else {
            setLoading(false);
        }
    }, [token]);

    const handleNewMap = async () => {
        if (!sessionId || isProcessing) return;

        setIsProcessing(true);
        try {
            const response = await axios.post<GameMap>('/api/game/end-round', { sessionId });
            setGameMap(response.data);
            setSelectedHexResults(new Map()); // Clear selected hexes for the new round
        } catch (error) {
            console.error('Failed to start a new round:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleHexClick = async (hexId: string) => {
        if (isProcessing || selectedHexResults.has(hexId)) return;

        if (isPreview) {
            setIsProcessing(true);
            const previewConfig = getPreviewConfig();
            const cost = selectedBid;
            setBalance(prev => prev - cost);

            // Simulate reward
            const { probabilities, multipliers } = previewConfig;
            const rand = Math.random() * 100;
            let resultType: RewardType = 'DUST';
            let cumulativeProb = 0;

            if (rand < (cumulativeProb += probabilities.probDiamond)) resultType = 'DIAMOND';
            else if (rand < (cumulativeProb += probabilities.probGold)) resultType = 'GOLD';
            else if (rand < (cumulativeProb += probabilities.probOil)) resultType = 'OIL';
            else if (rand < (cumulativeProb += probabilities.probRock)) resultType = 'ROCK';
            else resultType = 'DUST';

            let reward = 0;
            if (resultType === 'DIAMOND') reward = cost * multipliers.multDiamond;
            if (resultType === 'GOLD') reward = cost * multipliers.multGold;
            if (resultType === 'OIL') reward = cost * multipliers.multOil;
            if (resultType === 'ROCK') reward = cost;

            const newToast = { id: Date.now(), resultType, reward };
            setToasts([newToast]);

            setBalance(prev => prev + reward);
            setSelectedHexResults(prev => new Map(prev).set(hexId, { resultType, reward }));
            setIsProcessing(false);

            return;
        }

        if (!sessionId) return;

        setIsProcessing(true);

        const initialBalance = balance;
        const cost = selectedBid;
        setBalance(prev => prev - cost);

        // Animate balance decrease
        if (balanceRef.current) {
            gsap.to(balanceRef.current, {
                scale: 0.9,
                color: '#ef4444', // red-500
                duration: 0.2,
                onComplete: () => {
                    gsap.to(balanceRef.current, { scale: 1, color: '#ffffff', duration: 0.2 })
                }
            });
        }

        try {
            const response = await axios.post<SelectionResult>('/api/game/select', {
                sessionId,
                hexId,
                bid: selectedBid,
            });

            const { resultType, reward } = response.data;

            const newToast = { id: Date.now(), resultType, reward };
            setToasts([newToast]);

            const newBalance = initialBalance - cost + reward;
            setBalance(newBalance);

            // Animate balance increase and play sound
            if (balanceRef.current) {
                gsap.to(balanceRef.current, {
                    scale: 1.1,
                    color: '#34d399', // emerald-400
                    duration: 0.2,
                    onComplete: () => {
                        gsap.to(balanceRef.current, { scale: 1, color: '#ffffff', duration: 0.2 })
                    }
                });
            }

            if (reward > 0) {
                winSoundRef.current?.play();
            } else {
                loseSoundRef.current?.play();
            }

            setSelectedHexResults(prev => new Map(prev).set(hexId, response.data));

            if (mascotTimeoutRef.current) {
                clearTimeout(mascotTimeoutRef.current);
            }
            const mascotMap: Record<RewardType, string | undefined> = {
                DUST: gameAssets.mascotOnDustImageUrl,
                ROCK: gameAssets.mascotOnRockImageUrl,
                OIL: gameAssets.mascotOnOilImageUrl,
                GOLD: gameAssets.mascotOnGoldImageUrl,
                DIAMOND: gameAssets.mascotOnDiamondImageUrl,
            };
            const newMascot = mascotMap[resultType];
            if (newMascot) {
                setCurrentMascot(newMascot);
                mascotTimeoutRef.current = setTimeout(() => {
                    setCurrentMascot(gameAssets.mascotImageUrl || null);
                }, 2000);
            }

        } catch (error) {
            console.error('Failed to select hex:', error);
            // Revert balance deduction on error
            setBalance(initialBalance);
        } finally {
            setIsProcessing(false);
        }
    };

    const hexSize = 20; // The size (radius) of a hex tile
    const hexWidth = Math.sqrt(3) * hexSize;
    const hexHeight = 2 * hexSize;

    const rewardImageMap: Record<RewardType, string | undefined> = {
        DIAMOND: gameAssets.diamondImageUrl,
        GOLD: gameAssets.goldImageUrl,
        OIL: gameAssets.oilImageUrl,
        ROCK: gameAssets.rockImageUrl,
        DUST: gameAssets.dustImageUrl,
    };

    return (
        <div
            className="relative w-full h-screen bg-gray-900 text-white overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: gameAssets.backgroundUrl ? `url(${gameAssets.backgroundUrl})` : 'none' }}
        >
            {loading && (
                <div
                    ref={loadingScreenRef}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10"
                >
                    <h1 className="text-4xl font-bold mb-4">Miner Game</h1>
                    <p>Loading...</p>
                    <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mt-4">
                        <div className="h-full bg-yellow-400 w-full animate-pulse"></div>
                    </div>
                </div>
            )}

            {!loading && gameMap && (
                <div
                    ref={gameContainerRef}
                    className="w-full h-full flex flex-col"
                >
                    {/* Header */}
                    <header className="w-full p-4 bg-gray-800/50 flex justify-between items-center">
                        <div>
                            <span className="text-lg font-semibold">Balance: <span ref={balanceRef}>${balance.toLocaleString()}</span></span>
                            <span className="text-sm ml-4">(Cost: ${selectedBid})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            {bidAmounts.map(bid => (
                                <button
                                    key={bid}
                                    onClick={() => setSelectedBid(bid)}
                                    className={`px-3 py-1 text-sm rounded ${selectedBid === bid ? 'bg-yellow-500 text-gray-900 font-bold' : 'bg-gray-700 text-white'}`}
                                >
                                    ${bid}
                                </button>
                            ))}
                        </div>
                    </header>

                    {/* Game Area */}
                    <main className="flex-1 flex items-center justify-center">
                        <div className="relative">
                            {gameMap.hexes.map(hex => {
                                // Position calculation for pointy-top hex grid
                                const x = hexWidth * (hex.q + hex.r / 2);
                                const y = (hexHeight * 3 / 4) * hex.r;
                                const selectionResult = selectedHexResults.get(hex.id);

                                return (
                                    <div
                                        key={hex.id}
                                        className="absolute transition-transform duration-300 hover:scale-110"
                                        style={{
                                            left: `${x}px`,
                                            top: `${y}px`,
                                            width: `${hexWidth}px`,
                                            height: `${hexHeight}px`,
                                        }}
                                        onClick={(e) => {
                                            if (selectionResult) return;
                                            handleHexClick(hex.id);
                                            // Quick animation on the hex itself
                                            gsap.fromTo(e.currentTarget, { scale: 1 }, { scale: 0.8, yoyo: true, repeat: 1, duration: 0.2 });
                                        }}
                                    >
                                        <HexagonIcon
                                            className={`w-full h-full fill-current transition-colors cursor-pointer ${selectionResult
                                                ? 'text-gray-900 opacity-50'
                                                : 'text-gray-700 hover:text-yellow-400'
                                                }`}
                                        />
                                        {selectionResult && rewardImageMap[selectionResult.resultType] && (
                                            <div
                                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                                            >
                                                <img
                                                    src={rewardImageMap[selectionResult.resultType]}
                                                    alt={selectionResult.resultType}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </main>

                    {/* Mascot Area */}
                    {currentMascot && (
                        <div className="absolute bottom-4 right-4 w-32 h-32 transition-opacity duration-500">
                            <img src={currentMascot} alt="Mascot" className="w-full h-full object-contain" />
                        </div>
                    )}

                    {/* Footer/Actions */}
                    <footer className="w-full p-4 bg-gray-800/50 text-center">
                        <button
                            onClick={handleNewMap}
                            disabled={isProcessing}
                            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-500"
                        >
                            New Map
                        </button>
                    </footer>

                    {/* Result Toasts */}
                    <div className="absolute bottom-20 right-4 space-y-2 z-20">
                        {toasts.map(toast => (
                            <ToastItem key={toast.id} toast={toast} onRemove={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} imageUrl={rewardImageMap[toast.resultType]} />
                        ))}
                    </div>
                </div>
            )}

            {!loading && !token && (
                <div className="flex items-center justify-center h-full">
                    <p className="text-red-500">Missing partner token.</p>
                </div>
            )}

            {!loading && token && !gameMap && (
                <div className="flex items-center justify-center h-full">
                    <p className="text-red-500">Could not load game configuration.</p>
                </div>
            )}
        </div>
    );
};

const ToastItem = ({ toast, onRemove, imageUrl }: { toast: ToastMessage, onRemove: () => void, imageUrl?: string }) => {
    const toastRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (toastRef.current) {
            gsap.fromTo(toastRef.current, { opacity: 0, x: '100%' }, { opacity: 1, x: '0%', duration: 0.5, ease: 'power2.out' });
        }
        const timer = setTimeout(() => {
            if (toastRef.current) {
                gsap.to(toastRef.current, {
                    opacity: 0, x: '100%', duration: 0.5, ease: 'power2.in', onComplete: () => {
                        onRemove();
                    }
                });
            } else {
                onRemove();
            }
        }, 2500);
        return () => clearTimeout(timer);
    }, [onRemove]);

    return (
        <div ref={toastRef} className="bg-gray-800/90 p-4 rounded-lg shadow-xl flex items-center w-64 backdrop-blur-sm">
            {imageUrl && (
                <img src={imageUrl} alt={toast.resultType} className="w-12 h-12 mr-4" />
            )}
            <div>
                <h3 className="text-lg font-bold">You found {toast.resultType}!</h3>
                <p className="text-md text-yellow-400">Reward: ${toast.reward.toLocaleString()}</p>
            </div>
        </div>
    )
}

export default GamePage; 