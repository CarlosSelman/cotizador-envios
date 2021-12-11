import { Injectable } from '@angular/core';
import { Descuento } from '../modelos/descuento.modelo';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { GLOBAL } from "./global.service";
@Injectable({
  providedIn: 'root'
})
export class DescuentosService {
  public url: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  crearDescuento(descuento: Descuento):Observable<any>{
    let params = JSON.stringify(descuento);

    return this._http.post(this.url + '/crearDescuento/', params,{headers: this.headersVariable})
  }

  obtenerDescuentos(): Observable<any>{
    return this._http.get(this.url + '/obtenerDescuentos', {headers: this.headersVariable});
  }

  obtenerDescuentosT(): Observable<any>{
    return this._http.get(this.url + '/obtenerDescuentosT', {headers: this.headersVariable});
  }

  obtenerDescuento(id:String): Observable<any>{
    return this._http.get(this.url + '/obtenerDescuento/'+ id, {headers: this.headersVariable})
  }

  obtenerDescuentoC(codigo:String): Observable<any>{
    return this._http.get(this.url + '/obtenerDescuento/'+ codigo, {headers: this.headersVariable})
  }

  editarDescuento(descuento: Descuento):Observable<any>{
    let params = JSON.stringify(descuento);

    return this._http.put(this.url + '/editarDescuento/' + descuento._id, params, {headers: this.headersVariable})
  }

  eliminarDescuento(id:String): Observable<any>{
    return this._http.delete(this.url + '/eliminarDescuento/' + id, {headers: this.headersVariable})
  }

}
