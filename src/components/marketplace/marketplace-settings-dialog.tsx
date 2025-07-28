'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { GameConfig } from '@/lib/types';
import { Settings, DollarSign, Star } from 'lucide-react';

// Validation schema
const marketplaceSettingsSchema = z.object({
  isAvailableForSale: z.boolean(),
  marketplacePrice: z.number().min(0.01, 'Price must be at least $0.01').optional(),
  marketplaceDescription: z.string().max(2000, 'Description must be less than 2000 characters').optional(),
  isFeatured: z.boolean(),
}).refine((data) => {
  if (data.isAvailableForSale && !data.marketplacePrice) {
    return false;
  }
  return true;
}, {
  message: "Price is required when making game available for sale",
  path: ["marketplacePrice"],
});

type MarketplaceSettingsForm = z.infer<typeof marketplaceSettingsSchema>;

interface MarketplaceSettingsDialogProps {
  game: GameConfig;
  onSettingsUpdate: () => void;
}

export function MarketplaceSettingsDialog({ 
  game, 
  onSettingsUpdate 
}: MarketplaceSettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<MarketplaceSettingsForm>({
    resolver: zodResolver(marketplaceSettingsSchema),
    defaultValues: {
      isAvailableForSale: game.isAvailableForSale || false,
      marketplacePrice: game.marketplacePrice || undefined,
      marketplaceDescription: game.marketplaceDescription || '',
      isFeatured: game.isFeatured || false,
    },
  });

  const onSubmit = async (data: MarketplaceSettingsForm) => {
    if (!game.id) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/marketplace/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({
          gameId: game.id,
          ...data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to update marketplace settings');
      }

      toast({
        title: 'Success',
        description: 'Marketplace settings updated successfully',
      });

      setOpen(false);
      onSettingsUpdate();
    } catch (error) {
      console.error('Update marketplace settings error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update marketplace settings',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isAvailableForSale = form.watch('isAvailableForSale');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <Settings className="w-4 h-4 mr-2" />
          Marketplace Settings
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Marketplace Settings
          </DialogTitle>
          <DialogDescription>
            Configure how your game appears in the marketplace
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Available for Sale Toggle */}
            <FormField
              control={form.control}
              name="isAvailableForSale"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Available for Sale
                    </FormLabel>
                    <FormDescription>
                      Make this game available for purchase in the marketplace
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Price Field - Only shown when available for sale */}
            {isAvailableForSale && (
              <FormField
                control={form.control}
                name="marketplacePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      Price (USD)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0.01"
                        placeholder="9.99"
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormDescription>
                      Set the price for your game in USD
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Description Field */}
            <FormField
              control={form.control}
              name="marketplaceDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marketplace Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your game for potential buyers..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional description to showcase your game in the marketplace
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Featured Toggle - Only shown when available for sale */}
            {isAvailableForSale && (
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Featured Game
                      </FormLabel>
                      <FormDescription>
                        Promote this game as a featured listing
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Settings'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}