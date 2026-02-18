import { useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  function setValue(value) {
    try {
      const val = value instanceof Function ? value(storedValue) : value;
      setStoredValue(val);
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error('useLocalStorage error:', e);
    }
  }

  function removeValue() {
    try {
      setStoredValue(initialValue);
      localStorage.removeItem(key);
    } catch (e) {
      console.error('useLocalStorage removeValue error:', e);
    }
  }

  return [storedValue, setValue, removeValue];
}
