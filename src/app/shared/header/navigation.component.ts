import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/loginService.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  public showSearch = false;
  public nombreUsuario: string | null = localStorage.getItem('usuario');
  public token: string | null = localStorage.getItem('authToken');


  constructor(
    private modalService: NgbModal,
    private loginService: LoginService
  ) { }

  ngAfterViewInit(): void {}

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
