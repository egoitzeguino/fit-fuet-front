import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;
  public token: string = '';

  constructor(private http: HttpClient) {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }
  authenticateGet(email: string, contrasenia: string): Observable<boolean> {
    const apiUrl = `http://localhost:3721/api/Usuario/login?email=${encodeURIComponent(email)}&passwd=${encodeURIComponent(contrasenia)}`;

    return this.http.get<any>(apiUrl).pipe(
      map((response) => {
        this.token = response.token;
        console.log('Token:', this.token);
        localStorage.setItem('authToken', this.token);
        this.isAuthenticatedSubject.next(true);
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Authentication failed:', error);

        if (error.status === 405) {
          console.error('Method Not Allowed: Ensure the server supports the HTTP GET method.');
        }
        this.isAuthenticatedSubject.next(false);
        return of(false);
      })
    );
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

}
