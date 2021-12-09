import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Pais } from '../modelos/pais.modelo';

@Injectable({
  providedIn: 'root'
})

export class PaisesService {
  public url: String;
  public identidad: any;
  public token: any;
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  crearPais(pais: Pais):Observable<any>{
    let params = JSON.stringify(pais);

    return this._http.post(this.url + '/crearPais/', params,{headers: this.headersVariable})
  }

  obtenerPaises(): Observable<any>{
    return this._http.get(this.url + '/obtenerPaises', {headers: this.headersVariable});
  }

  obtenerPaisesT(): Observable<any>{
    return this._http.get(this.url + '/obtenerPaisesT', {headers: this.headersVariable});
  }

  obtenerPais(id:String): Observable<any>{
    return this._http.get(this.url + '/obtenerPais/'+ id, {headers: this.headersVariable})
  }

  editarPais(pais: Pais):Observable<any>{
    let params = JSON.stringify(pais);

    return this._http.put(this.url + '/editarPais/' + pais._id, params, {headers: this.headersVariable})
  }

  eliminarPais(id:String): Observable<any>{
    return this._http.delete(this.url + '/eliminarPais/' + id, {headers: this.headersVariable})
  }
 
}
