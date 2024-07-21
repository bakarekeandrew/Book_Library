// src/components/CellRenderer.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CellRenderer = ({ title, author, rating, isRead, imageUri }) => {
  const truncateText = (text, maxLength = 13) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.title}>{truncateText(title)}</Text>
      <Text style={styles.author}>{truncateText(author)}</Text>
      {/* <Text style={styles.rating}>Rating: {rating}</Text> */}
      {/* <Text style={styles.isRead}>{isRead ? 'Read' : 'Unread'}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 3,
    padding: 10,
    backgroundColor: '#fff',
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
    color: 'gray',
    textAlign: 'center',
  },
  rating: {
    fontSize: 12,
    color: 'tomato',
    textAlign: 'center',
  },
  isRead: {
    fontSize: 12,
    color: 'green',
    textAlign: 'center',
  },
});

export default CellRenderer;