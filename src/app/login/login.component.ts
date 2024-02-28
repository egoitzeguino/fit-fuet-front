import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './../services/loginService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  theme: string = 'light';
  loginErrorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const contrasenia = this.loginForm.get('contrasenia')?.value;

      this.loginService.authenticateGet(email, contrasenia)
        .subscribe(
          (isAuthenticated: any) => {
            if (isAuthenticated) {
              this.router.navigate(['/about']);
              Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: '¡Bienvenido!',
                confirmButtonText: 'Cerrar'
              });
            } else {
              this.loginErrorMessage = 'Email o contraseña incorrectos';
              Swal.fire({
                icon: 'error',
                title: 'Inicio de sesión incorrecto',
                text: 'Email o contraseña incorrectos',
                confirmButtonText: 'Cerrar'
              });
            }
          },
          (error) => {
            console.error('Error during authentication:', error);
          }
        );
    }
  }
  olvidarContrasenia() {
    const email = this.loginForm.get('email')?.value;
    if (email) {
      this.loginService.enviarContrasenia(email).subscribe(
        response => {
          console.log('Correo de recuperación de contraseña enviado correctamente:', response);
          Swal.fire({
            icon: 'success',
            title: 'Email enviado',
            text: 'Correo enviado con éxito!',
            confirmButtonText: 'Cerrar'
          });
        },
        error => {
          console.error('Error al enviar correo de recuperación de contraseña:', error);
          Swal.fire({
            icon: 'error',
            title: 'Email incorrecto',
            text: 'Ha ocurrido un error al enviar correo',
            confirmButtonText: 'Cerrar'
          });
        }
      );
    }
  }

}


