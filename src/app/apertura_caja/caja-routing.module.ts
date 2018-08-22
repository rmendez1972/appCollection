import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CajaComponent }    from './caja.component';
import { CajaListComponent }    from './caja-list.component';
import { CajaEditComponent }    from './caja-edit.component';
import { AuthGuard } from '../_guards/auth.guard';

const CajaRoutes: Routes = [

  { path: 'cajas',  component: CajaComponent, canActivate: [AuthGuard] },
  { path: 'cajas/listar', component: CajaListComponent, canActivate: [AuthGuard] },
  { path: 'cajas/editar', component: CajaEditComponent, canActivate: [AuthGuard] }

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
