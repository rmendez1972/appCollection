import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { SeguimientoListComponent }    from './seguimiento-list.component';
import { SeguimientoDetailComponent }  from './seguimiento-detail.component';
import { ServiceUrl } from '../serviceUrl';
import { SeguimientoService } from './seguimiento.service';

import { SeguimientoRoutingModule } from './seguimientos-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SeguimientoRoutingModule
  ],
  declarations: [
    SeguimientoListComponent,
    SeguimientoDetailComponent
  ],
  providers: [
    ServiceUrl,SeguimientoService
  ]
})
export class SeguimientosModule {}