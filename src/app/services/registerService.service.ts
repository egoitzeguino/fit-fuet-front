import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) {}

  register(dni: string, nombre: string, apellido: string, email: string, contrasenia: string): Observable<string> {
    let user: Usuario = {
      dni: dni,
      nombre: nombre,
      apellido: apellido,
      email: email,
      passwd: contrasenia
    }

    return this.http.post<string>('http://localhost:3721/api/Usuario/crear', user)
  }

  /*logout(): void {
    this.isAuthenticatedSubject.next(false);
  }*/
}
