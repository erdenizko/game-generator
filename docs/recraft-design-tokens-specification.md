# Recraft.ai Design Tokens Specification

This document provides a comprehensive design tokens specification extracted from the Recraft.ai website design system. These tokens can be used to implement a similar visual style in the game generator project.

## 1. Color Palette

### Primary Colors
- **Primary Purple**: `#7C3AED` - Main brand color used for backgrounds and primary actions
- **Primary Purple Dark**: `#6D28D9` - Darker variant for hover states
- **Primary Purple Light**: `#A78BFA` - Lighter variant for accents

### Secondary Colors
- **Vibrant Lime/Yellow**: `#D4FF00` - High-contrast accent color for CTAs and highlights
- **Hot Pink/Magenta**: `#FF006E` - Used for buttons and interactive elements
- **Electric Blue**: `#00D4FF` - Accent color for highlights
- **Bright Orange**: `#FF6B35` - Used for sections and cards
- **Vivid Green**: `#00FF88` - Success states and positive actions

### Neutral Colors
- **Pure Black**: `#000000` - Primary text and dark backgrounds
- **Pure White**: `#FFFFFF` - Light backgrounds and text on dark
- **Light Gray**: `#F3F4F6` - Background sections
- **Medium Gray**: `#9CA3AF` - Muted text
- **Dark Gray**: `#374151` - Secondary text

### Background Colors
- **Dark Background**: `#000000` - Footer and dark sections
- **Light Background**: `#FFFFFF` - Main content areas
- **Gray Background**: `#F9FAFB` - Alternate sections
- **Purple Background**: `#7C3AED` - Hero sections
- **Orange Background**: `#FF6B35` - Feature sections
- **Lime Background**: `#D4FF00` - CTA sections

### Gradient Colors
- **Purple to Pink**: `linear-gradient(135deg, #7C3AED 0%, #FF006E 100%)`
- **Blue to Green**: `linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)`
- **Orange to Yellow**: `linear-gradient(135deg, #FF6B35 0%, #D4FF00 100%)`

## 2. Typography System

### Font Families
- **Primary Font**: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Display Font**: `Inter, sans-serif` (with variable font weight)
- **Monospace**: `'SF Mono', Monaco, 'Cascadia Code', monospace`

### Font Sizes
- **Display XL**: `72px` / `4.5rem` - Hero headlines
- **Display Large**: `60px` / `3.75rem` - Section headlines
- **Display Medium**: `48px` / `3rem` - Sub-headlines
- **Heading 1**: `36px` / `2.25rem`
- **Heading 2**: `30px` / `1.875rem`
- **Heading 3**: `24px` / `1.5rem`
- **Heading 4**: `20px` / `1.25rem`
- **Body Large**: `18px` / `1.125rem`
- **Body Regular**: `16px` / `1rem`
- **Body Small**: `14px` / `0.875rem`
- **Caption**: `12px` / `0.75rem`

### Font Weights
- **Black**: 900 - Display text
- **Extra Bold**: 800 - Headlines
- **Bold**: 700 - Emphasis
- **Semi Bold**: 600 - Sub-headings
- **Medium**: 500 - UI elements
- **Regular**: 400 - Body text
- **Light**: 300 - Large body text

### Line Heights
- **Tight**: 1.1 - Display text
- **Snug**: 1.2 - Headlines
- **Normal**: 1.5 - Body text
- **Relaxed**: 1.625 - Small text
- **Loose**: 1.75 - Readable content

### Letter Spacing
- **Tighter**: -0.05em - Display text
- **Tight**: -0.025em - Headlines
- **Normal**: 0 - Body text
- **Wide**: 0.025em - Small caps
- **Wider**: 0.05em - All caps text

## 3. Spacing System

### Base Unit: 4px

### Spacing Scale
- **0**: `0px`
- **1**: `4px` / `0.25rem`
- **2**: `8px` / `0.5rem`
- **3**: `12px` / `0.75rem`
- **4**: `16px` / `1rem`
- **5**: `20px` / `1.25rem`
- **6**: `24px` / `1.5rem`
- **8**: `32px` / `2rem`
- **10**: `40px` / `2.5rem`
- **12**: `48px` / `3rem`
- **16**: `64px` / `4rem`
- **20**: `80px` / `5rem`
- **24**: `96px` / `6rem`
- **32**: `128px` / `8rem`
- **40**: `160px` / `10rem`
- **48**: `192px` / `12rem`
- **56**: `224px` / `14rem`
- **64**: `256px` / `16rem`

