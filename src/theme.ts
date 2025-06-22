import { MD3LightTheme, MD3Theme } from 'react-native-paper';

export const customColors = {
  pregnancyPink: '#FFE4E1',
  babyBlue: '#E3F2FD',
  softYellow: '#FFF8E1',
  neutralGray: '#F5F5F5',
  success: '#34A853',
  warning: '#FBBC04',
  disabled: '#9AA0A6',
};

export const theme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#4A90E2', // Azul claro - confianza
    secondary: '#7FDBB6', // Verde menta - crecimiento
    background: '#FFFFFF',
    surface: '#F8F9FA',
    surfaceVariant: '#F1F3F4',
    onSurface: '#1A1A1A',
    onSurfaceVariant: '#5F6368',
    error: '#EA4335',
  },
  fonts: {
    ...MD3LightTheme.fonts,
    bodyLarge: {
      fontFamily: 'System',
      fontSize: 16,
      fontWeight: '400' as const,
      letterSpacing: 0.5,
      lineHeight: 24,
    },
    bodyMedium: {
      fontFamily: 'System',
      fontSize: 14,
      fontWeight: '400' as const,
      letterSpacing: 0.25,
      lineHeight: 20,
    },
    titleLarge: {
      fontFamily: 'System',
      fontSize: 22,
      fontWeight: '600' as const,
      letterSpacing: 0,
      lineHeight: 28,
    },
    titleMedium: {
      fontFamily: 'System',
      fontSize: 18,
      fontWeight: '600' as const,
      letterSpacing: 0,
      lineHeight: 24,
    },
    labelLarge: {
      fontFamily: 'System',
      fontSize: 14,
      fontWeight: '600' as const,
      letterSpacing: 0.1,
      lineHeight: 20,
    },
  },
  roundness: 12,
}; 