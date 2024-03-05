import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, Routes } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/loginService.service';
import { EncryptionService } from '../../services/encriptarService.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit{

  constructor(private router: Router, private loginService: LoginService, encryptionService: EncryptionService) { }

  @Input() dni: string | undefined = localStorage.getItem('dni') || '';
  @Input() nombre: string | undefined = localStorage.getItem('usuario')?.split(' ')[0] || '';
  @Input() apellidos: string | undefined = localStorage.getItem('usuario')?.split(' ')[1] || '';
  @Input() correo: string | undefined = localStorage.getItem('email') || '';
  imagenUsuario: string | undefined = '';

  ngOnInit(): void {
    this.loginService.obtenerImagenUsuario(parseInt(localStorage.getItem('idUsuario')!)).subscribe(
      (response: any) => {
        this.imagenUsuario = response.imagen;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  cambiarContrasenia(){
    this.router.navigate(['/cambiar-contrasenia']);
  }
  eliminarCuenta() {
    Swal.fire({
      title: 'Eliminar cuenta',
      html: '<p>Para poder eliminar la cuenta, introduzca la contraseña:</p>' +
        '<input type="email" id="email" class="swal2-input" placeholder="Ingrese su email">' +
        '<input type="password" id="password" class="swal2-input" placeholder="Ingrese su contraseña">',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      preConfirm: async () => {
        const password = (<HTMLInputElement>document.getElementById('password')).value;
        const passwordEncriptada = new EncryptionService().encryptPassword(password);
        const email = (<HTMLInputElement>document.getElementById('email')).value;

        return { email, passwordEncriptada };
      }
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        const { email, passwordEncriptada } = result.value;
        console.log(email, passwordEncriptada);
        this.loginService.eliminarCuenta(email, passwordEncriptada).subscribe(
          (response: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Cuenta eliminada',
              text: 'Cuenta eliminada exitósamente',
              confirmButtonText: 'Cerrar'
            }).then((repuesta) => {
              if(repuesta.isConfirmed){
                this.loginService.logout();
              }
            });
          },
          (error:any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar la cuenta',
              text: error.error,
              confirmButtonText: 'Cerrar'
            });
          }
        );
      }
    });
  }
  editarDatos(){
    this.router.navigate(['/editar-datos']);
  }
}
