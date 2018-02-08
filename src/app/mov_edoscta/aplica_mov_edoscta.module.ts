import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { Aplica_Mov_edosctaListComponent }    from './aplica_mov_edoscta-list.component';
import { BonificacionComponent }  from './../mov_edoscta/bonificacion.component';
import { ServiceUrl } from '../serviceUrl';
import { Aplica_Mov_edoctaService } from './aplica_mov_edocta.service';
import { BonificService } from './../mov_edoscta/bonificacion.service';

import { Aplica_Mov_edosctaRoutingModule } from './aplica_mov_edoscta-routing.module';
import { centavos } from '../_pipes/centavos.pipe';


import { VencidosComponent }  from './../mov_edoscta/vencidos.component';
import { VencidosService } from './vencidos.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Aplica_Mov_edosctaRoutingModule
  ],
  declarations: [
    Aplica_Mov_edosctaListComponent,
    BonificacionComponent,
    centavos,
    VencidosComponent,
  ],
  providers: [
    ServiceUrl,Aplica_Mov_edoctaService,
    BonificService,VencidosService
  ]
})
export class Aplica_Mov_edosctaModule {}