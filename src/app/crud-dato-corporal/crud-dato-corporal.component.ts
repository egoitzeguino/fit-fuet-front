import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuarioService.service';
import { DatosUsuario } from '../interfaces/datosUsuario';

@Component({
  selector: 'app-crud-dato-corporal',
  templateUrl: './crud-dato-corporal.component.html',
  styleUrls: ['./crud-dato-corporal.component.scss']
})
export class CrudDatoCorporalComponent implements OnInit {
  theme: string = 'light';
  datosCorporalForm!: FormGroup;
  agregar: boolean = true;
  datoCorporal: any;
  altura!: number;
  peso!: number;
  date: string = new Date().toISOString().slice(0, 10);
  ultimaAltura!: number;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
  )
  {
    this.datosCorporalForm = this.fb.group({
      altura: [''],
      peso: ['', [Validators.required]],
      fecha: [''],
    })
  }
  ngOnInit(): void {
    this.comprobarSiEsEditar();
    this.obtenerUltimaAltura();
  }

  comprobarSiEsEditar(){
    if(localStorage.getItem('datoCorporal') !== null){
      this.agregar = false;
      this.datoCorporal = JSON.parse(localStorage.getItem('datoCorporal')!);
      this.altura = parseFloat(this.datoCorporal.item2);
      this.peso = parseFloat(this.datoCorporal.item3);
      localStorage.removeItem('datoCorporal');
    }
  }

  //TODO: Que no se puedan insertar datos negativos
  crud() {
    if(this.agregar){
      if (this.datosCorporalForm.valid) {
        const peso = this.datosCorporalForm.get('peso')!.value;
        const altura = this.datosCorporalForm.get('altura')!.value;
        const fecha = (this.datosCorporalForm.get('fecha')!.value).toString();
        let datoUsuario: DatosUsuario = {
          idUsuario: parseInt(localStorage.getItem('idUsuario')!),
          peso: peso,
          altura: altura,
          fechaRegistro: fecha,
          activo: 0
        };
        this.usuarioService.agregarDatoCorporal(datoUsuario).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Dato agregado',
            text: '¡Dato agregado con éxito!',
            confirmButtonText: 'Cerrar'
          });
          this.router.navigate(['/datos-personales']);
        },
        (error: any) => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Error al añadir',
            text: error.error,
            confirmButtonText: 'Cerrar'
          });
        }
        );
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Datos incorrectos',
          text: 'Debe rellenar el peso para añadir el nuevo registro',
          confirmButtonText: 'Cerrar'
        });
      }
    }
    else{
      if (this.datosCorporalForm.valid) {
        const peso = this.datosCorporalForm.get('peso')!.value;
        const altura = this.datosCorporalForm.get('altura')!.value;
        const fecha = (this.datosCorporalForm.get('fecha')!.value).toString();
        let datoUsuario: DatosUsuario = {
          idUsuario: parseInt(localStorage.getItem('idUsuario')!),
          peso: peso,
          altura: altura,
          fechaRegistro: fecha,
          activo: 0
        };
        this.usuarioService.editarDatoCorporal(parseInt(this.datoCorporal.item1), datoUsuario).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Dato editado',
            text: '¡Dato editado con exito!',
            confirmButtonText: 'Cerrar'
          })
        }, (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al editar',
            text: error.error,
            confirmButtonText: 'Cerrar'
          })
        })
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Datos incorrectos',
          text: 'Debe rellenar el peso para añadir el nuevo registro',
          confirmButtonText: 'Cerrar'
        });
      }
    }
  }

  //TODO: PEDIR CONFIRMACIÓN PARA ELIMINAR EL REGISTRO
  eliminar(){
    this.usuarioService.eliminarDatoCorporal(parseInt(this.datoCorporal.item1)).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Dato eliminado',
        text: '¡Registro eliminado con éxito!',
        confirmButtonText: 'Cerrar'
      })
    })
  }

  obtenerUltimaAltura(){
    this.usuarioService.obtenerUltimaAltura(parseInt(localStorage.getItem('idUsuario')!)).subscribe((data: any) => {
      if(data !== -1)
        this.ultimaAltura = data;
    })
  }
}

