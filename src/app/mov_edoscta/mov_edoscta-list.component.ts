import { Component, OnInit, HostBinding} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { Solicitante } from './solicitante';

import { Mov_edocta } from './mov_edocta';
import { Benef } from './benef';
import { Solicitud } from './solicitud';
import { Tramite } from './tramite';
import { Seguimiento } from './seguimiento';
import { Mov_edoctaService} from './mov_edocta.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import { AuthGuard } from '../_guards/index';

//import { UploadComponent} from '../upload/upload.component';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
//import { centavos } from '../_pipes/centavos.pipe';

import {ImportComponent} from './../import.component'
@Component({
  selector: 'app-seguimiento-list',
  templateUrl: './mov_edoscta-list.component.html',
  styleUrls: ['./mov_edoscta-list.component.css'],
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
export class Mov_edosctaListComponent implements OnInit {
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
  model:any={};
  //private solicitantes: Solicitante[];
  private mov_edoscta: Mov_edocta[];
  private benef: Benef[];
  //private solicitudes: Solicitud[];
  //private tramites: Tramite[];
  //private seguimientos: Seguimiento[];
  //private solicitante: Solicitante;
  //private x: Observable<Solicitante[]>;
  //private y: Observable<Solicitud[]>;
  //private z: Observable<Tramite[]>;
  //private a: Observable<Seguimiento[]>;

  private k: Observable<Mov_edocta[]>;
  private l: Observable<Benef[]>;

  private e: Observable<Seguimiento[]>;

  private selectedId: number;


  private miMensajeBons:String;
  private miMensajeerrorBons:String;
  private miMensajeVencidos:String;
  private miMensajeerrorVencidos:String;
  private miMensajeMovs:String;
  private miMensajeerrorMovs:String;
  private fecha:String;
  private bonific:String = "fa fa-check";
  private nobonific: String = "fa fa-times";
  public totalvencidos: number=0;

  private totales_style:String = "info";
  private renglon_style:String = "active";
  private totalmov_edoscta:number=0;

  optionsSelect = [
       {id:1, value: "clave_b", name: "Clave SEDETUS"},
       {id:2, value: "nombre", name: "Nombre de Beneficiario"}

  ];
  private seleccionado:String="clave_b";




  	constructor(
      private router: Router,
      private route: ActivatedRoute,
      private mov_edoctaservice: Mov_edoctaService,
      private alertService:AlertService

    )
    {

    }


  	ngOnInit() {

      this.model.fecha_corte= new Date().toJSON();
      this.model.valorcriterio=null;

    };




  	title = 'Estado de Cuenta por Programas';

    localizaBenefMov(){
      console.log('valor de model.criterio '+this.model.criterio);
      console.log('valor de model.valorcriterio '+this.model.valorcriterio);
      if ((this.model.criterio!=undefined) && (this.model.valorcriterio!=null )){
        this.miMensajeerrorMovs=null;
        this.getMov_edoscta(this.model.criterio,this.model.valorcriterio);
        this.getBenef(this.model.criterio,this.model.valorcriterio);

      }else{
        this.miMensajeMovs=null;
        this.miMensajeerrorMovs = "Error en recuperación de Movimientos de Estado de Cuenta, por favor llena los campos..";
      }
    }



    getMov_edoscta(criterio:String,valorcriterio:String) {
        this.k=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          //this.selectedId= +params['id'];
          return this.mov_edoctaservice.getMov_edoscta(criterio,valorcriterio)
        })

        this.k.subscribe(

                       movimientos => {
                         this.mov_edoscta = movimientos;
                         this.totalmov_edoscta=this.mov_edoscta.length-1;
                         this.miMensajeMovs = "Recuperación Exitosa de los Movimientos de Estado de Cuenta";
                        },
                       error =>  this.errorMessage = <any>error);


    };

    getBenef(criterio:String,valorcriterio:String) {
        this.l=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          this.selectedId= +params['id'];
          return this.mov_edoctaservice.getBenef(criterio,valorcriterio)
        })

        this.l.subscribe(

                       beneficiario => this.benef = beneficiario,
                       error =>  this.errorMessage = <any>error);


    };


    onMessage(mensaje:String){

      this.miMensajeBons = mensaje;
      this.miMensajeVencidos = mensaje;


    }


    onerrorMessage(mensaje:String){

      this.miMensajeerrorBons = mensaje;


    }


    onMessagevencidos(mensaje:String){

      this.miMensajeVencidos = mensaje;


    }


    onerrorMessagevencidos(mensaje:String){

      this.miMensajeerrorVencidos = mensaje;


    }

    onTotalVencidos(totalvencidos:number){

      this.totalvencidos = totalvencidos;

    }

    valida_ultimo(i:number){
      if (i==this.totalmov_edoscta) {
        return true;
      }else{

        return false;

      }
    }



}
