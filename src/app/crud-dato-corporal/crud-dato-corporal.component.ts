import { Component } from '@angular/core';
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
export class CrudDatoCorporalComponent {
  theme: string = 'light';
  datosCorporalForm!: FormGroup;
  agregar:boolean = true;

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
          this.router.navigate(['/login']);
        },
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Error al añadir',
            text: 'No se pudieron añadir los datos',
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

    }
  }
}

