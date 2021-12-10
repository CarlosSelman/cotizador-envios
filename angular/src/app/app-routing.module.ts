import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotizadorRegionesComponent } from './componentes/cotizador-regiones/cotizador-regiones.component';
import { CotizadorComponent } from './componentes/cotizador/cotizador.component';
import { DescuentosComponent } from './componentes/descuentos/descuentos.component';
import { PaisesComponent } from './componentes/paises/paises.component';
import { RegionesComponent } from './componentes/regiones/regiones.component';

const routes: Routes = [
  { path: 'cotizador-regiones', component: CotizadorRegionesComponent},
  { path: 'cotizador/:idRegion', component: CotizadorComponent},
  { path: 'paises', component: PaisesComponent},
  { path: 'regiones', component: RegionesComponent},
  { path: 'descuentos', component: DescuentosComponent},
  { path: '**', component: CotizadorRegionesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
