import { NgModule,Component} from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule }    from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './menus/menu.component';

import {VencidosComponent} from './mov_edoscta/vencidos.component';

import {BonificacionComponent} from './mov_edoscta/bonificacion.component';


import { BonificacionDivComponent }  from './mov_diversos/bonificacion_div.component';
import { BonificDivService } from './mov_diversos//bonificacion_div.service';

import { centavos } from './_pipes/centavos.pipe';


import {VencidosService} from './mov_edoscta/vencidos.service';
import {BonificService} from './mov_edoscta/bonificacion.service';
import {AplicarService} from './mov_edoscta/aplicar.service';


import {Mov_edosctaListComponent} from './mov_edoscta/mov_edoscta-list.component';
import {Mov_edoctaService} from './mov_edoscta/mov_edocta.service';
import {AplicaBonificacionComponent} from './mov_edoscta/aplicabonificacion.component';
import {AplicaBonificacionDivComponent} from './mov_diversos/aplicabonificaciondiv.component';
import {AplicaBonificServiceDiv} from './mov_diversos/aplicabonificaciondiv.service';

import { ConfirmComponent } from './_directives/index';
import { ConfirmService } from './_services/index';


@NgModule({
  imports: [
  CommonModule,
  FormsModule,

  ],
  declarations: [
  BonificacionComponent,
  BonificacionDivComponent,
  VencidosComponent,
  centavos,
  Mov_edosctaListComponent,
  ConfirmComponent,
  AplicaBonificacionDivComponent,
  ],
  providers: [
  VencidosService,
  BonificService,
  Mov_edoctaService,
  AplicarService,
  AplicaBonificacionComponent,
  BonificDivService,
  ConfirmService,
  AplicaBonificacionDivComponent,
  AplicaBonificServiceDiv
  ],
  exports:[
  Mov_edosctaListComponent,
  BonificacionComponent,
  BonificacionDivComponent,
  VencidosComponent,
  centavos,
  ConfirmComponent,
  AplicaBonificacionDivComponent,
  ],

})

export class ImportComponent {
}
