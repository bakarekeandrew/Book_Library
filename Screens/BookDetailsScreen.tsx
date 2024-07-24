import React, { useContext, useState } from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, useTheme, Switch } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BookContext } from '../context/BookContext';
import { AntDesign } from '@expo/vector-icons';
import { useTheme as useCustomTheme } from '../context/ThemeProvider';

export default function BookDetailScreen() {
  const { books, deleteBook, updateBook } = useContext(BookContext);
  const navigation = useNavigation();
  const route = useRoute();
  const bookId = route.params?.bookId;
  const [book, setBook] = useState(books.find(b => b.id === bookId));
  const { isDarkMode } = useCustomTheme();
  const theme = useTheme();

  if (!book) {
    return <Text style={{ color: theme.colors.text }}>Book not found</Text>;
  }

  const handleDelete = async () => {
    await deleteBook(book.id!);
    navigation.goBack();
  };

  const handleEdit = () => {
    navigation.navigate('Add/Edit', { bookId: book.id });
  };

  const handleRatingChange = async (newRating) => {
    const updatedBook = { ...book, rating: newRating };
    await updateBook(updatedBook);
    setBook(updatedBook);
  };
  const handleReadStatusChange = async (newStatus) => {
    const updatedBook = { ...book, isRead: newStatus };
    await updateBook(updatedBook);
    setBook(updatedBook);
  };

  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const backgroundColor = isDarkMode ? '#121212' : '#FFFFFF';


  const StarRating = () => {
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRatingChange(star)}>
            <AntDesign
              name={star <= book.rating ? "star" : "staro"}
              size={24}
              color={star <= book.rating ? "gold" : textColor}
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  


  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {book.imageUri && (
        <Image source={{ uri: book.imageUri }} style={styles.image} />
      )}
      <View style={styles.contStatus}>
        <Text style={[styles.title, { color: textColor }]}>Title: </Text>
        <Text style={[styles.theTitle, { color: textColor }]}>{book.title}</Text> 
      </View>
      <View style={styles.contStatus}>
         <Text style={[styles.author, { color: textColor }]}>Author: </Text>
        <Text style={[styles.theAuthor, { color: textColor }]}> {book.author}</Text>
      </View>
      <View style={styles.contStatus}>
        <Text style={[styles.rating, { color: textColor }]}>Rating: </Text>
        {/* <Text style={[styles.theRating, { color: textColor }]}>{book.rating}</Text>
        <AntDesign name="staro" size={24} color={textColor} /> */}
        <StarRating />
      </View>
      <View style={styles.contStatus}>
        {/* <Text style={[styles.status, { color: textColor }]}>Status: </Text> */}
        <View style={styles.statusToggleContainer}>
          <Text style={[styles.statusText, { color: textColor }]}>
            {book.isRead ? 'Read:' : 'Unread:'}
          </Text>
          <Switch
            value={book.isRead}
            onValueChange={handleReadStatusChange}
            // color={theme.colors.primary}
            color="orange"
          />
        </View>
      </View>
      <View style={styles.contDescription}>
        <Text style={[styles.description, { color: textColor }]}>Description: </Text>
        <Text style={{ color: textColor }}>{book.description}</Text>
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
}

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
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 5,
  },
  contStatus: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statusToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
  statusText: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
  }, 
  // status: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  // },
  // theStatus: {
  //   paddingTop: 3,
  // },
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

