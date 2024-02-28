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
  public inicioSesion: boolean =true;
  public menu: boolean = false;
  public nombreUsuario?: string;


  constructor(private modalService: NgbModal, private loginService: LoginService) {
    this.inicioSesion = localStorage.getItem('inicioSesion') === 'true' || true;
    this.menu = localStorage.getItem('menu') === 'true' || false;
  }

  setUsername(username: string) {
    this.nombreUsuario = username;
  }

  ngOnInit(): void {
  }

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
