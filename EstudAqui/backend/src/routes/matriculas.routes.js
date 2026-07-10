import { Router } from 'express';
import { listar, criar } from '../controllers/matriculasController.js';
import { autenticar } from '../middlewares/autenticar.js';

const router = Router();

router.get('/', listar);

router.post('/', autenticar, criar);

export default router;
