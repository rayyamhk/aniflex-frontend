import React, { createContext } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import {
  darkTheme,
  lightTheme,
} from './theme';
import useTheme, { theme } from '../hooks/useTheme';

export const ThemeContext = createContext<[theme, (value: theme) => void]>(['dark', () => {}]);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useTheme('dark');
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <EmotionThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};
