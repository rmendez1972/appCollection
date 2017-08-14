import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guards/index';

import { AdjuntoListComponent }    from './adjunto-list.component';
//import { AdjuntoDetailComponent }  from './adjunto-detail.component';

const adjuntosRoutes: Routes = [
    { path: 'adjunto/:id/:idSol', component: AdjuntoListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(adjuntosRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdjuntoRoutingModule { }