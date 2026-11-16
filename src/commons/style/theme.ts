export interface StyleClosetTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    surfaceLight: string;
    border: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    success: string;
    danger: string;
    sale: string;
    badgeViral: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
  };
}

const colors = {
  primary: '#0e1015',
  secondary: '#eabf00',
  accent: '#ccff00', // electric volt / lime
  background: '#090a0d',
  surface: '#14161d',
  surfaceLight: '#1c1f28',
  border: '#282c38',
  text: '#ffffff',
  textSecondary: '#a0a6b5',
  textMuted: '#687082',
  success: '#10b981',
  danger: '#ef4444',
  sale: '#ff3b30',
  badgeViral: '#ec4899',
};

const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1025px',
  wide: '1440px',
};

const theme: StyleClosetTheme = {
  colors,
  breakpoints,
};

export { theme };
