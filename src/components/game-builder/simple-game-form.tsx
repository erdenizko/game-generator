'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { FileUpload } from './file-upload';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SlotItemsManager } from './slot-items-manager';
import { Loader2, Save, Eye, Trash2 } from 'lucide-react';
import { SlotItem } from '@/types/SlotItem';
import { Mascot } from '@/types/Mascot';
import { GameStyling } from '@/types/GameStyling';
import { GameSound } from '@/types/GameSound';
import PreviewPage from '@/app/(protected)/preview/[sessionId]/page';

interface GameFormData {
  id: string;
  title: string;
  description: string;
  rows: number;
  columns: number;
  coverImageKey: string;
  backgroundImageKey: string;
  frameImageKey: string;
  sounds: GameSound;
  mascot: Mascot;
  styling: GameStyling;
  slotItems: SlotItem[];
}

interface SimpleGameFormProps {
  initialData?: Partial<GameFormData>; // Can be GameConfig or Partial<GameFormData>
  onSave: (data: GameFormData) => Promise<void>;
  onPreview?: (data: GameFormData) => Promise<void>;
  onDelete?: () => Promise<void>;
  isLoading?: boolean;
  isPreviewLoading?: boolean;
  className?: string;
  mode?: 'create' | 'edit' | 'duplicate';
}

