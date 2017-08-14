import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from '../_guards/index';

import { CambiaPasswordComponent }    from './cambia-password.component';


//const botonbuscarRoutes: Routes = [
const cambiaPasswordRoutes: Routes = [  

	//{ path: 'boton-buscar', component: BotonBuscarComponent, canActivate: [AuthGuard] }
  { path: 'cambia-password', component:  CambiaPasswordComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [
    //RouterModule.forChild(botonbuscarRoutes)
    RouterModule.forChild(cambiaPasswordRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CambiaPasswordRoutingModule {  }
