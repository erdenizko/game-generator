'use client';

import { useState, useEffect, useRef } from 'react';
import { GameConfig } from '@/lib/types';

interface ResponsiveGameLayoutProps {
  gameConfig: GameConfig;
  children: React.ReactNode;
  className?: string;
}

export default function ResponsiveGameLayout({
  gameConfig,
  children,
  className = ''
}: ResponsiveGameLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('landscape');
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  // Update dimensions and device type
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
        
        // Determine orientation
        setOrientation(clientWidth > clientHeight ? 'landscape' : 'portrait');
        
        // Determine device type based on viewport
        if (clientWidth < 768) {
          setDeviceType('mobile');
        } else if (clientWidth < 1024) {
          setDeviceType('tablet');
        } else {
          setDeviceType('desktop');
        }
      }
    };

    // Initial measurement
    updateDimensions();

    // Set up resize observer
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Listen for orientation changes on mobile
    const handleOrientationChange = () => {
      setTimeout(updateDimensions, 100); // Delay to ensure dimensions are updated
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Calculate optimal game area dimensions
  const getGameAreaDimensions = () => {
    const { width, height } = dimensions;
    
    if (deviceType === 'mobile') {
      if (orientation === 'portrait') {
        // Portrait mobile: stack vertically
        return {
          gameWidth: Math.min(width - 32, 400),
          gameHeight: Math.min(height * 0.6, 500),
          controlsHeight: Math.min(height * 0.3, 200),
          layout: 'vertical' as const
        };
      } else {
        // Landscape mobile: side by side
        return {
          gameWidth: Math.min(width * 0.7, 600),
          gameHeight: height - 100,
          controlsHeight: height - 100,
          layout: 'horizontal' as const
        };
      }
    } else if (deviceType === 'tablet') {
      return {
        gameWidth: Math.min(width * 0.8, 700),
        gameHeight: Math.min(height * 0.7, 600),
        controlsHeight: Math.min(height * 0.25, 150),
        layout: 'vertical' as const
      };
    } else {
      // Desktop
      return {
        gameWidth: Math.min(width * 0.8, 900),
        gameHeight: Math.min(height * 0.75, 700),
        controlsHeight: Math.min(height * 0.2, 120),
        layout: 'vertical' as const
      };
    }
  };

  const gameArea = getGameAreaDimensions();

  // Calculate reel dimensions based on game configuration
  const getReelDimensions = () => {
    const { gameWidth, gameHeight } = gameArea;
    const availableWidth = gameWidth - 64; // Account for padding
    const availableHeight = gameHeight - 200; // Account for header and spacing
    
    const symbolWidth = Math.min(
      Math.floor(availableWidth / gameConfig.columns) - 8,
      80
    );
    const symbolHeight = Math.min(
      Math.floor(availableHeight / gameConfig.rows) - 8,
      80
    );
    
    // Keep symbols square for better appearance
    const symbolSize = Math.min(symbolWidth, symbolHeight);
    
    return {
      symbolSize,
      reelWidth: symbolSize * gameConfig.columns + (gameConfig.columns - 1) * 8,
      reelHeight: symbolSize * gameConfig.rows + (gameConfig.rows - 1) * 8
    };
  };

  const reelDimensions = getReelDimensions();

  // CSS custom properties for dynamic sizing
  const cssVariables = {
    '--game-width': `${gameArea.gameWidth}px`,
    '--game-height': `${gameArea.gameHeight}px`,
    '--controls-height': `${gameArea.controlsHeight}px`,
    '--symbol-size': `${reelDimensions.symbolSize}px`,
    '--reel-width': `${reelDimensions.reelWidth}px`,
    '--reel-height': `${reelDimensions.reelHeight}px`,
    '--columns': gameConfig.columns.toString(),
    '--rows': gameConfig.rows.toString()
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      className={`responsive-game-layout w-full h-full ${className}`}
      style={cssVariables}
      data-device={deviceType}
      data-orientation={orientation}
      data-layout={gameArea.layout}
    >
      {children}
      
      <style jsx>{`
        .responsive-game-layout {
          --spacing-xs: 0.25rem;
          --spacing-sm: 0.5rem;
          --spacing-md: 1rem;
          --spacing-lg: 1.5rem;
          --spacing-xl: 2rem;
        }
        
        .responsive-game-layout[data-device="mobile"] {
          --spacing-xs: 0.125rem;
          --spacing-sm: 0.25rem;
          --spacing-md: 0.5rem;
          --spacing-lg: 1rem;
          --spacing-xl: 1.5rem;
        }
        
        .responsive-game-layout[data-device="tablet"] {
          --spacing-xs: 0.25rem;
          --spacing-sm: 0.375rem;
          --spacing-md: 0.75rem;
          --spacing-lg: 1.25rem;
          --spacing-xl: 1.75rem;
        }
        
        /* Game area responsive styles */
        .game-area {
          width: var(--game-width);
          height: var(--game-height);
          max-width: 100%;
          max-height: 100%;
        }
        
        /* Controls responsive styles */
        .game-controls {
          height: var(--controls-height);
          min-height: 80px;
        }
        
        /* Reel responsive styles */
        .reels-container {
          width: var(--reel-width);
          height: var(--reel-height);
          max-width: 100%;
          max-height: 100%;
        }
        
        .symbol {
          width: var(--symbol-size);
          height: var(--symbol-size);
          min-width: 40px;
          min-height: 40px;
        }
        
        /* Layout-specific styles */
        .responsive-game-layout[data-layout="horizontal"] {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: var(--spacing-lg);
        }
        
        .responsive-game-layout[data-layout="vertical"] {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-md);
        }
        
        /* Mobile-specific adjustments */
        .responsive-game-layout[data-device="mobile"] .game-header {
          padding: var(--spacing-sm);
          font-size: 0.875rem;
        }
        
        .responsive-game-layout[data-device="mobile"] .game-title {
          font-size: 1.25rem;
        }
        
        .responsive-game-layout[data-device="mobile"] .control-button {
          padding: var(--spacing-sm) var(--spacing-md);
          font-size: 0.875rem;
        }
        
        /* Tablet-specific adjustments */
        .responsive-game-layout[data-device="tablet"] .game-header {
          padding: var(--spacing-md);
        }
        
        .responsive-game-layout[data-device="tablet"] .game-title {
          font-size: 1.5rem;
        }
        
        /* Desktop-specific adjustments */
        .responsive-game-layout[data-device="desktop"] .game-header {
          padding: var(--spacing-lg);
        }
        
        .responsive-game-layout[data-device="desktop"] .game-title {
          font-size: 2rem;
        }
        
        /* Orientation-specific styles */
        .responsive-game-layout[data-orientation="portrait"][data-device="mobile"] {
          padding: var(--spacing-sm);
        }
        
        .responsive-game-layout[data-orientation="landscape"][data-device="mobile"] {
          padding: var(--spacing-xs);
        }
        
        /* Animation performance optimizations */
        .responsive-game-layout * {
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
        
        /* Touch-friendly sizing for mobile */
        .responsive-game-layout[data-device="mobile"] button {
          min-height: 44px;
          min-width: 44px;
        }
        
        .responsive-game-layout[data-device="mobile"] .touch-target {
          padding: var(--spacing-md);
        }
        
        /* High DPI display optimizations */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .responsive-game-layout .symbol img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
        }
        
        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .responsive-game-layout * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .responsive-game-layout {
            color-scheme: dark;
          }
        }
        
        /* Print styles */
        @media print {
          .responsive-game-layout {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}