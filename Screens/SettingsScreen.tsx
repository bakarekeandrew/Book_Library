// src/screens/SettingsScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch, RadioButton } from 'react-native-paper';
import { storeData, getData } from '../utils/storage';

export default function SettingsScreen({ route }){
  const [isDarkMode, setIsDarkMode] = route.parms;
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const savedDarkMode = await getData('darkMode');
    const savedSortBy = await getData('sortBy');
    if (savedDarkMode !== null) setIsDarkMode(savedDarkMode);
    if (savedSortBy !== null) setSortBy(savedSortBy);
  };

  const handleDarkModeChange = (value: boolean) => {
    setIsDarkMode(value);
    storeData('darkMode', value);
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
    storeData('sortBy', value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.setting}>
        <Text>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={handleDarkModeChange} />
      </View>
      <Text style={styles.sectionTitle}>Sort Books By:</Text>
      <RadioButton.Group onValueChange={handleSortByChange} value={sortBy}>
        <View style={styles.radioItem}>
          <RadioButton value="title" />
          <Text>Title</Text>
        </View>
        <View style={styles.radioItem}>
          <RadioButton value="author" />
          <Text>Author</Text>
        </View>
        <View style={styles.radioItem}>
          <RadioButton value="rating" />
          <Text>Rating</Text>
        </View>
      </RadioButton.Group>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

