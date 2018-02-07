import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { CajaComponent }    from './caja.component';

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
    CajaComponent


  ],
  providers: [
    ServiceUrl,CajaService
  ]
})
export class CajaModule {}