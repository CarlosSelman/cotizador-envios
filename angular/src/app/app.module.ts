import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RegionesComponent } from './componentes/regiones/regiones.component';
import { PaisesComponent } from './componentes/paises/paises.component';
import { CotizadorComponent } from './componentes/cotizador/cotizador.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RutasComponent } from './componentes/rutas/rutas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegionesComponent,
    PaisesComponent,
    CotizadorComponent,
    RutasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
