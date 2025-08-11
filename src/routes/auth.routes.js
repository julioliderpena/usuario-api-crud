import express from 'express';
import { login, getToken, getSession } from '../controllers/auth.controller.js';
import { verifyTokenCookie } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Solo ruteo, sin lógica
router.post('/login', login);

// API para generar token y pueda ser usado en las APIs
router.post('/gettoken', getToken);

// Endpoint protegido, devuelve info de usuario si token es válido
router.get('/session', verifyTokenCookie, getSession); // Endpoint protegido, devuelve info de usuario si token es válido

export default router;
