import { Component, OnInit, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { Adjunto } from './adjunto';
import { Solicitud} from '../seguimientos/solicitud';
import { Tramite } from '../seguimientos/tramite';
import { Seguimiento } from '../seguimientos/seguimiento';
import {AdjuntoService} from './adjunto.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/index';


@Component({
  selector: 'app-adjunto-list',
  templateUrl: './adjunto-list.component.html',
  styleUrls: ['./adjunto-list.component.css'],
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
export class AdjuntoListComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'relative';
  }
 
  private errorMessage: string;
  private adjuntos: Adjunto[];
  private solicitudes: Solicitud[];
  private tramites: Tramite[];
  private seguimientos: Seguimiento[];

  private adjunto: Adjunto;
  private x: Observable<Adjunto[]>;
  private y: Observable<Solicitud[]>;
  private z: Observable<Tramite[]>;
  private a: Observable<Seguimiento[]>;
  private adjuntosruta: string;
  private adjuntosupload: string;


  private selectedId: number;
  public selectedIdSol: number;
  currentUser:Array<any>;
  public idSolicitante:number;



  	constructor(
      private router: Router,
      private route: ActivatedRoute,
      private adjuntoservice: AdjuntoService
    )
    {this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      let x=0;
      for (x=0;x<this.currentUser.length;x++){
        this.idSolicitante=this.currentUser[x].id;

      }}


  	ngOnInit() {

      this.getAdjuntos();
      this.getSolicitud();
      this.getTramite();
      this.getSeguimiento();
      this.getAdjuntosruta();
      this.getAdjuntosupload();

    };




  	title = 'Listado de Archivos Adjuntos';
    selectedAdjunto: Adjunto;

    getAdjuntosruta(){this.adjuntosruta=String(
      this.adjuntoservice.getAdjuntosruta());
  }

  getAdjuntosupload(){this.adjuntosupload=String(
      this.adjuntoservice.getAdjuntosupload());
  }

    getAdjuntos() {
        this.x=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          this.selectedId= +params['id'];
          this.selectedIdSol= +params['idSol'];
          return this.adjuntoservice.getAdjuntos(this.selectedId)
        })

        this.x.subscribe(
                       adjuntos => this.adjuntos = adjuntos,
                       error =>  this.errorMessage = <any>error);


    };


    getSolicitud() {
        this.y=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          //this.selectedId= +params['id'];
          return this.adjuntoservice.getSolicitudes(this.selectedId)
        })

        this.y.subscribe(
                       solicitud => this.solicitudes = solicitud,
                       error =>  this.errorMessage = <any>error);

    };

    getTramite() {
        this.z=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          //this.selectedId= +params['id'];
          return this.adjuntoservice.getTramites(this.selectedId)
        })

        this.z.subscribe(
                       tramite => this.tramites = tramite,
                       error =>  this.errorMessage = <any>error);

    };


    getSeguimiento() {
        this.a=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          //this.selectedId= +params['id'];
          return this.adjuntoservice.getSeguimientos(this.selectedId)
        })

        this.a.subscribe(
                       seguimiento => this.seguimientos = seguimiento,
                       error =>  this.errorMessage = <any>error);

    };
 gotoSeguimientos() {

    this.router.navigate(['/seguimientos',this.selectedIdSol,this.idSolicitante]);
  }


}
