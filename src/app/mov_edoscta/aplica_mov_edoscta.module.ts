import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { Aplica_Mov_edosctaListComponent }    from './aplica_mov_edoscta-list.component';
import { ServiceUrl } from '../serviceUrl';
import { Aplica_Mov_edoctaService } from './aplica_mov_edocta.service';

import { Mov_edosctaRoutingModule } from './mov_edoscta-routing.module';

import { ImportComponent } from './../import.component';


import { AplicarComponent } from './aplicar.component';
import { AplicarService } from './aplicar.service';


import {AplicaBonificacionComponent} from './aplicabonificacion.component';
import {AplicaBonificService} from './aplicabonificacion.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ImportComponent,
  ],
  declarations: [
    Aplica_Mov_edosctaListComponent,
    AplicarComponent,
    AplicaBonificacionComponent,

  ],
  providers: [
    ServiceUrl,
    Aplica_Mov_edoctaService,
    AplicarService,
    AplicaBonificService,

  ]
})
export class Aplica_Mov_edosctaModule{}