import { MD3LightTheme } from 'react-native-paper';

export const customColors = {
  primary: '#4A90E2',
  secondary: '#7FDBB6',
  background: '#FFFFFF',
  surface: '#F8F9FA',
  error: '#FF6B6B',
  text: '#2C3E50',
  disabled: '#BDC3C7',
  placeholder: '#95A5A6',
  border: '#E9ECEF',
  success: '#27AE60',
  warning: '#F39C12',
  info: '#3498DB',
  // Colores específicos para embarazo
  pregnancyPink: '#FFB6C1',
  babyBlue: '#87CEEB',
  softYellow: '#FFFACD',
  neutralGray: '#F5F5F5',
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: customColors.primary,
    secondary: customColors.secondary,
    background: customColors.background,
    surface: customColors.surface,
    error: customColors.error,
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onBackground: customColors.text,
    onSurface: customColors.text,
    onError: '#FFFFFF',
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