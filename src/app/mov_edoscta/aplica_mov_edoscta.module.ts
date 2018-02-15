import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { Aplica_Mov_edosctaListComponent }    from './aplica_mov_edoscta-list.component';
import { ServiceUrl } from '../serviceUrl';
import { Aplica_Mov_edoctaService } from './aplica_mov_edocta.service';

import { Mov_edosctaRoutingModule } from './mov_edoscta-routing.module';

import { Import_variosComponent } from './import.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Import_variosComponent,
  ],
  declarations: [
    Aplica_Mov_edosctaListComponent,
  ],
  providers: [
    ServiceUrl,
    Aplica_Mov_edoctaService,
  ]
})
export class Aplica_Mov_edosctaModule{}