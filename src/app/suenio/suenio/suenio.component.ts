import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuarioService.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Suenio } from '../../interfaces/suenio';

@Component({
  selector: 'app-suenio',
  templateUrl: './suenio.component.html',
  styleUrls: ['./suenio.component.css'],
})
export class SuenioComponent implements OnInit{
  public suenioForm: FormGroup;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
  ) {
    this.suenioForm = this.fb.group({
      horaAcostar: ['', Validators.required],
      horaLevantar: ['', [Validators.required]],
      calidad: ['', [Validators.required]],
      numLevantar: ['', [Validators.required, Validators.min(0)]],
    }, { validators: this.diferenciaMaximaUnDia })
  }

  ngOnInit(): void {

  }

  diferenciaMaximaUnDia(control: AbstractControl): { [key: string]: any } | null {
    const horaAcostar = new Date(control.get('horaAcostar')?.value);
    const horaLevantar = new Date(control.get('horaLevantar')?.value);

    if (!horaAcostar || !horaLevantar) {
      return null;
    }

    const diferencia = Math.abs(horaLevantar.getTime() - horaAcostar.getTime());

    const diasDiferencia = Math.ceil(diferencia / (1000 * 3600 * 24));

    if (diasDiferencia > 1) {
      return { diferenciaMaximaUnDia: true };
    }

    return null;
  }

  agregarSuenio() {
    const nuevaSuenio = { ...this.suenioForm.value };

    if (this.suenioForm.valid) {
      const suenio: Suenio = {
        idUsuario: nuevaSuenio.idUsuario,
        horaAcostar: new Date(nuevaSuenio.horaAcostar),
        horaLevantar: new Date(nuevaSuenio.horaLevantar),
        calidad: nuevaSuenio.calidad,
        numLevantar: nuevaSuenio.numLevantar
      };
    } else {
      this.suenioForm.markAllAsTouched();
    }
  }
  guardar() {
    if (this.suenioForm.valid) {
      const nuevoSuenio = { ...this.suenioForm.value };

      const suenio: Suenio = {
        idUsuario: parseInt(localStorage.getItem('idUsuario')!),
        horaAcostar: new Date(new Date(nuevoSuenio.horaAcostar).getTime() + 60 * 60 * 1000),
        horaLevantar: new Date(new Date(nuevoSuenio.horaLevantar).getTime() + 60 * 60 * 1000),
        calidad: nuevoSuenio.calidad,
        numLevantar: parseInt(nuevoSuenio.numLevantar)
      };

      this.usuarioService.addSuenio(suenio).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Sueño añadido',
            text: '¡Sueño añadido exitósamente!',
            confirmButtonText: 'Cerrar'
          });
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error,
            confirmButtonText: 'Cerrar'
          });
        }
      );
    } else {
      this.suenioForm.markAllAsTouched();
    }
  }

}
