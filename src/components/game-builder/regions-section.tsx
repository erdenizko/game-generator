'use client';

import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { UpdateGameRequest } from '@/lib/validation/game';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Globe, Ban } from 'lucide-react';

interface RegionsSectionProps {
  form: UseFormReturn<UpdateGameRequest>;
}

const COUNTRIES = [
  { code: 'USA', name: 'United States', currency: 'USD' },
  { code: 'CAN', name: 'Canada', currency: 'CAD' },
  { code: 'GBR', name: 'United Kingdom', currency: 'GBP' },
  { code: 'EUR', name: 'European Union', currency: 'EUR' },
  { code: 'AUS', name: 'Australia', currency: 'AUD' },
  { code: 'JPN', name: 'Japan', currency: 'JPY' },
  { code: 'KOR', name: 'South Korea', currency: 'KRW' },
  { code: 'CHN', name: 'China', currency: 'CNY' },
  { code: 'IND', name: 'India', currency: 'INR' },
  { code: 'BRA', name: 'Brazil', currency: 'BRL' },
  { code: 'MEX', name: 'Mexico', currency: 'MXN' },
  { code: 'RUS', name: 'Russia', currency: 'RUB' },
  { code: 'ZAF', name: 'South Africa', currency: 'ZAR' },
  { code: 'SGP', name: 'Singapore', currency: 'SGD' },
  { code: 'HKG', name: 'Hong Kong', currency: 'HKD' },
];

const CURRENCIES = [
  'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'SEK', 'NZD',
  'MXN', 'SGD', 'HKD', 'NOK', 'KRW', 'TRY', 'RUB', 'INR', 'BRL', 'ZAR'
];

export function RegionsSection({ form }: RegionsSectionProps) {
  const { fields: regionFields, append: appendRegion, remove: removeRegion } = useFieldArray({
    control: form.control,
    name: 'availableRegions',
  });

  const blockedRegions = form.watch('blockedRegions') || [];

  const addRegion = () => {
    appendRegion({
      country: '',
      currency: 'USD',
      minBet: 0.01,
      maxBet: 100,
      step: 0.01,
    });
  };

  const removeRegionItem = (index: number) => {
    removeRegion(index);
  };

  const addBlockedRegion = (countryCode: string) => {
    const currentBlocked = form.getValues('blockedRegions') || [];
    if (!currentBlocked.includes(countryCode)) {
      form.setValue('blockedRegions', [...currentBlocked, countryCode]);
    }
  };

  const removeBlockedRegion = (index: number) => {
    const currentBlocked = form.getValues('blockedRegions') || [];
    const newBlocked = currentBlocked.filter((_, i) => i !== index);
    form.setValue('blockedRegions', newBlocked);
  };

  const getCountryName = (code: string) => {
    return COUNTRIES.find(c => c.code === code)?.name || code;
  };

  return (
    <div className="space-y-6">
      {/* Available Regions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Available Regions
              </CardTitle>
              <CardDescription>
                Configure betting limits and currencies for different regions
              </CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addRegion}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Region
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {regionFields.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No regions configured yet.</p>
              <p className="text-sm">Add regions to set betting limits and currencies.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {regionFields.map((field, index) => (
                <Card key={field.id} className="relative">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Region {index + 1}
                      </CardTitle>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRegionItem(index)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`availableRegions.${index}.country`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {COUNTRIES.map((country) => (
                                  <SelectItem key={country.code} value={country.code}>
                                    {country.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              3-letter country code
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`availableRegions.${index}.currency`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Currency</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {CURRENCIES.map((currency) => (
                                  <SelectItem key={currency} value={currency}>
                                    {currency}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              3-letter currency code
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`availableRegions.${index}.minBet`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Bet</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.01"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormDescription>
                              Minimum bet amount
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`availableRegions.${index}.maxBet`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximum Bet</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="100.00"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormDescription>
                              Maximum bet amount
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`availableRegions.${index}.step`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bet Step</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                min="0.01"
                                placeholder="0.01"
                                {...field}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0.01)}
                              />
                            </FormControl>
                            <FormDescription>
                              Bet increment step
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Blocked Regions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Ban className="h-5 w-5" />
                Blocked Regions
              </CardTitle>
              <CardDescription>
                Restrict access from specific countries or regions
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Add blocked region */}
            <div className="flex items-center gap-2">
              <Select onValueChange={addBlockedRegion}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Block country" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem 
                      key={country.code} 
                      value={country.code}
                      disabled={blockedRegions.includes(country.code)}
                    >
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Blocked regions list */}
            {blockedRegions.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <Ban className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No regions blocked.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {blockedRegions.map((countryCode, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm"
                  >
                    <Ban className="h-3 w-3" />
                    <span>{getCountryName(countryCode)}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBlockedRegion(index)}
                      className="h-4 w-4 p-0 hover:bg-destructive/20"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {blockedRegions.length > 0 && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> Players from blocked regions will not be able to access your game. 
                Make sure this complies with your licensing and legal requirements.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}