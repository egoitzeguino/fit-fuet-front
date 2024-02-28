import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  public showSearch = false;
  public inicioSesion: boolean =true;
  public menu: boolean = false;
  public nombreUsuario: string | null = localStorage.getItem('usuario');


  constructor(private modalService: NgbModal) {
    this.inicioSesion = localStorage.getItem('inicioSesion') === 'true' || true;
    this.menu = localStorage.getItem('menu') === 'true' || false;
  }

  ngAfterViewInit(): void {}

  login() {
    this.inicioSesion = false;
    this.menu = true;
    this.guardarEstado();
  }

  logout() {
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("authToken");
    localStorage.removeItem("usuario");
    this.inicioSesion = true;
    this.menu = false;
    this.guardarEstado();
  }
  private guardarEstado() {
    localStorage.setItem('inicioSesion', this.inicioSesion.toString());
    localStorage.setItem('menu', this.menu.toString());
  }
}

/*
  TODO:
  La barra de la derecha tendrá las opciones "Datos personales", "Opciones", "Logout"
  Datos personales tendrá los datos disponibles para editarlos, tanto los personales como los fit
  Opciones tendrá la opción de cambiar contraseña,  cambiar tema, borrar cuenta
*/
