'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import axios from 'axios';
import CasinoWheel from './CasinoWheel';
import SlotMachine from './SlotMachine';
import { GameType, CasinoGameConfig, SpinResult, WheelSegment, SlotSymbol, SlotReel, SlotPayline } from '@/types/casino';

interface GameInitResponse {
    sessionId: string;
    partner: { name: string };
    gameConfig: CasinoGameConfig;
}

interface ToastMessage extends SpinResult {
    id: number;
}

const UniversalGameInterface = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const isPreview = searchParams.get('preview') === 'true';

    const [loading, setLoading] = useState(true);
    const [gameConfig, setGameConfig] = useState<CasinoGameConfig | null>(null);
    const [wallet, setWallet] = useState(0);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [toasts, setToasts] = useState<ToastMessage[]>([]);
    const [isSpinning, setIsSpinning] = useState(false);
    const [currentMascot, setCurrentMascot] = useState<string | null>(null);
    const [selectedBet, setSelectedBet] = useState<number>(0);
    const [spinsRemaining, setSpinsRemaining] = useState(0);

    const loadingScreenRef = useRef<HTMLDivElement>(null);
    const gameContainerRef = useRef<HTMLDivElement>(null);
    const walletRef = useRef<HTMLSpanElement>(null);
    const mascotTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const winSoundRef = useRef<HTMLAudioElement | null>(null);
    const loseSoundRef = useRef<HTMLAudioElement | null>(null);

    const getPreviewConfig = (): CasinoGameConfig => {
        const gameType = (searchParams.get('gameType') as GameType) ?? 'HEXAGON_MINING';
        
        const baseConfig: CasinoGameConfig = {
            id: 'preview',
            name: 'Preview Game',
            gameType,
            backgroundUrl: searchParams.get('backgroundUrl') ?? undefined,
            defaultBet: Number(searchParams.get('defaultBet') ?? 100),
            betAmounts: (searchParams.get('betAmounts') ?? '50,100,200,500').split(',').map(Number),
            spinsPerSession: Number(searchParams.get('spinsPerSession') ?? 10),
            wallet: Number(searchParams.get('wallet') ?? 10000),
            prizeImages: {
                DUST: searchParams.get('dustImageUrl') ?? '/default-dust.png',
                ROCK: searchParams.get('rockImageUrl') ?? '/default-rock.png',
                OIL: searchParams.get('oilImageUrl') ?? '/default-oil.png',
                GOLD: searchParams.get('goldImageUrl') ?? '/default-gold.png',
                DIAMOND: searchParams.get('diamondImageUrl') ?? '/default-diamond.png',
            },
            winSoundUrl: searchParams.get('winSoundUrl') ?? undefined,
            loseSoundUrl: searchParams.get('loseSoundUrl') ?? undefined,
            mascotImageUrl: searchParams.get('mascotImageUrl') ?? undefined,
            mascotOnWinImageUrl: searchParams.get('mascotOnWinImageUrl') ?? undefined,
            mascotOnLoseImageUrl: searchParams.get('mascotOnLoseImageUrl') ?? undefined,
            prizeProbabilities: {
                DUST: Number(searchParams.get('probDust') ?? 40),
                ROCK: Number(searchParams.get('probRock') ?? 30),
                OIL: Number(searchParams.get('probOil') ?? 15),
                GOLD: Number(searchParams.get('probGold') ?? 10),
                DIAMOND: Number(searchParams.get('probDiamond') ?? 5),
            },
            prizeMultipliers: {
                DUST: 0,
                ROCK: 1,
                OIL: Number(searchParams.get('multOil') ?? 1.5),
                GOLD: Number(searchParams.get('multGold') ?? 2),
                DIAMOND: Number(searchParams.get('multDiamond') ?? 5),
            }
        };

        // Add game-specific configurations
        if (gameType === 'CASINO_WHEEL') {
            const wheelSegments: WheelSegment[] = [
                { id: '1', label: 'DUST', color: '#8B4513', probability: 40, multiplier: 0, prizeType: 'DUST' },
                { id: '2', label: 'ROCK', color: '#696969', probability: 30, multiplier: 1, prizeType: 'ROCK' },
                { id: '3', label: 'OIL', color: '#000000', probability: 15, multiplier: 1.5, prizeType: 'OIL' },
                { id: '4', label: 'GOLD', color: '#FFD700', probability: 10, multiplier: 2, prizeType: 'GOLD' },
                { id: '5', label: 'DIAMOND', color: '#4169E1', probability: 5, multiplier: 5, prizeType: 'DIAMOND' },
            ];
            
            baseConfig.wheelConfig = {
                segments: wheelSegments,
                speed: Number(searchParams.get('wheelSpeed') ?? 3),
                duration: Number(searchParams.get('wheelDuration') ?? 4000),
            };
        } else if (gameType === 'SLOT_MACHINE') {
            const symbols: SlotSymbol[] = [
                { id: 'dust', name: 'DUST', imageUrl: baseConfig.prizeImages.DUST, weight: 40, value: 0 },
                { id: 'rock', name: 'ROCK', imageUrl: baseConfig.prizeImages.ROCK, weight: 30, value: 1 },
                { id: 'oil', name: 'OIL', imageUrl: baseConfig.prizeImages.OIL, weight: 15, value: 1.5 },
                { id: 'gold', name: 'GOLD', imageUrl: baseConfig.prizeImages.GOLD, weight: 10, value: 2 },
                { id: 'diamond', name: 'DIAMOND', imageUrl: baseConfig.prizeImages.DIAMOND, weight: 5, value: 5 },
            ];

            const reels: SlotReel[] = [
                { id: 'reel1', symbols, position: 0 },
                { id: 'reel2', symbols, position: 0 },
                { id: 'reel3', symbols, position: 0 },
            ];

            const paylines: SlotPayline[] = [
                { id: 'line1', name: 'Center Line', positions: [0, 1, 2], multiplier: 1 },
            ];

            baseConfig.slotConfig = {
                reels,
                symbols,
                paylines,
                autoSpin: false,
            };
        }

        return baseConfig;
    };

    useEffect(() => {
        if (isPreview) {
            const previewConfig = getPreviewConfig();
            setGameConfig(previewConfig);
            setCurrentMascot(previewConfig.mascotImageUrl || null);
            setSelectedBet(previewConfig.defaultBet || previewConfig.betAmounts[0] || 0);
            setWallet(previewConfig.wallet);
            setSpinsRemaining(previewConfig.spinsPerSession);
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
                    const response = await axios.post<GameInitResponse>('/api/partner/init', {
                        token,
                        username: 'player123',
                        currentBalance: 10000,
                        currency: 'USD',
                    });

                    const { sessionId, gameConfig } = response.data;
                    setSessionId(sessionId);
                    setGameConfig(gameConfig);
                    setWallet(gameConfig.wallet);
                    setCurrentMascot(gameConfig.mascotImageUrl || null);
                    setSelectedBet(gameConfig.defaultBet || gameConfig.betAmounts[0] || 0);
                    setSpinsRemaining(gameConfig.spinsPerSession);

                    if (gameConfig.winSoundUrl) {
                        winSoundRef.current = new Audio(gameConfig.winSoundUrl);
                    }
                    if (gameConfig.loseSoundUrl) {
                        loseSoundRef.current = new Audio(gameConfig.loseSoundUrl);
                    }

                } catch (error) {
                    console.error('Failed to initialize session:', error);
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

    const handleNewSession = async () => {
        if (!sessionId || isSpinning) return;

        setIsSpinning(true);
        try {
            const response = await axios.post('/api/game/end-round', { sessionId });
            if (gameConfig) {
                setSpinsRemaining(gameConfig.spinsPerSession);
                setWallet(gameConfig.wallet);
            }
        } catch (error) {
            console.error('Failed to start a new session:', error);
        } finally {
            setIsSpinning(false);
        }
    };

    const handleSpin = async (result: SpinResult) => {
        const cost = selectedBet;
        const newWallet = wallet - cost + result.reward;
        setWallet(newWallet);
        setSpinsRemaining(prev => prev - 1);

        const newToast = { id: Date.now(), ...result };
        setToasts([newToast]);

        // Animate wallet change
        if (walletRef.current) {
            gsap.to(walletRef.current, {
                scale: result.reward > 0 ? 1.1 : 0.9,
                color: result.reward > 0 ? '#34d399' : '#ef4444',
                duration: 0.2,
                onComplete: () => {
                    gsap.to(walletRef.current, { scale: 1, color: '#ffffff', duration: 0.2 })
                }
            });
        }

        // Play sound and update mascot
        if (result.reward > 0) {
            winSoundRef.current?.play();
            if (gameConfig?.mascotOnWinImageUrl) {
                setCurrentMascot(gameConfig.mascotOnWinImageUrl);
                if (mascotTimeoutRef.current) clearTimeout(mascotTimeoutRef.current);
                mascotTimeoutRef.current = setTimeout(() => {
                    setCurrentMascot(gameConfig?.mascotImageUrl || null);
                }, 2000);
            }
        } else {
            loseSoundRef.current?.play();
            if (gameConfig?.mascotOnLoseImageUrl) {
                setCurrentMascot(gameConfig.mascotOnLoseImageUrl);
                if (mascotTimeoutRef.current) clearTimeout(mascotTimeoutRef.current);
                mascotTimeoutRef.current = setTimeout(() => {
                    setCurrentMascot(gameConfig?.mascotImageUrl || null);
                }, 2000);
            }
        }

        setIsSpinning(false);
    };

    const renderGame = () => {
        if (!gameConfig) return null;

        switch (gameConfig.gameType) {
            case 'CASINO_WHEEL':
                return gameConfig.wheelConfig ? (
                    <CasinoWheel
                        wheelConfig={gameConfig.wheelConfig}
                        onSpin={handleSpin}
                        isSpinning={isSpinning}
                        wallet={wallet}
                        selectedBet={selectedBet}
                        disabled={spinsRemaining <= 0}
                    />
                ) : <div className="text-red-500">Invalid wheel configuration</div>;

            case 'SLOT_MACHINE':
                return gameConfig.slotConfig ? (
                    <SlotMachine
                        slotConfig={gameConfig.slotConfig}
                        onSpin={handleSpin}
                        isSpinning={isSpinning}
                        wallet={wallet}
                        selectedBet={selectedBet}
                        disabled={spinsRemaining <= 0}
                    />
                ) : <div className="text-red-500">Invalid slot configuration</div>;

            case 'HEXAGON_MINING':
            default:
                return <div className="text-yellow-500">Legacy hexagon mining game - not yet converted</div>;
        }
    };

    return (
        <div
            className="relative w-full h-screen bg-gray-900 text-white overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: gameConfig?.backgroundUrl ? `url(${gameConfig.backgroundUrl})` : 'none' }}
        >
            {loading && (
                <div
                    ref={loadingScreenRef}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10"
                >
                    <h1 className="text-4xl font-bold mb-4">Casino Game</h1>
                    <p>Loading...</p>
                    <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mt-4">
                        <div className="h-full bg-yellow-400 w-full animate-pulse"></div>
                    </div>
                </div>
            )}

            {!loading && gameConfig && (
                <div
                    ref={gameContainerRef}
                    className="w-full h-full flex flex-col"
                >
                    {/* Header */}
                    <header className="w-full p-4 bg-gray-800/50 flex justify-between items-center">
                        <div className="flex items-center space-x-6">
                            <span className="text-lg font-semibold">
                                Wallet: <span ref={walletRef}>{wallet.toLocaleString()} Credits</span>
                            </span>
                            <span className="text-sm">
                                Spins Left: <span className="text-yellow-400 font-bold">{spinsRemaining}</span>
                            </span>
                            <span className="text-sm">
                                Bet: <span className="text-green-400 font-bold">{selectedBet} Credits</span>
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            {gameConfig.betAmounts.map(bet => (
                                <button
                                    key={bet}
                                    onClick={() => setSelectedBet(bet)}
                                    className={`px-3 py-1 text-sm rounded transition-all ${
                                        selectedBet === bet 
                                            ? 'bg-yellow-500 text-gray-900 font-bold' 
                                            : 'bg-gray-700 text-white hover:bg-gray-600'
                                    }`}
                                >
                                    {bet}
                                </button>
                            ))}
                        </div>
                    </header>

                    {/* Game Area */}
                    <main className="flex-1 flex items-center justify-center">
                        {renderGame()}
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
                            onClick={handleNewSession}
                            disabled={isSpinning || spinsRemaining > 0}
                            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-500"
                        >
                            {spinsRemaining > 0 ? `${spinsRemaining} Spins Remaining` : 'New Session'}
                        </button>
                    </footer>

                    {/* Result Toasts */}
                    <div className="absolute bottom-20 right-4 space-y-2 z-20">
                        {toasts.map(toast => (
                            <ToastItem 
                                key={toast.id} 
                                toast={toast} 
                                onRemove={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} 
                            />
                        ))}
                    </div>
                </div>
            )}

            {!loading && !token && (
                <div className="flex items-center justify-center h-full">
                    <p className="text-red-500">Missing partner token.</p>
                </div>
            )}

            {!loading && token && !gameConfig && (
                <div className="flex items-center justify-center h-full">
                    <p className="text-red-500">Could not load game configuration.</p>
                </div>
            )}
        </div>
    );
};

const ToastItem = ({ toast, onRemove }: { toast: ToastMessage, onRemove: () => void }) => {
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
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [onRemove]);

    return (
        <div
            ref={toastRef}
            className={`p-3 rounded-lg shadow-lg text-white font-semibold ${
                toast.reward > 0 ? 'bg-green-600' : 'bg-red-600'
            }`}
        >
            <div className="flex items-center space-x-2">
                <span className="capitalize">{toast.prizeType.toLowerCase()}</span>
                <span>{toast.reward > 0 ? `+${toast.reward}` : 'No Win'}</span>
                {toast.multiplier > 0 && <span className="text-yellow-300">({toast.multiplier}x)</span>}
            </div>
        </div>
    );
};

export default UniversalGameInterface;