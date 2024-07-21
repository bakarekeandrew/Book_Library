// src/components/CellRenderer.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CellRendererProps {
  title: string;
  author: string;
}

const CellRenderer: React.FC<CellRendererProps> = ({ title, author }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>{author}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
});

export default CellRenderer;