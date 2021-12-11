import { Component, OnInit } from '@angular/core';
import { Cotizador } from 'src/app/modelos/cotizador.modelo';
import { Pais } from 'src/app/modelos/pais.modelo';
import { PaisesService } from 'src/app/servicios/paises.service';
import { Region } from 'src/app/modelos/region.modelo';
import { RegionesService } from "../../servicios/regiones.service";
import { Descuento } from 'src/app/modelos/descuento.modelo';
import { DescuentosService } from "../../servicios/descuentos.service";

import { ActivatedRoute, Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css'],
  providers: [DescuentosService,RegionesService,PaisesService]
})
export class CotizadorComponent implements OnInit {
  
  public paises;
  public cotizador;
  public cotizado: Cotizador;
  public idRegionRuta: string;
  public paisesModelGet;
  public idRegionModel: Region;
  public idPaisModel: Pais;
  public idDescuentoModel: Descuento;
  
  constructor(
    public _paisService: PaisesService,
    public _regionService:RegionesService,
    public _descuentoService:DescuentosService,
    public _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.cotizado = new Cotizador(null,null,null,null,null,null,null);
    this.idRegionModel = new Region("","","");
    this.idPaisModel = new Pais("","",{nombre:""},0);
    this.idDescuentoModel = new Descuento("","",0);
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idRegionRuta = dataRuta.get('idRegion');
    });
    this.obtenerPaisesRegion(this.idRegionRuta);
    this.obtenerPaises();
  }

  obtenerPaisesRegion(idRegion) {
    this._paisService.obtenerPaisesRegion(idRegion).subscribe((response) => {
      this.paisesModelGet = response.paisesObtenidos;
      console.log(response);
    });
  }

  obtenerRegion(idRegion){
    this._regionService.obtenerRegion(idRegion).subscribe(
      response => {
        this.idRegionModel =response.regionEncontrada;
        console.log(response);
      }
    )
  }

  obtenerPais(idPais){
    this._paisService.obtenerPais(idPais).subscribe(
      response => {
        this.idPaisModel =response.paisEncontrado;
        console.log(response);
      }
    )
  }

  obtenerDescuento(idDescuento){
    this._descuentoService.obtenerDescuento(idDescuento).subscribe(
      response => {
        this.idDescuentoModel =response.descuentoEncontrado;
        console.log(response);
      }
    )
  }

  obtenerDescuentoC(codigo){
    this._descuentoService.obtenerDescuentoC(codigo).subscribe(
      response => {
        this.idDescuentoModel =response.descuentoEncontrado;
        console.log(response);
        //console.log(this.idDescuentoModel)
        console.log(response.descuentoEncontrado.descuento)
      }
    )
  }
  
  obtenerPaises() {
    this._paisService.obtenerPaises().subscribe(
      (response) => {
        this.paises = response.paisesEncontrados;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  validar(){} 
  
  limpiar(){
    //Limpiando todos los campos
    this.cotizado.alto=null;
    this.cotizado.ancho=null;
    this.cotizado.largo=null;
    this.cotizado.peso=null;
    this.cotizado.peso=null;
    this.cotizado.total=null;
    this.cotizado.totalD=null;
    this.idPaisModel.nombre=null;
    this.idDescuentoModel.codigo=null;
    //Mostrando alerta de la limpieza
    Swal.fire({
      icon: 'success',
      title: 'Limpieza de campos exitosa',
      showConfirmButton: false,
      timer: 2500,
    });
  }

  cotizar(){
      let descuento: number = this.idDescuentoModel.descuento;
      let peso: number = this.cotizado.peso;
      let tarifa: number = this.idPaisModel.tarifa;
      let alto: number = this.cotizado.alto;
      let ancho:number = this.cotizado.ancho;
      let largo: number = this.cotizado.largo;
    if(
      peso===0|| peso===null||
      tarifa===0|| tarifa===null||
      largo===0|| largo===null||
      ancho===0|| ancho===null||
      peso===0|| peso===null
      ){
      //Alerta para que se llenen todos los campos
      Swal.fire({
        icon: 'warning',
        title: 'Llene todos los campos',
        showConfirmButton: false,
        timer: 1500,
      });
    }else{
    //Realizando la cotización
    this.cotizado.total=(peso*tarifa)+1.66*alto*largo*ancho-descuento*0.5*peso;
    //Mostrando en consola el total
    console.log(this.cotizado.total);   
    //Mostrando en consola la tarifa utilizada en el país seleccionado
    console.log(tarifa);  
    //Mostrando alerta de la cotización
      Swal.fire({
        icon: 'success',
        title: 'Cotización realizada exitosamente',
        showConfirmButton: false,
        timer: 2500,
      }); 
    }
  }

}
