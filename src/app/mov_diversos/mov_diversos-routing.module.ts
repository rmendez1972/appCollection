/*
  Módulo de ruteo para movimientos diversos
  Ismael García
  18/08/2017
  última modificación: 
*/

//Librerías y archivos que se requieren imporar.
import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Mov_diversosListComponent }    from './mov_diversos-list.component';
import { AuthGuard } from '../_guards/auth.guard';

const diversosRoutes: Routes = [

  { path: 'mov_diversos',  component: Mov_diversosListComponent, canActivate: [AuthGuard] },
  { path: 'mov_diversos/:id/:idSol', component: Mov_diversosListComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [
    RouterModule.forChild(diversosRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class Mov_diversosRoutingModule {  }
