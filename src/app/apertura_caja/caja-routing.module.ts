import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CajaComponent }    from './caja.component';
//import { SeguimientoDetailComponent }  from './seguimiento-detail.component';
import { AuthGuard } from '../_guards/auth.guard';

const CajaRoutes: Routes = [

  { path: 'cajas',  component: CajaComponent, canActivate: [AuthGuard] },
  { path: 'cajas/:id/:idSol', component: CajaComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [
    RouterModule.forChild(CajaRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CajaRoutingModule {  }
