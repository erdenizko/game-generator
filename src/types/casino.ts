export type GameType = 'HEXAGON_MINING' | 'CASINO_WHEEL' | 'SLOT_MACHINE';

export type PrizeType = 'DUST' | 'ROCK' | 'OIL' | 'GOLD' | 'DIAMOND';

export interface CasinoGameSession {
    id: string;
    playerIdentifier: string;
    wallet: number;
    spinsRemaining: number;
    gameType: GameType;
}

export interface SpinResult {
    prizeType: PrizeType;
    reward: number;
    multiplier: number;
}

export interface WheelSegment {
    id: string;
    label: string;
    color: string;
    probability: number;
    multiplier: number;
    prizeType: PrizeType;
}

export interface WheelConfig {
    segments: WheelSegment[];
    speed: number;
    duration: number;
}

export interface SlotSymbol {
    id: string;
    name: string;
    imageUrl: string;
    weight: number;
    value: number;
}

export interface SlotReel {
    id: string;
    symbols: SlotSymbol[];
    position: number;
}

export interface SlotPayline {
    id: string;
    name: string;
    positions: number[];
    multiplier: number;
}

export interface SlotConfig {
    reels: SlotReel[];
    symbols: SlotSymbol[];
    paylines: SlotPayline[];
    autoSpin: boolean;
}

export interface CasinoGameConfig {
    id: string;
    name: string;
    gameType: GameType;
    backgroundUrl?: string;
    defaultBet: number;
    betAmounts: number[];
    spinsPerSession: number;
    wallet: number;
    
    // Prize assets
    prizeImages: Record<PrizeType, string>;
    
    // Sound assets
    winSoundUrl?: string;
    loseSoundUrl?: string;
    
    // Mascot assets
    mascotImageUrl?: string;
    mascotOnWinImageUrl?: string;
    mascotOnLoseImageUrl?: string;
    
    // Prize probabilities
    prizeProbabilities: Record<PrizeType, number>;
    
    // Prize multipliers
    prizeMultipliers: Record<PrizeType, number>;
    
    // Game-specific configs
    wheelConfig?: WheelConfig;
    slotConfig?: SlotConfig;
}