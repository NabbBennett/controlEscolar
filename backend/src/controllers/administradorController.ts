import { Request, Response } from 'express';
import pool from '../config/database';
import bcrypt from 'bcrypt';

export const registrarAdministrador = async (req: Request, res: Response) => {
  try {
    const {
      clave_admin,
      first_name,
      last_name,
      email,
      password,
      telefono,
      rfc,
      edad,
      ocupacion,
      rol
    } = req.body;

    console.log('📝 Datos recibidos para administrador:', req.body);

    // Validaciones básicas
    if (!clave_admin || !first_name || !last_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos'
      });
    }

    // Verificar si el email ya existe
    const [emailExistente]: any = await pool.execute(
      'SELECT id FROM administradores WHERE email = ?',
      [email]
    );

    if (emailExistente.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    // Verificar si la clave_admin ya existe
    const [claveExistente]: any = await pool.execute(
      'SELECT id FROM administradores WHERE clave_admin = ?',
      [clave_admin]
    );

    if (claveExistente.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'La clave de administrador ya existe'
      });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insertar en la base de datos
    const [result]: any = await pool.execute(
      `INSERT INTO administradores (clave_admin, first_name, last_name, email, password, telefono, rfc, edad, ocupacion, rol) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [clave_admin, first_name, last_name, email, hashedPassword, telefono, rfc, edad, ocupacion, rol || 'administrador']
    );

    console.log('✅ Administrador registrado, ID:', result.insertId);

    // Obtener el administrador recién creado (sin password)
    const [nuevoAdmin]: any = await pool.execute(
      'SELECT id, clave_admin, first_name, last_name, email, telefono, rfc, edad, ocupacion, rol, fecha_creacion FROM administradores WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Administrador registrado exitosamente',
      data: nuevoAdmin[0]
    });

  } catch (error: any) {
    console.error('💥 Error en registro de administrador:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const obtenerAdministradores = async (req: Request, res: Response) => {
  try {
    const [administradores]: any = await pool.execute(
      'SELECT id, clave_admin, first_name, last_name, email, telefono, rfc, edad, ocupacion, rol, fecha_creacion FROM administradores'
    );

    res.json({
      success: true,
      data: administradores
    });
  } catch (error: any) {
    console.error('Error obteniendo administradores:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};