import { useEffect, useState } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T, ssr?: boolean): [T, (value: T) => void] {
  const isString = typeof initialValue === 'string';
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined' || ssr) return initialValue;
    try {
      const item = window.localStorage.getItem(key) as string;
      if (item === null || item === undefined) {
        window.localStorage.setItem(key, isString ? initialValue as string : JSON.stringify(initialValue));
        return initialValue;
      }
      if (isString) return item as T;
      return JSON.parse(item) as T;
    } catch (err) {
      return initialValue;
    }
  });

  useEffect(() => {
    if (!ssr) return;
    try {
      const item = window.localStorage.getItem(key) as string;
      if (item === null || item === undefined) return;
      if (isString) {
        setStoredValue(item as T);
        return;
      }
      setStoredValue(JSON.parse(item) as T);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(key, isString ? value as string : JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  }

  return [storedValue, setValue];
}