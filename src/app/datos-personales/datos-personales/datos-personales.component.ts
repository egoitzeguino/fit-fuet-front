import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, Routes } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/loginService.service';
import { EncryptionService } from '../../services/encriptarService.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent {

  constructor(private router: Router, private loginService: LoginService, encryptionService: EncryptionService) { }

  @Input() dni: string | undefined;
  @Input() nombre: string | undefined;
  @Input() apellidos: string | undefined;
  @Input() correo: string | undefined;
  @Input() peso: number | undefined;
  @Input() altura: number | undefined;

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
            console.log(response);
            Swal.fire({
              icon: 'success',
              title: 'Cuenta eliminada',
              text: response.message,
              confirmButtonText: 'Cerrar'
            });
            //Swal.fire('Cuenta eliminada', response.message, 'success');
            this.loginService.logout();
            /*if (response.status === 200) {
              Swal.fire('Cuenta eliminada', response.message, 'success');
              this.router.navigate(['/login']);
            } else {
              Swal.fire('Error al eliminar la cuenta', response && response.message || 'No se ha podido eliminar la cuenta', 'error');
            }*/
          },
          (error:any) => {
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar la cuenta',
              text: error.error,
              confirmButtonText: 'Cerrar'
            });
            console.log(error);
          }
        );
      }
    });
  }
}
