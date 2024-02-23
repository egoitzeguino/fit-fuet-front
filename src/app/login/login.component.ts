import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './../services/loginService.service';

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
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loginService.isAuthenticated$.subscribe((isAuthenticated: any) => {
      if (isAuthenticated) {
        this.router.navigate(['/dashboard']);
      } else {
        this.loginErrorMessage = 'Email o contraseña incorrectos';
      }
    });
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }

  login() {
    if (this.loginForm.valid) {
      const emailControl = this.loginForm.get('username');
      const contraseniaControl = this.loginForm.get('password');

      if (emailControl && contraseniaControl) {
        const email = emailControl.value;
        const contrasenia = contraseniaControl.value;

        this.loginService.authenticate(email, contrasenia);
      }
    }
  }
}
