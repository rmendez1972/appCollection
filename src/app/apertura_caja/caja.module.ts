import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { CajaComponent }    from './caja.component';
import { CajaListComponent }    from './caja-list.component';
import { CajaEditComponent }    from './caja-edit.component';

import { ServiceUrl } from '../serviceUrl';
import { CajaService } from './caja.service';


import { CajaRoutingModule } from './caja-routing.module';
import { centavos } from '../_pipes/centavos.pipe';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CajaRoutingModule
  ],
  declarations: [
    CajaComponent,
    CajaListComponent,
    CajaEditComponent


  ],
  providers: [
    ServiceUrl,CajaService
  ]
})
export class CajaModule {}