import { z } from 'zod';

// Game sounds validation schema
export const gameSoundsSchema = z.object({
  spin: z.string().optional(),
  click: z.string().optional(),
  win: z.string().optional(),
  lose: z.string().optional(),
  backgroundMusic: z.string().optional(),
}).optional();

// Mascot configuration validation schema
export const mascotConfigSchema = z.object({
  enabled: z.boolean(),
  startFile: z.string().optional(),
  spinFile: z.string().optional(),
  loseFile: z.string().optional(),
  winFile: z.string().optional(),
  idleFile: z.string().optional(),
}).optional();

// Slot item validation schema
export const slotItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Slot item name is required').max(100, 'Name must be 100 characters or less'),
  imageKey: z.string().min(1, 'Image key is required'),
  probability: z.number().min(0, 'Probability must be between 0 and 1').max(1, 'Probability must be between 0 and 1'),
  revenue: z.number().optional(),
  minimumCount: z.number().int().min(1, 'Minimum count must be at least 1'),
  diagonalPrize: z.boolean(),
});

// Enhanced slot item validation schema
export const enhancedSlotItemSchema = slotItemSchema.extend({
  order: z.number().int().min(0, 'Order must be non-negative'),
  category: z.string().max(50, 'Category must be 50 characters or less').optional(),
  tags: z.array(z.string().max(30, 'Tag must be 30 characters or less')).max(10, 'Maximum 10 tags allowed').optional(),
  isCustom: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
}).refine(data => data.probability >= 0 && data.probability <= 1, {
  message: 'Probability must be between 0 and 1',
  path: ['probability'],
});

// Language validation schema
export const languageSchema = z.object({
  locale: z.string().min(2, 'Locale must be at least 2 characters').max(10, 'Locale must be 10 characters or less'),
  strings: z.record(z.string(), z.string()),
});

// Region validation schema
export const regionSchema = z.object({
  country: z.string().length(3, 'Country code must be exactly 3 characters'),
  currency: z.string().length(3, 'Currency code must be exactly 3 characters'),
  minBet: z.number().positive('Minimum bet must be positive'),
  maxBet: z.number().positive('Maximum bet must be positive'),
  step: z.number().positive('Step must be positive'),
}).refine(data => data.maxBet > data.minBet, {
  message: 'Maximum bet must be greater than minimum bet',
  path: ['maxBet'],
});

// Game styling validation schema
export const gameStylingSchema = z.object({
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  accentColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
  fontFamily: z.string().optional(),
  buttonStyle: z.string().optional(),
  layoutType: z.string().optional(),
}).optional();

// Create game request validation schema
export const createGameSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be 255 characters or less'),
  description: z.string().max(1000, 'Description must be 1000 characters or less').optional(),
  rows: z.number().int().min(1, 'Rows must be at least 1').max(10, 'Rows must be 10 or less'),
  columns: z.number().int().min(1, 'Columns must be at least 1').max(10, 'Columns must be 10 or less'),
  coverImageKey: z.string().optional(),
  sounds: gameSoundsSchema.optional(),
  mascot: mascotConfigSchema.optional(),
  backgroundImageKey: z.string().optional(),
  frameImageKey: z.string().optional(),
  slotItems: z.array(slotItemSchema).max(20, 'Maximum 20 slot items allowed').default([]),
  availableLanguages: z.array(languageSchema).optional().default([]),
  availableRegions: z.array(regionSchema).optional().default([]),
  blockedRegions: z.array(z.string().length(3, 'Country code must be exactly 3 characters')).optional().default([]),
  styling: gameStylingSchema.optional(),
});

// Update game request validation schema
export const updateGameSchema = createGameSchema.partial().extend({
  id: z.string().uuid('Invalid game ID format'),
});

// Game query parameters validation schema
export const gameQuerySchema = z.object({
  page: z.string().optional().default('1').transform(val => parseInt(val, 10)).pipe(z.number().int().min(1)),
  limit: z.string().optional().default('10').transform(val => parseInt(val, 10)).pipe(z.number().int().min(1).max(100)),
  search: z.string().optional(),
  published: z.string().optional().transform(val => val ? val === 'true' : undefined),
  sortBy: z.enum(['title', 'createdAt', 'updatedAt']).optional().default('updatedAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

// Game ID parameter validation schema
export const gameIdSchema = z.object({
  id: z.string().uuid('Invalid game ID format'),
});

// Preview session validation schemas
export const createPreviewSessionSchema = z.object({
  gameId: z.string().uuid('Invalid game ID format'),
});

export const previewSessionIdSchema = z.object({
  sessionId: z.string().uuid('Invalid session ID format'),
});

// Validation helper functions
export function validateCreateGame(data: unknown) {
  return createGameSchema.parse(data);
}

export function validateUpdateGame(data: unknown) {
  return updateGameSchema.parse(data);
}

export function validateGameQuery(query: unknown) {
  return gameQuerySchema.parse(query);
}

export function validateGameId(params: unknown) {
  return gameIdSchema.parse(params);
}

export function validateCreatePreviewSession(data: unknown) {
  return createPreviewSessionSchema.parse(data);
}

export function validatePreviewSessionId(params: unknown) {
  return previewSessionIdSchema.parse(params);
}

// Type exports for use in API routes
export type CreateGameRequest = z.infer<typeof createGameSchema>;
export type UpdateGameRequest = z.infer<typeof updateGameSchema>;
export type GameQueryParams = z.infer<typeof gameQuerySchema>;
export type GameIdParams = z.infer<typeof gameIdSchema>;
export type CreatePreviewSessionRequest = z.infer<typeof createPreviewSessionSchema>;
export type PreviewSessionIdParams = z.infer<typeof previewSessionIdSchema>;

// Color theme validation schema
export const colorThemeSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Primary color must be a valid hex color code'),
  secondaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Secondary color must be a valid hex color code'),
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Accent color must be a valid hex color code').optional(),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Background color must be a valid hex color code').optional(),
  textColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Text color must be a valid hex color code').optional(),
  contrastRatio: z.number().min(1, 'Contrast ratio must be at least 1').max(21, 'Contrast ratio cannot exceed 21').optional(),
  isAccessible: z.boolean().default(false),
});

