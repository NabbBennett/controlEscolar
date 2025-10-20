import { Router } from 'express';
import { registrarAlumno } from '../controllers/alumnoController';

const router = Router();

router.post('/registro', registrarAlumno);

export default router;