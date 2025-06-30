'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GameConfig } from "@/generated/prisma";
import { useRouter } from "next/navigation";
import { ImageUpload } from "./ImageUpload";
import { useState, useEffect } from "react";

interface GameConfigFormProps {
    game?: GameConfig;
}

type ProbabilityKey = 'probDust' | 'probRock' | 'probOil' | 'probGold' | 'probDiamond';
const probabilityKeys: ProbabilityKey[] = ['probDust', 'probRock', 'probOil', 'probGold', 'probDiamond'];

type MultiplierKey = 'multOil' | 'multGold' | 'multDiamond';
const multiplierKeys: MultiplierKey[] = ['multOil', 'multGold', 'multDiamond'];

export function GameConfigForm({ game }: GameConfigFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState<Partial<GameConfig>>({
        name: '',
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

    return (
        <div className="flex flex-col gap-16">
            <div className="w-full">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <Label htmlFor="name">Game Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="defaultBid">Default Bid</Label>
                            <Input id="defaultBid" name="defaultBid" type="number" value={formData.defaultBid ?? ''} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="movesPerRound">Moves per Round</Label>
                            <Input id="movesPerRound" name="movesPerRound" type="number" value={formData.movesPerRound} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bidAmounts">Bid Amounts (comma-separated)</Label>
                            <Input id="bidAmounts" name="bidAmounts" type="text" value={formData.bidAmounts?.join(', ')} onChange={handleInputChange} />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold">Probabilities (%)</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {probabilityKeys.map(p => {
                            const label = p.replace('prob', '');
                            return (
                                <div key={p} className="space-y-2">
                                    <Label htmlFor={p}>{label}</Label>
                                    <Input id={p} name={p} type="number" value={formData[p] ?? ''} onChange={handleInputChange} />
                                </div>
                            )
                        })}
                    </div>


                    <h2 className="text-2xl font-bold">Multipliers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {multiplierKeys.map(m => {
                            const label = m.replace('mult', '');
                            return (
                                <div key={m} className="space-y-2">
                                    <Label htmlFor={m}>{label}</Label>
                                    <Input id={m} name={m} type="number" step="0.1" value={formData[m] ?? ''} onChange={handleInputChange} />
                                </div>
                            )
                        })}
                    </div>

                    <h2 className="text-2xl font-bold">Image Assets</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <ImageUpload name="backgroundUrl" label="Background" defaultValue={formData.backgroundUrl} onUpload={(url: string) => handleImageUpload("backgroundUrl", url)} />
                        <ImageUpload name="mascotImageUrl" label="Mascot" defaultValue={formData.mascotImageUrl} onUpload={(url: string) => handleImageUpload("mascotImageUrl", url)} />
                        <ImageUpload name="diamondImageUrl" label="Diamond" defaultValue={formData.diamondImageUrl} onUpload={(url: string) => handleImageUpload("diamondImageUrl", url)} />
                        <ImageUpload name="goldImageUrl" label="Gold" defaultValue={formData.goldImageUrl} onUpload={(url: string) => handleImageUpload("goldImageUrl", url)} />
                        <ImageUpload name="oilImageUrl" label="Oil" defaultValue={formData.oilImageUrl} onUpload={(url: string) => handleImageUpload("oilImageUrl", url)} />
                        <ImageUpload name="rockImageUrl" label="Rock" defaultValue={formData.rockImageUrl} onUpload={(url: string) => handleImageUpload("rockImageUrl", url)} />
                        <ImageUpload name="dustImageUrl" label="Dust" defaultValue={formData.dustImageUrl} onUpload={(url: string) => handleImageUpload("dustImageUrl", url)} />
                    </div>

                    <Button type="submit">{game ? 'Update Game' : 'Create Game'}</Button>
                </form>
            </div>
            <div className="w-full min-h-[500px]">
                <div className="sticky top-8">
                    <h2 className="text-2xl font-bold mb-4">Live Preview</h2>
                    <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                        <iframe
                            id="game-preview"
                            className="w-[1200px] h-[600px] border-0"
                            title="Game Preview"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
} 