// Control layout validation schema
export const controlLayoutSchema = z.object({
  type: z.enum(['classic', 'compact', 'modern', 'minimal']),
  buttonStyle: z.enum(['rounded', 'square', 'pill', 'neon']),
  position: z.enum(['bottom', 'right', 'split', 'overlay']),
  autoHide: z.boolean().default(false),
  customStyles: z.record(z.string(), z.string()).optional(),
});

// Enhanced game styling validation schema
export const enhancedGameStylingSchema = z.object({
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  accentColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
  fontFamily: z.string().optional(),
  buttonStyle: z.string().optional(),
  layoutType: z.string().optional(),
  colorTheme: colorThemeSchema.optional(),
  controlLayout: controlLayoutSchema.optional(),
}).optional();

// Enhanced create game request validation schema
export const enhancedCreateGameSchema = createGameSchema.extend({
  slotItems: z.array(enhancedSlotItemSchema).max(20, 'Maximum 20 slot items allowed').optional().default([]),
  colorTheme: colorThemeSchema.optional(),
  controlLayout: controlLayoutSchema.optional(),
  version: z.string().optional(),
}).refine(data => {
  // Validate that total probabilities don't exceed logical limits
  if (data.slotItems && data.slotItems.length > 0) {
    const totalProbability = data.slotItems.reduce((sum, item) => sum + item.probability, 0);
    return totalProbability <= 1.01; // Allow small floating point errors
  }
  return true;
}, {
  message: 'Total probability of all slot items cannot exceed 1',
  path: ['slotItems'],
}).refine(data => {
  // Validate minimum number of slot items
  return !data.slotItems || data.slotItems.length >= 3;
}, {
  message: 'At least 3 slot items are required',
  path: ['slotItems'],
}).refine(data => {
  // Validate performance warning for large number of slot items
  return !data.slotItems || data.slotItems.length <= 15;
}, {
  message: 'Warning: Large number of slot items may impact performance',
  path: ['slotItems'],
});

// Enhanced update game request validation schema
export const enhancedUpdateGameSchema = enhancedCreateGameSchema.partial().extend({
  id: z.string().uuid('Invalid game ID format'),
});

// Slot items update request validation schema
export const slotItemsUpdateRequestSchema = z.object({
  gameId: z.string().uuid('Invalid game ID format'),
  items: z.array(enhancedSlotItemSchema),
  operation: z.enum(['add', 'remove', 'update', 'reorder', 'import']),
  metadata: z.object({
    importSource: z.string().optional(),
    performanceImpact: z.enum(['low', 'medium', 'high']).optional(),
  }).optional(),
});

// Color theme update request validation schema
export const colorThemeUpdateRequestSchema = z.object({
  gameId: z.string().uuid('Invalid game ID format'),
  theme: colorThemeSchema,
  validateAccessibility: z.boolean().default(true),
  previewMode: z.boolean().default(false),
});

// Control layout update request validation schema
export const controlLayoutUpdateRequestSchema = z.object({
  gameId: z.string().uuid('Invalid game ID format'),
  layout: controlLayoutSchema,
  deviceType: z.enum(['desktop', 'mobile', 'tablet']).default('desktop'),
  testMode: z.boolean().default(false),
});

// Validation helper functions for enhanced schemas
export function validateEnhancedCreateGame(data: unknown) {
  return enhancedCreateGameSchema.parse(data);
}

export function validateEnhancedUpdateGame(data: unknown) {
  return enhancedUpdateGameSchema.parse(data);
}

export function validateSlotItemsUpdate(data: unknown) {
  return slotItemsUpdateRequestSchema.parse(data);
}

export function validateColorThemeUpdate(data: unknown) {
  return colorThemeUpdateRequestSchema.parse(data);
}

export function validateControlLayoutUpdate(data: unknown) {
  return controlLayoutUpdateRequestSchema.parse(data);
}

// Additional type exports for enhanced schemas
export type EnhancedCreateGameRequest = z.infer<typeof enhancedCreateGameSchema>;
export type EnhancedUpdateGameRequest = z.infer<typeof enhancedUpdateGameSchema>;
export type SlotItemsUpdateRequest = z.infer<typeof slotItemsUpdateRequestSchema>;
export type ColorThemeUpdateRequest = z.infer<typeof colorThemeUpdateRequestSchema>;
export type ControlLayoutUpdateRequest = z.infer<typeof controlLayoutUpdateRequestSchema>;