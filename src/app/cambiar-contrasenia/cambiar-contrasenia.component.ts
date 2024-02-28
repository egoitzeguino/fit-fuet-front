import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  ) {
    this.cambiarForm = this.fb.group({
      email: ['', Validators.required],
      contraseniaActual: ['', Validators.required],
      contraseniaNueva: ['', Validators.required],
      contraseniaConfirmacion: ['', Validators.required]
    });
  }

  cambiarContrasenia(){

  }
}
