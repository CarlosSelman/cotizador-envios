import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Descuento } from 'src/app/modelos/descuento.modelo';
import { DescuentosService } from "../../servicios/descuentos.service";

import { Router } from '@angular/router';
import Swal from "sweetalert2";
declare var $: any;

@Component({
  selector: 'app-descuentos',
  templateUrl: './descuentos.component.html',
  styleUrls: ['./descuentos.component.css'],
  providers: [DescuentosService]
})
export class DescuentosComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['codigo','descuento','acciones'];
  dataSource = new MatTableDataSource<any[]>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public descuentos;
  public descuento: Descuento;
  public idDescuentoModel: Descuento;

  constructor(
    private _descuentoService: DescuentosService,
   /* private fb: FormBuilder,*/
    private _router: Router
    ) {
    this.descuento = new Descuento("","",0);
    this.idDescuentoModel = new Descuento("","",0);
  
    this._descuentoService.obtenerDescuentosT().subscribe ( descuentos => {
      this.dataSource.data = descuentos;
    })
   }

   ngOnInit(): void {}

   obtenerDescuentosT(){
    this._descuentoService.obtenerDescuentosT().subscribe(
      response => {
         this.dataSource.data = response.descuentosEncontrados;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  obtenerDescuento(idDescuento:String){
    this._descuentoService.obtenerDescuento(idDescuento).subscribe(
      response=>{
        this.idDescuentoModel = response.descuentoEncontrado;
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
  crearDescuento(){
    //Validación
      if(
        this.descuento.codigo===""|| this.descuento.descuento===0 || this.descuento.descuento===null ){
        //Alerta para que se llenen todos los campos
        Swal.fire({
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
      }else{
      console.log(this.descuento)

      this._descuentoService.crearDescuento(this.descuento).subscribe(
        response=>{
          console.log(response);
          //Alerta de que se creó correctamente el descuento
          Swal.fire({
            icon: 'success',
            title: 'Descuento creado correctamente',
            showConfirmButton: false,
            timer: 2500,
          });
          //Limpiando los campos luego de la creación
          this.descuento.codigo ='';
          this.descuento.descuento = 0;
          //Refrescando la ventana
          this.refresh();
          //this._router.navigate(['/usuarios'])
        },
        (error) => {
          console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: 'No se pudo crear el descuento',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      )
    }

  }

  editarDescuento(){
    //Validación
      if(
        this.idDescuentoModel.codigo==="" || this.idDescuentoModel.descuento===0 || this.idDescuentoModel.descuento ===null){
        //Alerta para que se llenen todos los campos
        Swal.fire({
          icon: 'warning',
          title: 'Llene todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
      }else{

      this._descuentoService.editarDescuento(this.idDescuentoModel).subscribe(
        response=>{
          console.log(response);
          //Alerta de que se actualizó correctamente el usuario
          Swal.fire({
            icon: 'success',
            title: 'Descuento actualizado correctamente',
            showConfirmButton: false,
            timer: 2500,
          });
          //Refrescando la ventana
          $('#mEditarDescuento').modal('hide');

          this.refresh();
        },
        (error) => {
          console.log(<any>error);
          Swal.fire({
            icon: 'error',
            title: 'No se pudo actualizar el descuento',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      )
    }
  }

  eliminarDescuento(idDescuento){
    this._descuentoService.eliminarDescuento(idDescuento).subscribe(
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
