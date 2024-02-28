import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent {

  constructor(private router: Router) { }

  @Input() dni: string | undefined;
  @Input() nombre: string | undefined;
  @Input() apellidos: string | undefined;
  @Input() correo: string | undefined;
  @Input() peso: number | undefined;
  @Input() altura: number | undefined;

  cambiarContrasenia(){
    this.router.navigate(['/cambiar-contrasenia']);
  }
  
}
