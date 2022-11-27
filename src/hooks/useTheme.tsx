import React, { createContext, useContext } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import {
  darkTheme,
  lightTheme,
} from '../mui/theme';
import useLocalStorage from './useLocalStorage';
import { LOCAL_STORAGE_THEME } from '../constants';

type theme = 'light' | 'dark';

const ThemeContext = createContext<[theme, (value: theme) => void]>(['dark', () => {}]);

export function ThemeProvider({ children, defaultTheme }: { children: React.ReactNode, defaultTheme: theme }) {
  const [theme, setTheme] = useLocalStorage<theme>(LOCAL_STORAGE_THEME, defaultTheme, true);
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