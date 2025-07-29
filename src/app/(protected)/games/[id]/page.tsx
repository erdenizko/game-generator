'use client';

import { Suspense } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useSearchParams, useRouter, notFound } from 'next/navigation';
import { SimpleGameForm } from '@/components/game-builder/simple-game-form';
import type { GameFormData } from '@/components/game-builder/simple-game-form';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { ApiResponse, SlotItem, EditGameConfig } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import Header from '@/components/layout/header';

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

function GameBuilderPage({ id }: { id: string }) {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const gameIdFromParams = id;
  console.log('gameIdFromParams', gameIdFromParams);
  const duplicateGameId = searchParams.get('duplicate');

  const isNewGame = gameIdFromParams === 'new';
  const gameId = isNewGame ? null : (duplicateGameId || gameIdFromParams);
  const mode = isNewGame ? 'create' : (duplicateGameId ? 'duplicate' : 'edit');

  // Mutation to create a new draft game
  const createDraftMutation = useMutation<EditGameConfig, Error>({
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
      const result: ApiResponse<EditGameConfig> = await response.json();
      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.error?.message || 'Failed to create draft game');
      }
      return result.data;
    },
    onSuccess: (newGame: EditGameConfig) => {
      router.replace(`/games/${newGame.id}`);
    },
    onError: (err) => {
      console.error('Failed to create draft game:', err);
      // Optionally, show an error message to the user
    },
  });

  // Query to fetch game data
  const { data: gameData, isLoading, error } = useQuery<EditGameConfig>({
    queryKey: ['game', gameId],
    queryFn: async () => {
      const response = await fetch(`/api/games/${gameId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` },
      });
      if (!response.ok) throw new Error('Failed to load game data');
      const data: ApiResponse<EditGameConfig> = await response.json();
      if (!data.success || !data.data) throw new Error(data.error?.message || 'Failed to load game data');
      return data.data;
    },
    enabled: !!gameId, // Only enable query if gameId is available
    refetchOnWindowFocus: false,
  });

  // Handle 'new' game creation
  if (isNewGame && !createDraftMutation.isPending && !createDraftMutation.isSuccess) {
    createDraftMutation.mutate();
  }

  // Determine what data to pass to SimpleGameForm
  let initialFormData: EditGameConfig | undefined;
  if (isNewGame && createDraftMutation.data) {
    initialFormData = {
      ...createDraftMutation.data,
      createdAt: new Date(createDraftMutation.data.createdAt).toISOString(),
      updatedAt: new Date(createDraftMutation.data.updatedAt).toISOString(),
    } as EditGameConfig;
  } else if (!isNewGame && gameData) {
    console.log('gameData', gameData);
    initialFormData = gameData;
  }

  // Loading states
  if (isLoading || createDraftMutation.isPending || (isNewGame && !createDraftMutation.data)) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-96">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>
                  {isNewGame && createDraftMutation.isPending
                    ? 'Creating new game draft...'
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

  // Error states
  if (error || createDraftMutation.isError) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center min-h-screen">
          <Card className="w-96">
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-2">Error</h2>
                <p className="text-red-600 mb-4">{error?.message || createDraftMutation.error?.message || 'An unexpected error occurred.'}</p>
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

  // If not new game and no data, then not found
  if (!isNewGame && !initialFormData) {
    notFound();
  }

  // Render the form
  return (
    <ProtectedRoute>
      <Header
        title={isNewGame ? 'Create Your Game' : 'Edit Your Game'}
        description="When you save your game, your changes will apply to all future versions"
      />
      {initialFormData && (
        <SimpleGameForm
          initialData={initialFormData}
          mode={mode}
        />
      )}
    </ProtectedRoute>
  );
}

export default function GameBuilderPageContent() {
  const params = useParams();
  const id = params.id as string;
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <GameBuilderPage id={id} />
    </Suspense>
  );
}