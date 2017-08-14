import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from '../_guards/index';

import { BotonBuscarComponent }    from './boton-buscar.component';


const botonbuscarRoutes: Routes = [

	{ path: 'boton-buscar', component: BotonBuscarComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [
    RouterModule.forChild(botonbuscarRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BotonBuscarRoutingModule {  }
