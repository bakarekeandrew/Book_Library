// src/screens/BookDetailScreen.tsx
import React, { useContext } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BookContext } from '../context/BookContext';

export default function BookDetailScreen(){
  const { books, deleteBook } = useContext(BookContext);
  const navigation = useNavigation();
  const route = useRoute();
  const bookId = route.params?.bookId;
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return <Text>Book not found</Text>;
  }

  const handleDelete = async () => {
    await deleteBook(book.id!);
    navigation.goBack();
  };

  const handleEdit = () => {
    navigation.navigate('AddEditBook', { bookId: book.id });
  };

  return (
    <ScrollView style={styles.container}>
      {book.imageUri && (
        <Image source={{ uri: book.imageUri }} style={styles.image} />
      )}
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.rating}>Rating: {book.rating}/5</Text>
      <Text style={styles.status}>{book.isRead ? 'Read' : 'Unread'}</Text>
      <Text style={styles.description}>{book.description}</Text>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleEdit} style={styles.button}>
          Edit
        </Button>
        <Button mode="contained" onPress={handleDelete} style={styles.button}>
          Delete
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});