### Component Spacing
- **Button Padding**: `12px 24px` (vertical horizontal)
- **Card Padding**: `24px` to `32px`
- **Section Padding**: `80px` to `120px` (vertical)
- **Container Padding**: `16px` to `24px` (mobile to desktop)
- **Grid Gap**: `16px` to `32px`
- **List Item Gap**: `8px` to `16px`

### Container Widths
- **Max Width**: `1280px`
- **Large**: `1024px`
- **Medium**: `768px`
- **Small**: `640px`

## 4. Border Radius Values

### Radius Scale
- **None**: `0px`
- **Subtle**: `2px`
- **Small**: `4px`
- **Medium**: `8px`
- **Large**: `12px`
- **XL**: `16px`
- **2XL**: `24px`
- **3XL**: `32px`
- **Full**: `9999px` - Pills and circles

### Component Radius
- **Buttons**: `8px` to `9999px` (regular to pill)
- **Cards**: `16px` to `24px`
- **Input Fields**: `8px`
- **Modals**: `16px` to `24px`
- **Badges**: `4px` to `9999px`
- **Images**: `0px` to `16px`
- **Tooltips**: `8px`

## 5. Shadow System

### Shadow Scale
- **None**: `none`
- **Subtle**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)`
- **Small**: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)`
- **Medium**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- **Large**: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- **XL**: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`
- **2XL**: `0 25px 50px -12px rgba(0, 0, 0, 0.25)`

### Component Shadows
- **Card Shadow**: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- **Button Shadow**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- **Button Hover Shadow**: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- **Modal Shadow**: `0 25px 50px -12px rgba(0, 0, 0, 0.25)`
- **Dropdown Shadow**: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`

### Colored Shadows (for vibrant elements)
- **Purple Shadow**: `0 10px 40px -10px rgba(124, 58, 237, 0.5)`
- **Pink Shadow**: `0 10px 40px -10px rgba(255, 0, 110, 0.5)`
- **Orange Shadow**: `0 10px 40px -10px rgba(255, 107, 53, 0.5)`

## 6. Animation & Transition

### Transition Durations
- **Fast**: `150ms`
- **Normal**: `200ms`
- **Slow**: `300ms`
- **Slower**: `500ms`

### Transition Timing Functions
- **Ease**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Ease In**: `cubic-bezier(0.4, 0, 1, 1)`
- **Ease Out**: `cubic-bezier(0, 0, 0.2, 1)`
- **Ease In Out**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Spring**: `cubic-bezier(0.175, 0.885, 0.32, 1.275)`

## 7. Design Principles

### Visual Hierarchy
- Use high contrast between elements (black/white with vibrant accents)
- Bold, heavy typography for headlines
- Clear spacing between sections
- Strategic use of color for emphasis

### Color Usage
- Dark backgrounds with light text for impact
- Vibrant colors used sparingly for CTAs and key elements
- Gradient overlays for visual interest
- High contrast ratios for accessibility

### Interactive Elements
- Clear hover states with shadow elevation
- Smooth transitions on all interactive elements
- Color shifts on hover (darker/lighter variants)
- Consistent border radius across similar elements

### Layout Principles
- Full-width sections with contained content
- Generous white space between elements
- Grid-based layouts for consistency
- Mobile-first responsive design

## Implementation Notes

1. **CSS Variables**: Implement these tokens as CSS custom properties for easy theming
2. **Dark Mode**: The design already incorporates dark sections - consider a full dark mode variant
3. **Accessibility**: Ensure color contrasts meet WCAG AA standards (most already do)
4. **Performance**: Use variable fonts where possible to reduce font file sizes
5. **Consistency**: Apply these tokens consistently across all components

## Usage in Game Generator Project

These design tokens can be applied to:
- Landing page (`src/app/landing/page.tsx`)
- Auth page (`src/app/auth/page.tsx`)
- Dashboard pages (`src/app/(protected)/`)
- UI components (`src/components/ui/`)

Consider creating a theme configuration file that exports these tokens for use throughout the application.