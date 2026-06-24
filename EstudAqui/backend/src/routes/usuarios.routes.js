import { Router } from 'express';
import { listar, registrar, login } from '../controllers/usuariosController.js';

const router = Router();

router.get('/', listar);
router.post('/registro', registrar);
router.post('/login', login);

export default router;
