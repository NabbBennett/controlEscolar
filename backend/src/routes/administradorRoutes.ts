import { Router } from 'express';
import { registrarAdministrador, obtenerAdministradores } from '../controllers/administradorController';

const router = Router();

router.post('/registro', registrarAdministrador);
router.get('/', obtenerAdministradores);

export default router;