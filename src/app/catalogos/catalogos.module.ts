/*
  Modulo de catalogos
  Marlon Gomez
  22/08/2017
  
*/

//Librerías y archivos que se requieren imporar.
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { CppListComponent }    from './cpp-list.component';
import { SalminListComponent }    from './salmin-list.component';
import { SalmindfListComponent }    from './salmindf-list.component';
import { ClavemovListComponent }    from './clavemov-list.component';
import { ClavedivListComponent }    from './clavediv-list.component';
import { BonificacionesListComponent }    from './bonificaciones-list.component';
import { CatalogosListComponent }  from './catalogos-list.component';
import { ServiceUrl } from '../serviceUrl';
import { CatalogosService } from './catalogos.service';
import { CatalogosRoutingModule } from './catalogos-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CatalogosRoutingModule,
    
  ],
  declarations: [
    CatalogosListComponent,
    CppListComponent,
    SalminListComponent,
    SalmindfListComponent,
    ClavemovListComponent,
    ClavedivListComponent,
    BonificacionesListComponent
  ],
  providers: [
    ServiceUrl,CatalogosService
  ]
})
export class CatalogosModule {}