import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { Aplica_Mov_diversosListComponent }    from './aplica_mov_diversos-list.component';

import { ServiceUrl } from '../serviceUrl';
import { Aplica_Mov_diversosService } from './aplica_mov_diversos.service';

import { Aplica_Mov_diversosRoutingModule } from './aplica_mov_diversos-routing.module';

import { ImportComponent } from './../import.component';

//import {BonificacionComponentDiversos} from '../mov_diversos/bonificacion.component';
import {BonificServiceDiversos} from '../mov_diversos/bonificacion.service';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ImportComponent,
    
  ],
  declarations: [
    Aplica_Mov_diversosListComponent,
    //BonificacionComponentDiversos,
    
  ],
  providers: [
    ServiceUrl,
    Aplica_Mov_diversosService,
    BonificServiceDiversos,
  ]
})
export class Aplica_Mov_diversosModule {}