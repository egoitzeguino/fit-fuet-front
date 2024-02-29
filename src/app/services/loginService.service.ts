import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EncryptionService } from './encriptarService.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, @Inject('APP_CONFIG') private APIURL: any, private encryptionService: EncryptionService) { }
  login(email: string, contrasenia: string): Observable<boolean> {
    console.log(this.APIURL.URL);
    const apiUrl = `${this.APIURL.URL}/api/Usuario/login?email=${encodeURIComponent(email)}&passwd=${encodeURIComponent(contrasenia)}`;
    return this.http.get<any>(apiUrl);
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

}
