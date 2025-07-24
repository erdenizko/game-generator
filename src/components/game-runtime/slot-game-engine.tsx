'use client';

import { GameConfig, SpinResult } from '@/lib/types';
import MobileGameRenderer from './GameRenderer/mobile';
import DesktopGameRenderer from './GameRenderer/desktop';

interface SlotGameEngineProps {
  gameConfig: GameConfig;
  sessionId: string;
  deviceMode: 'desktop' | 'mobile';
  onSpin?: (bet: number) => Promise<SpinResult>;
  onBalanceUpdate?: (balance: number) => void;
  initialBalance?: number;
}

export default function SlotGameEngine({
  gameConfig,
  deviceMode,
  sessionId,
  onSpin,
  onBalanceUpdate,
  initialBalance = 1000,
}: SlotGameEngineProps) {
  if (deviceMode === 'mobile') {
    return (
      <MobileGameRenderer
        gameConfig={gameConfig}
        sessionId={sessionId}
        onSpin={onSpin}
        onBalanceUpdate={onBalanceUpdate}
        initialBalance={initialBalance}
      />
    );
  }

  return (
    <DesktopGameRenderer
      gameConfig={gameConfig}
      sessionId={sessionId}
      onSpin={onSpin}
      onBalanceUpdate={onBalanceUpdate}
      initialBalance={initialBalance}
    />
  );
}