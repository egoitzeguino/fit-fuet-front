import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, @Inject('APP_CONFIG') private APIURL: any) {}

  register(dni: string, nombre: string, apellido: string, email: string, contrasenia: string, image: any[]): Observable<string> {
    let user: Usuario = {
      dni: dni,
      nombre: nombre,
      apellido: apellido,
      email: email,
      passwd: contrasenia,
      foto: image,
      modo: 1,
    }
    console.log(user);

    return this.http.post<string>(`${this.APIURL.URL}/api/Usuario/crear`, user)
  }

}
