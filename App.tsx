import React, { useEffect } from 'react';
import { BookProvider } from './context/BookContext';
import AppNavigator from './Navigation/AppNavigator';
import { getData } from './utils/storage';
import { ThemeProvider } from './context/ThemeProvider';

export default function App() {
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    const savedDarkMode = await getData('darkMode');
  };

  return (
    <ThemeProvider>
      <BookProvider>
        <AppNavigator />
      </BookProvider>
    </ThemeProvider>
  );
}