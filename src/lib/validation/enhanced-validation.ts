import { AccessibilityValidation, ColorTheme, ControlLayout, ResponsivenessCheck, ResponsivenessIssue } from '../types';

/**
 * Validates color contrast according to WCAG guidelines
 * @param foreground Foreground color in hex format
 * @param background Background color in hex format
 * @returns Contrast ratio between the two colors
 */
export function calculateContrastRatio(foreground: string, background: string): number {
  // Convert hex to RGB
  const fgRGB = hexToRgb(foreground);
  const bgRGB = hexToRgb(background);
  
  if (!fgRGB || !bgRGB) {
    throw new Error('Invalid color format. Expected hex color (e.g., #FFFFFF)');
  }
  
  // Calculate luminance
  const fgLuminance = calculateLuminance(fgRGB.r, fgRGB.g, fgRGB.b);
  const bgLuminance = calculateLuminance(bgRGB.r, bgRGB.g, bgRGB.b);
  
  // Calculate contrast ratio
  const ratio = fgLuminance > bgLuminance 
    ? (fgLuminance + 0.05) / (bgLuminance + 0.05)
    : (bgLuminance + 0.05) / (fgLuminance + 0.05);
  
  return parseFloat(ratio.toFixed(2));
}

/**
 * Converts hex color to RGB
 */
function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculates relative luminance of an RGB color
 */
function calculateLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Validates a color theme for accessibility
 * @param theme The color theme to validate
 * @returns Validation result with WCAG compliance level
 */
export function validateColorThemeAccessibility(theme: ColorTheme): AccessibilityValidation {
  const primaryTextRatio = calculateContrastRatio(
    theme.textColor || '#FFFFFF',
    theme.primaryColor
  );
  
  const secondaryTextRatio = calculateContrastRatio(
    theme.textColor || '#FFFFFF',
    theme.secondaryColor
  );
  
  const backgroundTextRatio = theme.backgroundColor 
    ? calculateContrastRatio(theme.textColor || '#FFFFFF', theme.backgroundColor)
    : 0;
  
  // Determine minimum ratio from all calculated ratios
  const minRatio = Math.min(
    primaryTextRatio,
    secondaryTextRatio,
    backgroundTextRatio || Number.MAX_VALUE
  );
  
  // Determine WCAG compliance level
  let wcagLevel: 'A' | 'AA' | 'AAA' | 'fail' = 'fail';
  let isValid = false;
  let minimumRequiredRatio = 4.5; // Default for AA level
  
  if (minRatio >= 7) {
    wcagLevel = 'AAA';
    isValid = true;
    minimumRequiredRatio = 7;
  } else if (minRatio >= 4.5) {
    wcagLevel = 'AA';
    isValid = true;
    minimumRequiredRatio = 4.5;
  } else if (minRatio >= 3) {
    wcagLevel = 'A';
    isValid = true;
    minimumRequiredRatio = 3;
  }
  
  // Generate recommendations
  const recommendations: string[] = [];
  
  if (!isValid) {
    recommendations.push('Increase contrast between text and background colors');
    
    if (primaryTextRatio < 4.5) {
      recommendations.push(`Primary color contrast (${primaryTextRatio.toFixed(2)}) is below AA standard (4.5)`);
    }
    
    if (secondaryTextRatio < 4.5) {
      recommendations.push(`Secondary color contrast (${secondaryTextRatio.toFixed(2)}) is below AA standard (4.5)`);
    }
    
    if (theme.backgroundColor && backgroundTextRatio < 4.5) {
      recommendations.push(`Background color contrast (${backgroundTextRatio.toFixed(2)}) is below AA standard (4.5)`);
    }
  }
  
  return {
    isValid,
    wcagLevel,
    contrastRatio: minRatio,
    minimumRequiredRatio,
    recommendations
  };
}

/**
 * Validates control layout for responsiveness across different device types
 * @param layout The control layout to validate
 * @returns Validation result with responsiveness issues
 */
