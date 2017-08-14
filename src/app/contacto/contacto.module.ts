import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { ContactoComponent }  from './contacto.component';
import { ContactoRoutingModule } from './contacto-routing.module';

import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ContactoRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCwI7NDn89Xhu5DFOMrJUJXp_brTsHuY94'
    })

  ],
  declarations: [
    ContactoComponent

  ],
  providers: [

  ]
})
export class ContactoModule {}