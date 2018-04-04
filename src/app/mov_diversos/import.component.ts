import { NgModule,Component} from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule }    from '@angular/forms';

import { AppComponent } from '../app.component';
import { MenuComponent } from '../menus/menu.component';

import { BonificacionDivComponent }  from './bonificacion_div.component';
import { BonificDivService } from './bonificacion_div.service';


@NgModule({
  imports: [
  CommonModule,
  FormsModule,

  ],
  declarations: [
  BonificacionDivComponent,
  ],
  providers: [
  BonificDivService
  ],
  exports:[
  BonificacionDivComponent,
  ],

})

export class ImportComponent {
}
