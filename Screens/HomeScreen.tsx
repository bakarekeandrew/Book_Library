// src/screens/HomeScreen.tsx
import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Searchbar, FAB } from 'react-native-paper';
import { BookContext } from '../context/BookContext';
import BookItem from '../components/BookItem';
import { useNavigation } from '@react-navigation/native';
import { getData } from '../utils/storage';
import CellRenderer from '../components/CellRenderer';

export default function HomeScreen(){
  const { books } = useContext(BookContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const navigation = useNavigation();

  useEffect(() => {
    loadSortPreference();
  }, []);

  const loadSortPreference = async () => {
    const savedSortBy = await getData('sortBy');
    if (savedSortBy) setSortBy(savedSortBy);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'author') return a.author.localeCompare(b.author);
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <View style={{ flex: 1 }}>
      <Searchbar
        placeholder="Search books"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={sortedBooks}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}>
            <CellRenderer 
                title={item.title} 
                author={item.author}
                rating={item.rating}
                isRead={item.isRead}
            />
            </TouchableOpacity>
  )}
  keyExtractor={item => item.id!.toString()}
/>
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        icon="plus"
        onPress={() => navigation.navigate('AddEditBookScreen')}
      />
    </View>
  );
};

