import { NgModule }             from '@angular/core';
import { RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from '../_guards/index';
import { UploadComponent }    from './upload.component';

const uploadRoutes: Routes = [  

  { path: 'upload/:id_seguimiento/:id_solicitud/:id_solicitante', component:  UploadComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [
    RouterModule.forChild(uploadRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UploadRoutingModule {  }
