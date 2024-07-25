import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Switch, Text, useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BookContext } from '../context/BookContext';
import * as ImagePicker from 'expo-image-picker';
import { useTheme as useCustomTheme } from '../context/ThemeProvider';

export default function AddEditBookScreen() {
  const [book, setBook] = useState({
    id: undefined,
    title: '',
    author: '',
    rating: 0,
    isRead: false,
    description: '',
    imageUri: '',
  });
  const { addBook, updateBook, books } = useContext(BookContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { isDarkMode } = useCustomTheme();
  const theme = useTheme();

  useEffect(() => {
    if (route.params?.bookId) {
      const bookToEdit = books.find(b => b.id === route.params.bookId);
      if (bookToEdit) setBook(bookToEdit);
    } else {
      // Reset the book state when adding a new book
      setBook({
        id: undefined,
        title: '',
        author: '',
        rating: 0,
        isRead: false,
        description: '',
        imageUri: '',
      });
    }
  }, [route.params?.bookId, books]);

  const handleSave = async () => {
    if (book.id) {
      await updateBook(book);
    } else {
      await addBook(book);
    }
    navigation.goBack();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setBook({ ...book, imageUri: result.assets[0].uri });
    }
  };

  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const backgroundColor = isDarkMode ? '#121212' : '#FFFFFF';

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <TextInput
        label="Title"
        value={book.title}
        onChangeText={(text) => setBook({ ...book, title: text })}
        style={styles.input}
        theme={{ colors: { text: textColor, primary: theme.colors.primary } }}
      />
      <TextInput
        label="Author"
        value={book.author}
        onChangeText={(text) => setBook({ ...book, author: text })}
        style={styles.input}
        theme={{ colors: { text: textColor, primary: theme.colors.primary } }}
      />
      <TextInput
        label="Description"
        value={book.description}
        onChangeText={(text) => setBook({ ...book, description: text })}
        multiline
        style={styles.input}
        theme={{ colors: { text: textColor, primary: theme.colors.primary } }}
      />
      <Button mode="contained" onPress={pickImage} style={styles.button}>
        Pick an image
      </Button>
      <Button mode="contained" onPress={handleSave} style={[styles.button, styles.searchBtn]}>
        {book.id ? 'Update Book' : 'Add Book'}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  searchBtn: {
    backgroundColor: 'orange',
    marginTop: 20,
  }
});