'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GameConfig } from "@/generated/prisma";
import { useRouter } from "next/navigation";
import { ImageUpload } from "./ImageUpload";
import { useState, useEffect } from "react";
import { HexagonMiningConfig } from "../games/HexagonMining";
import { CasinoWheelConfig } from "../games/CasinoWheel";
import { SlotMachineConfig } from "../games/SlotMachine";

interface GameConfigFormProps {
    game?: GameConfig;
}

type ProbabilityKey = 'probDust' | 'probRock' | 'probOil' | 'probGold' | 'probDiamond';
const probabilityKeys: ProbabilityKey[] = ['probDust', 'probRock', 'probOil', 'probGold', 'probDiamond'];

type MultiplierKey = 'multOil' | 'multGold' | 'multDiamond';
const multiplierKeys: MultiplierKey[] = ['multOil', 'multGold', 'multDiamond'];

const gameTypes = [
    { value: 'hexagon_mining', label: 'Legacy Hexagon Mining', description: 'Classic mining game with hexagonal grid' },
    { value: 'casino_wheel', label: 'Casino Wheel', description: 'Spin the wheel of fortune' },
    { value: 'slot_machine', label: 'Slot Machine', description: 'Traditional slot machine gameplay' }
];

export function GameConfigForm({ game }: GameConfigFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<Partial<GameConfig & {gameType: string}>>({
        name: '',
        gameType: 'hexagon_mining',
        defaultBid: 5,
        movesPerRound: 10,
        bidAmounts: [1, 5, 10, 20],
        probDust: 40,
        probRock: 30,
        probOil: 15,
        probGold: 10,
        probDiamond: 5,
        multOil: 1.5,
        multGold: 2,
        multDiamond: 5,
        backgroundUrl: '/sample-assets/background.jpg',
        mascotImageUrl: '/sample-assets/mascot.png',
        diamondImageUrl: '/sample-assets/diamond.png',
        goldImageUrl: '/sample-assets/gold.png',
        oilImageUrl: '/sample-assets/oil.png',
        rockImageUrl: '/sample-assets/rock.png',
        dustImageUrl: '/sample-assets/dust.png',
        ...game
    });

    useEffect(() => {
        const query = new URLSearchParams();
        query.set('preview', 'true');

        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (Array.isArray(value)) {
                    query.set(key, value.join(','));
                } else {
                    query.set(key, String(value));
                }
            }
        });

        const iframe = document.getElementById('game-preview') as HTMLIFrameElement;
        if (iframe) {
            iframe.src = `/iframe/game?${query.toString()}`;
        }
    }, [formData]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' && value !== '' ? Number(value) : value;

        if (name === 'bidAmounts' && typeof value === 'string') {
            setFormData(prev => ({ ...prev, [name]: value.split(',').map(s => Number(s.trim())) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: parsedValue }));
        }
    };

    const handleImageUpload = (name: string, url: string) => {
        setFormData(prev => ({ ...prev, [name]: url }));
    };


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const response = await fetch(game ? `/api/admin/game-config/${game.id}` : '/api/admin/game-config', {
            method: game ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            router.push('/admin/dashboard/games');
            router.refresh();
        } else {
            // Handle error
            alert('Something went wrong!');
        }
    }

    const renderGameTypeConfig = () => {
        switch (formData.gameType) {
            case 'hexagon_mining':
                return <HexagonMiningConfig formData={formData} onChange={setFormData} onImageUpload={handleImageUpload} />;
            case 'casino_wheel':
                return <CasinoWheelConfig formData={formData} onChange={setFormData} />;
            case 'slot_machine':
                return <SlotMachineConfig formData={formData} onChange={setFormData} />;
            default:
                return <div className="text-center py-8 text-gray-500">Please select a game type</div>;
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Modern Header */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-sm">
                <div className="space-y-6">
                    {/* Game Type Selection */}
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Game Type</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Choose the type of game you want to create</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {gameTypes.map((type) => (
                                <div 
                                    key={type.value}
                                    className={`relative cursor-pointer rounded-lg border p-4 transition-all hover:border-blue-500 ${
                                        formData.gameType === type.value 
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                                            : 'border-gray-200 dark:border-gray-700'
                                    }`}
                                    onClick={() => setFormData(prev => ({ ...prev, gameType: type.value }))}
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className={`flex-shrink-0 w-4 h-4 rounded-full border-2 mt-0.5 ${
                                            formData.gameType === type.value
                                                ? 'border-blue-500 bg-blue-500'
                                                : 'border-gray-300 dark:border-gray-600'
                                        }`}>
                                            {formData.gameType === type.value && (
                                                <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                                {type.label}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {type.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Basic Game Info */}
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Set up the basic details for your game</p>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">Game Name</Label>
                            <Input 
                                id="name" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleInputChange} 
                                placeholder="Enter a unique name for your game"
                                className="w-full"
                                required 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Game Configuration */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-sm">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Game Configuration</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Configure the specific settings for your {gameTypes.find(t => t.value === formData.gameType)?.label.toLowerCase()}
                        </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {renderGameTypeConfig()}
                        
                        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                            <Button 
                                type="submit" 
                                className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md transition-colors"
                            >
                                {game ? 'Update Game' : 'Create Game'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Live Preview */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Live Preview</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">See how your game will look to players</p>
                    </div>
                    
                    <div className="w-full h-[600px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        {formData.gameType === 'hexagon_mining' ? (
                            <iframe
                                id="game-preview"
                                className="w-full h-full border-0"
                                title="Game Preview"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                                <div className="text-center">
                                    <div className="text-4xl mb-4">🎮</div>
                                    <p className="text-lg font-medium">Preview Coming Soon</p>
                                    <p className="text-sm">Preview for {gameTypes.find(t => t.value === formData.gameType)?.label} will be available soon</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
} 