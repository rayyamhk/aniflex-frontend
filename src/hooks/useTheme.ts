import { useEffect, useLayoutEffect, useState } from 'react';

export type theme = 'dark' | 'light';
const THEME_KEY = 'aniflex-theme';

// Hack to avoid 'useLayoutEffect' warning during ssr.
function getUseEffectHook() {
  return typeof window === 'undefined' ? useEffect : useLayoutEffect;
}

export default function useTheme(initialValue: theme): [theme, (value: theme) => void] {
  const [storedValue, setStoredValue] = useState<theme>(initialValue);

  const isomorphicEffect = getUseEffectHook();

  isomorphicEffect(() => {
    try {
      const item = window.localStorage.getItem(THEME_KEY) as string;
      if (item === null || item === undefined) {
        setStoredValue(initialValue);
        return;
      }
      setStoredValue(item as theme);
    } catch (err) {
      console.error(err);
      setStoredValue(initialValue);
    }
  }, []);

  const setValue = (value: theme) => {
    try {
      setStoredValue(value);
      if (typeof window !== undefined) {
        window.localStorage.setItem(THEME_KEY, value);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return [storedValue, setValue];
}