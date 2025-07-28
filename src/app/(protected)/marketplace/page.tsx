'use client';

import { useState, useCallback } from 'react';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { MarketplaceGame, PaginatedResponse } from '@/lib/types';
import {
  Search,
  Filter,
  Star,
  DollarSign,
  Users,
  ShoppingCart,
  Eye,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

// Constants
const ITEMS_PER_PAGE = 12;

// Utility functions
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

const formatDate = (date: Date | string | undefined): string => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Loading skeleton component
const GameCardSkeleton = () => (
  <Card className="bg-slate-100/50 border-slate-400/50">
    <CardHeader>
      {/* Image skeleton */}
      <div className="w-full aspect-[3/4] bg-slate-200 rounded-lg mb-4 animate-pulse"></div>

      {/* Title and price skeleton */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="h-6 bg-slate-200 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div>
        </div>
        <div className="h-6 bg-slate-200 rounded w-16 animate-pulse"></div>
      </div>
    </CardHeader>
    <CardContent>
      {/* Stats skeleton */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="h-3 bg-slate-200 rounded w-16 animate-pulse"></div>
          <div className="h-3 bg-slate-200 rounded w-8 animate-pulse"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-slate-200 rounded w-12 animate-pulse"></div>
          <div className="h-3 bg-slate-200 rounded w-6 animate-pulse"></div>
        </div>
        <div className="h-10 bg-slate-200 rounded w-full animate-pulse mt-4"></div>
      </div>
    </CardContent>
  </Card>
);

// Game card component
const MarketplaceGameCard = ({ 
  game, 
  onPurchase, 
  onPreview 
}: {
  game: MarketplaceGame;
  onPurchase: (gameId: string) => void;
  onPreview: (gameId: string) => void;
}) => {
  return (
    <Card className="bg-white border-slate-200 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="relative">
          <Image 
            src={`https://game-manager-dakik.s3.eu-north-1.amazonaws.com/${game.coverImageKey}` || 'https://placehold.co/600x400'} 
            alt={game.title} 
            width={300} 
            height={400} 
            className='w-full aspect-[3/4] object-cover rounded-lg' 
          />
          {game.isFeatured && (
            <Badge className="absolute top-2 left-2 bg-yellow-500 text-yellow-900">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
        
        <div className="flex justify-between items-start mt-4">
          <div className="flex-1 mr-4">
            <CardTitle className="text-lg line-clamp-2">{game.title}</CardTitle>
            <CardDescription className="mt-1">
              by {game.ownerEmail}
            </CardDescription>
            {game.marketplaceDescription && (
              <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                {game.marketplaceDescription}
              </p>
            )}
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">
              {formatPrice(game.marketplacePrice || 0)}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Purchases
            </span>
            <span>{game.purchaseCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Grid Size</span>
            <span>{game.columns}×{game.rows}</span>
          </div>
          <div className="flex justify-between">
            <span>Slot Items</span>
            <span>{game.slotItems.length}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onPreview(game.id!)}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button 
            onClick={() => onPurchase(game.id!)}
            size="sm"
            className="flex-1"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Buy Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Main component
export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: ITEMS_PER_PAGE,
    total: 0,
    totalPages: 0,
  });

  const { toast } = useToast();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['marketplace-games', pagination.page, searchTerm, showFeaturedOnly, sortBy, sortOrder],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      searchParams.set('page', pagination.page.toString());
      searchParams.set('limit', pagination.limit.toString());
      searchParams.set('sortBy', sortBy);
      searchParams.set('sortOrder', sortOrder);
      
      if (searchTerm) {
        searchParams.set('search', searchTerm);
      }
      if (showFeaturedOnly) {
        searchParams.set('featured', 'true');
      }

      const response = await fetch(`/api/marketplace?${searchParams.toString()}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch marketplace games');
      }

      const data: PaginatedResponse<MarketplaceGame> = await response.json();
      
      // Update pagination info
      setPagination(prev => ({
        ...prev,
        total: data.pagination?.total || 0,
        totalPages: data.pagination?.totalPages || 0,
      }));
      
      return data;
    },
  });

  // Handle search
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  // Handle purchase
  const handlePurchase = useCallback(async (gameId: string) => {
    try {
      // This would typically involve Stripe payment flow
      // For now, we'll just show a success message
      toast({
        title: 'Purchase Initiated',
        description: 'Redirecting to payment processor...',
      });
      
      // TODO: Implement actual Stripe payment flow
      console.log('Purchasing game:', gameId);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to initiate purchase',
        variant: 'destructive',
      });
    }
  }, [toast]);

  // Handle preview
  const handlePreview = useCallback((gameId: string) => {
    // Open preview in new tab
    window.open(`/preview/${gameId}`, '_blank');
  }, []);

  // Handle filter changes
  const handleFilterChange = useCallback((filter: string, value: any) => {
    if (filter === 'featured') {
      setShowFeaturedOnly(value);
    }
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  // Handle sort change
  const handleSortChange = useCallback((sort: string, order: 'asc' | 'desc') => {
    setSortBy(sort);
    setSortOrder(order);
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, page }));
  }, []);

  if (error) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Error</h2>
                <p className="text-slate-600 mb-4">
                  {error instanceof Error ? error.message : 'Failed to fetch marketplace games'}
                </p>
                <Button onClick={() => refetch()}>Retry</Button>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className='flex flex-col gap-1'>
                <h1 className="text-4xl tracking-tighter font-bold leading-none text-slate-900">
                  Game Marketplace
                </h1>
                <p className="text-xl tracking-tight text-slate-600">
                  Discover and purchase games built by other casino owners
                </p>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search games..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={showFeaturedOnly ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleFilterChange('featured', !showFeaturedOnly)}
                >
                  <Star className="w-4 h-4 mr-1" />
                  Featured Only
                </Button>
                
                <Button
                  variant={sortBy === 'price' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSortChange('price', sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  <DollarSign className="w-4 h-4 mr-1" />
                  Price {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                </Button>
                
                <Button
                  variant={sortBy === 'createdAt' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleSortChange('createdAt', 'desc')}
                >
                  Latest
                </Button>
              </div>
            </div>

            {/* Games Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <GameCardSkeleton key={i} />
                ))}
              </div>
            ) : data?.data && data.data.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {data.data.map((game: MarketplaceGame) => (
                  <MarketplaceGameCard
                    key={game.id}
                    game={game}
                    onPurchase={handlePurchase}
                    onPreview={handlePreview}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-slate-400 mb-4">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No games available
                </h3>
                <p className="text-slate-600">
                  {searchTerm || showFeaturedOnly 
                    ? 'Try adjusting your search or filters'
                    : 'No games are currently available in the marketplace'
                  }
                </p>
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                >
                  Previous
                </Button>

                <span className="text-slate-600">
                  Page {pagination.page} of {pagination.totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}