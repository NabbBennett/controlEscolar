-- Crear base de datos
CREATE DATABASE IF NOT EXISTS controlescolar;
USE controlescolar;

-- Tabla para administradores
CREATE TABLE IF NOT EXISTS administradores (
  id INT PRIMARY KEY AUTO_INCREMENT,
  clave_admin VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  rfc VARCHAR(13),
  edad INT,
  ocupacion VARCHAR(100),
  rol VARCHAR(50) DEFAULT 'administrador',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para alumnos
CREATE TABLE IF NOT EXISTS alumnos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  matricula VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fecha_nacimiento DATE,
  curp VARCHAR(18),
  rfc VARCHAR(13),
  edad INT,
  telefono VARCHAR(20),
  ocupacion VARCHAR(100),
  rol VARCHAR(50) DEFAULT 'alumno',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla para maestros
CREATE TABLE IF NOT EXISTS maestros (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_trabajador VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  fecha_nacimiento DATE,
  telefono VARCHAR(20),
  rfc VARCHAR(13),
  cubiculo VARCHAR(50),
  area_investigacion VARCHAR(100),
  materias_json JSON,
  rol VARCHAR(50) DEFAULT 'maestro',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar un administrador por defecto (opcional)
INSERT IGNORE INTO administradores (clave_admin, first_name, last_name, email, password, telefono, rol) 
VALUES ('ADMIN001', 'Administrador', 'Principal', 'admin@escuela.com', '$2b$12$hashedpassword', '1234567890', 'administrador');