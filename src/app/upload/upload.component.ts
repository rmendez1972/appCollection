
import { Component, OnInit, HostBinding} from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { RequestOptions, Headers } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../_models/index';
import { AlertService, UploadService } from '../_services/index';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { FileUploader } from 'ng2-file-upload';
import {NgZone} from '@angular/core';
import {ServiceUrl } from '../serviceUrl';

// Import necesarios para usar el service de adjuntos y pintar los datos
// referente a la solicitud en la vista de subir archivos.
import {AdjuntoService} from '../adjuntos/adjunto.service';
import {Solicitud} from '../seguimientos/solicitud';
import {Tramite} from '../seguimientos/tramite';
import {Seguimiento} from '../seguimientos/seguimiento';
//

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
    animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.8s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]

})

export class UploadComponent  implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'relative';
  }

  title = 'Subir Archivos';

 loading = false;
 private respuestas:boolean[];
 private x: Observable<boolean[]>;
 private errorMessage: string;
 public idseguimiento: number;
 public idsolicitud: number;
 public idsolicitante: number;
//Variables para pintar la vista de Subir Archivos
public solicitudes: Solicitud[];
private y: Observable<Solicitud[]>;
public tramites: Tramite[];
private z: Observable<Tramite[]>;
public seguimientos: Seguimiento[];
private a: Observable<Seguimiento[]>;
//
 public uploadUrl: string;
 public filneName: string;
 public uploader:FileUploader;
 public uploaderOptions: Array<any>;
 public item: any = {};


 constructor(
   private url:ServiceUrl,
   private route: ActivatedRoute,
   private router: Router,
   private uploadservice: UploadService,
   private adjuntoservice: AdjuntoService,
   private alertService:AlertService)
   {
     this.uploadUrl=String(this.url.getUrlupload());
     this.idseguimiento= this.route.snapshot.params['id_seguimiento'];
     this.idsolicitud= this.route.snapshot.params['id_solicitud'];
     this.idsolicitante= this.route.snapshot.params['id_solicitante'];
     console.log('id_seguimiento:'+this.idseguimiento);
  }
  
  ngOnInit() {
     this.getSolicitud();
     this.getTramite();
     this.getSeguimiento();
     this.uploader = new FileUploader({url:this.uploadUrl});
  }

  getSolicitud() {
    this.y=this.route.params
    .switchMap((params: Params) =>
    {
      return this.adjuntoservice.getSolicitudes(this.idseguimiento)
    })
    this.y.subscribe(
                    solicitud => this.solicitudes = solicitud,
                    error =>  this.errorMessage = <any>error);
   };

  getTramite() {
    this.z=this.route.params
      .switchMap((params: Params) =>
    {
      return this.adjuntoservice.getTramites(this.idseguimiento)
    })
   this.z.subscribe(
                    tramite => this.tramites = tramite,
                    error =>  this.errorMessage = <any>error);
  };

  getSeguimiento() {
    this.a=this.route.params
      .switchMap((params: Params) =>
    {
      return this.adjuntoservice.getSeguimientos(this.idseguimiento)
    })
    this.a.subscribe(
                    seguimiento => this.seguimientos = seguimiento,
                    error =>  this.errorMessage = <any>error);
  };



FileName(index: number) {
    //console.log("Imprimiendo FileUploader: "+this.uploader.queue[index].file.name);

        this.x=this.route.params
        .switchMap ((params: Params)=>
        {
          return this.uploadservice.filename(this.uploader.queue[index].file.name, this.idseguimiento)
        })

        this.x.subscribe(
          data => {
            //this.router.navigate(['/boton-buscar']);
            this.respuestas = data;
            this.alertService.success("Su archivo subió exitosamente...");
          },
          error =>  {
            this.errorMessage = <any>error
            this.alertService.error("Ups! Algo pasó, no se pudo subir su archivo, inténtalo de nuevo");
          }
        );
    };

    gotoSeguimientos() {
    this.router.navigate(['/seguimientos',this.idsolicitud,this.idsolicitante]);
  }

}
