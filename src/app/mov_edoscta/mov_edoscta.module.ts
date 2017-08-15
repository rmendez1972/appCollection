import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { Mov_edosctaListComponent }    from './mov_edoscta-list.component';
import { SeguimientoDetailComponent }  from './seguimiento-detail.component';
import { ServiceUrl } from '../serviceUrl';
import { Mov_edoctaService } from './mov_edocta.service';

import { Mov_edosctaRoutingModule } from './mov_edoscta-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Mov_edosctaRoutingModule
  ],
  declarations: [
    Mov_edosctaListComponent,
    SeguimientoDetailComponent
  ],
  providers: [
    ServiceUrl,Mov_edoctaService
  ]
})
export class Mov_edosctaModule {}