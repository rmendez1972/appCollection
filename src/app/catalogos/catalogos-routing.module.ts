/*
  Módulo de ruteo para movimientos diversos
  Marlon Gomez
  18/08/2017
  última modificación: 
*/

//Librerías y archivos que se requieren imporar.
import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CatalogosListComponent }    from './catalogos-list.component';
import { CppListComponent }    from './cpp-list.component';
import { SalminListComponent }    from './salmin-list.component';
import { SalmindfListComponent }    from './salmindf-list.component';
import { ClavemovListComponent }    from './clavemov-list.component';
import { ClavedivListComponent }    from './clavediv-list.component';
import { BonificacionesListComponent }    from './bonificaciones-list.component';
import { AuthGuard } from '../_guards/auth.guard';

const catalogosRoutes: Routes = [

  { path: 'catalogos',  component: CatalogosListComponent, canActivate: [AuthGuard] },
  { path: 'cpp',  component: CppListComponent, canActivate: [AuthGuard] },
  { path: 'salmin',  component: SalminListComponent, canActivate: [AuthGuard] },
  { path: 'salmindf',  component: SalmindfListComponent, canActivate: [AuthGuard] },
  { path: 'clavemov',  component: ClavemovListComponent, canActivate: [AuthGuard] },
  { path: 'clavediv',  component: ClavedivListComponent, canActivate: [AuthGuard] },
  { path: 'bonificaciones',  component: BonificacionesListComponent, canActivate: [AuthGuard] },
  { path: 'catalogos/:id/:idSol', component: CatalogosListComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [
    RouterModule.forChild(catalogosRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CatalogosRoutingModule {  }
