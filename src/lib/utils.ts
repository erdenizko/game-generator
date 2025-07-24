import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { GameStyling } from '@/types/GameStyling';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function lightenColor(hex: string, percent: number): string {
  // Convert hex to RGB
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // Increase each component by the percentage
  r = Math.min(255, r + Math.round(r * percent));
  g = Math.min(255, g + Math.round(g * percent));
  b = Math.min(255, b + Math.round(b * percent));

  // Convert back to hex
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function getButtonStyle(type: 'primary' | 'secondary', styling: GameStyling): React.CSSProperties {
  const baseStyle: React.CSSProperties = {
    transition: 'all 0.2s ease',
    borderRadius: '9999px',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  switch (styling.buttonStyle) {
    case '3d':
      return {
        ...baseStyle,
        background: type === 'primary'
          ? `linear-gradient(to bottom, ${lightenColor(styling.primaryColor || '#4f46e5', 0.2)}, ${styling.primaryColor || '#4f46e5'})`
          : `linear-gradient(to bottom, ${lightenColor(styling.secondaryColor || '#4f46e5', 0.2)}, ${styling.secondaryColor || '#4f46e5'})`,
        boxShadow: '0 4px 0 rgba(0,0,0,0.2)',
        transform: 'translateY(0)',
        color: 'white',
      };
      
    case 'frosted':
      return {
        ...baseStyle,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        color: 'white',
      };
      
    default: // Minimal
      return {
        ...baseStyle,
        backgroundColor: type === 'primary' ? styling.primaryColor : styling.secondaryColor,
        color: 'white',
      };
  }
}
