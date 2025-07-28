'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { GameConfig } from '@/lib/types';

interface InlineGamePreviewProps {
    gameData: GameConfig;
    isLoading?: boolean;
    sessionId?: string;
}

export function InlineGamePreview({ gameData, isLoading = false, sessionId }: InlineGamePreviewProps) {
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (sessionId) {
            setPreviewUrl(`/preview/${sessionId}`);
        } else if (gameData) {
            // Create a temporary preview URL for the game data
            const encodedData = encodeURIComponent(JSON.stringify(gameData));
            setPreviewUrl(`/preview/inline?data=${encodedData}`);
        }
    }, [gameData, sessionId]);

    if (isLoading || loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-purple-400 mx-auto mb-4" />
                    <p className="text-gray-400">Loading preview...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full">
            <iframe
                src={previewUrl}
                className="w-full h-96 rounded-lg border border-gray-700"
                title="Game Preview"
                sandbox="allow-scripts allow-same-origin"
            />
        </div>
    );
}