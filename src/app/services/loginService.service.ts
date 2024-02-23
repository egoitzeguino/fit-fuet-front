import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  authenticate(email: string, contrasenia: string): void {
    console.log(email,contrasenia);
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('passwd', contrasenia);

    // Realizar la solicitud GET con los parámetros en la URL
    this.http.get<any>('http://localhost:3721/api/Usuario/login', { params }).subscribe(
      response => {
        const isAuthenticated = response.authenticated;
        this.isAuthenticatedSubject.next(isAuthenticated);
      },
      error => {
        console.error('Error en la autenticación:', error);
        this.isAuthenticatedSubject.next(false);
      }
    );
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
  }
}
