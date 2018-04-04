/*
  Módulo de ruteo para movimientos diversos
  Ismael García
  18/08/2017
  última modificación: 
*/

//Librerías y archivos que se requieren imporar.
import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Aplica_Mov_diversosListComponent }    from './aplica_mov_diversos-list.component';
import { AuthGuard } from '../_guards/auth.guard';

const aplicaDiversosRoutes: Routes = [

  { path: 'aplica_mov_diversos',  component: Aplica_Mov_diversosListComponent, canActivate: [AuthGuard] },
  { path: 'aplica_mov_diversos/:id/:idSol', component: Aplica_Mov_diversosListComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [
    RouterModule.forChild(aplicaDiversosRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class Aplica_Mov_diversosRoutingModule {  }
