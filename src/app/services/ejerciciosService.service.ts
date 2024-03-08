import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
