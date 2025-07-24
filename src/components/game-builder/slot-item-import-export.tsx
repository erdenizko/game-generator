'use client';

import { useState } from 'react';
import { EnhancedSlotItem, SlotItemConflict } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Upload, AlertTriangle, Check } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface SlotItemImportExportProps {
  items: EnhancedSlotItem[];
  onImport: (items: EnhancedSlotItem[]) => void;
}

export function SlotItemImportExport({ items, onImport }: SlotItemImportExportProps) {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [importData, setImportData] = useState<string>('');
  const [importError, setImportError] = useState<string | null>(null);
  const [conflicts, setConflicts] = useState<SlotItemConflict[]>([]);
  const [importPreview, setImportPreview] = useState<EnhancedSlotItem[]>([]);
  const [importTab, setImportTab] = useState<string>('paste');
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Sample templates for demonstration
  const templates = [
    { id: 'fruits', name: 'Fruit Symbols', itemCount: 8, description: 'Classic fruit machine symbols' },
    { id: 'cards', name: 'Card Symbols', itemCount: 12, description: 'Playing card symbols with suits' },
    { id: 'gems', name: 'Gem Symbols', itemCount: 6, description: 'Colorful gem and jewel symbols' },
    { id: 'space', name: 'Space Symbols', itemCount: 10, description: 'Planets, stars and space objects' },
  ];

  // Export items as JSON
  const handleExport = () => {
    if (items.length === 0) {
      alert('No slot items to export');
      return;
    }

    const exportData = {
      version: '1.0',
      createdAt: new Date(),
      items: items,
      metadata: {
        gameId: 'current-game',
        itemCount: items.length,
        exportedBy: 'user',
        isTemplate: false,
      }
    };

    // Create and download file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `slot-items-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Parse and validate import data
  const parseImportData = (data: string): EnhancedSlotItem[] | null => {
    try {
      const parsed = JSON.parse(data);
      
      // Basic validation
      if (!parsed.items || !Array.isArray(parsed.items)) {
        setImportError('Invalid format: Missing items array');
        return null;
      }
      
      // Validate each item has required fields
      const validItems = parsed.items.filter((item: Partial<EnhancedSlotItem>) => {
        return item.id && item.name && typeof item.probability === 'number';
      });
      
      if (validItems.length !== parsed.items.length) {
        setImportError(`Warning: ${parsed.items.length - validItems.length} items were invalid and will be skipped`);
      }
      
      if (validItems.length === 0) {
        setImportError('No valid items found in import data');
        return null;
      }
      
      // Ensure all items have required fields with defaults if missing
      const now = new Date();
      return validItems.map((item: Partial<EnhancedSlotItem>, index: number) => ({
        id: item.id || uuidv4(),
        name: item.name,
        imageKey: item.imageKey || '',
        probability: typeof item.probability === 'number' ? item.probability : 0.1,
        revenue: typeof item.revenue === 'number' ? item.revenue : 1,
        minimumCount: typeof item.minimumCount === 'number' ? item.minimumCount : 3,
        diagonalPrize: !!item.diagonalPrize,
        order: typeof item.order === 'number' ? item.order : index,
        category: item.category || '',
        tags: Array.isArray(item.tags) ? item.tags : [],
        isCustom: true,
        createdAt: item.createdAt ? new Date(item.createdAt) : now,
        updatedAt: now,
      }));
    } catch (error) {
      setImportError('Invalid JSON format');
      console.log(error);
      return null;
    }
  };

  // Check for conflicts with existing items
  const checkForConflicts = (importItems: EnhancedSlotItem[]): SlotItemConflict[] => {
    const conflicts: SlotItemConflict[] = [];
    
    importItems.forEach(importItem => {
      // Check for name conflicts
      const existingItem = items.find(item => 
        item.name.toLowerCase() === importItem.name.toLowerCase()
      );
      
      if (existingItem) {
        conflicts.push({
          existingItem,
          importedItem: importItem,
          resolution: 'pending'
        });
      }
    });
    
    return conflicts;
  };

  // Handle import button click
  const handleImportClick = () => {
    setImportError(null);
    setConflicts([]);
    setImportPreview([]);
    setIsImportDialogOpen(true);
  };

  // Process import data
  const processImport = () => {
    setImportError(null);
    
    const parsedItems = parseImportData(importData);
    if (!parsedItems) return;
    
    // Check if adding these would exceed the limit
    if (items.length + parsedItems.length > 20) {
      setImportError(`Importing all items would exceed the maximum of 20 slot items. Only ${20 - items.length} can be imported.`);
      setImportPreview(parsedItems.slice(0, 20 - items.length));
      return;
    }
    
    // Check for conflicts
    const foundConflicts = checkForConflicts(parsedItems);
    setConflicts(foundConflicts);
    
    // Set preview
    setImportPreview(parsedItems);
  };

  // Handle conflict resolution
  const resolveConflict = (index: number, resolution: 'replace' | 'merge' | 'skip') => {
    const updatedConflicts = [...conflicts];
    updatedConflicts[index].resolution = resolution;
    setConflicts(updatedConflicts);
  };

  // Finalize import after resolving conflicts
  const finalizeImport = () => {
    // Filter out items that should be skipped
    const skippedIds = conflicts
      .filter(conflict => conflict.resolution === 'skip')
      .map(conflict => conflict.importedItem.id);
    
    // Get items to be imported (excluding skipped ones)
    let itemsToImport = importPreview.filter(item => !skippedIds.includes(item.id));
    
    // Handle replacements and merges
    conflicts.forEach(conflict => {
      if (conflict.resolution === 'replace') {
        // Remove the existing item
        const existingIndex = items.findIndex(item => item.id === conflict.existingItem.id);
        if (existingIndex >= 0) {
          // Keep the existing item's ID but use imported data
          itemsToImport = itemsToImport.map(item => 
            item.id === conflict.importedItem.id 
              ? { ...item, id: conflict.existingItem.id }
              : item
          );
        }
      } else if (conflict.resolution === 'merge') {
        // Merge properties, keeping existing item's ID
        itemsToImport = itemsToImport.map(item => 
          item.id === conflict.importedItem.id 
            ? { 
                ...conflict.existingItem, 
                name: conflict.importedItem.name,
                probability: conflict.importedItem.probability,
                revenue: conflict.importedItem.revenue,
                minimumCount: conflict.importedItem.minimumCount,
                diagonalPrize: conflict.importedItem.diagonalPrize,
                category: conflict.importedItem.category,
                tags: conflict.importedItem.tags,
                updatedAt: new Date()
              }
            : item
        );
      }
    });
    
    // Create final list by combining existing items with new ones
    const existingItemIds = items.map(item => item.id);
    const finalItems = [
      ...items,
      ...itemsToImport.filter(item => !existingItemIds.includes(item.id))
    ];
    
    // Update order values
    const orderedItems = finalItems.map((item, index) => ({
      ...item,
      order: index
    }));
    
    // Call the onImport callback
    onImport(orderedItems);
    
    // Close dialog
    setIsImportDialogOpen(false);
    setImportData('');
    setImportError(null);
    setConflicts([]);
    setImportPreview([]);
  };

  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  // Apply selected template
  const applyTemplate = () => {
    // In a real implementation, this would fetch the template data from an API
    // For now, we'll just simulate it with sample data
    const now = new Date();
    
    let templateItems: EnhancedSlotItem[] = [];
    
    if (selectedTemplate === 'fruits') {
      templateItems = [
        { id: uuidv4(), name: 'Cherry', imageKey: '', probability: 0.2, revenue: 1, minimumCount: 3, diagonalPrize: false, order: 0, isCustom: true, createdAt: now, updatedAt: now, category: 'Fruit' },
        { id: uuidv4(), name: 'Orange', imageKey: '', probability: 0.18, revenue: 1.5, minimumCount: 3, diagonalPrize: false, order: 1, isCustom: true, createdAt: now, updatedAt: now, category: 'Fruit' },
        { id: uuidv4(), name: 'Lemon', imageKey: '', probability: 0.15, revenue: 2, minimumCount: 3, diagonalPrize: false, order: 2, isCustom: true, createdAt: now, updatedAt: now, category: 'Fruit' },
        { id: uuidv4(), name: 'Plum', imageKey: '', probability: 0.12, revenue: 2.5, minimumCount: 3, diagonalPrize: false, order: 3, isCustom: true, createdAt: now, updatedAt: now, category: 'Fruit' },
        { id: uuidv4(), name: 'Watermelon', imageKey: '', probability: 0.1, revenue: 3, minimumCount: 3, diagonalPrize: true, order: 4, isCustom: true, createdAt: now, updatedAt: now, category: 'Fruit' },
        { id: uuidv4(), name: 'Grapes', imageKey: '', probability: 0.08, revenue: 4, minimumCount: 3, diagonalPrize: true, order: 5, isCustom: true, createdAt: now, updatedAt: now, category: 'Fruit' },
        { id: uuidv4(), name: 'Seven', imageKey: '', probability: 0.05, revenue: 7, minimumCount: 2, diagonalPrize: true, order: 6, isCustom: true, createdAt: now, updatedAt: now, category: 'Special' },
        { id: uuidv4(), name: 'Bell', imageKey: '', probability: 0.03, revenue: 10, minimumCount: 2, diagonalPrize: true, order: 7, isCustom: true, createdAt: now, updatedAt: now, category: 'Special' },
      ];
    } else if (selectedTemplate === 'cards') {
      templateItems = [
        { id: uuidv4(), name: 'Ace of Spades', imageKey: '', probability: 0.08, revenue: 5, minimumCount: 2, diagonalPrize: true, order: 0, isCustom: true, createdAt: now, updatedAt: now, category: 'Ace' },
        { id: uuidv4(), name: 'Ace of Hearts', imageKey: '', probability: 0.08, revenue: 5, minimumCount: 2, diagonalPrize: true, order: 1, isCustom: true, createdAt: now, updatedAt: now, category: 'Ace' },
        { id: uuidv4(), name: 'Ace of Clubs', imageKey: '', probability: 0.08, revenue: 5, minimumCount: 2, diagonalPrize: true, order: 2, isCustom: true, createdAt: now, updatedAt: now, category: 'Ace' },
        { id: uuidv4(), name: 'Ace of Diamonds', imageKey: '', probability: 0.08, revenue: 5, minimumCount: 2, diagonalPrize: true, order: 3, isCustom: true, createdAt: now, updatedAt: now, category: 'Ace' },
        // Add more card symbols as needed
      ];
    } else if (selectedTemplate === 'gems') {
      templateItems = [
        { id: uuidv4(), name: 'Diamond', imageKey: '', probability: 0.05, revenue: 10, minimumCount: 3, diagonalPrize: true, order: 0, isCustom: true, createdAt: now, updatedAt: now, category: 'Gem' },
        { id: uuidv4(), name: 'Ruby', imageKey: '', probability: 0.1, revenue: 5, minimumCount: 3, diagonalPrize: true, order: 1, isCustom: true, createdAt: now, updatedAt: now, category: 'Gem' },
        { id: uuidv4(), name: 'Emerald', imageKey: '', probability: 0.15, revenue: 3, minimumCount: 3, diagonalPrize: false, order: 2, isCustom: true, createdAt: now, updatedAt: now, category: 'Gem' },
        { id: uuidv4(), name: 'Sapphire', imageKey: '', probability: 0.2, revenue: 2, minimumCount: 3, diagonalPrize: false, order: 3, isCustom: true, createdAt: now, updatedAt: now, category: 'Gem' },
        { id: uuidv4(), name: 'Amethyst', imageKey: '', probability: 0.25, revenue: 1.5, minimumCount: 3, diagonalPrize: false, order: 4, isCustom: true, createdAt: now, updatedAt: now, category: 'Gem' },
        { id: uuidv4(), name: 'Topaz', imageKey: '', probability: 0.25, revenue: 1, minimumCount: 3, diagonalPrize: false, order: 5, isCustom: true, createdAt: now, updatedAt: now, category: 'Gem' },
      ];
    }
    
    // Set as import preview
    setImportPreview(templateItems);
    
    // Check for conflicts
    const foundConflicts = checkForConflicts(templateItems);
    setConflicts(foundConflicts);
    
    // Close template dialog and open import dialog
    setIsTemplateDialogOpen(false);
    setIsImportDialogOpen(true);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleImportClick}
          className="flex items-center gap-1"
        >
          <Upload className="h-4 w-4" />
          Import Items
        </Button>
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsTemplateDialogOpen(true)}
          className="flex items-center gap-1"
        >
          <Upload className="h-4 w-4" />
          Use Template
        </Button>
      </div>
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleExport}
        disabled={items.length === 0}
        className="flex items-center gap-1"
      >
        <Download className="h-4 w-4" />
        Export Items
      </Button>
      
      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Import Slot Items</DialogTitle>
            <DialogDescription>
              Import slot items from a JSON file or paste JSON data directly.
            </DialogDescription>
          </DialogHeader>
          
          {importPreview.length === 0 ? (
            <Tabs defaultValue="paste" value={importTab} onValueChange={setImportTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="paste">Paste JSON</TabsTrigger>
                <TabsTrigger value="upload">Upload File</TabsTrigger>
              </TabsList>
              
              <TabsContent value="paste" className="mt-0">
                <div className="space-y-4">
                  <textarea
                    className="w-full h-64 p-3 border rounded-md font-mono text-sm"
                    placeholder="Paste JSON data here..."
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                  />
                  
                  {importError && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <p className="text-sm text-red-700">{importError}</p>
                    </div>
                  )}
                  
                  <Button onClick={processImport} disabled={!importData.trim()}>
                    Process Import
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="upload" className="mt-0">
                <div className="space-y-4">
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      id="file-upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setImportData(event.target?.result as string);
                          };
                          reader.readAsText(file);
                        }
                      }}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground">JSON files only</p>
                      </div>
                    </label>
                  </div>
                  
                  {importData && (
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <p className="text-sm">File loaded successfully</p>
                    </div>
                  )}
                  
                  {importError && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <p className="text-sm text-red-700">{importError}</p>
                    </div>
                  )}
                  
                  <Button onClick={processImport} disabled={!importData.trim()}>
                    Process Import
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Import Preview</h3>
                <Badge variant="outline">
                  {importPreview.length} items
                </Badge>
              </div>
              
              {importError && (
                <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <p className="text-sm text-yellow-700">{importError}</p>
                </div>
              )}
              
              <div className="max-h-64 overflow-y-auto border rounded-md">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 sticky top-0">
                    <tr>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Probability</th>
                      <th className="p-2 text-left">Revenue</th>
                      <th className="p-2 text-left">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {importPreview.map((item, index) => (
                      <tr key={`${item.id}-${index}`} className="border-t">
                        <td className="p-2">{item.name}</td>
                        <td className="p-2">{(item.probability * 100).toFixed(1)}%</td>
                        <td className="p-2">{item.revenue}x</td>
                        <td className="p-2">{item.category || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {conflicts.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-md font-medium">Conflicts Found</h3>
                  <p className="text-sm text-muted-foreground">
                    The following items have name conflicts with existing items. Please choose how to resolve each conflict.
                  </p>
                  
                  <div className="space-y-3">
                    {conflicts.map((conflict, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Conflict: {conflict.importedItem.name}</h4>
                            <Badge variant={conflict.resolution !== 'pending' ? 'outline' : 'destructive'}>
                              {conflict.resolution === 'pending' ? 'Unresolved' : conflict.resolution}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm font-medium">Existing Item:</p>
                              <ul className="text-xs space-y-1 mt-1">
                                <li>Probability: {(conflict.existingItem.probability * 100).toFixed(1)}%</li>
                                <li>Revenue: {conflict.existingItem.revenue}x</li>
                                <li>Min Count: {conflict.existingItem.minimumCount}</li>
                              </ul>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Imported Item:</p>
                              <ul className="text-xs space-y-1 mt-1">
                                <li>Probability: {(conflict.importedItem.probability * 100).toFixed(1)}%</li>
                                <li>Revenue: {conflict.importedItem.revenue}x</li>
                                <li>Min Count: {conflict.importedItem.minimumCount}</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant={conflict.resolution === 'replace' ? 'default' : 'outline'}
                              onClick={() => resolveConflict(index, 'replace')}
                            >
                              Replace
                            </Button>
                            <Button 
                              size="sm" 
                              variant={conflict.resolution === 'merge' ? 'default' : 'outline'}
                              onClick={() => resolveConflict(index, 'merge')}
                            >
                              Merge
                            </Button>
                            <Button 
                              size="sm" 
                              variant={conflict.resolution === 'skip' ? 'default' : 'outline'}
                              onClick={() => resolveConflict(index, 'skip')}
                            >
                              Skip
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              Cancel
            </Button>
            
            {importPreview.length > 0 && (
              <Button 
                onClick={finalizeImport}
                disabled={conflicts.some(c => c.resolution === 'pending')}
              >
                {conflicts.some(c => c.resolution === 'pending') 
                  ? 'Resolve All Conflicts' 
                  : 'Import Items'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Template Dialog */}
      <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Template</DialogTitle>
            <DialogDescription>
              Choose a pre-configured set of slot items to use as a starting point.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-3 py-4">
            {templates.map(template => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all ${
                  selectedTemplate === template.id ? 'border-primary' : ''
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                  <Badge variant="outline">{template.itemCount} items</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTemplateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={applyTemplate} disabled={!selectedTemplate}>
              Use Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}