import { EventColor } from 'calendar-utils';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarEventTitleFormatter, CalendarView } from 'angular-calendar';
import { EjerciciosService } from '../services/ejerciciosService.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../services/usuarioService.service';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
    },
  ],
})
export class HomePageComponent implements OnInit{
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  diasDeEjercicio: CalendarEvent[] = [];
  fechaData: any[] = [];
  fechaContieneFuerza = false;
  fechaContieneCardio = false;
  kcalFuerza = 0;
  kcalCardio = 0;
  ultimoDatoCorporal: any;

  constructor(
    private ejerciciosService: EjerciciosService,
    private modal: NgbModal,
    private usuarioService: UsuarioService
  ){
    this.viewDate.setDate(this.viewDate.getDate() - (this.viewDate.getDay() + 6) % 7);
  }

  ngOnInit(): void {
    this.obtenerTodasRutinas();
    this.obtenerUltimoDato();
    console.log(this.ultimoDatoCorporal);
  }

  irHoy() {
    this.viewDate = new Date();
  }

  irSiguienteMes() {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() + 1));
  }

  irMesAnterior() {
    this.viewDate = new Date(this.viewDate.setMonth(this.viewDate.getMonth() - 1));
  }

  onDayClick(event: any): void {
    this.kcalFuerza = 0;

    this.ejerciciosService.obtenerRutinaDiaria(parseInt(localStorage.getItem('idUsuario')!), JSON.stringify(event.day.date)).subscribe((response: any) => {
      console.log(response.rutina);
      this.fechaData = response.rutina;
      this.fechaData.forEach(ejercicio => {
        if(ejercicio.ejercicio.met !== null && ejercicio.ejercicio.tipo === 1){
          this.kcalFuerza += ejercicio.ejercicio.met * 0.0175 * this.ultimoDatoCorporal.item2 * ejercicio.series;
        }
        else if(ejercicio.ejercicio.tipo === 0) {
          console.log(ejercicio.ejercicio)
          var explicacion = ejercicio.ejercicio.explicacion;
          var regex = /\d+-\d+/g;
          var matches = explicacion.match(regex);
          console.log(matches[1]);
          if (matches && matches.length > 0) {
            this.kcalCardio += matches[1].split('-')[0] * 0.0175 * this.ultimoDatoCorporal.item2 * (ejercicio.tiempo / 60);
          }
        }
        else{
          this.kcalFuerza += 0.5 * 0.0175 * this.ultimoDatoCorporal.item2 * ejercicio.series;
        }
      });
    })

    this.fechaContieneFuerza = false;
    this.fechaContieneCardio = false;

    if (event.day.events.length > 0) {
      console.log(event.day.events);
      for(let i = 0; i < event.day.events.length; i++){
        if(event.day.events[i].title === 'Fuerza'){
          this.fechaContieneFuerza = true;
        } else if(event.day.events[i].title === 'Cardio'){
          this.fechaContieneCardio = true;
        }
      }

      this.modal.open(this.modalContent, { size: 'lg' });
    }
  }

  obtenerTodasRutinas(){
    this.ejerciciosService.obtenerTodasRutinas(parseInt(localStorage.getItem('idUsuario')!)).subscribe((response: any) => {
      for(let rutina of response.listaRutinas){
        this.addCalendarEvent(rutina.item1, rutina.item2, rutina.item3);
      }
    });
  }

  obtenerUltimoDato(){
    this.usuarioService.obtenerUltimoDato(parseInt(localStorage.getItem('idUsuario')!)).subscribe((response: any) => {
      this.ultimoDatoCorporal = response;
    });
  }

  addCalendarEvent(fecha: Date, tieneFuerza: boolean, tieneCardio: boolean) {
    if(tieneFuerza){
      this.diasDeEjercicio = [
        ...this.diasDeEjercicio,
        {
          start: new Date(fecha),
          title: 'Fuerza',
          color: { ...colors['blue'] },
        }
      ]
    }

    if(tieneCardio){
      this.diasDeEjercicio = [
        ...this.diasDeEjercicio,
        {
          start: new Date(fecha),
          title: 'Cardio',
          color: { ...colors['yellow'] },
        }
      ]
    }
  }
}
