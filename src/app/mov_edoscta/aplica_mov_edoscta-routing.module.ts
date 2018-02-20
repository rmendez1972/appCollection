import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Aplica_Mov_edosctaListComponent }    from './aplica_mov_edoscta-list.component';
//import { SeguimientoDetailComponent }  from './seguimiento-detail.component';
import { AuthGuard } from '../_guards/auth.guard';

const aplica_mov_edosctaRoutes: Routes = [
  { path: 'aplica_mov_edoscta',  component: Aplica_Mov_edosctaListComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [
    RouterModule.forChild(aplica_mov_edosctaRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class Aplica_Mov_edosctaRoutingModule {  }