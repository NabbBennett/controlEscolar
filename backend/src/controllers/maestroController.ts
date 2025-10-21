import { Request, Response } from 'express';
import pool from '../config/database';
import bcrypt from 'bcrypt';

export const registrarMaestro = async (req: Request, res: Response) => {
  try {
    const {
      id_trabajador,
      first_name,
      last_name,
      email,
      password,
      fecha_nacimiento,
      telefono,
      rfc,
      cubiculo,
      area_investigacion,
      materias_json,
      rol
    } = req.body;

    console.log('Datos recibidos para maestro:', req.body);

    if (!id_trabajador || !first_name || !last_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos'
      });
    }

    const [emailExistente]: any = await pool.execute(
      'SELECT id FROM maestros WHERE email = ?',
      [email]
    );

    if (emailExistente.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    const [idExistente]: any = await pool.execute(
      'SELECT id FROM maestros WHERE id_trabajador = ?',
      [id_trabajador]
    );

    if (idExistente.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'El ID de trabajador ya existe'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const materiasJsonString = Array.isArray(materias_json) 
      ? JSON.stringify(materias_json) 
      : materias_json;

    const [result]: any = await pool.execute(
      `INSERT INTO maestros (id_trabajador, first_name, last_name, email, password, fecha_nacimiento, telefono, rfc, cubiculo, area_investigacion, materias_json, rol) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id_trabajador, first_name, last_name, email, hashedPassword, fecha_nacimiento, telefono, rfc, cubiculo, area_investigacion, materiasJsonString, rol || 'maestro']
    );

    console.log('Maestro registrado, ID:', result.insertId);

    const [nuevoMaestro]: any = await pool.execute(
      'SELECT id, id_trabajador, first_name, last_name, email, fecha_nacimiento, telefono, rfc, cubiculo, area_investigacion, materias_json, rol, fecha_creacion FROM maestros WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Maestro registrado exitosamente',
      data: nuevoMaestro[0]
    });

  } catch (error: any) {
    console.error('Error en registro de maestro:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};