'use client';

import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SlotMachineConfigProps {
    formData: any;
    onChange: (data: any) => void;
}

export function SlotMachineConfig({ formData, onChange }: SlotMachineConfigProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' && value !== '' ? Number(value) : value;
        onChange({ ...formData, [name]: parsedValue });
    };

    const symbols = ['🍒', '🍋', '🔔', '⭐', '💎', '7️⃣', '🍀', '💰'];

    return (
        <div className="space-y-8">
            {/* Basic Settings */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Slot Machine Configuration</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="reels">Number of Reels</Label>
                        <Input 
                            id="reels" 
                            name="reels" 
                            type="number" 
                            min="3"
                            max="5"
                            value={formData.reels || 3} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="spinSpeed">Spin Speed (ms)</Label>
                        <Input 
                            id="spinSpeed" 
                            name="spinSpeed" 
                            type="number" 
                            value={formData.spinSpeed || 2000} 
                            onChange={handleInputChange} 
                        />
                    </div>
                </div>
            </div>

            {/* Symbol Probabilities */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Symbol Probabilities (%)</h3>
                <div className="grid grid-cols-4 gap-4">
                    {symbols.map((symbol, i) => (
                        <div key={i} className="space-y-2">
                            <Label htmlFor={`prob${symbol}`}>{symbol}</Label>
                            <Input 
                                id={`prob${symbol}`} 
                                name={`prob${symbol}`} 
                                type="number" 
                                min="0"
                                max="100"
                                value={formData[`prob${symbol}`] || 12.5} 
                                onChange={handleInputChange} 
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Payout Multipliers */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Payout Multipliers</h3>
                <div className="space-y-4">
                    <h4 className="text-md font-medium">3 in a row:</h4>
                    <div className="grid grid-cols-4 gap-4">
                        {symbols.map((symbol, i) => (
                            <div key={i} className="space-y-2">
                                <Label htmlFor={`mult3${symbol}`}>{symbol} x3</Label>
                                <Input 
                                    id={`mult3${symbol}`} 
                                    name={`mult3${symbol}`} 
                                    type="number" 
                                    step="0.1"
                                    value={formData[`mult3${symbol}`] || (symbols.length - i)} 
                                    onChange={handleInputChange} 
                                />
                            </div>
                        ))}
                    </div>
                    
                    {(formData.reels || 3) >= 4 && (
                        <>
                            <h4 className="text-md font-medium">4 in a row:</h4>
                            <div className="grid grid-cols-4 gap-4">
                                {symbols.map((symbol, i) => (
                                    <div key={i} className="space-y-2">
                                        <Label htmlFor={`mult4${symbol}`}>{symbol} x4</Label>
                                        <Input 
                                            id={`mult4${symbol}`} 
                                            name={`mult4${symbol}`} 
                                            type="number" 
                                            step="0.1"
                                            value={formData[`mult4${symbol}`] || (symbols.length - i) * 2} 
                                            onChange={handleInputChange} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    
                    {(formData.reels || 3) >= 5 && (
                        <>
                            <h4 className="text-md font-medium">5 in a row:</h4>
                            <div className="grid grid-cols-4 gap-4">
                                {symbols.map((symbol, i) => (
                                    <div key={i} className="space-y-2">
                                        <Label htmlFor={`mult5${symbol}`}>{symbol} x5</Label>
                                        <Input 
                                            id={`mult5${symbol}`} 
                                            name={`mult5${symbol}`} 
                                            type="number" 
                                            step="0.1"
                                            value={formData[`mult5${symbol}`] || (symbols.length - i) * 5} 
                                            onChange={handleInputChange} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}