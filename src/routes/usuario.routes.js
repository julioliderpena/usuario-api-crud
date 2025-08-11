// import express from 'express';
import { Router } from "express";
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from '../controllers/usuario.controller.js';
import { verifyToken, verifyTokenCookie } from '../middlewares/auth.middleware.js';


//const router = express.Router();
const router = Router();

// Para verificar el token generado desde el back end
// router.get('/', verifyToken, getUsuarios);
// router.get('/:id', verifyToken, getUsuarioById);
// router.post('/', verifyToken, createUsuario);
// router.put('/:id', verifyToken, updateUsuario);
// router.delete('/:id', verifyToken, deleteUsuario);

// Para verificar el token generado desde el front end con cookie
router.get('/', verifyTokenCookie, getUsuarios);
router.get('/:id', verifyTokenCookie, getUsuarioById);
router.post('/', verifyTokenCookie, createUsuario);
router.put('/:id', verifyTokenCookie, updateUsuario);
router.delete('/:id', verifyTokenCookie, deleteUsuario);


export default router;
