'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { GameConfig } from '@/lib/types';
import SlotGameEngine from '@/components/game-runtime/slot-game-engine';
import { Card } from '@/components/ui/card';

interface PreviewSessionData {
  sessionId: string;
  gameId: string;
  gameConfig: GameConfig;
  expiresAt: string;
  createdAt: string;
}

export default function PreviewPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;

  const [sessionData, setSessionData] = useState<PreviewSessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    const fetchPreviewSession = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          setError('Authentication required');
          setLoading(false);
          return;
        }

        const response = await fetch(`/api/game/preview/${sessionId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Failed to load preview session');
        }

        const data = await response.json();
        setSessionData(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchPreviewSession();
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!sessionData) {
    return (
      <div className="flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600">Preview session not found</p>
        </div>
      </div>
    );
  }

  const expiresAt = new Date(sessionData.expiresAt);
  const timeRemaining = Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / 1000));
  const hoursRemaining = Math.floor(timeRemaining / 3600);
  const minutesRemaining = Math.floor((timeRemaining % 3600) / 60);

  return (
    <Card className="">
      {/* Header */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {sessionData.gameConfig.title}
              </h1>
              <p className="text-sm text-gray-500">
                Preview expires in {hoursRemaining}h {minutesRemaining}m
              </p>
            </div>

            {/* Device Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">View:</span>
              <div className="flex bg-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setDeviceMode('desktop')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${deviceMode === 'desktop'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Desktop
                </button>
                <button
                  onClick={() => setDeviceMode('mobile')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${deviceMode === 'mobile'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Mobile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Preview Container */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div
          className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${deviceMode === 'mobile'
            ? 'h-full w-auto aspect-9/16 max-w-sm' // Mobile dimensions
            : 'w-full h-auto aspect-video' // Desktop dimensions
            }`}
        >
          {/* Game Preview Area */}
          <SlotGameEngine
            gameConfig={sessionData.gameConfig}
            sessionId={sessionData.sessionId}
            initialBalance={1000}
            deviceMode={deviceMode}
            onSpin={async (bet) => {
              const mockMatrix: string[][] = [];
              for (let row = 0; row < sessionData.gameConfig.rows; row++) {
                mockMatrix[row] = [];
                for (let col = 0; col < sessionData.gameConfig.columns; col++) {
                  const randomItem = sessionData.gameConfig.slotItems[Math.floor(Math.random() * sessionData.gameConfig.slotItems.length)];
                  mockMatrix[row][col] = randomItem?.id || 'default';
                }
              }

              const isWin = Math.random() < 0.3; // 30% win chance in preview
              const winAmount = isWin ? bet * (Math.random() * 5 + 1) : 0;

              return {
                view: mockMatrix,
                bet: bet,
                isWin,
                winAmount,
                lines: isWin ? [[0, 0, 0, 1, 1]] : [], // Mock winning line
                balance: 1000 - bet + winAmount
              };
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div>
              Game ID: {sessionData.gameId}
            </div>
            <div>
              Created: {new Date(sessionData.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}