import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';


import { Mov_edosctaRoutingModule } from './mov_edoscta/mov_edoscta-routing.module';
import { Mov_diversosRoutingModule } from './mov_diversos/mov_diversos-routing.module';//igh

import { CatalogosRoutingModule } from './catalogos/catalogos-routing.module';//mgh
import { CatalogosModule } from './catalogos/catalogos.module';//mgh

import { CajaRoutingModule } from './apertura_caja/caja-routing.module';//mgh
import { CajaModule } from './apertura_caja/caja.module';//mgh


import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http'

import { AlertComponent } from './_directives/index';

import { AuthGuard } from './_guards/index';

import { AlertService, AuthenticationService, UserService, ConfirmService } from './_services/index';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';

/* component loaded at bootstrap time */
import { AppComponent } from './app.component';
/* component loaded at bootstrap time */
import { MenuComponent } from './menus/menu.component';


import { Mov_edosctaModule } from './mov_edoscta/mov_edoscta.module';
import { Mov_diversosModule } from './mov_diversos/mov_diversos.module';//igh

import { ContactoModule } from './contacto/contacto.module';

import { CambiaPasswordComponent } from './cambia-password/cambia-password.component';
import { CambiaPasswordModule } from './cambia-password/cambia-password.module';

import { LOCALE_ID } from '@angular/core';

/*
*Datatables
*/
import { DataTablesModule } from 'angular-datatables';

import { Aplica_Mov_edosctaModule } from './mov_edoscta/aplica_mov_edoscta.module';
import { Aplica_Mov_edosctaRoutingModule } from './mov_edoscta/aplica_mov_edoscta-routing.module';
import { Aplica_Mov_diversosModule } from './mov_diversos/aplica_mov_diversos.module';
import { Aplica_Mov_diversosRoutingModule } from './mov_diversos/aplica_mov_diversos-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Mov_edosctaRoutingModule,
    Mov_diversosRoutingModule,//igh
    CatalogosRoutingModule,//mgh
    CajaRoutingModule,//mgh
    Mov_edosctaModule,
    Mov_diversosModule,//igh
    CatalogosModule,//mgh
    CajaModule,//mgh
    ContactoModule,
    CambiaPasswordModule,
    BrowserAnimationsModule,
    Aplica_Mov_edosctaModule,
    Aplica_Mov_edosctaRoutingModule,
    Aplica_Mov_diversosModule,
    Aplica_Mov_diversosRoutingModule,
  ],
  providers: [
    AuthGuard,
    AlertService,
    ConfirmService,
    AuthenticationService,
    UserService,
    MockBackend,
    BaseRequestOptions,

  ],

  bootstrap: [AppComponent, MenuComponent]

})
export class AppModule {

}