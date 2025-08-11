// import express from 'express';
import { Router } from "express";
import {
  getJusers, getJuserById,
  createJuser, updateJuser, deleteJuser,
} from '../controllers/juser.controller.js';
import { verifyToken, verifyTokenCookie } from '../middlewares/auth.middleware.js';


//const router = express.Router();
const router = Router();


// Para verificar el token generado desde el back end
//router.get('/', verifyToken, getJusers);
// router.get('/:id', verifyToken, getJuserById);
// router.post('/', verifyToken, createJuser);
// router.put('/:id', verifyToken, updateJuser);
// router.delete('/:id', verifyToken, deleteJuser);

// Para verificar el token generado desde el front end con cookie
router.get('/', verifyTokenCookie, getJusers);
router.get('/:id', verifyTokenCookie, getJuserById);
router.post('/', verifyTokenCookie, createJuser);
router.put('/:id', verifyTokenCookie, updateJuser);
router.delete('/:id', verifyTokenCookie, deleteJuser);


export default router;
