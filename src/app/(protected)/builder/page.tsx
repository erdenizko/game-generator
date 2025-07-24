'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SimpleGameForm } from '@/components/game-builder/simple-game-form';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { GameConfig, ApiResponse } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface GameFormData {
  title: string;
  description: string;
  rows: number;
  columns: number;
  coverImageKey: string;
  backgroundImageKey: string;
  frameImageKey: string;
  sounds: {
    spin?: string;
    click?: string;
    win?: string;
    lose?: string;
    backgroundMusic?: string;
  };
  mascot: {
    enabled: boolean;
    startFile?: string;
    spinFile?: string;
    loseFile?: string;
    winFile?: string;
    idleFile?: string;
  };
  styling: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
    buttonStyle?: string;
  };
  slotItems: {
    id?: string;
    name: string;
    imageKey: string;
    probability: number;
    revenue?: number;
    minimumCount?: number;
    diagonalPrize?: boolean;
  }[];
}

function GameBuilderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [initialData, setInitialData] = useState<GameConfig | null>(null);
  const [loadingInitialData, setLoadingInitialData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editGameId = searchParams.get('edit');
  const duplicateGameId = searchParams.get('duplicate');
  const gameId = editGameId || duplicateGameId;
  const mode = editGameId ? 'edit' : duplicateGameId ? 'duplicate' : 'create';

  // Load game data for edit or duplicate mode
  useEffect(() => {
    if (gameId) {
      console.log(gameId)
      const loadGameData = async (id: string) => {
        try {
          setLoadingInitialData(true);
          setError(null);

          const response = await fetch(`/api/games/${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to load game data');
          }

          const data: ApiResponse<GameConfig> = await response.json();

          if (data.success && data.data) {
            let gameData = data.data;

            // For duplicate mode, clear the ID and modify the title
            if (mode === 'duplicate') {
              gameData = {
                ...gameData,
                id: undefined,
                title: `${gameData.title} (Copy)`,
                createdAt: undefined,
                updatedAt: undefined,
              };
            }
            console.log(gameData);
            setInitialData(gameData);
          } else {
            throw new Error(data.error?.message || 'Failed to load game data');
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoadingInitialData(false);
        }
      };
      loadGameData(gameId);
    }
  }, [gameId, mode]);

  const handleSave = async (data: GameFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = mode === 'edit' && editGameId ? `/api/games/${editGameId}` : '/api/games';
      const method = mode === 'edit' ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await response.json();

      if (!response.ok || !result.success) {
        const errorMessage = result.error?.message || 'Failed to save game';
        setError(errorMessage);
        return;
      }

      // Redirect to games list on success
      router.push('/games');
    } catch (error) {
      console.error('Failed to save game:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = async (data: GameFormData) => {
    setIsPreviewLoading(true);
    setError(null);
    try {
      // For existing games, we can use the game/preview endpoint
      if (mode === 'edit' && editGameId) {
        // Use the GET endpoint for existing games
        const response = await fetch(`/api/game/preview?gameId=${editGameId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to create preview');
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error?.message || 'Failed to create preview');
        }

        // Navigate to the preview page with the session ID
        if (result.data?.sessionId) {
          router.push(`/preview/${result.data.sessionId}`);
        } else {
          throw new Error('No preview session ID returned');
        }
      } else {
        // For new games or duplicates, we need to save temporarily first
        // First, save the current game data as a temporary game
        const tempData = {
          ...data,
          title: `${data.title} (Preview)`,
          isPreview: true
        };

        // Create a temporary game
        const saveResponse = await fetch('/api/games', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          },
          body: JSON.stringify(tempData),
        });

        if (!saveResponse.ok) {
          throw new Error('Failed to create temporary game for preview');
        }

        const saveResult = await saveResponse.json();

        if (!saveResult.success || !saveResult.data?.id) {
          throw new Error(saveResult.error?.message || 'Failed to create temporary game');
        }

        // Now create a preview session with the temporary game ID
        const tempGameId = saveResult.data.id;
        const previewResponse = await fetch(`/api/game/preview?gameId=${tempGameId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          }
        });

        if (!previewResponse.ok) {
          throw new Error('Failed to create preview session');
        }

        const previewResult = await previewResponse.json();

        if (!previewResult.success) {
          throw new Error(previewResult.error?.message || 'Failed to create preview session');
        }

        // Navigate to the preview page with the session ID
        if (previewResult.data?.sessionId) {
          router.push(`/preview/${previewResult.data.sessionId}`);
        } else {
          throw new Error('No preview session ID returned');
        }
      }
    } catch (error) {
      console.error('Failed to create preview:', error);
      setError(error instanceof Error ? error.message : 'Failed to create preview');
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const getPageTitle = () => {
    switch (mode) {
      case 'edit':
        return 'Edit Game';
      case 'duplicate':
        return 'Duplicate Game';
      default:
        return 'Create New Game';
    }
  };

  if (loadingInitialData) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center">
          <Card className="w-96">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Loading game data...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center">
          <Card className="w-96">
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-2">Error Loading Game</h2>
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => router.push('/games')}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Back to Games
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="">
        <div className="container mx-auto py-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{getPageTitle()}</h1>
            {mode === 'edit' && initialData && (
              <p className="text-muted-foreground">
                Editing: {initialData.title}
              </p>
            )}
            {mode === 'duplicate' && initialData && (
              <p className="text-muted-foreground">
                Creating a copy of: {initialData.title.replace(' (Copy)', '')}
              </p>
            )}
          </div>

          <SimpleGameForm
            initialData={initialData || undefined}
            onSave={handleSave}
            onPreview={handlePreview}
            isLoading={isLoading}
            isPreviewLoading={isPreviewLoading}
            mode={mode}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default function GameBuilderPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <GameBuilderContent />
    </Suspense>
  );
}