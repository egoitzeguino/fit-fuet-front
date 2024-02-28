import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  authenticateGet(email: string, contrasenia: string): Observable<boolean> {
    const apiUrl = `http://localhost:3721/api/Usuario/login?email=${encodeURIComponent(email)}&passwd=${encodeURIComponent(contrasenia)}`;
    return this.http.get<any>(apiUrl);
  }

  enviarContrasenia(email: string): Observable<any> {
    const apiUrl = `http://localhost:3721/api/Usuario/passwd-recovery?Email=${encodeURIComponent(email)}`;
    return this.http.post<any>(apiUrl, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al enviar correo de recuperación de contraseña:', error);
        return of(error);
      })
    );
  }

  //TODO
  /*changePassword(email: string): Observable<any> {
    const apiUrl = `http://localhost:3721/api/Usuario/passwd-recovery?Email=${encodeURIComponent(email)}`;
    return this.http.post<any>(apiUrl, {}).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al enviar correo de recuperación de contraseña:', error);
        return of(error);
      })
    );
  }*/

}
