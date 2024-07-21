// src/context/BookContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Book, getBooks, addBook, updateBook, deleteBook } from '../services/DatabaseServices';

interface BookContextType {
  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => Promise<void>;
  updateBook: (book: Book) => Promise<void>;
  deleteBook: (id: number) => Promise<void>;
  refreshBooks: () => Promise<void>;
}

export const BookContext = createContext<BookContextType>({
  books: [],
  addBook: async () => {},
  updateBook: async () => {},
  deleteBook: async () => {},
  refreshBooks: async () => {},
});

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);

  const refreshBooks = async () => {
    const fetchedBooks = await getBooks();
    setBooks(fetchedBooks);
  };

  useEffect(() => {
    refreshBooks();
  }, []);

  const contextAddBook = async (book: Omit<Book, 'id'>) => {
    await addBook(book);
    refreshBooks();
  };

  const contextUpdateBook = async (book: Book) => {
    await updateBook(book);
    refreshBooks();
  };

  const contextDeleteBook = async (id: number) => {
    await deleteBook(id);
    refreshBooks();
  };

  return (
    <BookContext.Provider
      value={{
        books,
        addBook: contextAddBook,
        updateBook: contextUpdateBook,
        deleteBook: contextDeleteBook,
        refreshBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};