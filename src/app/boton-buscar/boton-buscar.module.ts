import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { BotonBuscarComponent }  from './boton-buscar.component';
import { BotonBuscarRoutingModule } from './boton-buscar-routing.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BotonBuscarRoutingModule

  ],
  declarations: [
    BotonBuscarComponent

  ],
  providers: [

  ]
})
export class BotonBuscarModule {}