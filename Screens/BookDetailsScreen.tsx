// src/screens/BookDetailScreen.tsx
import React, { useContext } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BookContext } from '../context/BookContext';
import { AntDesign } from '@expo/vector-icons';

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
    navigation.navigate('Add/Edit', { bookId: book.id });
  };

  return (
    <ScrollView style={styles.container}>
      {book.imageUri && (
        <Image source={{ uri: book.imageUri }} style={styles.image} />
      )}
      <View style={styles.contStatus}>
        <Text style={styles.title}>Title: </Text>
        <Text style={styles.theTitle}>{book.title}</Text> 
      </View>
      <View style={styles.contStatus}>
         <Text style={styles.author}>Author: </Text>
        <Text style={styles.theAuthor}> {book.author}</Text>
      </View>
      <View style={styles.contStatus}>
        <Text style={styles.rating}>Rating: </Text>
        <Text style={styles.theRating}>{book.rating}</Text>
        <AntDesign name="staro" size={24} color="black" backgroundColor="orange"/>
      </View>
      <View style={styles.contStatus}>
        <Text style={styles.status}>Status: </Text>
        <Text style={styles.theStatus}> {book.isRead ? 'Read' : 'Unread'}</Text>
      </View>
      <View style={styles.contDescription}>
        <Text style={styles.description}>Description: </Text>
        <Text>{book.description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleEdit} style={[styles.button, styles.edit]}>
          Edit
        </Button>
        <Button mode="contained" onPress={handleDelete} style={[styles.button, styles.delete]}>
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
  theTitle: {
     paddingTop: 5,
     fontSize: 18,
  },
  author: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contStatus: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  theStatus: {
    paddingTop: 3,
  },
  theRating: {
    paddingTop: 4,
  },
  theAuthor: {
    paddingTop: 4,
  },

  contDescription: {
    flexDirection: 'column',
    marginTop: 5,
    marginBottom: 20,
  },
  description: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  edit: {
    backgroundColor: 'orange',
  },
  delete: {
    backgroundColor: '#880808',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});
