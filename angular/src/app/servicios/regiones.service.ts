import { Injectable } from '@angular/core';
import { Region } from '../modelos/region.modelo';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { GLOBAL } from "./global.service";
@Injectable({
  providedIn: 'root'
})
export class RegionesService {
  public url: String;
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  crearRegion(region: Region):Observable<any>{
    let params = JSON.stringify(region);

    return this._http.post(this.url + '/crearRegion/', params,{headers: this.headersVariable})
  }

  obtenerRegiones(): Observable<any>{
    return this._http.get(this.url + '/obtenerRegiones', {headers: this.headersVariable});
  }

  obtenerRegionesT(): Observable<any>{
    return this._http.get(this.url + '/obtenerRegionesT', {headers: this.headersVariable});
  }

  obtenerRegion(id:String): Observable<any>{
    return this._http.get(this.url + '/obtenerRegion/'+ id, {headers: this.headersVariable})
  }

  editarRegion(region: Region):Observable<any>{
    let params = JSON.stringify(region);

    return this._http.put(this.url + '/editarRegion/' + region._id, params, {headers: this.headersVariable})
  }

  eliminarRegion(id:String): Observable<any>{
    return this._http.delete(this.url + '/eliminarRegion/' + id, {headers: this.headersVariable})
  }

}
