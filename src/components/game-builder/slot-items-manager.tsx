
'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { FileUpload } from './file-upload';
import { PlusCircle, Upload, Download } from 'lucide-react';
import { SlotItemPreview } from './slot-item-preview';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { SlotItem } from '@/types/SlotItem';
import { Card } from '../ui/card';


interface SlotItemsManagerProps {
  slotItems: SlotItem[];
  onSlotItemsChange: (items: SlotItem[]) => void;
  gameId: string;
}

export function SlotItemsManager({ slotItems, onSlotItemsChange, gameId }: SlotItemsManagerProps) {

  const { toast } = useToast();
  const [importExportData, setImportExportData] = useState('');
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  const [isEditing, setIsEditing] = useState<string | null>(null);

  const safeSlotItems = useMemo(() => Array.isArray(slotItems) ? slotItems : [], [slotItems]);

  const addSlotItem = useCallback(() => {
    if (safeSlotItems.length >= 10) {
      toast({
        title: "Limit Reached",
        description: "You can add a maximum of 10 slot items.",
      });
      return;
    }
    const newItem: SlotItem = {
      id: `item-${Date.now()}`,
      name: '',
      imageKey: '',
      probability: 0.1,
      revenue: 10,
      minimumCount: 3,
      diagonalPrize: false,
    };
    onSlotItemsChange([...safeSlotItems, newItem]);
    setIsEditing(newItem.id); // Automatically start editing the new item
  }, [safeSlotItems, onSlotItemsChange, toast]);

  const updateSlotItem = useCallback((id: string, updates: Partial<SlotItem>) => {
    onSlotItemsChange(safeSlotItems.map(item =>
      item.id === id ? { ...item, ...updates } : item
    ));
  }, [safeSlotItems, onSlotItemsChange]);

  const removeSlotItem = useCallback((id: string) => {
    onSlotItemsChange(safeSlotItems.filter(item => item.id !== id));
  }, [safeSlotItems, onSlotItemsChange]);

  const handleExport = useCallback(() => {
    const data = JSON.stringify(safeSlotItems, null, 2);
    setImportExportData(data);
    navigator.clipboard.writeText(data);
    toast({
      title: "Slot Items Exported",
      description: "JSON data copied to clipboard.",
    });
  }, [safeSlotItems, toast]);

  const handleImport = useCallback(() => {
    try {
      const importedItems: SlotItem[] = JSON.parse(importExportData);
      if (!Array.isArray(importedItems)) {
        throw new Error("Invalid JSON format. Expected an array.");
      }
      const validatedItems = importedItems.map(item => ({
        id: item.id || `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        name: item.name || 'Unnamed Item',
        imageKey: item.imageKey || '',
        probability: Math.max(0, Math.min(1, item.probability || 0.1)),
        revenue: Math.max(0, item.revenue || 10),
        minimumCount: Math.max(1, item.minimumCount || 3),
        diagonalPrize: typeof item.diagonalPrize === 'boolean' ? item.diagonalPrize : false,
      }));

      if (validatedItems.length > 10) {
        toast({
          title: "Import Warning",
          description: "Imported data contains more than 10 items. Only the first 10 will be used."
        });
        onSlotItemsChange(validatedItems.slice(0, 10));
      } else {
        onSlotItemsChange(validatedItems);
      }
      toast({
        title: "Slot Items Imported",
        description: "Successfully imported slot items."
      });
      setIsImportDialogOpen(false);
    } catch (error) {
      console.error("Import failed:", error);
      toast({
        title: "Import Error",
        description: `Failed to import slot items: ${error instanceof Error ? error.message : String(error)}`
      });
    }
  }, [importExportData, onSlotItemsChange, toast]);

  return (
    <div className="space-y-6">

      {safeSlotItems.length === 0 && (
        <p className="text-center text-muted-foreground">{`No slot items defined yet. Click 'Add Slot Item' to get started.`}</p>
      )}

      <div className="flex flex-col gap-6">
        {safeSlotItems.map((item, index) => {
          if (isEditing === item.id) {
            return (
              <Card key={`item-${item.id}-${index}`} className="border rounded-lg p-4 space-y-4 relative">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Slot Item: {item.name || 'Unnamed'}</h3>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(null)}
                    >
                      Done
                    </Button>
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  <div className="space-y-2">
                    <Label htmlFor={`name-${item.id}`}>Name</Label>
                    <Input
                      id={`name-${item.id}`}
                      value={item.name}
                      onChange={(e) => updateSlotItem(item.id, { name: e.target.value })}
                      placeholder="e.g., Cherry, Bell, BAR"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Image</Label>
                    <FileUpload
                      gameId={gameId}
                      assetType="image"
                      value={item.imageKey}
                      onChange={(value) => updateSlotItem(item.id, { imageKey: value })}
                      accept="image/*"
                      maxSize={2 * 1024 * 1024} // 2MB
                      description="Upload image for this slot item (JPG, PNG, WebP - max 2MB)"
                    />
                  </div>
                </div>

                <div className='flex flex-col gap-2'>
                  <div className="space-y-2">
                    <Label htmlFor={`probability-${item.id}`}>Probability (0-1)</Label>
                    <Input
                      id={`probability-${item.id}`}
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={item.probability}
                      onChange={(e) => updateSlotItem(item.id, { probability: parseFloat(e.target.value) })}
                    />
                    <p className="text-sm text-muted-foreground">
                      Likelihood of this item appearing (e.g., 0.1 for 10%)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`revenue-${item.id}`}>Revenue</Label>
                    <Input
                      id={`revenue-${item.id}`}
                      type="number"
                      step="1"
                      min="0"
                      value={item.revenue}
                      onChange={(e) => updateSlotItem(item.id, { revenue: parseInt(e.target.value) })}
                    />
                    <p className="text-sm text-muted-foreground">
                      Base revenue generated when this item contributes to a win
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`min-count-${item.id}`}>Minimum Count for Win</Label>
                    <Input
                      id={`min-count-${item.id}`}
                      type="number"
                      step="1"
                      min="1"
                      value={item.minimumCount}
                      onChange={(e) => updateSlotItem(item.id, { minimumCount: parseInt(e.target.value) })}
                    />
                    <p className="text-sm text-muted-foreground">
                      Minimum number of consecutive items for a win (e.g., 3 for 3-in-a-row)
                    </p>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <Label className="text-base">Diagonal Prize</Label>
                      <p className="text-sm text-muted-foreground">
                        Can this item contribute to diagonal winning lines?
                      </p>
                    </div>
                    <Switch
                      checked={item.diagonalPrize}
                      onCheckedChange={(checked) => updateSlotItem(item.id, { diagonalPrize: checked })}
                    />
                  </div>
                </div>
              </Card>
            );
          }

          return (
            <SlotItemPreview
              key={`item-${item.id}-${index}`}
              item={item}
              onRemove={() => removeSlotItem(item.id)}
              onEdit={() => setIsEditing(item.id)}
            />
          );
        })}
      </div>

      <Button type="button" variant="outline" onClick={addSlotItem} className="w-full">
        <PlusCircle className="h-4 w-4 mr-2" /> Add Slot Item
      </Button>
    </div>
  );
}
