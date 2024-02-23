import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  theme: string = 'light'; // Default theme

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }

  login() {
    if (this.username === 'usuario' && this.password === 'contraseña') {
      alert('Inicio de sesión exitoso');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
