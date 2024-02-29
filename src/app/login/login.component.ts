import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './../services/loginService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EncryptionService } from '../services/encriptarService.service';
import { delay } from 'rxjs';

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
    private encryptionService: EncryptionService
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
      const encriptedPasswd = this.encryptionService.encryptPassword(contrasenia);

      this.loginService.login(email, encriptedPasswd)
        .subscribe(
          (response: any) => {
            localStorage.setItem('authToken', response.token);
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(response.token);
            const usuario = decodedToken.nombreUsuario + ' ' + decodedToken.apellidoUsuario;
            const idUsuario = decodedToken.idUsuario;
            localStorage.setItem('usuario', usuario);
            localStorage.setItem('idUsuario', idUsuario);
            this.router.navigate(['/about']).then(() => {
              window.location.reload();
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Inicio de sesión incorrecto',
              text: 'Email o contraseña incorrectos',
              confirmButtonText: 'Cerrar'
            });
          }
        );
    }
  }

  olvidarContrasenia() {
    const email = this.loginForm.get('email')?.value;
    if (email) {
      this.loginService.enviarContrasenia(email).subscribe(
        (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Email enviado',
              text: 'Correo enviado con éxito!',
              confirmButtonText: 'Cerrar'
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al enviar correo',
              text: error.error,
              confirmButtonText: 'Cerrar'
            });
          }
        );
    }
  }
}


