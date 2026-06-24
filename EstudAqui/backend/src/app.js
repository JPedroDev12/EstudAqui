import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import usuariosRoutes from './routes/usuarios.routes.js';
import cursosRoutes from './routes/cursos.routes.js';
import matriculasRoutes from './routes/matriculas.routes.js';
import { listarPorUsuario } from './controllers/matriculasController.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API do EstudAqui! funcionando' });
});

app.use('/usuarios', usuariosRoutes);
app.use('/cursos', cursosRoutes);
app.use('/matriculas', matriculasRoutes);

app.get('/usuarios/:id/matriculas', listarPorUsuario);

export default app;