export function validateControlLayoutResponsiveness(layout: ControlLayout): ResponsivenessCheck {
  const issues: ResponsivenessIssue[] = [];
  
  // Check for mobile compatibility issues
  if (layout.type === 'classic' && layout.position === 'bottom') {
    issues.push({
      element: 'controls',
      breakpoint: 'mobile',
      issue: 'Classic layout with bottom position may be too wide for mobile screens',
      recommendation: 'Consider using Compact layout for mobile devices'
    });
  }
  
  // Check for button size issues with Neon style on mobile
  if (layout.buttonStyle === 'neon' && !issues.some(i => i.breakpoint === 'mobile')) {
    issues.push({
      element: 'buttons',
      breakpoint: 'mobile',
      issue: 'Neon button style may cause performance issues on low-end mobile devices',
      recommendation: 'Consider using a simpler button style for mobile or implement auto-degradation'
    });
  }
  
  // Check for auto-hide issues on desktop
  if (layout.type === 'minimal' && layout.autoHide) {
    issues.push({
      element: 'controls',
      breakpoint: 'desktop',
      issue: 'Auto-hiding controls may confuse desktop users who expect persistent controls',
      recommendation: 'Consider disabling auto-hide for desktop or adding clear indicators'
    });
  }
  
  // Check for split layout issues on small screens
  if (layout.type === 'modern' && layout.position === 'split') {
    issues.push({
      element: 'layout',
      breakpoint: 'mobile',
      issue: 'Split controls may not fit properly on small mobile screens',
      recommendation: 'Implement a responsive fallback to Compact layout for screens below 480px width'
    });
  }
  
  return {
    isResponsive: issues.length === 0,
    breakpoints: {
      mobile: !issues.some(i => i.breakpoint === 'mobile'),
      tablet: !issues.some(i => i.breakpoint === 'tablet'),
      desktop: !issues.some(i => i.breakpoint === 'desktop')
    },
    issues
  };
}

/**
 * Validates slot items for potential performance issues
 * @param itemCount Number of slot items
 * @param hasCustomImages Whether custom images are used
 * @returns Performance impact assessment
 */
export function assessSlotItemsPerformanceImpact(
  itemCount: number,
  hasCustomImages: boolean
): 'low' | 'medium' | 'high' {
  if (itemCount <= 8) {
    return 'low';
  }
  
  if (itemCount <= 15) {
    return hasCustomImages ? 'medium' : 'low';
  }
  
  return 'high';
}

/**
 * Generates a complementary color for a given hex color
 * @param hexColor Base color in hex format
 * @returns Complementary color in hex format
 */
export function generateComplementaryColor(hexColor: string): string {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return '#FFFFFF';
  
  // Calculate complementary color (opposite on color wheel)
  const r = 255 - rgb.r;
  const g = 255 - rgb.g;
  const b = 255 - rgb.b;
  
  // Convert back to hex
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

/**
 * Generates an accessible text color based on background color
 * @param backgroundColor Background color in hex format
 * @returns White or black text color depending on background luminance
 */
export function generateAccessibleTextColor(backgroundColor: string): string {
  const rgb = hexToRgb(backgroundColor);
  if (!rgb) return '#000000';
  
  // Calculate luminance
  const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b);
  
  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * Formats slot item performance impact as a user-facing warning message
 */
export function slotItemsPerformanceWarning(itemCount: number, hasCustomImages: boolean): string | null {
  const impact = assessSlotItemsPerformanceImpact(itemCount, hasCustomImages);
  if (impact === 'high') return '⚠️ Too many slot items or custom images may cause performance issues.';
  if (impact === 'medium') return '⚠️ Many slot items or custom images may impact performance.';
  return null;
}

/**
 * Formats color theme accessibility issues as a user-facing message
 */
export function colorThemeAccessibilityWarning(validation: AccessibilityValidation): string | null {
  if (!validation.isValid) {
    return `⚠️ Color theme is not accessible: ${validation.recommendations.join('; ')}`;
  }
  return null;
}

/**
 * Formats control layout responsiveness issues as a user-facing message
 */
export function controlLayoutResponsivenessWarning(check: ResponsivenessCheck): string | null {
  if (!check.isResponsive) {
    return `⚠️ Control layout may not be fully responsive: ${check.issues.map(i => i.recommendation).join('; ')}`;
  }
  return null;
}