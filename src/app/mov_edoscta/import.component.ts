import { NgModule,Component} from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule }    from '@angular/forms';

import { AppComponent } from '../app.component';
import { MenuComponent } from '../menus/menu.component';

import {VencidosComponent} from '../mov_edoscta/vencidos.component';

import {BonificacionComponent} from '../mov_edoscta/bonificacion.component';
import { ConfirmComponent } from '../_directives/index';

import { centavos } from '../_pipes/centavos.pipe';
import {VencidosService} from './vencidos.service';
import {BonificService} from './bonificacion.service';
import {AplicarService} from './aplicar.service';
import { ConfirmService } from '../_services/index';

import {Mov_edosctaListComponent} from './mov_edoscta-list.component';
import {Mov_edoctaService} from './mov_edocta.service';
import {AplicaBonificacionComponent} from './aplicabonificacion.component';

@NgModule({
  imports: [
  CommonModule,
  FormsModule,

  ],
  declarations: [
  BonificacionComponent,
  VencidosComponent,
  centavos,
  Mov_edosctaListComponent,
  ConfirmComponent,
  ],
  providers: [
  VencidosService,
  BonificService,
  Mov_edoctaService,
  ConfirmService,
  AplicarService,
  AplicaBonificacionComponent
  ],
  exports:[
  Mov_edosctaListComponent,
  BonificacionComponent,
  VencidosComponent,
  centavos,
  ConfirmComponent,
  ],

})

export class ImportComponent {
}
