import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme as useCustomTheme } from '../context/ThemeProvider';


const CellRenderer = ({ title, author, rating, isRead, imageUri }) => {
  const { isDarkMode } = useCustomTheme();

  const truncateText = (text, maxLength = 13) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const backgroundColor = isDarkMode ? '#121212' : '#FFFFFF';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={[styles.title, { color: textColor }]}>{truncateText(title)}</Text>
      <Text style={[styles.author, { color: textColor }]}>{truncateText(author)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 3,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: 105,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default CellRenderer;