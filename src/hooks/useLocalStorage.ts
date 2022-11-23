import { useEffect, useState } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key) as string;
      if (item === null || item === undefined) {
        setStoredValue(initialValue);
        return;
      }
      if (typeof initialValue === 'string') {
        setStoredValue(item as T);
        return;
      }
      setStoredValue(JSON.parse(item) as T);
    } catch (err) {
      console.error(err);
      setStoredValue(initialValue);
    }
  }, [key, initialValue]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== undefined) {
        if (typeof initialValue === 'string') {
          window.localStorage.setItem(key, value as string);
        } else {
          window.localStorage.setItem(key, JSON.stringify(value));
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  return [storedValue, setValue];
}