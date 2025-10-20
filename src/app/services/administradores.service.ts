// src/app/services/administradores.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {
  private apiUrl = 'http://localhost:3000/api'; // Ajusta según tu backend

  constructor(private http: HttpClient) { }

  // Esquema para administrador
  public esquemaAdmin() {
    return {
      'clave_admin': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'telefono': '',
      'rfc': '',
      'edad': '',
      'ocupacion': '',
      'rol': 'administrador'
    };
  }

  // Validaciones para administrador
  public validarAdmin(data: any, editar: boolean): any {
    let errors: any = {};

    if (!data.clave_admin) {
      errors.clave_admin = "La clave de administrador es requerida";
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

    if (!data.telefono) {
      errors.telefono = "El teléfono es requerido";
    }

    return errors;
  }

  private validarEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }

  // Registrar administrador
  public registrarAdmin(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/administradores/registro`, data);
  }
}