import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Region } from 'src/app/modelos/region.modelo';
import { RegionesService } from "../../servicios/regiones.service";

import { Router } from '@angular/router';
import Swal from "sweetalert2";
declare var $: any;

@Component({
  selector: 'app-regiones',
  templateUrl: './regiones.component.html',
  styleUrls: ['./regiones.component.css'],
  providers: [RegionesService]
})
export class RegionesComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['nombre','descripcion','acciones'];
  dataSource = new MatTableDataSource<any[]>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public regiones;
  public region: Region;
  public idRegionModel: Region;

  constructor(
    private _regionService: RegionesService,
   /* private fb: FormBuilder,*/
    private _router: Router
    ) {
    this.region = new Region("","","");
    this.idRegionModel = new Region("","","");
  
    this._regionService.obtenerRegionesT().subscribe ( regiones => {
      this.dataSource.data = regiones;
    })
   }

   ngOnInit(): void {}

   obtenerRegionesT(){
    this._regionService.obtenerRegionesT().subscribe(
      response => {
         this.dataSource.data = response.regionesEncontradas;
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

  ngAfterViewInit() {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }

  //Filtro tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Crear los usuarios
  crearRegion(){
    //Validación
      if(
        this.region.nombre===""|| this.region.descripcion===""){
        //Alerta para que se llenen todos los campos
        Swal.fire({
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
      }else{
      console.log(this.region)

      this._regionService.crearRegion(this.region).subscribe(
        response=>{
          console.log(response);
          //Alerta de que se creó correctamente el usuario
          Swal.fire({
            icon: 'success',
            title: 'Región creada correctamente',
            showConfirmButton: false,
            timer: 2500,
          });
          //Limpiando los campos luego de la creación
          this.region.nombre ='';
          this.region.descripcion ='';
          //Refrescando la ventana
          this.refresh();
          //this._router.navigate(['/usuarios'])
        },
        (error) => {
          console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: 'No se pudo crear el usuario',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      )
    }

  }

  editarRegion(){
    //Validación
      if(
        this.idRegionModel.nombre==="" || this.idRegionModel.descripcion===""){
        //Alerta para que se llenen todos los campos
        Swal.fire({
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
      }else{

      this._regionService.editarRegion(this.idRegionModel).subscribe(
        response=>{
          console.log(response);
          //Alerta de que se actualizó correctamente el usuario
          Swal.fire({
            icon: 'success',
            title: 'Región actualizada correctamente',
            showConfirmButton: false,
            timer: 2500,
          });
          //Refrescando la ventana
          $('#mEditarRegion').modal('hide');

          this.refresh();
        },
        (error) => {
          console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: 'No se pudo actualizar la región',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      )
    }
  }

  eliminarRegion(idRegion){
    this._regionService.eliminarRegion(idRegion).subscribe(
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
