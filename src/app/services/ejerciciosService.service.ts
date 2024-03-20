import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rutina } from '../interfaces/rutina';

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {

  constructor(@Inject('APP_CONFIG') private APIURL: any, public http: HttpClient) { }

  getEjercicios(): Observable<any> {
    return this.http.get<any>(`${this.APIURL.URL}/api/Ejercicio/obtener-lista-ejercicios`);
  }

  getNombreEjercicios(): Observable<any> {
    return this.http.get<any>(`${this.APIURL.URL}/api/Ejercicio/obtener-nombre-ejercicios`);
  }

  getDescripcionEjercicio(idEjercicio: number): Observable<any> {
    return this.http.get<any>(`${this.APIURL.URL}/api/Ejercicio/obtener-descripcion-ejercicios?idEjercicio=${idEjercicio}`);
  }

  guardarRutina(rutinalist: Rutina[]): Observable<any>{
    return this.http.post<any>(`${this.APIURL.URL}/api/Ejercicio/guardar-rutina`,rutinalist);
  }

  obtenerTodasRutinas(idUsuario: number): Observable<any>{
    return this.http.get<any>(`${this.APIURL.URL}/api/Ejercicio/obtener-todas-rutinas?idUsuario=${idUsuario}`);
  }

  obtenerRutinaDiaria(idUsuario: number, fecha: string): Observable<any>{
    return this.http.get<any>(`${this.APIURL.URL}/api/Ejercicio/obtener-rutina-diaria?idUsuario=${idUsuario}&fecha=${fecha}`);
  }
}
