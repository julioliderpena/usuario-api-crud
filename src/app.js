import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';

import bookRoutes from './routes/book.routes.js';
import juserRoutes from './routes/juser.routes.js';
import usuarioRoutes from './routes/usuario.routes.js'


const app = express();

app.use(express.json());
app.use(bodyParser.json());
//app.use(cors());
app.use(cors({
  origin: "http://localhost:3000", // tu front
  credentials: true
}));

// Middleware para leer cookies
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/jusers', juserRoutes);
app.use('/api/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API con Node.js!');
});

export default app;
