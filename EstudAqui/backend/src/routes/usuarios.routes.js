import { Router } from 'express';
import { listar, registrar, login, atualizarCargo, remover } from '../controllers/usuariosController.js';
import { autenticar } from '../middlewares/autenticar.js';

const router = Router();
router.get('/', listar);
router.post('/registro', registrar);
router.post('/login', login);
router.patch('/:id/cargo', autenticar, atualizarCargo);
router.delete('/:id', autenticar, remover);

export default router;
