import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SeguimientoRoutingModule } from './seguimientos/seguimientos-routing.module';

import { Mov_edosctaRoutingModule } from './mov_edoscta/mov_edoscta-routing.module';
import { Mov_diversosRoutingModule } from './mov_diversos/mov_diversos-routing.module';//igh
import { CatalogosRoutingModule } from './catalogos/catalogos-routing.module';//mgh

// used to create fake backend
//import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http'

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';

import { AppComponent } from './app.component';
import { MenuComponent } from './menus/menu.component';
import { SeguimientosModule } from './seguimientos/seguimientos.module';

import { Mov_edosctaModule } from './mov_edoscta/mov_edoscta.module';
import { Mov_diversosModule } from './mov_diversos/mov_diversos.module';//igh
import { CatalogosModule } from './catalogos/catalogos.module';//mgh

import { AdjuntosModule } from './adjuntos/adjuntos.module';

import { BotonBuscarComponent } from './boton-buscar/boton-buscar.component';

import { ContactoModule } from './contacto/contacto.module';
import { BotonBuscarModule } from './boton-buscar/boton-buscar.module';
import { CambiaPasswordComponent } from './cambia-password/cambia-password.component';
import { CambiaPasswordModule } from './cambia-password/cambia-password.module';

import { UploadModule } from './upload/upload.module';
import { UploadComponent } from './upload/upload.component';


//import { BuscarSolicitudComponent } from './buscar-solicitud/buscar-solicitud.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent
    //UploadComponent
   // CambiaPasswordComponent
    //BotonBuscarComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SeguimientoRoutingModule,
    Mov_edosctaRoutingModule,
    Mov_diversosRoutingModule,//igh
    CatalogosRoutingModule,//mgh
    SeguimientosModule,
    Mov_edosctaModule,
    Mov_diversosModule,//igh
    CatalogosModule,//mgh
    AdjuntosModule,
    BotonBuscarModule,
    ContactoModule,
    CambiaPasswordModule,
    UploadModule,
    BrowserAnimationsModule


  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,

    // providers used to create fake backend
    //fakeBackendProvider,
    MockBackend,
    BaseRequestOptions,
  ],

  bootstrap: [AppComponent, MenuComponent]

})
export class AppModule {

}
