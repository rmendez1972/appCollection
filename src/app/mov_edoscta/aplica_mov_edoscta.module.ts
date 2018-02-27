import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { Aplica_Mov_edosctaListComponent }    from './aplica_mov_edoscta-list.component';
import { ServiceUrl } from '../serviceUrl';
import { Aplica_Mov_edoctaService } from './aplica_mov_edocta.service';

import { Mov_edosctaRoutingModule } from './mov_edoscta-routing.module';

import { ImportComponent } from './import.component';

import {ConfirmComponent} from '../confirm/confirm.component';
import {ConfirmService} from '../confirm/confirm.service';

import { AplicarComponent } from './aplicar.component';
import { AplicarService } from './aplicar.service';

<<<<<<< HEAD
=======
import {AplicaBonificacionComponent} from './aplicabonificacion.component';
import {AplicaBonificService} from './aplicabonificacion.service';
>>>>>>> b9c2ad78666c4e1c533ace772ac900f44efc7a95

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ImportComponent,
  ],
  declarations: [
    Aplica_Mov_edosctaListComponent,
    AplicarComponent,
<<<<<<< HEAD

=======
    ConfirmComponent,
    AplicaBonificacionComponent,
>>>>>>> b9c2ad78666c4e1c533ace772ac900f44efc7a95
  ],
  providers: [
    ServiceUrl,
    Aplica_Mov_edoctaService,
    AplicarService,
<<<<<<< HEAD

=======
    ConfirmService,
    AplicaBonificService,
>>>>>>> b9c2ad78666c4e1c533ace772ac900f44efc7a95
  ]
})
export class Aplica_Mov_edosctaModule{}