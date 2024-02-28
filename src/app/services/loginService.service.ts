import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NavigationComponent } from '../shared/header/navigation.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  authenticateGet(email: string, contrasenia: string): Observable<boolean> {
    const apiUrl = `http://localhost:3721/api/Usuario/login?email=${encodeURIComponent(email)}&passwd=${encodeURIComponent(contrasenia)}`;

    return this.http.get<any>(apiUrl);
  }
}
