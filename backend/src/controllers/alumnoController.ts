import { Request, Response } from 'express';
import pool from '../config/database';
import bcrypt from 'bcrypt';

export const registrarAlumno = async (req: Request, res: Response) => {
  try {
    const {
      matricula,
      first_name,
      last_name,
      email,
      password,
      fecha_nacimiento,
      curp,
      rfc,
      edad,
      telefono,
      ocupacion,
      rol
    } = req.body;

    console.log('Datos recibidos para alumno:', req.body);

    if (!matricula || !first_name || !last_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos'
      });
    }

    const [emailExistente]: any = await pool.execute(
      'SELECT id FROM alumnos WHERE email = ?',
      [email]
    );

    if (emailExistente.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    const [matriculaExistente]: any = await pool.execute(
      'SELECT id FROM alumnos WHERE matricula = ?',
      [matricula]
    );

    if (matriculaExistente.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'La matrícula ya existe'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [result]: any = await pool.execute(
      `INSERT INTO alumnos (matricula, first_name, last_name, email, password, fecha_nacimiento, curp, rfc, edad, telefono, ocupacion, rol) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [matricula, first_name, last_name, email, hashedPassword, fecha_nacimiento, curp, rfc, edad, telefono, ocupacion, rol || 'alumno']
    );

    console.log('Alumno registrado, ID:', result.insertId);

    const [nuevoAlumno]: any = await pool.execute(
      'SELECT id, matricula, first_name, last_name, email, fecha_nacimiento, curp, rfc, edad, telefono, ocupacion, rol, fecha_creacion FROM alumnos WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Alumno registrado exitosamente',
      data: nuevoAlumno[0]
    });

  } catch (error: any) {
    console.error('Error en registro de alumno:', error);
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};