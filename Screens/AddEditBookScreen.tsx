// src/screens/AddEditBookScreen.tsx
import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Switch, Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BookContext } from '../context/BookContext';
import * as ImagePicker from 'expo-image-picker';

export default function AddEditBookScreen(){
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

  useEffect(() => {
    if (route.params?.bookId) {
      const bookToEdit = books.find(b => b.id === route.params.bookId);
      if (bookToEdit) setBook(bookToEdit);
    }
  }, [route.params?.bookId]);

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

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Title"
        value={book.title}
        onChangeText={(text) => setBook({ ...book, title: text })}
        style={styles.input}
      />
      <TextInput
        label="Author"
        value={book.author}
        onChangeText={(text) => setBook({ ...book, author: text })}
        style={styles.input}
      />
      <TextInput
        label="Rating"
        value={book.rating.toString()}
        onChangeText={(text) => setBook({ ...book, rating: parseInt(text) || 0 })}
        keyboardType="numeric"
        style={styles.input}
      />
      <View style={styles.switchContainer}>
        <Text>Read</Text>
        <Switch
          value={book.isRead}
          onValueChange={(value) => setBook({ ...book, isRead: value })}
        />
      </View>
      <TextInput
        label="Description"
        value={book.description}
        onChangeText={(text) => setBook({ ...book, description: text })}
        multiline
        style={styles.input}
      />
      <Button mode="contained" onPress={pickImage} style={styles.button}>
        Pick an image
      </Button>
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save Book
      </Button>
    </ScrollView>
  );
};

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
});

