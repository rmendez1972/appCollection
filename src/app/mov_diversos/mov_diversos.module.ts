/*
  Módulo de movimientos diversos
  Ismael García
  18/08/2017
  última modificación: 
*/

//Librerías y archivos que se requieren imporar.
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { Mov_diversosListComponent }    from './mov_diversos-list.component';
import { BonificacionDivComponent }  from './bonificacion_div.component';
import { ServiceUrl } from '../serviceUrl';
import { Mov_diversosService } from './mov_diversos.service';
import { BonificDivService } from './bonificacion_div.service';
import { Mov_diversosRoutingModule } from './mov_diversos-routing.module';
import { ImportComponent } from './import.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Mov_diversosRoutingModule,
    ImportComponent,
    
  ],
  declarations: [
    Mov_diversosListComponent,
  ],
  providers: [
    ServiceUrl,Mov_diversosService,BonificDivService
  ]
})
export class Mov_diversosModule {}