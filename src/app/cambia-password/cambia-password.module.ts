import { Component }       from '@angular/core';
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { CambiaPasswordComponent }  from './cambia-password.component';
import { CambiaPasswordRoutingModule } from './cambia-password-routing.module';
import { CambioPasswordService } from '../_services/index';
import { CustomFormsModule } from 'ng2-validation';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CambiaPasswordRoutingModule,
    CustomFormsModule


  ],
  declarations: [
    CambiaPasswordComponent

  ],
  providers: [
    CambioPasswordService

  ]
})
export class CambiaPasswordModule {}