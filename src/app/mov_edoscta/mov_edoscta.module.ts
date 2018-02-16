import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { Mov_edosctaListComponent }    from './mov_edoscta-list.component';
import { ServiceUrl } from '../serviceUrl';
import { Mov_edoctaService } from './mov_edocta.service';

import { Mov_edosctaRoutingModule } from './mov_edoscta-routing.module';

import { ImportComponent } from './import.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Mov_edosctaRoutingModule,
    ImportComponent,

  ],
  declarations: [
    Mov_edosctaListComponent,


  ],
  providers: [
    ServiceUrl,
    Mov_edoctaService,
  ]
})
export class Mov_edosctaModule {}