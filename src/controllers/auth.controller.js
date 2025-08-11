import { readData } from '../database/rwJsonDB.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../jwt/jwt.config.js';


const DB_FILE = 'dbJuser.json';


// Método de login solo para validar credenciales
export const login = (req, res) => {
  console.log('entró al post de login!'); 
  const { correo, clave } = req.body;

  if (!correo || !clave) {
    return res.status(400).json({ message: 'Correo y clave son requeridos' });
  }

  try {
    const data = readData(DB_FILE);
    if (!data || !data.jusers) {
      return res.status(500).json({ message: 'No se pudo acceder a la base de datos' });
    }

    const user = data.jusers.find(
      (u) => u.correo === correo && u.clave === clave
    );

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Devuelvo solo campos seguros
    const { clave: _, ...safeUser } = user;
    res.json(safeUser);

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


// Método para generar token por tipo y correo
export const getToken = (req, res) => {
  console.log('entró al post por token!'); 
  const { tipo, correo } = req.body;

  if (!tipo || !correo) {
    return res.status(400).json({ message: 'Tipo y correo son requeridos' });
  }

  try {
    const token = jwt.sign(
      { correo, role: tipo },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ token });

  } catch (error) {
    console.error('Error al generar token:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


export const getSession = (req, res) => {
  console.log('entró al post por sesion!'); 
  if (!req.user) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  res.json({ user: req.user });
};
