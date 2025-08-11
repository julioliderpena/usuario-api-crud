// import express from 'express';
import { Router } from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from '../controllers/book.controller.js';
import { verifyToken, verifyTokenCookie } from '../middlewares/auth.middleware.js';


//const router = express.Router();
const router = Router();


// Para verificar el token generado desde el back end
// router.get('/', verifyToken, getBooks);
// router.get('/:id', verifyToken, getBookById);
// router.post('/', verifyToken, createBook);
// router.put('/:id', verifyToken, updateBook);
// router.delete('/:id', verifyToken, deleteBook);

// Para verificar el token generado desde el front end con cookie
router.get('/', verifyTokenCookie, getBooks);
router.get('/:id', verifyTokenCookie, getBookById);
router.post('/', verifyTokenCookie, createBook);
router.put('/:id', verifyTokenCookie, updateBook);
router.delete('/:id', verifyTokenCookie, deleteBook);


export default router;

