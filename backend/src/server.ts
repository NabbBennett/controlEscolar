import app from './app';
import { testConnection } from './config/database';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Probar conexión a la base de datos
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('No se pudo conectar a la base de datos. Saliendo...');
      process.exit(1);
    }

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
      console.log(`Endpoints disponibles:`);
      console.log(`   POST http://localhost:${PORT}/api/administradores/registro`);
      console.log(`   POST http://localhost:${PORT}/api/alumnos/registro`);
      console.log(`   POST http://localhost:${PORT}/api/maestros/registro`);
      console.log(`   GET  http://localhost:${PORT}/api/health`);
      console.log(`   GET  http://localhost:${PORT}/api/administradores`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();