import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from '../_guards/index';

import { ContactoComponent }    from './contacto.component';


const contactoRoutes: Routes = [

	{ path: 'contacto', component: ContactoComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [
    RouterModule.forChild(contactoRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ContactoRoutingModule {  }
