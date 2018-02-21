import { NgModule,Component} from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule }    from '@angular/forms';

import { AppComponent } from '../app.component';
import { MenuComponent } from '../menus/menu.component';

import {VencidosComponent} from '../mov_edoscta/vencidos.component';

import {BonificacionComponent} from '../mov_edoscta/bonificacion.component';

import { centavos } from '../_pipes/centavos.pipe';
import {VencidosService} from './vencidos.service';
import {BonificService} from './bonificacion.service';

import {Mov_edosctaListComponent} from './mov_edoscta-list.component';
import {Mov_edoctaService} from './mov_edocta.service';


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
  ],
  providers: [
  VencidosService,
  BonificService,
  Mov_edoctaService,
  ], 
  exports:[
  Mov_edosctaListComponent,
  BonificacionComponent,
  VencidosComponent,
  centavos,
  ],

})

export class ImportComponent {
}
