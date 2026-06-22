import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import usuariosRoutes from './routes/usuarios.routes.js';
import cursosRoutes from './routes/cursos.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rota raiz
app.get('/', (req, res) => {
  res.json({ mensagem: 'API do EstudAqui! funcionando' });
});

// Rotas
app.use('/usuarios', usuariosRoutes);
app.use('/cursos', cursosRoutes);

export default app;
