// src/app/services/alumnos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  public esquemaAlumno() {
    return {
      'matricula': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'fecha_nacimiento': '',
      'curp': '',
      'rfc': '',
      'edad': '',
      'telefono': '',
      'ocupacion': '',
      'rol': 'alumno'
    };
  }

  public validarAlumno(data: any, editar: boolean): any {
    let errors: any = {};

    if (!data.matricula) {
      errors.matricula = "La matrícula es requerida";
    }

    if (!data.first_name) {
      errors.first_name = "El nombre es requerido";
    }

    if (!data.last_name) {
      errors.last_name = "El apellido es requerido";
    }

    if (!data.email) {
      errors.email = "El correo electrónico es requerido";
    } else if (!this.validarEmail(data.email)) {
      errors.email = "El correo electrónico no es válido";
    }

    if (!editar) {
      if (!data.password) {
        errors.password = "La contraseña es requerida";
      }

      if (!data.confirmar_password) {
        errors.confirmar_password = "Confirmar contraseña es requerido";
      }
    }

    if (!data.fecha_nacimiento) {
      errors.fecha_nacimiento = "La fecha de nacimiento es requerida";
    }

    if (!data.curp) {
      errors.curp = "El CURP es requerido";
    }

    return errors;
  }

  private validarEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }

  public registrarAlumno(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/alumnos/registro`, data);
  }
}