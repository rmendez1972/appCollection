/**
* catalogos.module()
* Librerías y archivos que se requieren impotar para el modulo de catalogos.
* @author: Marlon Gomez
* @return {export} export class
*/
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { CppListComponent }    from './cpp-list.component';
import { SalminListComponent }    from './salmin-list.component';
import { SalmindfListComponent }    from './salmindf-list.component';
import { ClavemovListComponent }    from './clavemov-list.component';
import { ClavedivListComponent }    from './clavediv-list.component';
import { BonificacionesListComponent }    from './bonificaciones-list.component';
import { ProgramasListComponent }    from './programas-list.component';
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
    BonificacionesListComponent,
    ProgramasListComponent
  ],
  providers: [
    ServiceUrl,CatalogosService
  ]
})
export class CatalogosModule {}