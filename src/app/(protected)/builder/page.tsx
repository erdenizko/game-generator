'use client';

import { useState, Suspense, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { SimpleGameForm } from '@/components/game-builder/simple-game-form';
import type { GameFormData } from '@/components/game-builder/simple-game-form';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { GameConfig, ApiResponse, SlotItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

// Utility function to generate dummy slot items
const generateDummySlotItems = (): SlotItem[] => {
  const dummyItems = [
    {
      id: 'dummy-1',
      name: 'Cherry',
      imageKey: 'cherry.png',
      probability: 0.3,
      revenue: 10,
      minimumCount: 1,
      diagonalPrize: true,
      orderIndex: 1,
      category: 'fruit',
      tags: ['fruit', 'cherry'],
      isCustom: false,
    },
    {
      id: 'dummy-2',
      name: 'Banana',
      imageKey: 'banana.png',
      probability: 0.25,
      revenue: 15,
      minimumCount: 1,
      diagonalPrize: true,
      orderIndex: 2,
      category: 'fruit',
      tags: ['fruit', 'banana'],
      isCustom: false,
    },
    {
      id: 'dummy-3',
      name: 'Seven',
      imageKey: 'seven.png',
      probability: 0.15,
      revenue: 50,
      minimumCount: 1,
      diagonalPrize: true,
      orderIndex: 3,
      category: 'symbol',
      tags: ['symbol', 'seven'],
      isCustom: false,
    },
  ];
  return dummyItems;
};

// Create initial draft game data
const createInitialDraftGame = (): GameFormData => {
  return {
    id: '',
    title: 'My New Slot Game (Draft)',
    description: 'A new slot game waiting to be designed',
    rows: 3,
    columns: 3,
    coverImageKey: '',
    backgroundImageKey: '',
    frameImageKey: '',
    sounds: {},
    mascot: { enabled: false },
    styling: {},
    slotItems: generateDummySlotItems(),
    availableLanguages: [{ locale: 'en', strings: {} }],
    availableRegions: [{ country: 'USA', currency: 'USD', minBet: 1, maxBet: 100, step: 1 }],
    blockedRegions: [],
    isPublished: false,
  };
};

function GameBuilderContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [draftGameId, setDraftGameId] = useState<string | null>(null);

  // Use refs to track if operations have been initiated
  const draftCreationInitiated = useRef(false);
  const previewCreationInitiated = useRef(false);

  const editGameId = searchParams.get('gameId');
  const duplicateGameId = searchParams.get('duplicate');
  const createNew = searchParams.get('create');
  const gameId = editGameId ?? duplicateGameId;
  const mode = editGameId ? 'edit' : duplicateGameId ? 'duplicate' : createNew ? 'create' : 'create';

  // Create draft game mutation
  const createDraftMutation = useMutation<string, Error>({
    mutationFn: async () => {
      const draftData = createInitialDraftGame();
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(draftData),
      });
      const result: ApiResponse<GameConfig> = await response.json();
      if (!response.ok || !result.success || !result.data?.id) {
        console.log('Failed to create draft game:', result);
        throw new Error(result.error?.message || 'Failed to create draft game');
      }
      console.log('Draft game created successfully with ID:', result.data.id);
      return result.data.id;
    },
    onSuccess: (gameId) => {
      console.log('ONSUCCESS: Draft game created successfully with ID:', gameId);
      setDraftGameId(gameId);
      router.replace(`/builder?gameId=${gameId}`);
      createDraftMutation.reset();
    },
    onError: (err) => {
      console.error('Failed to create draft game:', err);
      setError(err.message);
      // Reset the flag so user can retry
      draftCreationInitiated.current = false;
    },
  });

  // Load game data
  const { data: rawData, error: queryError, isLoading: loadingInitialData } = useQuery<GameConfig>({
    queryKey: ['game', gameId ?? draftGameId],
    queryFn: async () => {
      const targetGameId = gameId ?? draftGameId;
      if (!targetGameId) throw new Error('No game ID');

      const response = await fetch(`/api/games/${targetGameId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` },
      });
      if (!response.ok) throw new Error('Failed to load game data');
      const data: ApiResponse<GameConfig> = await response.json();
      if (!data.success || !data.data) throw new Error(data.error?.message || 'Failed to load game data');

      if (mode === 'duplicate') {
        return {
          ...data.data,
          id: undefined,
          title: `${data.data.title} (Copy)`,
          createdAt: undefined,
          updatedAt: undefined,
        };
      }
      return data.data;
    },
    enabled: !!(gameId ?? draftGameId),
    refetchOnWindowFocus: false,
  });

  const initialData = rawData as GameConfig;

  const saveMutation = useMutation<void, Error, GameFormData>({
    mutationFn: async (formData) => {
      const url = mode === 'edit' && editGameId ? `/api/games/${editGameId}` : '/api/games';
      const method = mode === 'edit' ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(formData),
      });
      const result: ApiResponse = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error?.message || 'Failed to save game');
    },
    onSuccess: () => router.push('/games'),
    onError: (err) => setError(err.message),
  });

  const previewMutation = useMutation<string, Error, GameFormData>({
    mutationFn: async (formData) => {
      const targetGameId = editGameId ?? draftGameId;
      if (targetGameId) {
        const response = await fetch(`/api/game/preview?gameId=${targetGameId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` },
        });
        if (!response.ok) throw new Error('Failed to create preview');
        const result = await response.json();
        if (!result.success || !result.data?.sessionId) {
          throw new Error(result.error?.message || 'No preview session ID returned');
        }
        return result.data.sessionId;
      }

      // Fallback for when no game ID exists
      const tempData = { ...formData, title: `${formData.title} (Preview)`, isPreview: true };
      const saveRes = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify(tempData),
      });
      if (!saveRes.ok) throw new Error('Failed to create temporary game for preview');
      const saveResult: ApiResponse<GameConfig> = await saveRes.json();
      if (!saveResult.success || !saveResult.data?.id) {
        throw new Error(saveResult.error?.message || 'Failed to create temporary game');
      }
      const sessionRes = await fetch(`/api/game/preview?gameId=${saveResult.data.id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` },
      });
      if (!sessionRes.ok) throw new Error('Failed to create preview session');
      const sessionResult = await sessionRes.json();
      if (!sessionResult.success || !sessionResult.data?.sessionId) {
        throw new Error(sessionResult.error?.message || 'No preview session ID returned');
      }
      return sessionResult.data.sessionId;
    },
    onError: (err) => setError(err.message),
  });

  const handleSave = async (formData: GameFormData): Promise<void> => {
    setError(null);
    await saveMutation.mutateAsync(formData);
  };

  const handlePreview = async (formData: GameFormData): Promise<void> => {
    setError(null);
    await previewMutation.mutateAsync(formData);
  };

  // Create draft game when creating a new game - only once
  useEffect(() => {
    if (mode === 'create' && !gameId && !draftGameId && !draftCreationInitiated.current && !createDraftMutation.isPending) {
      draftCreationInitiated.current = true;
      createDraftMutation.mutate();
    }
  }, [mode, gameId, draftGameId]);



  // Create preview session when initial data is available - only once
  useEffect(() => {
    if (initialData && !previewCreationInitiated.current && !previewMutation.isPending && !previewMutation.data) {
      const targetGameId = editGameId ?? draftGameId;
      if (targetGameId) {
        previewCreationInitiated.current = true;
        previewMutation.mutateAsync({
          ...initialData,
          id: targetGameId,
          title: initialData.title,
        } as unknown as GameFormData);
      }
    }
  }, [initialData, editGameId, draftGameId]);

  const isSaveLoading = saveMutation.status === 'pending';
  const isPreviewLoading = previewMutation.status === 'pending';
  const isCreatingDraft = createDraftMutation.status === 'pending';

  // Show loading state when creating draft or loading initial data
  // Also show loading when we have a draft ID but no data yet (transition state)
  const shouldShowLoading = isCreatingDraft || loadingInitialData || (draftGameId && !rawData);

  if (shouldShowLoading) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center">
          <Card className="w-96">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <h1>{createDraftMutation.isPending ? 'true' : 'false'}</h1>
                <span>
                  {isCreatingDraft
                    ? 'Creating draft game...'
                    : draftGameId && !rawData
                      ? 'Loading draft game...'
                      : 'Loading game data...'
                  }
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    );
  }

  if (queryError || error) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center">
          <Card className="w-96">
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-2">Error Loading Game</h2>
                <p className="text-red-600 mb-4">{queryError?.message || error}</p>
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
      <SimpleGameForm
        initialData={
          initialData
            ? {
              id: initialData.id ?? '',
              title: initialData.title,
              description: initialData.description,
              rows: initialData.rows,
              columns: initialData.columns,
              coverImageKey: initialData.coverImageKey,
              backgroundImageKey: initialData.backgroundImageKey,
              frameImageKey: initialData.frameImageKey,
              sounds: initialData.sounds,
              mascot: initialData.mascot,
              styling: initialData.styling,
              slotItems: initialData.slotItems,
              availableLanguages: initialData.availableLanguages,
              availableRegions: initialData.availableRegions,
              blockedRegions: initialData.blockedRegions,
              isPublished: initialData.isPublished ?? false,
              createdAt: initialData.createdAt?.toString() ?? '',
              updatedAt: initialData.updatedAt?.toString() ?? '',
            }
            : mode === 'create' ? createInitialDraftGame() : undefined
        }
        onSave={handleSave}
        onPreview={handlePreview}
        onDelete={mode === 'edit' && editGameId ? async () => {
          if (confirm('Are you sure you want to delete this game?')) {
            try {
              const response = await fetch(`/api/games/${editGameId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` },
              });
              if (!response.ok) throw new Error('Failed to delete game');
              router.push('/games');
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Failed to delete game');
            }
          }
        } : undefined}
        isLoading={isSaveLoading}
        isPreviewLoading={isPreviewLoading}
        mode={mode}
        sessionId={previewMutation.data ?? null}
        error={error}
      />
    </ProtectedRoute>
  );
}

export default function GameBuilderPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <GameBuilderContent />
    </Suspense>
  );
}