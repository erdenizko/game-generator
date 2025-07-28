'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { FileUpload } from './file-upload';
import { SlotItemsManager } from './slot-items-manager';
import { FormField } from './form-field';
import { FormSidebarItem } from './form-sidebar-item';
import { cn } from '@/lib/utils';
import {
  Loader2,
  Save,
  Eye,
  Trash2,
  XIcon
} from 'lucide-react';
import { SlotItem } from '@/types/SlotItem';
import { Mascot } from '@/types/Mascot';
import { GameStyling } from '@/types/GameStyling';
import { GameSound } from '@/types/GameSound';
import { Language, Region } from '@/lib/types';
import SlotGameEngine from '@/components/game-runtime/slot-game-engine';
import { GameConfig, SpinResult } from '@/lib/types';
import { Select, SelectContent, SelectValue, SelectTrigger, SelectItem } from '@/components/ui/select';
// Constants for Localization & Regions
const ALL_LOCALES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
];
const COUNTRIES_LIST = [
  { code: 'USA', name: 'United States' },
  { code: 'CAN', name: 'Canada' },
  { code: 'GBR', name: 'United Kingdom' },
  { code: 'EUR', name: 'European Union' },
  { code: 'AUS', name: 'Australia' },
  { code: 'JPN', name: 'Japan' },
  { code: 'KOR', name: 'South Korea' },
  { code: 'CHN', name: 'China' },
  { code: 'IND', name: 'India' },
  { code: 'BRA', name: 'Brazil' },
];

export interface GameFormData {
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
  availableLanguages: Language[];
  availableRegions: Region[];
  blockedRegions: string[];
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface SimpleGameFormProps {
  initialData?: Partial<GameFormData>;
  onSave: (data: GameFormData) => Promise<void>;
  onPreview?: (data: GameFormData) => Promise<void>;
  onDelete?: () => Promise<void>;
  isLoading?: boolean;
  isPreviewLoading?: boolean;
  className?: string;
  mode?: 'create' | 'edit' | 'duplicate';
  sessionId: string | null;
  error: string | null;
}

export function SimpleGameForm({
  initialData,
  onSave,
  onPreview,
  onDelete,
  isLoading = false,
  isPreviewLoading = false,
  sessionId,
  error,
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
    availableLanguages: initialData?.availableLanguages || [],
    availableRegions: initialData?.availableRegions || [],
    blockedRegions: initialData?.blockedRegions || [],
    isPublished: initialData?.isPublished || false,
    createdAt: initialData?.createdAt?.toString() || '',
    updatedAt: initialData?.updatedAt?.toString() || '',
  });

