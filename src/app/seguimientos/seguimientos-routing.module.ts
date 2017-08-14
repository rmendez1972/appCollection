import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { SeguimientoListComponent }    from './seguimiento-list.component';
//import { SeguimientoDetailComponent }  from './seguimiento-detail.component';
import { AuthGuard } from '../_guards/auth.guard';

const seguimientosRoutes: Routes = [

  { path: 'seguimientos',  component: SeguimientoListComponent, canActivate: [AuthGuard] },
  { path: 'seguimientos/:id/:idSol', component: SeguimientoListComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [
    RouterModule.forChild(seguimientosRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SeguimientoRoutingModule {  }
