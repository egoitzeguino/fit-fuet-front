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

  constructor(private modalService: NgbModal) {
    // Verifica si hay valores guardados en el almacenamiento local
    // Si no, usa los valores predeterminados (true para inicioSesion y false para menu)
    this.inicioSesion = localStorage.getItem('inicioSesion') === 'true' || true;
    this.menu = localStorage.getItem('menu') === 'true' || false;
  }

  ngAfterViewInit(): void {}

  login() {
    // Cambia las variables y guárdalas en el almacenamiento local
    this.inicioSesion = false; 
    this.menu = true;
    this.guardarEstado();
  }

  logout() {
    // Cambia las variables y guárdalas en el almacenamiento local
    this.inicioSesion = true; 
    this.menu = false;
    this.guardarEstado();
  }

  // Método para guardar el estado en el almacenamiento local
  private guardarEstado() {
    localStorage.setItem('inicioSesion', this.inicioSesion.toString());
    localStorage.setItem('menu', this.menu.toString());
  }
}
