import React, { createContext, useContext } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import {
  darkTheme,
  lightTheme,
} from './theme';
import useLocalStorage from '../hooks/useLocalStorage';

type theme = 'light' | 'dark';

const THEME_KEY = 'aniflex-theme';
const ThemeContext = createContext<[theme, (value: theme) => void]>(['dark', () => {}]);

export function ThemeProvider({ children, defaultTheme }: { children: React.ReactNode, defaultTheme: theme }) {
  const [theme, setTheme] = useLocalStorage<theme>(THEME_KEY, defaultTheme);
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <EmotionThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  );
};

export default function useTheme() {
  return useContext(ThemeContext);
}