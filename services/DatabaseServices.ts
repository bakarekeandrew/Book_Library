// src/services/DatabaseService.ts
import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase;

const openDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('Book_db.db');
  }
  return db;
};

export interface Book {
  id?: number;
  title: string;
  author: string;
  rating: number;
  isRead: boolean;
  description: string;
  imageUri: string;
}

export const initDatabase = async (): Promise<void> => {
  const database = await openDatabase();
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS Book_db (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      author TEXT,
      rating INTEGER,
      isRead BOOLEAN,
      description TEXT,
      imageUri TEXT
    );
  `);
};

export const getBooks = async (): Promise<Book[]> => {
  const database = await openDatabase();
  const result = await database.getAllAsync('SELECT * FROM Book_db;');
  return result.map(book => ({ ...book, isRead: Boolean(book.isRead) }));
};

export const addBook = async (book: Omit<Book, 'id'>): Promise<number> => {
  const database = await openDatabase();
  const result = await database.runAsync(
    'INSERT INTO Book_db (title, author, rating, isRead, description, imageUri) VALUES (?, ?, ?, ?, ?, ?);',
    [book.title, book.author, book.rating, Number(book.isRead), book.description, book.imageUri]
  );
  return result.lastInsertRowId as number;
};

export const updateBook = async (book: Book): Promise<void> => {
  const database = await openDatabase();
  await database.runAsync(
    'UPDATE Book_db SET title = ?, author = ?, rating = ?, isRead = ?, description = ?, imageUri = ? WHERE id = ?;',
    [book.title, book.author, book.rating, Number(book.isRead), book.description, book.imageUri, book.id]
  );
};

export const deleteBook = async (id: number): Promise<void> => {
  const database = await openDatabase();
  await database.runAsync('DELETE FROM Book_db WHERE id = ?;', [id]);
};