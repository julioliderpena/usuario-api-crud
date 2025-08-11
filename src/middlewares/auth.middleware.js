import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../jwt/jwt.config.js';


export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // El token debería venir así: "Bearer eyJhbGciOi..."
  if (!authHeader) {
    return res.status(403).json({ message: 'Token requerido' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Guardamos la info del token en la request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};


export function verifyTokenCookie (req, res, next) {
  console.log('entró a la verificación de token por Cookie!'); 
  const token = req.cookies?.NextSessionNur;

  if (!token) {
    return res.status(401).json({ message: 'Token no encontrado en cookie' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
    console.log("terminó el middleware!");
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}
