import React, { useContext, useState, useEffect, useMemo } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Searchbar, FAB, Menu, Appbar, Text, useTheme as usePaperTheme } from 'react-native-paper';
import { BookContext } from '../context/BookContext';
import { useNavigation } from '@react-navigation/native';
import { getData, storeData } from '../utils/storage';
import CellRenderer from '../components/CellRenderer';
import { useTheme } from '../context/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { books } = useContext(BookContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const paperTheme = usePaperTheme();
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    loadSortPreference();
    startPulseAnimation();
  }, []);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const loadSortPreference = async () => {
    const savedSortBy = await getData('sortBy');
    if (savedSortBy) setSortBy(savedSortBy);
  };

  const handleSortByChange = async (newSortBy) => {
    setSortBy(newSortBy);
    await storeData('sortBy', newSortBy);
    setMenuVisible(false);
  };

  const filteredAndSortedBooks = useMemo(() => {
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'author') return a.author.localeCompare(b.author);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [books, searchQuery, sortBy]);

  const backgroundColor = isDarkMode ? '#121212' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const searchBackgroundColor = isDarkMode ? '#333333' : '#F0F0F0';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Animated.Text style={[styles.quote, { transform: [{ scale: scaleAnim }], color: textColor }]}>
          we are presenting today with mR 
        </Animated.Text>
      </View>
      <Appbar.Header style={{ backgroundColor }}>
        <Appbar.Content title="My Books" titleStyle={[styles.appbarTitle, { color: textColor }]} />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              color={textColor}
              onPress={() => setMenuVisible(true)}
            />
          }
          contentStyle={{ backgroundColor }}
        >
          <Menu.Item onPress={() => handleSortByChange('title')} title="Sort by Title" titleStyle={{ color: textColor }} />
          <Menu.Item onPress={() => handleSortByChange('author')} title="Sort by Author" titleStyle={{ color: textColor }} />
          <Menu.Item onPress={() => handleSortByChange('rating')} title="Sort by Rating" titleStyle={{ color: textColor }} />
        </Menu>
      </Appbar.Header>
      <Searchbar
        style={[styles.search, { backgroundColor: searchBackgroundColor }]}
        placeholder="Search books"
        onChangeText={setSearchQuery}
        value={searchQuery}
        iconColor={textColor}
        placeholderTextColor={textColor}
        inputStyle={{ color: textColor }}
        
      />
      <FlatList
        data={filteredAndSortedBooks}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('BookDetails', { bookId: item.id })}>
            <CellRenderer
              title={item.title}
              author={item.author}
              rating={item.rating}
              isRead={item.isRead}
              imageUri={item.imageUri}
            />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id!.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('Add/Edit')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'red',
    padding: 20,
    marginHorizontal: 10,
    // marginTop: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  quote: {
    color: 'orange',
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  appbar: {
    elevation: 0,
    shadowOpacity: 0,
    height: 40,
  },
  appbarTitle: {
    // alignSelf: 'center',
    fontWeight: 'bold',
  },
  search: {
    margin: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'orange',
  },
});