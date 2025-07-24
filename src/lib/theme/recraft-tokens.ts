// src/lib/theme/recraft-tokens.ts
// Design tokens based on Recraft.ai specification

export const colors = {
  primary: {
    purple: '#7C3AED',
    purpleDark: '#6D28D9',
    purpleLight: '#A78BFA',
  },
  secondary: {
    limeYellow: '#D4FF00',
    hotPink: '#FF006E',
    electricBlue: '#00D4FF',
    brightOrange: '#FF6B35',
    vividGreen: '#00FF88',
  },
  neutral: {
    black: '#000000',
    white: '#FFFFFF',
    lightGray: '#F3F4F6',
    mediumGray: '#9CA3AF',
    darkGray: '#374151',
  },
  background: {
    dark: '#000000',
    light: '#FFFFFF',
    gray: '#F9FAFB',
    purple: '#7C3AED',
    orange: '#FF6B35',
    lime: '#D4FF00',
  },
  gradients: {
    purpleToPink: 'linear-gradient(135deg, #7C3AED 0%, #FF006E 100%)',
    blueToGreen: 'linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)',
    orangeToYellow: 'linear-gradient(135deg, #FF6B35 0%, #D4FF00 100%)',
  },
};

export const typography = {
  fontFamilies: {
    primary: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: 'Inter, sans-serif',
    monospace: '"SF Mono", Monaco, "Cascadia Code", monospace',
  },
  fontSizes: {
    displayXL: '4.5rem',
    displayLarge: '3.75rem',
    displayMedium: '3rem',
    heading1: '2.25rem',
    heading2: '1.875rem',
    heading3: '1.5rem',
    heading4: '1.25rem',
    bodyLarge: '1.125rem',
    bodyRegular: '1rem',
    bodySmall: '0.875rem',
    caption: '0.75rem',
  },
  fontWeights: {
    black: 900,
    extraBold: 800,
    bold: 700,
    semiBold: 600,
    medium: 500,
    regular: 400,
    light: 300,
  },
  lineHeights: {
    tight: 1.1,
    snug: 1.2,
    normal: 1.5,
    relaxed: 1.625,
    loose: 1.75,
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: 0,
    wide: '0.025em',
    wider: '0.05em',
  },
};

export const spacing = {
  baseUnit: '4px',
  scale: {
    '0': '0px',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '32': '8rem',
    '40': '10rem',
    '48': '12rem',
    '56': '14rem',
    '64': '16rem',
  },
  component: {
    buttonPadding: '12px 24px',
    cardPadding: '24px 32px',
    sectionPadding: '80px 120px',
    containerPadding: '16px 24px',
    gridGap: '16px 32px',
    listItemGap: '8px 16px',
  },
  containerWidths: {
    max: '1280px',
    large: '1024px',
    medium: '768px',
    small: '640px',
  },
};

export const borderRadius = {
  scale: {
    none: '0px',
    subtle: '2px',
    small: '4px',
    medium: '8px',
    large: '12px',
    xl: '16px',
    '2xl': '24px',
    '3xl': '32px',
    full: '9999px',
  },
  component: {
    buttons: '8px 9999px',
    cards: '16px 24px',
    inputFields: '8px',
    modals: '16px 24px',
    badges: '4px 9999px',
    images: '0px 16px',
    tooltips: '8px',
  },
};

export const shadows = {
  scale: {
    none: 'none',
    subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    small: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  component: {
    card: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    button: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    buttonHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    modal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  colored: {
    purple: '0 10px 40px -10px rgba(124, 58, 237, 0.5)',
    pink: '0 10px 40px -10px rgba(255, 0, 110, 0.5)',
    orange: '0 10px 40px -10px rgba(255, 107, 53, 0.5)',
  },
};

export const animations = {
  transitionDurations: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  timingFunctions: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
};