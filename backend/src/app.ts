import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Routes
import administradorRoutes from './routes/administradorRoutes';
import alumnoRoutes from './routes/alumnoRoutes';
import maestroRoutes from './routes/maestroRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/administradores', administradorRoutes);
app.use('/api/alumnos', alumnoRoutes);
app.use('/api/maestros', maestroRoutes);

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Backend funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

export default app;