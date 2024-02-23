import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  authenticate(email: string, contrasenia: string): void {
    this.http.post<any>('http://localhost:3721/api/Default', { email, contrasenia }).subscribe(
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
