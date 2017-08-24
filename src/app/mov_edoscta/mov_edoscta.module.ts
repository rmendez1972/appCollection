import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { Mov_edosctaListComponent }    from './mov_edoscta-list.component';
import { BonificacionComponent }  from './bonificacion.component';
import { ServiceUrl } from '../serviceUrl';
import { Mov_edoctaService } from './mov_edocta.service';
import { BonificService } from './bonificacion.service';

import { Mov_edosctaRoutingModule } from './mov_edoscta-routing.module';
import { centavos } from '../_pipes/centavos.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Mov_edosctaRoutingModule
  ],
  declarations: [
    Mov_edosctaListComponent,
    BonificacionComponent,
    centavos
  ],
  providers: [
    ServiceUrl,Mov_edoctaService,BonificService
  ]
})
export class Mov_edosctaModule {}