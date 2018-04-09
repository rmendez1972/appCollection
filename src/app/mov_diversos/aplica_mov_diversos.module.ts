
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { Aplica_Mov_diversosListComponent }    from './aplica_mov_diversos-list.component';

import { ServiceUrl } from '../serviceUrl';
import { Aplica_Mov_diversosService } from './aplica_mov_diversos.service';

import { Aplica_Mov_diversosRoutingModule } from './aplica_mov_diversos-routing.module';

import { ImportComponent } from './import.component';
import {ConfirmService} from '../confirm/confirm.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Aplica_Mov_diversosRoutingModule,
    ImportComponent,
    
  ],
  declarations: [
    Aplica_Mov_diversosListComponent,
  ],
  providers: [
    ServiceUrl,Aplica_Mov_diversosService,ConfirmService,
  ]
})
export class Aplica_Mov_diversosModule {}