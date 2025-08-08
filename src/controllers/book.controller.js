import { readData, writeData } from '../database/rwJsonDB.js';


const DB_FILE = 'dbBook.json';


export const getBooks = (req, res) => {
  const data = readData(DB_FILE);
  res.json(data.books);
};


export const getBookById = (req, res) => {
  const data = readData(DB_FILE);
  const id = parseInt(req.params.id);
  const book = data.books.find((b) => b.id === id);
  res.json(book);
};


export const createBook = (req, res) => {
  const data = readData(DB_FILE);
  const newBook = {
    id: data.books.length + 1,
    ...req.body,
  };
  data.books.push(newBook);
  writeData(DB_FILE, data);
  res.json(newBook);
};


export const updateBook = (req, res) => {
  const data = readData(DB_FILE);
  const id = parseInt(req.params.id);
  const index = data.books.findIndex((b) => b.id === id);
  data.books[index] = { ...data.books[index], ...req.body };
  writeData(DB_FILE, data);
  res.json({ message: 'Book updated successfully' });
};


export const deleteBook = (req, res) => {
  const data = readData(DB_FILE);
  const id = parseInt(req.params.id);
  const index = data.books.findIndex((b) => b.id === id);
  data.books.splice(index, 1);
  writeData(DB_FILE, data);
  res.json({ message: 'Book deleted successfully' });
};
