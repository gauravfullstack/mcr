'use client';

import { useEffect, useState, type SetStateAction } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      setValue(JSON.parse(storedValue) as T);
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.storageArea !== localStorage || event.key !== key) return;
      setValue(event.newValue === null ? initialValue : JSON.parse(event.newValue) as T);
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, initialValue]);

  const updateValue = (nextValue: SetStateAction<T>) => {
    setValue((currentValue) => {
      const valueToStore =
        typeof nextValue === 'function'
          ? (nextValue as (previousValue: T) => T)(currentValue)
          : nextValue;
      localStorage.setItem(key, JSON.stringify(valueToStore));
      return valueToStore;
    });
  };

  return [value, updateValue] as const;
}
