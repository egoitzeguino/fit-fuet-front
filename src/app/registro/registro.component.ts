import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
 theme: string = 'light'; 
 toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }
}
  