import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './../services/loginService.service';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    private snackBar: MatSnackBar
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
            this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
              duration: 5000,
              panelClass: ['snackbar-success']
            });
          } else {
            this.loginErrorMessage = 'Email o contraseña incorrectos';
            this.snackBar.open('Inicio de sesión incorrecto', 'Cerrar', {
              duration: 5000,
              panelClass: ['snackbar-error']
            });
          }
        },
        (error) => {
          console.error('Error during authentication:', error);
        }
      );
  }
}

}
