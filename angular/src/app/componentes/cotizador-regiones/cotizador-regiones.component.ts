import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Region } from 'src/app/modelos/region.modelo';
import { RegionesService } from 'src/app/servicios/regiones.service';
import Swal from "sweetalert2";
declare var $: any;

@Component({
  selector: 'app-cotizador-regiones',
  templateUrl: './cotizador-regiones.component.html',
  styleUrls: ['./cotizador-regiones.component.css'],
  providers: [RegionesService]
})
export class CotizadorRegionesComponent implements OnInit {
  public regionesModelGet;
  public regionesModelAdd: Region;
  public regionesModelGetId: Region;
  public idRegionModel: Region;

  constructor(
    private _regionService: RegionesService,
    private _router: Router
  ) {
    this.regionesModelAdd = new Region("","","");
    this.idRegionModel = new Region("","","");
   }

  ngOnInit(): void {
    this.obtenerRegiones();
  }

  obtenerRegiones() {
    this._regionService.obtenerRegiones().subscribe(
      (response) => {
        this.regionesModelGet = response.regionesEncontradas;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  obtenerRegion(idRegion:String){
    this._regionService.obtenerRegion(idRegion).subscribe(
      response => {
        this.idRegionModel = response.regionEncontrada;
        console.log(response);
      }
    )
  }

}
