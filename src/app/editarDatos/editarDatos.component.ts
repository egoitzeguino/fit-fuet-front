import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/loginService.service';
import { EncryptionService } from '../services/encriptarService.service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuarioService.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-editar-datos',
  standalone: true,
  imports: [
    CommonModule,FormsModule
  ],
  templateUrl: './editarDatos.component.html',
  styleUrls: ['./editarDatos.component.css'],
})
export class EditarDatosComponent {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router, private loginService: LoginService, encryptionService: EncryptionService) { }

  @Input() dni: string | undefined = localStorage.getItem('dni') || '';
  @Input() nombre: string | undefined = localStorage.getItem('usuario')?.split(' ')[0] || '';
  @Input() apellido: string | undefined = localStorage.getItem('usuario')?.split(' ')[1] || '';
  @Input() email: string | undefined = localStorage.getItem('email') || '';
  imagenUsuario: any = '';

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
  onFileChanged(event: any) {
    this.imagenUsuario = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.imagenUsuario = reader.result;
      console.log(this.imagenUsuario);
    };

    if(this.imagenUsuario ){
      reader.readAsDataURL(this.imagenUsuario );
    }
  }

  guardarCambios() {
    Swal.fire({
      icon: 'question',
      title: 'Confirmación',
      text: '¿Estás seguro de que quieres guardar los cambios?',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const usuarioActualizado = {
          dni: this.dni,
          nombre: this.nombre,
          apellido: this.apellido,
          email: this.email,
          foto: this.imagenUsuario
        };
        this.usuarioService.actualizarDatosUsuario(usuarioActualizado).subscribe(
          (response: any) => {
            console.log(response);
            localStorage.setItem('authToken', response.token);
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(response.token);
            console.log(decodedToken);
            const usuario = decodedToken.nombreUsuario + ' ' + decodedToken.apellidoUsuario;
            const idUsuario = decodedToken.idUsuario;
            const email = decodedToken.emailUsuario;
            const dni = decodedToken.dniUsuario;
            localStorage.setItem('usuario', usuario);
            localStorage.setItem('idUsuario', idUsuario);
            localStorage.setItem('email', email);
            localStorage.setItem('dni', dni);
            Swal.fire({
              icon: 'success',
              title: 'Cambios guardados',
              text: 'Los cambios se han guardado exitosamente',
              confirmButtonText: 'Cerrar',
            });
            this.router.navigate(['/about']).then(() => {
              window.location.reload();
            });
          },
          (error) => {
            console.error('Error al actualizar datos:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al intentar guardar los cambios. Por favor, inténtalo de nuevo.',
              confirmButtonText: 'Cerrar',
            });
          }
        );
      }
    });
  }
}
