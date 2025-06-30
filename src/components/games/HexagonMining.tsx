'use client';

import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "../admin/ImageUpload";

interface HexagonMiningConfigProps {
    formData: any;
    onChange: (data: any) => void;
    onImageUpload: (name: string, url: string) => void;
}

export function HexagonMiningConfig({ formData, onChange, onImageUpload }: HexagonMiningConfigProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        let parsedValue;
        
        if (type === 'number' && value !== '') {
            parsedValue = Number(value);
        } else if (name === 'bidAmounts' && typeof value === 'string') {
            parsedValue = value.split(',').map(s => Number(s.trim()));
        } else {
            parsedValue = value;
        }
        
        onChange({ ...formData, [name]: parsedValue });
    };

    const probabilityKeys = ['probDust', 'probRock', 'probOil', 'probGold', 'probDiamond'];
    const multiplierKeys = ['multOil', 'multGold', 'multDiamond'];

    return (
        <div className="space-y-8">
            {/* Basic Settings */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Game Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="defaultBid">Default Bid</Label>
                        <Input 
                            id="defaultBid" 
                            name="defaultBid" 
                            type="number" 
                            value={formData.defaultBid ?? ''} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="movesPerRound">Moves per Round</Label>
                        <Input 
                            id="movesPerRound" 
                            name="movesPerRound" 
                            type="number" 
                            value={formData.movesPerRound || ''} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label htmlFor="bidAmounts">Bid Amounts (comma-separated)</Label>
                        <Input 
                            id="bidAmounts" 
                            name="bidAmounts" 
                            type="text" 
                            value={formData.bidAmounts?.join(', ') || ''} 
                            onChange={handleInputChange} 
                        />
                    </div>
                </div>
            </div>

            {/* Probabilities */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Probabilities (%)</h3>
                <div className="grid grid-cols-5 gap-4">
                    {probabilityKeys.map(p => {
                        const label = p.replace('prob', '');
                        return (
                            <div key={p} className="space-y-2">
                                <Label htmlFor={p}>{label}</Label>
                                <Input 
                                    id={p} 
                                    name={p} 
                                    type="number" 
                                    value={formData[p] ?? ''} 
                                    onChange={handleInputChange} 
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Multipliers */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Multipliers</h3>
                <div className="grid grid-cols-3 gap-4">
                    {multiplierKeys.map(m => {
                        const label = m.replace('mult', '');
                        return (
                            <div key={m} className="space-y-2">
                                <Label htmlFor={m}>{label}</Label>
                                <Input 
                                    id={m} 
                                    name={m} 
                                    type="number" 
                                    step="0.1" 
                                    value={formData[m] ?? ''} 
                                    onChange={handleInputChange} 
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Image Assets */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Image Assets</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ImageUpload 
                        name="backgroundUrl" 
                        label="Background" 
                        defaultValue={formData.backgroundUrl} 
                        onUpload={(url: string) => onImageUpload("backgroundUrl", url)} 
                    />
                    <ImageUpload 
                        name="mascotImageUrl" 
                        label="Mascot" 
                        defaultValue={formData.mascotImageUrl} 
                        onUpload={(url: string) => onImageUpload("mascotImageUrl", url)} 
                    />
                    <ImageUpload 
                        name="diamondImageUrl" 
                        label="Diamond" 
                        defaultValue={formData.diamondImageUrl} 
                        onUpload={(url: string) => onImageUpload("diamondImageUrl", url)} 
                    />
                    <ImageUpload 
                        name="goldImageUrl" 
                        label="Gold" 
                        defaultValue={formData.goldImageUrl} 
                        onUpload={(url: string) => onImageUpload("goldImageUrl", url)} 
                    />
                    <ImageUpload 
                        name="oilImageUrl" 
                        label="Oil" 
                        defaultValue={formData.oilImageUrl} 
                        onUpload={(url: string) => onImageUpload("oilImageUrl", url)} 
                    />
                    <ImageUpload 
                        name="rockImageUrl" 
                        label="Rock" 
                        defaultValue={formData.rockImageUrl} 
                        onUpload={(url: string) => onImageUpload("rockImageUrl", url)} 
                    />
                    <ImageUpload 
                        name="dustImageUrl" 
                        label="Dust" 
                        defaultValue={formData.dustImageUrl} 
                        onUpload={(url: string) => onImageUpload("dustImageUrl", url)} 
                    />
                </div>
            </div>
        </div>
    );
}