import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/loginService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-contrasenia',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css'],
})
export class CambiarContraseniaComponent {
  cambiarForm: FormGroup;
  theme: string = 'light';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {
    this.cambiarForm = this.fb.group({
      email: ['', Validators.required],
      contraseniaActual: ['', Validators.required],
      contraseniaNueva: ['', Validators.required],
      contraseniaConfirmacion: ['', Validators.required]
    });
  }

  cambiarContrasenia() {
    if (this.cambiarForm.valid) {
      const email = this.cambiarForm.get('email')?.value;
      const contraseniaActual = this.cambiarForm.get('contraseniaActual')?.value;
      const contraseniaNueva = this.cambiarForm.get('contraseniaNueva')?.value;
      const idUsuario = Number(localStorage.getItem('idUsuario'));
      this.loginService.changePassword(idUsuario,contraseniaNueva,email,contraseniaActual).subscribe(
        (response: any) => {
          this.router.navigate(['/about']);
          Swal.fire({
            icon: 'success',
            title: 'Cambio de contraseña',
            text: 'Cambio de contraseña exitoso',
            confirmButtonText: 'Cerrar'
          });
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Cambio de contraseña',
            text: 'Error al cambiar la contraseña',
            confirmButtonText: 'Cerrar'
          });
        }
      );
    }
  }
}
