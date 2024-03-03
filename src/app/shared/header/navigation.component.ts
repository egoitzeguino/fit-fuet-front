import { Component, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/loginService.service';

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

  constructor(
    private modalService: NgbModal,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    if(this.token !== null){
      this.loginService.obtenerImagenUsuario(Number(localStorage.getItem('idUsuario'))).subscribe(response => {
        this.perfilUsuario = response.imagen;
      })
    }
  }

  logout() {
    this.loginService.logout();
  }

}

/*
  TODO:
  La barra de la derecha tendrá las opciones "Datos personales", "Opciones", "Logout"
  Datos personales tendrá los datos disponibles para editarlos, tanto los personales como los fit
  Opciones tendrá la opción de cambiar contraseña,  cambiar tema, borrar cuenta
*/