export function SimpleGameForm({
  initialData,
  onSave,
  onPreview,
  onDelete,
  isLoading = false,
  isPreviewLoading = false,
  className
}: SimpleGameFormProps) {

  const [formData, setFormData] = useState<GameFormData>({
    id: initialData?.id || '',
    title: initialData?.title || '',
    description: initialData?.description || '',
    rows: initialData?.rows || 3,
    columns: initialData?.columns || 3,
    coverImageKey: initialData?.coverImageKey || '',
    backgroundImageKey: initialData?.backgroundImageKey || '',
    frameImageKey: initialData?.frameImageKey || '',
    sounds: initialData?.sounds || {},
    mascot: initialData?.mascot || { enabled: false },
    styling: initialData?.styling || {},
    slotItems: initialData?.slotItems || [],
  });

  // Update form data when initialData changes (for edit/duplicate modes)
  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        title: initialData.title || '',
        description: initialData.description || '',
        rows: initialData.rows || 3,
        columns: initialData.columns || 3,
        coverImageKey: initialData.coverImageKey || '',
        backgroundImageKey: initialData.backgroundImageKey || '',
        frameImageKey: initialData.frameImageKey || '',
        sounds: initialData.sounds || {},
        mascot: initialData.mascot || { enabled: false },
        styling: initialData.styling || {},
        slotItems: initialData.slotItems || [],
      });
    }
  }, [initialData]);

  const updateFormData = (updates: Partial<GameFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const updateNestedData = <T extends keyof GameFormData>(
    key: T,
    updates: Partial<GameFormData[T]>
  ) => {
    setFormData(prev => ({
      ...prev,
      [key]: { ...(prev[key] as object), ...updates }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handlePreview = async () => {
    try {
      if (onPreview) {
        await onPreview(formData);
      }
    } catch (error) {
      console.error('Preview failed:', error);
    }
  };

  return (
    <div className={`space-y-6 ${className} flex flex-row`}>
      <form onSubmit={handleSubmit} className="bg-white/80 p-6 grid grid-cols-1 max-w-1/2">
        {/* Basic Information */}
        <Card className='bg-transparent shadow-none rounded-none p-0'>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Set up the basic details of your slot game
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-0">
            <div className="space-y-2">
              <Label htmlFor="title">Game Title</Label>
              <Input
                id="title"
                placeholder="Enter game title"
                value={formData.title}
                onChange={(e) => updateFormData({ title: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">
                The name of your slot game (max 255 characters)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter game description"
                className="min-h-[100px]"
                value={formData.description}
                onChange={(e) => updateFormData({ description: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">
                A brief description of your game (max 1000 characters)
              </p>
            </div>
            <div className="space-y-2">
              <Label>Rows</Label>
              <div className="space-y-1">
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[formData.rows]}
                  onValueChange={(value) => updateFormData({ rows: value[0] })}
                />
                <div className="text-center text-sm text-muted-foreground">
                  {formData.rows} rows
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Number of rows in the slot grid (1-10)
              </p>
            </div>
            <div className="space-y-2">
              <Label>Columns</Label>
              <div className="space-y-1">
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[formData.columns]}
                  onValueChange={(value) => updateFormData({ columns: value[0] })}
                />
                <div className="text-center text-sm text-muted-foreground">
                  {formData.columns} columns
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Number of columns in the slot grid (1-10)
              </p>
            </div>

            <div className="space-y-2">
              <Label>Cover Image</Label>
              <FileUpload
                gameId={formData.id}
                assetType='image'
                value={formData.coverImageKey}
                onChange={(value) => updateFormData({ coverImageKey: value })}
                accept="image/*"
                maxSize={5 * 1024 * 1024} // 5MB
                description="Upload a cover image for your game (JPG, PNG, WebP - max 5MB)"
              />
            </div>

            <div className="space-y-2">
              <Label>Background Image</Label>
              <FileUpload
                gameId={formData.id}
                assetType='image'
                value={formData.backgroundImageKey}
                onChange={(value) => updateFormData({ backgroundImageKey: value })}
                accept="image/*"
                maxSize={5 * 1024 * 1024} // 5MB
                description="Upload a background image for the game (JPG, PNG, WebP - max 5MB)"
              />
            </div>

            <div className="space-y-2">
              <Label>Frame Image</Label>
              <FileUpload
                gameId={formData.id}
                assetType='image'
                value={formData.frameImageKey}
                onChange={(value) => updateFormData({ frameImageKey: value })}
                accept="image/*"
                maxSize={5 * 1024 * 1024} // 5MB
                description="Upload a frame image for the slot machine (JPG, PNG, WebP - max 5MB)"
              />
            </div>
          </CardContent>
        </Card>

        {/* Slot Items */}
        <Card className='bg-transparent shadow-none rounded-none p-0'>
          <CardHeader>
            <CardTitle>Slot Items</CardTitle>
            <CardDescription>
              Define the symbols that appear on your slot reels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-0">
            <SlotItemsManager
              gameId={formData.id}
              slotItems={formData.slotItems}
              onSlotItemsChange={(items) => updateFormData({ slotItems: items })}
            />
          </CardContent>
        </Card>

        {/* Game Sounds */}
        <Card className='bg-transparent shadow-none rounded-none p-0'>
          <CardHeader>
            <CardTitle>Game Sounds</CardTitle>
            <CardDescription>
              Add audio files to enhance the gaming experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-0">
            <div className="space-y-2">
              <Label>Spin Sound</Label>
              <FileUpload
                gameId={formData.id}
                assetType='audio'
                value={formData.sounds.spin || ''}
                onChange={(value) => updateNestedData('sounds', { spin: value })}
                accept="audio/*"
                maxSize={10 * 1024 * 1024} // 10MB
                description="Sound played when spinning reels (MP3, WAV - max 10MB)"
              />
            </div>

            <div className="space-y-2">
              <Label>Win Sound</Label>
              <FileUpload
                gameId={formData.id}
                assetType='audio'
                value={formData.sounds.win || ''}
                onChange={(value) => updateNestedData('sounds', { win: value })}
                accept="audio/*"
                maxSize={10 * 1024 * 1024} // 10MB
                description="Sound played when player wins (MP3, WAV - max 10MB)"
              />
            </div>

            <div className="space-y-2">
              <Label>Lose Sound</Label>
              <FileUpload
                gameId={formData.id}
                assetType='audio'
                value={formData.sounds.lose || ''}
                onChange={(value) => updateNestedData('sounds', { lose: value })}
                accept="audio/*"
                maxSize={10 * 1024 * 1024} // 10MB
                description="Sound played when player loses (MP3, WAV - max 10MB)"
              />
            </div>

            <div className="space-y-2">
              <Label>Click Sound</Label>
              <FileUpload
                gameId={formData.id}
                assetType='audio'
                value={formData.sounds.click || ''}
                onChange={(value) => updateNestedData('sounds', { click: value })}
                accept="audio/*"
                maxSize={10 * 1024 * 1024} // 10MB
                description="Sound played on button clicks (MP3, WAV - max 10MB)"
              />
            </div>

            <div className="space-y-2">
              <Label>Background Music</Label>
              <FileUpload
                gameId={formData.id}
                assetType='audio'
                value={formData.sounds.backgroundMusic || ''}
                onChange={(value) => updateNestedData('sounds', { backgroundMusic: value })}
                accept="audio/*"
                maxSize={10 * 1024 * 1024} // 10MB
                description="Background music for the game (MP3, WAV - max 10MB)"
              />
            </div>
          </CardContent>
        </Card>

        {/* Mascot Configuration */}
        <Card className='bg-transparent shadow-none rounded-none p-0'>
          <CardHeader>
            <CardTitle>Mascot Configuration</CardTitle>
            <CardDescription>
              Add an animated mascot character to your game
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-0">
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Mascot</Label>
                <p className="text-sm text-muted-foreground">
                  Add an animated character to your game
                </p>
              </div>
              <Switch
                checked={formData.mascot.enabled}
                onCheckedChange={(enabled) => updateNestedData('mascot', { enabled })}
              />
            </div>

            {formData.mascot.enabled && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Start Animation</Label>
                  <FileUpload
                    gameId={formData.id}
                    assetType='mascot'
                    value={formData.mascot.startFile || ''}
                    onChange={(value) => updateNestedData('mascot', { startFile: value })}
                    accept="image/*,video/*"
                    maxSize={10 * 1024 * 1024} // 10MB
                    description="Animation shown when game starts"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Spin Animation</Label>
                  <FileUpload
                    gameId={formData.id}
                    assetType='mascot'
                    value={formData.mascot.spinFile || ''}
                    onChange={(value) => updateNestedData('mascot', { spinFile: value })}
                    accept="image/*,video/*"
                    maxSize={10 * 1024 * 1024} // 10MB
                    description="Animation shown during spins"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Win Animation</Label>
                  <FileUpload
                    gameId={formData.id}
                    assetType='mascot'
                    value={formData.mascot.winFile || ''}
                    onChange={(value) => updateNestedData('mascot', { winFile: value })}
                    accept="image/*,video/*"
                    maxSize={10 * 1024 * 1024} // 10MB
                    description="Animation shown when player wins"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Lose Animation</Label>
                  <FileUpload
                    gameId={formData.id}
                    assetType='mascot'
                    value={formData.mascot.loseFile || ''}
                    onChange={(value) => updateNestedData('mascot', { loseFile: value })}
                    accept="image/*,video/*"
                    maxSize={10 * 1024 * 1024} // 10MB
                    description="Animation shown when player loses"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Idle Animation</Label>
                  <FileUpload
                    gameId={formData.id}
                    assetType='mascot'
                    value={formData.mascot.idleFile || ''}
                    onChange={(value) => updateNestedData('mascot', { idleFile: value })}
                    accept="image/*,video/*"
                    maxSize={10 * 1024 * 1024} // 10MB
                    description="Animation shown when game is idle"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Button Styling */}
        <Card className='bg-transparent shadow-none rounded-none p-0'>
          <CardHeader>
            <CardTitle>Button Styling</CardTitle>
            <CardDescription>
              Customize the appearance of game buttons
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 px-0">
            {/* Button Style Dropdown */}
            <div className="space-y-2">
              <Label>Button Style</Label>
              <Select
                value={formData.styling.buttonStyle || ''}
                onValueChange={(value) => updateNestedData('styling', { buttonStyle: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select button style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="3d">3D Realistic</SelectItem>
                  <SelectItem value="frosted">Frosted Glass</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Primary Color */}
            <div className="space-y-2">
              <Label>Primary Color (Spin Button)</Label>
              <Input
                type="color"
                value={formData.styling.primaryColor || '#4f46e5'}
                onChange={(e) => updateNestedData('styling', { primaryColor: e.target.value })}
                className="w-full h-10 p-1 rounded-md border"
              />
            </div>

            {/* Secondary Color */}
            <div className="space-y-2">
              <Label>Secondary Color (Other Buttons)</Label>
              <Input
                type="color"
                value={formData.styling.secondaryColor || '#4f46e5'}
                onChange={(e) => updateNestedData('styling', { secondaryColor: e.target.value })}
                className="w-full h-10 p-1 rounded-md border"
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="col-span-1 flex items-center justify-between mt-4">
          <div>
            {onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={onDelete}
                disabled={isLoading}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Game
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {onPreview && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePreview}
                disabled={isPreviewLoading || isLoading}
              >
                {isPreviewLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Eye className="h-4 w-4 mr-2" />
                )}
                Preview
              </Button>
            )}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Game
            </Button>
          </div>
        </div>
      </form>
      <div className='bg-white w-1/2'>
        test
      </div>
    </div>
  );
}