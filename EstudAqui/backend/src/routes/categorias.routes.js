import { Router } from 'express';
import { listar, criar, remover } from '../controllers/categoriasController.js';
import { autenticar } from '../middlewares/autenticar.js';

const router = Router();
router.get('/', listar);
router.post('/', autenticar, criar);
router.delete('/:id', autenticar, remover);

export default router;
