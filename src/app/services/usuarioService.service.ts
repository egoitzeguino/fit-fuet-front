import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosUsuario } from '../interfaces/datosUsuario';

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
    return this.http.put<string>(url, usuarioActualizado);
  }

  obtenerUltimos7Registros(idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.APIURL.URL}/api/Usuario/obtener-ultimos-datos?idUsuario=${idUsuario}`);
  }

  obtenerHistorico(idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.APIURL.URL}/api/Usuario/obtener-todos-los-datos?idUsuario=${idUsuario}`);
  }

  agregarDatoCorporal(datosUsuario:DatosUsuario): Observable<any>{
    return this.http.post<any>(`${this.APIURL.URL}/api/Usuario/agregar-dato`,datosUsuario);
  }

  editarDatoCorporal(idDatoCorporal: number, datoCorporal: DatosUsuario): Observable<any>{
    return this.http.put<any>(`${this.APIURL.URL}/api/Usuario/editar-dato?idDatoCorporal=${idDatoCorporal}`,datoCorporal);
  }

  eliminarDatoCorporal(idDatoCorporal: number): Observable<any>{
    return this.http.put<any>(`${this.APIURL.URL}/api/Usuario/eliminar-dato-corporal?idDatoCorporal=${idDatoCorporal}`,"");
  }
}
