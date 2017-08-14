import { Component }       from '@angular/core';
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { UploadComponent }  from './upload.component';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadService } from '../_services/index';
import { CustomFormsModule } from 'ng2-validation';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UploadRoutingModule,
    BrowserModule,
    CustomFormsModule
  ],

  declarations: [
    FileSelectDirective,
    UploadComponent
  ],

  providers: [
    UploadService
  ]
})

export class UploadModule {}