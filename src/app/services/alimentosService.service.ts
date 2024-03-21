import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlimentosService {

  constructor(@Inject('APP_CONFIG') private APIURL: any, public http: HttpClient) { }

  getAlimentos(){
    return this.http.get(`${this.APIURL.URL}/api/Alimento/obtener-todos-alimentos`);
  }

}
