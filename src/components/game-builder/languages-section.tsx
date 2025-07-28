'use client';

import { useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { UpdateGameRequest } from '@/lib/validation/game';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Languages, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface LanguagesSectionProps {
  form: UseFormReturn<UpdateGameRequest>;
}

export const COMMON_LOCALES = [
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
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'tr', name: 'Turkish' },
  { code: 'pl', name: 'Polish' },
  { code: 'nl', name: 'Dutch' },
];

export const DEFAULT_STRINGS = {
  'game.title': 'Slot Game',
  'game.spin': 'Spin',
  'game.bet': 'Bet',
  'game.win': 'You Win!',
  'game.lose': 'Try Again',
  'game.balance': 'Balance',
  'game.totalBet': 'Total Bet',
  'game.winAmount': 'Win Amount',
  'game.autoplay': 'Auto Play',
  'game.maxBet': 'Max Bet',
  'game.settings': 'Settings',
  'game.sound': 'Sound',
  'game.music': 'Music',
  'game.paytable': 'Paytable',
  'game.rules': 'Rules',
  'game.loading': 'Loading...',
  'game.error': 'An error occurred',
  'game.insufficientFunds': 'Insufficient funds',
  'game.congratulations': 'Congratulations!',
  'game.bigWin': 'Big Win!',
  'game.jackpot': 'Jackpot!',
};

export function LanguagesSection({ form }: LanguagesSectionProps) {
  const [editingLanguage, setEditingLanguage] = useState<number | null>(null);
  const [stringsText, setStringsText] = useState('');

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: 'availableLanguages',
  });

  const addLanguage = (locale: string) => {
    const existingLanguage = fields.find(field => field.locale === locale);
    if (existingLanguage) return;

    append({
      locale,
      strings: { ...DEFAULT_STRINGS },
    });
  };

  const removeLanguage = (index: number) => {
    remove(index);
  };

  const openEditDialog = (index: number) => {
    const language = fields[index];
    setEditingLanguage(index);
    setStringsText(JSON.stringify(language.strings, null, 2));
  };

  const saveStrings = () => {
    if (editingLanguage === null) return;

    try {
      const parsedStrings = JSON.parse(stringsText);
      const currentLanguage = fields[editingLanguage];

      update(editingLanguage, {
        ...currentLanguage,
        strings: parsedStrings,
      });

      setEditingLanguage(null);
      setStringsText('');
    } catch (error) {
      console.error('Invalid JSON:', error);
      // You might want to show an error message here
    }
  };

  const getLanguageName = (locale: string) => {
    return COMMON_LOCALES.find(l => l.code === locale)?.name || locale.toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Languages & Localization
            </CardTitle>
            <CardDescription>
              Add support for multiple languages in your game
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Language Selection */}
        <div className="flex items-center gap-2">
          <Select onValueChange={addLanguage}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Add language" />
            </SelectTrigger>
            <SelectContent>
              {COMMON_LOCALES.map((locale) => (
                <SelectItem
                  key={locale.code}
                  value={locale.code}
                  disabled={fields.some(field => field.locale === locale.code)}
                >
                  {locale.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addLanguage('custom')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Custom Locale
          </Button>
        </div>

        {/* Languages List */}
        {fields.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Languages className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No languages configured yet.</p>
            <p className="text-sm">Add languages to support international players.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <Card key={field.id} className="relative">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">
                          {field.locale.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <FormField
                          control={form.control}
                          name={`availableLanguages.${index}.locale`}
                          render={({ field: localeField }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Locale code (e.g., en, es, fr)"
                                  className="w-32"
                                  {...localeField}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <p className="text-sm text-muted-foreground">
                          {getLanguageName(field.locale)} • {Object.keys(field.strings).length} strings
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(index)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Strings
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>
                              Edit {getLanguageName(field.locale)} Strings
                            </DialogTitle>
                            <DialogDescription>
                              Edit the translation strings for this language. Use JSON format.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Textarea
                              value={stringsText}
                              onChange={(e) => setStringsText(e.target.value)}
                              placeholder="Enter JSON strings..."
                              className="min-h-[400px] font-mono text-sm"
                            />
                            <div className="flex justify-end gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  setEditingLanguage(null);
                                  setStringsText('');
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                type="button"
                                onClick={saveStrings}
                              >
                                Save Strings
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLanguage(index)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Preview of some strings */}
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      String Preview:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(field.strings).slice(0, 4).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                      {Object.keys(field.strings).length > 4 && (
                        <div className="col-span-2 text-center text-muted-foreground">
                          ... and {Object.keys(field.strings).length - 4} more
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {fields.length > 0 && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Tip:</strong> The first language in the list will be used as the default.
              Make sure to include all necessary game strings for each language.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}