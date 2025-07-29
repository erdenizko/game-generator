// Core game configuration types
export interface GameConfig {
  title: string;
  description: string;
  rows: number; // 1-10
  columns: number; // 1-10
  coverImageKey: string;
  sounds: GameSounds;
  mascot: MascotConfig;
  backgroundImageKey: string;
  frameImageKey: string;
  slotItems: SlotItem[]; // max 20
  availableLanguages: Language[];
  availableRegions: Region[];
  blockedRegions: string[];
  styling: GameStyling;
  isPublished?: boolean;
  
  // Marketplace fields
  isAvailableForSale?: boolean;
  marketplacePrice?: number;
  marketplaceDescription?: string;
  isFeatured?: boolean;
}

export interface EditGameConfig extends GameConfig {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Enhanced game configuration with new features
export interface EnhancedGameConfig extends GameConfig {
  slotItems: EnhancedSlotItem[];
  colorTheme?: ColorTheme;
  controlLayout?: ControlLayout;
  version: string;
  performanceMetrics?: PerformanceMetrics;
}

export interface GameSounds {
  spin?: string;
  click?: string;
  win?: string;
  lose?: string;
  backgroundMusic?: string;
}

export interface MascotConfig {
  enabled: boolean;
  startFile?: string;
  spinFile?: string;
  loseFile?: string;
  winFile?: string;
  idleFile?: string;
}

export interface SlotItem {
  id: string;
  name: string;
  imageKey: string;
  probability: number; // 0-1
  revenue?: number;
  minimumCount: number;
  diagonalPrize: boolean;
}

export interface EnhancedSlotItem extends SlotItem {
  order: number;
  category?: string;
  tags?: string[];
  isCustom: boolean;
  createdAt: Date;
  updatedAt: Date;
  performanceImpact?: 'low' | 'medium' | 'high';
}

export interface Language {
  locale: string;
  strings: Record<string, string>;
}

export interface Region {
  country: string;
  currency: string;
  minBet: number;
  maxBet: number;
  step: number;
}

export interface GameStyling {
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  buttonStyle?: string;
}

// Enhanced styling interfaces
export interface ColorTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
  contrastRatio: number;
  isAccessible: boolean;
}

export interface ControlLayout {
  type: 'classic' | 'compact' | 'modern' | 'minimal';
  buttonStyle: 'rounded' | 'square' | 'pill' | 'neon';
  position: 'bottom' | 'right' | 'split' | 'overlay';
  autoHide: boolean;
  customStyles?: Record<string, string>;
}

// Session and runtime types
export interface PlayerInfo {
  id: string;
  country?: string;
  currency?: string;
}

export interface SessionData {
  gameId: string;
  playerRef: string;
  country?: string;
  balance: number;
  expiresAt: Date;
}

export interface SpinResult {
  view: string[][]; // result matrix
  bet: number;
  isWin: boolean;
  winAmount: number;
  lines: number[][]; // winning line coordinates
  balance: number;
}

export interface SpinData {
  sessionId: string;
  bet: number;
  win: number;
  resultMatrix: string[][];
  winningLines: number[][];
  timestamp: Date;
}

// Analytics types
export interface GameMetrics {
  totalBets: number;
  totalWins: number;
  netRevenue: number;
  rtp: number; // Return to Player percentage
  spinCount: number;
  uniquePlayers: number;
}

export interface MetricsFilter {
  dateFrom?: Date;
  dateTo?: Date;
  country?: string;
  currency?: string;
}

export interface RealtimeStats {
  activePlayers: number;
  recentSpins: number;
  totalRevenue: number;
}

