import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegionesComponent } from './componentes/regiones/regiones.component';

const routes: Routes = [
  { path: 'regiones', component: RegionesComponent},
  { path: '**', component: RegionesComponent} //Ruta que me redirige al error 404 si no existe la ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
