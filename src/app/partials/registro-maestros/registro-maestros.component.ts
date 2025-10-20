// src/app/partials/registro-maestros/registro-maestros.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';
import { MaestrosService } from 'src/app/services/maestros.service';

@Component({
  selector: 'app-registro-maestros',
  templateUrl: './registro-maestros.component.html',
  styleUrls: ['./registro-maestros.component.scss']
})
export class RegistroMaestrosComponent implements OnInit {

  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public maestro:any = {};
  public errors:any = {};
  public editar:boolean = false;
  public token: string = "";
  public idUser: Number = 0;

  public areas: any[] = [
    {value: 'Desarrollo Web', viewValue: 'Desarrollo Web'},
    {value: 'Programación', viewValue: 'Programación'},
    {value: 'Bases de datos', viewValue: 'Bases de datos'},
    {value: 'Redes', viewValue: 'Redes'},
    {value: 'Matemáticas', viewValue: 'Matemáticas'},
  ];

  public materias:any[] = [
    {value: '1', nombre: 'Aplicaciones Web'},
    {value: '2', nombre: 'Programación 1'},
    {value: '3', nombre: 'Bases de datos'},
    {value: '4', nombre: 'Tecnologías Web'},
    {value: '5', nombre: 'Minería de datos'},
    {value: '6', nombre: 'Desarrollo móvil'},
    {value: '7', nombre: 'Estructuras de datos'},
    {value: '8', nombre: 'Administración de redes'},
    {value: '9', nombre: 'Ingeniería de Software'},
    {value: '10', nombre: 'Administración de S.O.'},
  ];

  constructor(
    private router: Router,
    private location : Location,
    public activatedRoute: ActivatedRoute,
    private facadeService: FacadeService,
    private maestrosService: MaestrosService
  ) { }

  ngOnInit(): void {
    this.maestro = this.maestrosService.esquemaMaestro();
    this.maestro.rol = this.rol;

    // Si estamos editando, cargar los datos del usuario
    if (this.datos_user && this.datos_user !== 'null') {
      this.editar = true;
      this.maestro = { ...this.datos_user };
    }

    this.token = this.facadeService.getSessionToken();
    console.log("Datos maestro: ", this.maestro);
  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
    // Validaciones del formulario
    this.errors = {};
    this.errors = this.maestrosService.validarMaestro(this.maestro, this.editar);
    
    if(Object.keys(this.errors).length > 0){
      return false;
    }

    // Verificar si las contraseñas coinciden
    if(this.maestro.password != this.maestro.confirmar_password){
      alert('Las contraseñas no coinciden');
      return false;
    }

    // Si pasa todas las validaciones se registra el maestro
    this.maestrosService.registrarMaestro(this.maestro).subscribe({
      next: (response:any) => {
        alert('Maestro registrado con éxito');
        console.log("Maestro registrado", response);
        
        if(this.token != ""){
          this.router.navigate(['/lista-maestros']); // Ajusta la ruta según tu aplicación
        }else{
          this.router.navigate(['/']);
        }
      },
      error: (error:any) => {
        if(error.status === 422){
          this.errors = error.error.errors;
        } else {
          alert('Error al registrar el maestro');
        }
      }
    });
  }

  public actualizar(){
    // Lógica para actualizar
  }

  //Funciones para password
  showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  //Función para detectar el cambio de fecha
  public changeFecha(event :any){
    console.log(event);
    console.log(event.value.toISOString());

    this.maestro.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.maestro.fecha_nacimiento);
  }

  // Funciones para los checkbox
  public checkboxChange(event:any){
    console.log("Evento: ", event);
    
    // Inicializar el array si no existe
    if (!this.maestro.materias_json) {
      this.maestro.materias_json = [];
    }

    if(event.checked){
      this.maestro.materias_json.push(event.source.value)
    }else{
      console.log(event.source.value);
      this.maestro.materias_json.forEach((materia: string, i: number) => {
        if(materia == event.source.value){
          this.maestro.materias_json.splice(i,1)
        }
      });
    }
    console.log("Array materias: ", this.maestro.materias_json);
  }

  public revisarSeleccion(nombre: string){
    if(this.maestro.materias_json){
      var busqueda = this.maestro.materias_json.find((element: string)=>element==nombre);
      if(busqueda != undefined){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  public soloLetras(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (
      !(charCode >= 65 && charCode <= 90) &&  // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32                         // Espacio
    ) {
      event.preventDefault();
    }
  }
}