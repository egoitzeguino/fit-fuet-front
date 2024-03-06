import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EncryptionService } from './encriptarService.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    @Inject('APP_CONFIG') private APIURL: any,
    private encryptionService: EncryptionService,
    private router: Router
  ) { }
  login(email: string, contrasenia: string): Observable<boolean> {
    const apiUrl = `${this.APIURL.URL}/api/Usuario/login?email=${encodeURIComponent(email)}&passwd=${encodeURIComponent(contrasenia)}`;
    return this.http.get<any>(apiUrl);
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('usuario');
    localStorage.removeItem('dni');
    localStorage.removeItem('email');
    window.location.href = '/login';
  }

  enviarContrasenia(email: string): Observable<string> {
    const apiUrl = `${this.APIURL.URL}/api/Usuario/passwd-recovery?Email=${encodeURIComponent(email)}`;
    return this.http.post<string>(apiUrl, {});
  }

  changePassword(idUsuario: number, nuevaPassword: string, email: string, antiguaPassword: string): Observable<any> {
    const apiUrl = `${this.APIURL.URL}/api/Usuario/change-password?idUsuario=${idUsuario}&nuevaPassword=${encodeURIComponent(this.encryptionService.encryptPassword(nuevaPassword))}
                  &email=${encodeURIComponent(email)}&antiguaPassword=${encodeURIComponent(this.encryptionService.encryptPassword(antiguaPassword))}`;
    return this.http.post<any>(apiUrl, {});
  }

  eliminarCuenta(email: string, passwd: string): Observable<any> {
    const apiUrl = `${this.APIURL.URL}/api/Usuario/eliminar-cuenta?email=${encodeURIComponent(email)}&passwd=${encodeURIComponent(passwd)}`;
    return this.http.post<any>(apiUrl, {});
  }

  obtenerImagenUsuario(idUsuario: number): Observable<any> {
    const apiUrl = `${this.APIURL.URL}/api/Usuario/foto?idUsuario=${idUsuario}`;
    return this.http.get<any>(apiUrl);
  }
}
