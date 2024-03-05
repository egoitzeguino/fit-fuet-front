import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(    
    private http: HttpClient,
    @Inject('APP_CONFIG') private APIURL: any,
  ) { }

  actualizarDatosUsuario(usuarioActualizado: any): Observable<string> {
    const url = `${this.APIURL.URL}/api/Usuario/actualizar-datos`;
    console.log(usuarioActualizado);
    return this.http.put<string>(url, usuarioActualizado);
  }
}
