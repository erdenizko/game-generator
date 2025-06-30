'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CasinoWheelConfigProps {
    formData: any;
    onChange: (data: any) => void;
}

export function CasinoWheelConfig({ formData, onChange }: CasinoWheelConfigProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' && value !== '' ? Number(value) : value;
        onChange({ ...formData, [name]: parsedValue });
    };

    return (
        <div className="space-y-8">
            {/* Basic Settings */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Wheel Configuration</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="segments">Number of Segments</Label>
                        <Input 
                            id="segments" 
                            name="segments" 
                            type="number" 
                            value={formData.segments || 8} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="spinDuration">Spin Duration (ms)</Label>
                        <Input 
                            id="spinDuration" 
                            name="spinDuration" 
                            type="number" 
                            value={formData.spinDuration || 3000} 
                            onChange={handleInputChange} 
                        />
                    </div>
                </div>
            </div>

            {/* Segment Multipliers */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Segment Multipliers</h3>
                <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: formData.segments || 8 }, (_, i) => (
                        <div key={i} className="space-y-2">
                            <Label htmlFor={`multiplier${i}`}>Segment {i + 1}</Label>
                            <Input 
                                id={`multiplier${i}`} 
                                name={`multiplier${i}`} 
                                type="number" 
                                step="0.1"
                                value={formData[`multiplier${i}`] || 1} 
                                onChange={handleInputChange} 
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Wheel Colors */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Wheel Colors</h3>
                <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: formData.segments || 8 }, (_, i) => (
                        <div key={i} className="space-y-2">
                            <Label htmlFor={`color${i}`}>Color {i + 1}</Label>
                            <Input 
                                id={`color${i}`} 
                                name={`color${i}`} 
                                type="color" 
                                value={formData[`color${i}`] || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
                                onChange={handleInputChange} 
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}