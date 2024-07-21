import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from 'react-native-paper';
import { BookProvider } from './context/BookContext';
import AppNavigator from './Navigation/AppNavigator';
import { getData } from './utils/storage';

export default function App() {
 
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    const savedDarkMode = await getData('darkMode');
    if (savedDarkMode !== null) setIsDarkMode(savedDarkMode);
  };

  const theme = isDarkMode ? DarkTheme : DefaultTheme;


  return (
    <PaperProvider theme={theme}>
      <BookProvider>
        <AppNavigator />
      </BookProvider>
    </PaperProvider>
  );
}