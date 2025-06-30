'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";

interface ImageUploadProps {
    name: string;
    defaultValue?: string | null;
    label: string;
    onUpload?: (url: string) => void;
}

export function ImageUpload({ name, defaultValue, label, onUpload }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(defaultValue ?? null);
    const [url, setUrl] = useState<string>(defaultValue ?? '');

    async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        // Set preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload file
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            setUrl(data.url);
            if (onUpload) {
                onUpload(data.url);
            }
        } else {
            alert('Upload failed');
        }
    }

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Input type="file" onChange={handleFileChange} />
            <input type="hidden" name={name} value={url} />
            {preview && (
                <div className="mt-2">
                    <Image src={preview} alt="Image preview" width={100} height={100} className="rounded-md object-cover" />
                </div>
            )}
        </div>
    );
} 