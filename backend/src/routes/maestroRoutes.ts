import { Router } from 'express';
import { registrarMaestro } from '../controllers/maestroController';

const router = Router();

router.post('/registro', registrarMaestro);

export default router;