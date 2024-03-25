import { Component, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/loginService.service';
import { UsuarioService } from 'src/app/services/usuarioService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  public showSearch = false;
  public nombreUsuario: string | null = localStorage.getItem('usuario');
  public token: string | null = localStorage.getItem('authToken');
  public perfilUsuario?: string;
  public visible = false;

  constructor(
    private modalService: NgbModal,
    private loginService: LoginService,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    if(this.token !== null){
      this.loginService.obtenerImagenUsuario(Number(localStorage.getItem('idUsuario'))).subscribe(response => {
        this.perfilUsuario = response.imagen;
      })
      this.comprobarVisibilidad();
    }
  }

  logout() {
    this.loginService.logout();
  }

  datosPersonales(){
    this.router.navigate(['/datos-personales']);
  }

  dieta(){
    this.router.navigate(['/dieta']);
  }

  actividadFisica(){
    this.router.navigate(['/actividad-fisica']);
  }

  suenio(){
    this.router.navigate(['/suenio']);
  }

  objetivos(){
    this.router.navigate(['/objetivos']);
  }

  comprobarVisibilidad(){
    this.usuarioService.obtenerUltimoDato(Number(localStorage.getItem('idUsuario'))).subscribe(response => {
      if(response.item1 === -1 && response.item2 === -1){
        this.visible = false;
      } else{
        this.visible = true;
      }
    }, error => {
      console.log(error);
    });
  }

}

/*
  TODO:
  La barra de la derecha tendrá las opciones "Datos personales", "Opciones", "Logout"
  Datos personales tendrá los datos disponibles para editarlos, tanto los personales como los fit
  Opciones tendrá la opción de cambiar contraseña,  cambiar tema, borrar cuenta
*/