// Authentication types
export interface User {
  id: string;
  email: string;
  role: string;
  stripeCustomerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokenPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: string;
  requestId?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Preview session types
export interface PreviewSession {
  sessionId: string;
  gameId: string;
  userId: string;
  gameConfig: GameConfig;
  expiresAt: Date;
  createdAt: Date;
}

export interface CreatePreviewSessionRequest {
  gameId: string;
}

export interface PreviewSessionResponse {
  sessionId: string;
  gameConfig: GameConfig;
  expiresAt: Date;
  previewUrl: string;
}

// Asset management types
export interface AssetMetadata {
  key: string;
  type: 'image' | 'audio' | 'mascot';
  fileSize: number;
  mimeType: string;
  gameId: string;
  uploadedAt: Date;
}

export interface PresignedUploadResponse {
  uploadUrl: string;
  key: string;
  expiresAt: Date;
}

// Subscription types
export interface Subscription {
  id: string;
  userId: string;
  plan: string;
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  stripeSubscriptionId?: string;
  renewAt?: Date;
  createdAt: Date;
}

// Error types
export interface AppError extends Error {
  code: string;
  statusCode: number;
  details?: unknown;
}

// Validation schemas (will be used with Zod)
export interface CreateGameRequest {
  title: string;
  description?: string;
  rows: number;
  columns: number;
  coverImageKey?: string;
  sounds?: GameSounds;
  mascot?: MascotConfig;
  backgroundImageKey?: string;
  frameImageKey?: string;
  slotItems?: SlotItem[];
  availableLanguages?: Language[];
  availableRegions?: Region[];
  blockedRegions?: string[];
  styling?: GameStyling;
}

export interface UpdateGameRequest extends Partial<CreateGameRequest> {
  id: string;
  slotItems?: SlotItem[];
}

// Enhanced API request types
export interface SlotItemsUpdateRequest {
  gameId: string;
  items: EnhancedSlotItem[];
  operation: 'add' | 'remove' | 'update' | 'reorder' | 'import';
  metadata?: {
    importSource?: string;
    performanceImpact?: 'low' | 'medium' | 'high';
  };
}

export interface ColorThemeUpdateRequest {
  gameId: string;
  theme: ColorTheme;
  validateAccessibility: boolean;
  previewMode: boolean;
}

export interface ControlLayoutUpdateRequest {
  gameId: string;
  layout: ControlLayout;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  testMode: boolean;
}

export interface EnhancedCreateGameRequest extends CreateGameRequest {
  slotItems?: EnhancedSlotItem[];
  colorTheme?: ColorTheme;
  controlLayout?: ControlLayout;
  version?: string;
}

export interface EnhancedUpdateGameRequest extends Partial<EnhancedCreateGameRequest> {
  id: string;
}

export interface CreateSessionRequest {
  token: string;
  gameId: string;
  user: PlayerInfo;
}

export interface ProcessSpinRequest {
  sessionId: string;
  bet: number;
}

// Rate limiting types
export interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetTime: Date;
}

// Health check types
export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: Date;
  services: {
    database: 'healthy' | 'unhealthy';
    redis: 'healthy' | 'unhealthy';
    s3: 'healthy' | 'unhealthy';
  };
}

// Session validation types
export interface SessionValidationResult {
  isValid: boolean;
  sessionData?: SessionData;
  error?: {
    code: string;
    message: string;
  };
}

// Production session response types
export interface CreateSessionResponse {
  sessionId: string;
  iframeUrl: string;
  expiresAt: string;
}

export interface GetSessionResponse {
  sessionId: string;
  gameConfig: GameConfig;
  playerRef: string;
  country?: string;
  balance: number;
  expiresAt: string;
}

// Performance monitoring types
export interface PerformanceMetrics {
  renderTime: number;
  frameRate: number;
  memoryUsage: number;
  loadTime: number;
  interactionDelay: number;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browserInfo: string;
  warnings: PerformanceWarning[];
}

export interface PerformanceWarning {
  type: 'memory' | 'rendering' | 'loading' | 'interaction';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: Date;
  affectedFeature?: string;
}

// Import/Export types for slot items
export interface SlotItemsExport {
  version: string;
  createdAt: Date;
  items: EnhancedSlotItem[];
  metadata: {
    gameId: string;
    itemCount: number;
    exportedBy: string;
    isTemplate: boolean;
  };
}

export interface SlotItemsImportResult {
  success: boolean;
  importedItems: number;
  skippedItems: number;
  conflicts: SlotItemConflict[];
  warnings: string[];
}

export interface SlotItemConflict {
  existingItem: EnhancedSlotItem;
  importedItem: EnhancedSlotItem;
  resolution: 'replace' | 'merge' | 'skip' | 'pending';
}

// Accessibility validation types
export interface AccessibilityValidation {
  isValid: boolean;
  wcagLevel: 'A' | 'AA' | 'AAA' | 'fail';
  contrastRatio: number;
  minimumRequiredRatio: number;
  recommendations: string[];
}

// Layout responsiveness types
export interface ResponsivenessCheck {
  isResponsive: boolean;
  breakpoints: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  issues: ResponsivenessIssue[];
}

export interface ResponsivenessIssue {
  element: string;
  breakpoint: 'mobile' | 'tablet' | 'desktop';
  issue: string;
  recommendation: string;
}

// Marketplace types
export interface MarketplaceGame extends EditGameConfig {
  ownerId: string;
  ownerEmail: string;
  purchaseCount: number;
}

export interface GamePurchase {
  id: string;
  buyerId: string;
  gameId: string;
  purchasePrice: number;
  stripePaymentId?: string;
  status: 'completed' | 'refunded' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketplaceSettings {
  gameId: string;
  isAvailableForSale: boolean;
  price?: number;
  description?: string;
  isFeatured: boolean;
}

export interface UpdateMarketplaceSettingsRequest {
  gameId: string;
  isAvailableForSale: boolean;
  marketplacePrice?: number;
  marketplaceDescription?: string;
  isFeatured?: boolean;
}