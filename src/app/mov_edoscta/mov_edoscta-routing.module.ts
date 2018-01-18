import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Mov_edosctaListComponent }    from './mov_edoscta-list.component';
//import { SeguimientoDetailComponent }  from './seguimiento-detail.component';
import { AuthGuard } from '../_guards/auth.guard';

const mov_edosctaRoutes: Routes = [

  { path: 'mov_edoscta',  component: Mov_edosctaListComponent, canActivate: [AuthGuard] },
  { path: 'mov_edoscta/:id/:idSol', component: Mov_edosctaListComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [
    RouterModule.forChild(mov_edosctaRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class Mov_edosctaRoutingModule {  }
