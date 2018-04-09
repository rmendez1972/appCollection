import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { ServiceUrl } from '../serviceUrl';

import { Mov_edosctaRoutingModule } from './mov_edoscta-routing.module';


import { ImportComponent } from './../import.component';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Mov_edosctaRoutingModule,
    ImportComponent,

  ],
  declarations: [
  ],
  providers: [
    ServiceUrl,
  ]
})
export class Mov_edosctaModule {}