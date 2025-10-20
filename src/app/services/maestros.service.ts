// src/app/services/maestros.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaestrosService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  public esquemaMaestro() {
    return {
      'id_trabajador': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'fecha_nacimiento': '',
      'telefono': '',
      'rfc': '',
      'cubiculo': '',
      'area_investigacion': '',
      'materias_json': [],
      'rol': 'maestro'
    };
  }

  public validarMaestro(data: any, editar: boolean): any {
    let errors: any = {};

    if (!data.id_trabajador) {
      errors.id_trabajador = "El ID de trabajador es requerido";
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

    if (!data.area_investigacion) {
      errors.area_investigacion = "El área de investigación es requerida";
    }

    if (!data.materias_json || data.materias_json.length === 0) {
      errors.materias_json = "Debe seleccionar al menos una materia";
    }

    return errors;
  }

  private validarEmail(email: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }

  public registrarMaestro(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/maestros/registro`, data);
  }
}