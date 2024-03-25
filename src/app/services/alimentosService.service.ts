import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Dieta } from '../interfaces/dieta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlimentosService {

  constructor(@Inject('APP_CONFIG') private APIURL: any, public http: HttpClient) { }

  getAlimentos(): Observable<any> {
    return this.http.get<any>(`${this.APIURL.URL}/api/Alimento/obtener-todos-alimentos`);
  }

  insertarDieta(dieta: Dieta): Observable<any> {
    return this.http.post<any>(`${this.APIURL.URL}/api/Alimento/insertar-dieta`, dieta);
  }

  obtenerDietaPorDiaYUsuario(idUsuario: number, fecha: string): Observable<any> {
    return this.http.get<any>(`${this.APIURL.URL}/api/Alimento/obtener-dieta?idUsuario=${idUsuario}&fecha=${fecha}`);
  }

}
