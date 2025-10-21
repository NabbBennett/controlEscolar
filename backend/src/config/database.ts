import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const poolConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_NAME || 'controlescolar',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  connectionLimit: 10,
  waitForConnections: true,
};

const pool = mysql.createPool(poolConfig);

//test-conexión
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conectado a MySQL correctamente');
    console.log('Configuración:', {
      host: poolConfig.host,
      database: poolConfig.database,
      user: poolConfig.user
    });
    connection.release();
    return true;
  } catch (error: any) {
    console.error('Error conectando a MySQL:', error.message);
    return false;
  }
};

export default pool;