  useEffect(() => {
    console.log('Initializing form data with:', initialData);
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        title: initialData.title || '',
        description: initialData.description || '',
        rows: initialData.rows || 3,
        columns: initialData.columns || 3,
        coverImageKey: initialData.coverImageKey || '',
        backgroundImageKey: initialData?.backgroundImageKey || '',
        frameImageKey: initialData?.frameImageKey || '',
        sounds: initialData.sounds || {},
        mascot: initialData.mascot || { enabled: false },
        styling: initialData.styling || {},
        slotItems: initialData.slotItems || [],
        availableLanguages: initialData.availableLanguages || [],
        availableRegions: initialData.availableRegions || [],
        blockedRegions: initialData.blockedRegions || [],
        isPublished: initialData.isPublished || false,
        createdAt: initialData.createdAt ? initialData.createdAt.toString() : '',
        updatedAt: initialData.updatedAt ? initialData.updatedAt.toString() : '',
      });
    }
  }, [initialData]);

  const updateFormData = (updates: Partial<GameFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };
  const sidebarItems = [
    { step: 1, view: 'basic', label: 'Basic Information' },
    { step: 2, view: 'visual', label: 'Visual Assets' },
    { step: 3, view: 'slot', label: 'Slot Items' },
    { step: 4, view: 'audio', label: 'Audio Settings' },
    { step: 5, view: 'mascot', label: 'Mascot Settings' },
    { step: 6, view: 'styling', label: 'Styling' },
    { step: 7, view: 'localization', label: 'Localization' },
    { step: 8, view: 'region', label: 'Region Settings' },
  ];

  // Predefined sound and mascot file types
  const soundTypes = ['spin', 'click', 'win', 'lose', 'backgroundMusic'] as const;
  type SoundType = typeof soundTypes[number];

  const mascotFileTypes = ['startFile', 'spinFile', 'loseFile', 'winFile', 'idleFile'] as const;
  type MascotFileType = typeof mascotFileTypes[number];
  const [selectedView, setSelectedView] = useState<'basic' | 'visual' | 'slot' | 'audio' | 'mascot' | 'styling' | 'localization' | 'region' | 'publish' | undefined>(undefined);
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>(() => typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop');
  useEffect(() => {
    function handleResize() { setDeviceMode(window.innerWidth < 768 ? 'mobile' : 'desktop'); }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-row justify-between">
            <div>
              <h1 className="text-4xl font-bold">
                {formData.id ? 'Edit Game' : 'Create New Game'}
              </h1>
              <p className="text-xl font-medium">
                {formData.id ? 'Refine your masterpiece' : 'Design your ultimate slot game experience'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-4 pt-8">
              <div>
                {onDelete && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={onDelete}
                    disabled={isLoading}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Game
                  </Button>
                )}
              </div>

              <div className="flex gap-3">
                {onPreview && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onPreview && onPreview(formData)}
                    disabled={isPreviewLoading || isLoading}
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300"
                  >
                    {isPreviewLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Eye className="w-4 h-4 mr-2" />
                    )}
                    Preview
                  </Button>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Game
                </Button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 flex flex-row gap-4 shadow-xl rounded-lg overflow-hidden bg-slate-100">
            {/* Form Sidebar */}
            <div className='flex flex-col gap-2 min-w-88 p-4 relative'>
              {selectedView === undefined &&
                <div className='flex flex-col gap-4 my-auto mx-auto'>
                  {sidebarItems.map(({ step, view, label }) => (
                    <FormSidebarItem
                      key={view}
                      step={step}
                      label={label}
                      selected={selectedView === view}
                      onClick={() => setSelectedView(view as unknown as typeof selectedView)}
                    />
                  ))}
                </div>}
              {selectedView !== undefined && <>
                <button type='button' className='flex items-center justify-center absolute right-4 top-4 rounded-full p-2 border border-slate-400' onClick={() => setSelectedView(undefined)} >
                  <XIcon className='w-4 h-4 text-gray-500 hover:text-gray-700 cursor-pointer' />
                </button>
                <div className={cn("flex flex-col space-y-6", selectedView === 'basic' ? 'block' : 'hidden')}>
                  <h3 className='text-lg font-bold'>Basic Information</h3>
                  <FormField
                    label="Game Title"
                    htmlFor="title"
                    helpText="The name that will dominate the leaderboards"
                  >
                    <Input
                      id="title"
                      placeholder="Enter epic game title"
                      value={formData.title}
                      onChange={(e) => updateFormData({ title: e.target.value })}
                    />
                  </FormField>

                  <FormField
                    label="Description"
                    htmlFor="description"
                    helpText="Tell players what makes your game legendary"
                  >
                    <Textarea
                      placeholder="Describe your game's unique features and excitement"
                      className="min-h-[120px] placeholder-slate-500"
                      value={formData.description}
                      onChange={(e) => updateFormData({ description: e.target.value })}
                    />
                  </FormField>

                  <div className="grid grid-cols-1 gap-6">
                    <FormField label="Rows">
                      <div className="space-y-3">
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          value={[formData.rows]}
                          onValueChange={(value) => updateFormData({ rows: value[0] })}
                          className="[&>span]:bg-slate-200"
                        />
                        <div className="text-center text-sm font-bold">
                          {formData.rows} rows
                        </div>
                      </div>
                    </FormField>

                    <FormField label="Columns">
                      <div className="space-y-3">
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          value={[formData.columns]}
                          onValueChange={(value) => updateFormData({ columns: value[0] })}
                          className="[&>span]:bg-slate-200"
                        />
                        <div className="text-center text-sm font-bold">
                          {formData.columns} columns
                        </div>
                      </div>
                    </FormField>
                  </div>
                </div>

                {/* Visual Assets */}
                <div className={cn("space-y-6", selectedView === 'visual' ? 'block' : 'hidden')}>
                  <h3 className='text-lg font-bold'>Visual Assets</h3>
                  <FormField
                    label="Cover Image"
                    helpText="Eye-catching cover image (JPG, PNG, WebP - max 5MB)"
                  >
                    <FileUpload
                      gameId={formData.id}
                      assetType="image"
                      value={formData.coverImageKey}
                      onChange={(value) => updateFormData({ coverImageKey: value })}
                      accept="image/*"
                      maxSize={5 * 1024 * 1024}
                    />
                  </FormField>

                  <FormField
                    label="Background Image"
                    helpText="Stunning background image (JPG, PNG, WebP - max 5MB)"
                  >
                    <FileUpload
                      gameId={formData.id}
                      assetType="image"
                      value={formData.backgroundImageKey}
                      onChange={(value) => updateFormData({ backgroundImageKey: value })}
                      accept="image/*"
                      maxSize={5 * 1024 * 1024}
                    />
                  </FormField>

                  <FormField
                    label="Frame Image"
                    helpText="Premium frame image for the slot machine (JPG, PNG, WebP - max 5MB)"
                  >
                    <FileUpload
                      gameId={formData.id}
                      assetType="image"
                      value={formData.frameImageKey}
                      onChange={(value) => updateFormData({ frameImageKey: value })}
                      accept="image/*"
                      maxSize={5 * 1024 * 1024}
                    />
                  </FormField>
                </div>

                {/* Slot Items */}
                <div className={cn("flex flex-col items-center", selectedView === 'slot' ? 'block' : 'hidden')}>
                  <h3 className='text-lg font-bold mb-4'>Slot Items</h3>
                  <SlotItemsManager
                    gameId={formData.id}
                    slotItems={formData.slotItems}
                    onSlotItemsChange={(items) => updateFormData({ slotItems: items })}
                  />
                </div>

                {/* Audio Settings */}
                <div className={cn("space-y-6", selectedView === 'audio' ? 'block' : 'hidden')}>
                  <h3 className='text-lg font-bold mb-4'>Audio Settings</h3>
                  {soundTypes.map((type: SoundType) => (
                    <FormField
                      key={type}
                      label={type.replace(/([A-Z])/g, ' $1')}
                      helpText={`Upload ${type} sound (MP3, WAV - max 5MB)`}
                    >
                      <FileUpload
                        gameId={formData.id}
                        assetType="audio"
                        value={formData.sounds[type] || ''}
                        onChange={(value) => updateFormData({ sounds: { ...formData.sounds, [type]: value } })}
                        accept="audio/*"
                        maxSize={5 * 1024 * 1024}
                      />
                    </FormField>
                  ))}
                </div>

                {/* Mascot Settings */}
                <div className={cn("space-y-6", selectedView === 'mascot' ? 'block' : 'hidden')}>
                  <h3 className='text-lg font-bold mb-4'>Mascot Settings</h3>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="mascot-enabled" className="text-sm font-bold ">Enable Mascot</Label>
                    <Switch
                      id="mascot-enabled"
                      checked={formData.mascot.enabled}
                      onCheckedChange={(enabled) => updateFormData({ mascot: { ...formData.mascot, enabled } })}
                    />
                  </div>
                  {formData.mascot.enabled && (
                    <>
                      {mascotFileTypes.map((fileType: MascotFileType) => (
                        <FormField
                          key={fileType}
                          label={fileType.replace(/([A-Z])/g, ' $1')}
                          helpText={`Upload mascot ${fileType.replace(/([A-Z])/g, ' $1').toLowerCase()} file`}
                        >
                          <FileUpload
                            gameId={formData.id}
                            assetType="mascot"
                            value={(formData.mascot[fileType] as string) || ''}
                            onChange={(value) => updateFormData({ mascot: { ...formData.mascot, [fileType]: value } })}
                            accept="*/*"
                            maxSize={5 * 1024 * 1024}
                          />
                        </FormField>
                      ))}
                    </>
                  )}
                </div>

                {/* Styling Settings */}
                <div className={cn(selectedView === 'styling' ? 'block' : 'hidden')}>
                  <h3 className='text-lg font-bold mb-4'>Styling</h3>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <FormField label="Primary Color" htmlFor="primaryColor">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={formData.styling.primaryColor || '#ffffff'}
                        onChange={(e) => updateFormData({ styling: { ...formData.styling, primaryColor: e.target.value } })}
                      />
                    </FormField>
                    <FormField label="Secondary Color" htmlFor="secondaryColor">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={formData.styling.secondaryColor || '#000000'}
                        onChange={(e) => updateFormData({ styling: { ...formData.styling, secondaryColor: e.target.value } })}
                      />
                    </FormField>
                    <FormField label="Font Family" htmlFor="fontFamily">
                      <Input
                        id="fontFamily"
                        placeholder="e.g., Arial, sans-serif"
                        value={formData.styling.fontFamily || ''}
                        onChange={(e) => updateFormData({ styling: { ...formData.styling, fontFamily: e.target.value } })}
                      />
                    </FormField>
                    <FormField label="Button Style" htmlFor="buttonStyle">
                      <Select
                        value={formData.styling.buttonStyle || ''}
                        onValueChange={(value) => updateFormData({ styling: { ...formData.styling, buttonStyle: value } })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select button style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3d">3D</SelectItem>
                          <SelectItem value="frosted">Frosted</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>
                  </div>
                </div>

                {/* Localization & Regions */}
                <div className={cn(selectedView === 'localization' ? 'block' : 'hidden')}>
                  <h3 className='text-lg font-bold mb-4'>Localization</h3>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold ">Available Languages</Label>
                    <div className="grid grid-cols-1 gap-4">
                      {ALL_LOCALES.map(({ code, name }) => {
                        const selected = !!formData.availableLanguages.find(l => l.locale === code);
                        return (
                          <div key={code} className="flex items-center">
                            <Switch
                              checked={selected}
                              onCheckedChange={(checked) => {
                                const langs = [...formData.availableLanguages];
                                if (checked) {
                                  langs.push({ locale: code, strings: {} });
                                } else {
                                  const idx = langs.findIndex(l => l.locale === code);
                                  if (idx > -1) langs.splice(idx, 1);
                                }
                                updateFormData({ availableLanguages: langs });
                              }}
                            />
                            <span className="ml-2 text-sm ">{name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Publish & Metadata */}
                <div className={cn(selectedView === 'publish' ? 'block' : 'hidden')}>
                  <h3 className='text-lg font-bold mb-4'>Publish & Metadata</h3>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="isPublished" className="text-sm font-bold ">
                      Published
                    </Label>
                    <Switch
                      id="isPublished"
                      checked={formData.isPublished}
                      onCheckedChange={(checked) => updateFormData({ isPublished: checked })}
                    />
                  </div>
                  {formData.createdAt && (
                    <div className="text-sm text-slate-400">
                      Created At: {formData.createdAt}
                    </div>
                  )}
                  {formData.updatedAt && (
                    <div className="text-sm text-slate-400">
                      Updated At: {formData.updatedAt}
                    </div>
                  )}
                </div>

                {/* Available Regions */}
                <div className={cn("flex flex-col space-y-6", selectedView === 'region' ? 'block' : 'hidden')}>
                  <h3 className='text-lg font-bold mb-4'>Available Regions</h3>
                  <FormField label="Available Regions">
                    <div className="grid grid-cols-1 gap-4">
                      {COUNTRIES_LIST.map(({ code, name }) => {
                        const selected = formData.availableRegions.some(region => region.country === code);
                        return (
                          <div key={code} className="flex items-center">
                            <Switch
                              checked={selected}
                              onCheckedChange={(checked) => {
                                const regions = [...formData.availableRegions];
                                if (checked) {
                                  regions.push({ country: code, currency: 'USD', minBet: 1, maxBet: 100, step: 1 });
                                } else {
                                  const idx = regions.findIndex(region => region.country === code);
                                  if (idx > -1) regions.splice(idx, 1);
                                }
                                updateFormData({ availableRegions: regions });
                              }}
                            />
                            <span className="ml-2 text-sm ">{name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </FormField>
                  <FormField label="Blocked Regions">
                    <div className="grid grid-cols-1 gap-4">
                      {COUNTRIES_LIST.map(({ code, name }) => {
                        const blocked = formData.blockedRegions.includes(code);
                        return (
                          <div key={code} className="flex items-center">
                            <Switch
                              checked={blocked}
                              onCheckedChange={(checked) => {
                                const blocked = [...formData.blockedRegions];
                                if (checked) {
                                  blocked.push(code);
                                } else {
                                  const idx = blocked.indexOf(code);
                                  if (idx > -1) blocked.splice(idx, 1);
                                }
                                updateFormData({ blockedRegions: blocked });
                              }}
                            />
                            <span className="ml-2 text-sm ">{name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </FormField>
                </div>
              </>}
            </div>
            <Card className="w-full items-center h-[846px] hover:border-slate-200 flex flex-col gap-6 rounded-none z-20 shadow-none">
              <CardHeader className="flex flex-row items-center justify-between w-full pb-4 border-b">
                <div>
                  <CardTitle className="text-2xl text-slate-900 font-black leading-none">Game Preview</CardTitle>
                  <CardDescription className="text-lg text-slate-500">
                    Preview your game in real-time
                  </CardDescription>
                </div>
                <div className='flex flex-row items-center'>
                  <Switch
                    className="ml-2"
                    checked={deviceMode === 'mobile'}
                    onCheckedChange={(checked) => setDeviceMode(checked ? 'mobile' : 'desktop')}
                  />
                  <span className="ml-2 text-sm">{deviceMode === 'mobile' ? 'Mobile' : 'Desktop'}</span>
                </div>
              </CardHeader>
              {sessionId ? (
                <div className={cn("transition-all max-h-full mx-auto", deviceMode === 'mobile' ? 'w-[420px] h-[746px]' : 'w-[746px] h-[420px]', 'relative')}>
                  <SlotGameEngine
                    gameConfig={{
                      id: formData.id,
                      title: formData.title,
                      description: formData.description,
                      rows: formData.rows,
                      columns: formData.columns,
                      coverImageKey: formData.coverImageKey,
                      backgroundImageKey: formData.backgroundImageKey,
                      frameImageKey: formData.frameImageKey,
                      sounds: formData.sounds,
                      mascot: formData.mascot,
                      slotItems: formData.slotItems,
                      availableLanguages: formData.availableLanguages,
                      availableRegions: formData.availableRegions,
                      blockedRegions: formData.blockedRegions,
                      styling: formData.styling,
                      isPublished: formData.isPublished,
                    } as GameConfig}
                    sessionId={sessionId!}
                    deviceMode={deviceMode}
                    onSpin={async (bet) => {
                      const mockMatrix: string[][] = [];
                      for (let row = 0; row < formData.rows; row++) {
                        mockMatrix[row] = [];
                        for (let col = 0; col < formData.columns; col++) {
                          const randomItem = formData.slotItems[Math.floor(Math.random() * formData.slotItems.length)];
                          mockMatrix[row][col] = randomItem?.id || 'default';
                        }
                      }

                      const isWin = Math.random() < 0.3; // 30% win chance in preview
                      const winAmount = isWin ? bet * (Math.random() * 5 + 1) : 0;

                      return {
                        view: mockMatrix,
                        bet: bet,
                        isWin,
                        winAmount,
                        lines: isWin ? [[0, 0, 0, 1, 1]] : [], // Mock winning line
                        balance: 1000 - bet + winAmount
                      };
                    }}
                    onBalanceUpdate={(balance) => { }}
                  />
                </div>
              ) : null}
            </Card>
          </form>
        </div>
      </div >
    </div >
  );
}