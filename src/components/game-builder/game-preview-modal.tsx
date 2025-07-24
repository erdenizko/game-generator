'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  Monitor, 
  Smartphone, 
  X, 
  Loader2, 
  AlertCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { GameConfig } from '@/lib/types';

interface GamePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameData: Partial<GameConfig>;
  isLoading?: boolean;
}

type DeviceMode = 'desktop' | 'mobile';

interface PreviewSession {
  sessionId: string;
  gameConfig: GameConfig;
  expiresAt: string;
  previewUrl: string;
}

export function GamePreviewModal({ 
  isOpen, 
  onClose, 
  gameData, 
  isLoading = false 
}: GamePreviewModalProps) {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [previewSession, setPreviewSession] = useState<PreviewSession | null>(null);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'spinning' | 'result'>('idle');
  const [mockBalance, setMockBalance] = useState(1000);
  const [currentBet, setCurrentBet] = useState(10);

  const createPreviewSession = useCallback(async () => {
    if (!gameData.id) return;
    
    setSessionLoading(true);
    setSessionError(null);
    
    try {
      const response = await fetch(`/api/game/preview?gameId=${gameData.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to create preview session');
      }

      const data = await response.json();
      setPreviewSession(data.data);
    } catch (error) {
      setSessionError(error instanceof Error ? error.message : 'Failed to create preview session');
    } finally {
      setSessionLoading(false);
    }
  }, [gameData.id]);

  // Create preview session when modal opens
  useEffect(() => {
    if (isOpen && gameData.id && !previewSession && !sessionLoading) {
      createPreviewSession();
    }
  }, [isOpen, gameData.id, previewSession, sessionLoading, createPreviewSession]);

  const handleSpin = () => {
    if (gameState !== 'idle' || mockBalance < currentBet) return;
    
    setGameState('spinning');
    setMockBalance(prev => prev - currentBet);
    
    // Simulate spin duration
    setTimeout(() => {
      // Mock win/lose logic
      const isWin = Math.random() > 0.7; // 30% win rate
      const winAmount = isWin ? currentBet * (Math.random() * 5 + 1) : 0;
      
      if (isWin) {
        setMockBalance(prev => prev + winAmount);
      }
      
      setGameState('result');
      
      // Return to idle after showing result
      setTimeout(() => {
        setGameState('idle');
      }, 2000);
    }, 2000);
  };

  const resetGame = () => {
    setGameState('idle');
    setMockBalance(1000);
    setCurrentBet(10);
  };

  const getDeviceContainerClass = () => {
    return deviceMode === 'mobile' 
      ? 'w-80 h-[600px]' 
      : 'w-full max-w-4xl h-[600px]';
  };

  const renderGamePreview = () => {
    const config = previewSession?.gameConfig || gameData;
    
    return (
      <div className="h-full bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 relative overflow-hidden">
        {/* Background Image */}
        {config.backgroundImageKey && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ 
              backgroundImage: `url(/api/assets/${config.backgroundImageKey})` 
            }}
          />
        )}
        
        {/* Game Frame */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="p-4 text-center text-white">
            <h2 className="text-2xl font-bold mb-1">{config.title}</h2>
            <p className="text-sm opacity-90">{config.description}</p>
          </div>
          
          {/* Game Area */}
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="bg-black bg-opacity-20 rounded-lg p-6 backdrop-blur-sm">
              {/* Slot Grid */}
              <div 
                className="grid gap-2 mb-6"
                style={{ 
                  gridTemplateColumns: `repeat(${config.columns || 5}, 1fr)`,
                  gridTemplateRows: `repeat(${config.rows || 3}, 1fr)`
                }}
              >
                {Array.from({ length: (config.rows || 3) * (config.columns || 5) }).map((_, index) => (
                  <div 
                    key={index}
                    className={`w-12 h-12 bg-white bg-opacity-20 rounded border-2 border-white border-opacity-30 flex items-center justify-center transition-all duration-300 ${
                      gameState === 'spinning' ? 'animate-pulse' : ''
                    }`}
                  >
                    {config.slotItems && config.slotItems.length > 0 ? (
                      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        {config.slotItems[index % config.slotItems.length]?.name?.charAt(0) || '?'}
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                        ?
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Game Status */}
              <div className="text-center text-white mb-4">
                {gameState === 'spinning' && (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Spinning...</span>
                  </div>
                )}
                {gameState === 'result' && (
                  <div className="text-yellow-300 font-bold">
                    {mockBalance >= 1000 ? 'You Win!' : 'Try Again!'}
                  </div>
                )}
                {gameState === 'idle' && (
                  <div className="text-white opacity-75">
                    Ready to spin
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="p-4 bg-black bg-opacity-20">
            <div className="flex items-center justify-between text-white text-sm mb-3">
              <div>Balance: ${mockBalance}</div>
              <div>Bet: ${currentBet}</div>
            </div>
            
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentBet(Math.max(1, currentBet - 5))}
                disabled={gameState !== 'idle'}
                className="text-white border-white hover:bg-white hover:text-black"
              >
                -$5
              </Button>
              
              <Button
                onClick={handleSpin}
                disabled={gameState !== 'idle' || mockBalance < currentBet}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8"
              >
                {gameState === 'spinning' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                SPIN
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentBet(Math.min(100, currentBet + 5))}
                disabled={gameState !== 'idle'}
                className="text-white border-white hover:bg-white hover:text-black"
              >
                +$5
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading || sessionLoading) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">
              {isLoading ? 'Loading game data...' : 'Creating preview session...'}
            </p>
          </div>
        </div>
      );
    }

    if (sessionError) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-4" />
            <p className="text-destructive mb-4">{sessionError}</p>
            <Button onClick={createPreviewSession} variant="outline">
              Retry
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Device Toggle Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Preview Mode:</span>
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={deviceMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDeviceMode('desktop')}
                className="h-8"
              >
                <Monitor className="w-4 h-4 mr-2" />
                Desktop
              </Button>
              <Button
                variant={deviceMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDeviceMode('mobile')}
                className="h-8"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile
              </Button>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={resetGame}
            className="h-8"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Game Preview Container */}
        <div className="flex justify-center">
          <div 
            className={`${getDeviceContainerClass()} bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300`}
          >
            {renderGamePreview()}
          </div>
        </div>

        {/* Game Info */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-medium mb-2">Game Configuration</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Grid Size:</span>
              <span className="ml-2">{gameData.rows || 3} × {gameData.columns || 5}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Slot Items:</span>
              <span className="ml-2">{gameData.slotItems?.length || 0}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Languages:</span>
              <span className="ml-2">{gameData.availableLanguages?.length || 0}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Regions:</span>
              <span className="ml-2">{gameData.availableRegions?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Game Preview: {gameData.title || 'Untitled Game'}</span>
            <DialogClose asChild>
              <Button variant="ghost" size="sm">
                <X className="w-4 h-4" />
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}