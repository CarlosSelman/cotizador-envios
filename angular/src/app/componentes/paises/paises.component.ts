import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pais } from 'src/app/modelos/pais.modelo';
import { PaisesService } from 'src/app/servicios/paises.service';
import { Region } from 'src/app/modelos/region.modelo';
import { RegionesService } from "../../servicios/regiones.service";

import { Router } from '@angular/router';
import Swal from "sweetalert2";
declare var $: any;

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css'],
  providers: [PaisesService,RegionesService],
})
export class PaisesComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['nombre','tarifa','acciones'];
  dataSource = new MatTableDataSource<any[]>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public regiones;
  public paises;
  public pais: Pais;
  public idPaisModel: Pais;

  public idRegionModel: Region;

  constructor(
    public _paisService: PaisesService,
    public _regionService:RegionesService,
   /* private fb: FormBuilder,*/
    public _router: Router
    ) {
    this.pais = new Pais("","",{nombre:""},0);
    this.idPaisModel = new Pais("","",{nombre:""},0);
  
    this._paisService.obtenerPaisesT().subscribe ( paises => {
      this.dataSource.data = paises;
    })
   }

   ngOnInit(): void {
     this.obtenerRegiones();
   }

   obtenerPaisesT(){
    this._paisService.obtenerPaisesT().subscribe(
      response => {
         this.dataSource.data = response.paisesEncontrados;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  obtenerRegion(idRegion:String){
    this._regionService.obtenerRegion(idRegion).subscribe(
      response=>{
        this.idRegionModel = response.regionEncontrada;
        console.log(response);

      }
    )
  }

  obtenerPais(idPais:String){
    this._paisService.obtenerPais(idPais).subscribe(
      response=>{
        this.idPaisModel = response.paisEncontrado;
        console.log(response);

      }
    )
  }

  ngAfterViewInit() {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  //Filtro tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  crearPais(){
    //Validación
      if(
        this.pais.nombre===""|| 
        this.pais.idRegion.nombre===""|| 
        this.pais.tarifa===0 || 
        this.pais.tarifa === null
        ){
        //Alerta para que se llenen todos los campos
        Swal.fire({
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
      }else{
      console.log(this.pais)

      this._paisService.crearPais(this.pais).subscribe(
        response=>{
          console.log(response);
          
          Swal.fire({
            icon: 'success',
            title: 'País creado correctamente',
            showConfirmButton: false,
            timer: 2500,
          });
          //Limpiando los campos luego de la creación
          this.pais.nombre ='';
          this.pais.idRegion.nombre ='';
          this.pais.tarifa =0;
          //Refrescando la ventana
          this.refresh();
          //this._router.navigate(['/usuarios'])
        },
        (error) => {
          console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: 'No se pudo crear el país',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      )
    }

  }

  editarPais(){
    //Validación
      if(
        this.idPaisModel.nombre==="" ||  
        this.idPaisModel.tarifa ===0 || 
        this.idPaisModel.tarifa===null
        ){
        //Alerta para que se llenen todos los campos
        Swal.fire({
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
      }else{

      this._paisService.editarPais(this.idPaisModel).subscribe(
        response=>{
          console.log(response);
          //Alerta de que se actualizó correctamente el usuario
          Swal.fire({
            icon: 'success',
            title: 'País actualizado correctamente',
            showConfirmButton: false,
            timer: 2500,
          });
          //Refrescando la ventana
          $('#mEditarPais').modal('hide');

          this.refresh();
        },
        (error) => {
          console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: 'No se pudo actualizar el país',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      )
    }
  }

  
  obtenerRegiones() {
    this._regionService.obtenerRegiones().subscribe(
      (response) => {
        this.regiones = response.regionesEncontradas;
        console.log(response);
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  eliminarPais(idPais){
    this._paisService.eliminarPais(idPais).subscribe(
      response=>{
        console.log(response);
        this.refresh();
      }
    )
  }

  refresh(): void{
    window.location.reload();
  }
}
