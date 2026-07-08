import { Router } from 'express';
import { listar, buscarPorId, criar, atualizar, remover } from '../controllers/cursosController.js';
import { autenticar } from '../middlewares/autenticar.js';

const router = Router();

router.get('/', listar);
router.get('/:id', buscarPorId);
router.post('/', criar);
router.put('/:id', atualizar);
router.delete('/:id', remover);

export default router;
