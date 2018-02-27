import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, Input, EventEmitter, Output} from '@angular/core';
import { Solicitante } from './solicitante';


import { Mov_edocta } from './mov_edocta';
import { Benef } from './benef';
import { Mov_edoctaService} from './mov_edocta.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
import { ConfirmService} from '../_services/index';
import { Aplicar} from './aplicar';

<<<<<<< HEAD
//Importando modulos para Alerta de msj
//import {ConfirmService} from '../confirm/confirm.service';
//import {ConfirmComponent} from '../confirm/confirm.component';

=======
>>>>>>> b9c2ad78666c4e1c533ace772ac900f44efc7a95
import { Aplica_Mov_edocta } from './aplica_mov_edocta';
import { Aplica_Mov_edoctaService} from './aplica_mov_edocta.service';

import { TipoBonificacion} from './tipoBonificacion';

import {AplicaBonificacionComponent} from './aplicabonificacion.component';
import {AplicaBonificService} from './aplicabonificacion.service';


@Component({
  selector: 'app-seguimiento-list, notifier',
  templateUrl: './aplica_mov_edoscta-list.component.html',
  styleUrls: ['./aplica_mov_edoscta-list.component.css'],
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
  ],
})


export class Aplica_Mov_edosctaListComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'relative';
  }

  //title = "Bonificacion";

  private errorMessage: string;
  model:any={};

  private mov_edoscta: Mov_edocta[];
  private benef: Benef[];
  private bonificaciones: TipoBonificacion[];

  private k: Observable<Mov_edocta[]>;
  private l: Observable<Benef[]>;
  private j: Observable<TipoBonificacion[]>;


  private selectedId: number;


  private miMensajeBons:String;
  private miMensajeerrorBons:String;
  private miMensajeVencidos:String;
  private miMensajeerrorVencidos:String;
  private miMensajeMovs:String;
  private miMensajeerrorMovs:String;
  private miMensajeAplicar:String;
  private miMensajeerrorAplicar:String;
  private fecha:String;
  private bonific:String = "fa fa-check";
  private nobonific: String = "fa fa-times";

  public totalvencidos: number=0;

  public totalAplicarLetras: number = 0;
  public totalMoratorios: number = 0;

  private totales_style:String = "info";
  private renglon_style:String = "active";
  private totalmov_edoscta:number=0;
<<<<<<< HEAD


=======
  //declaracion de variables
  private miMensajeAplicaBons:String;
  private miMensajeerrorAplicaBons:String;
    
  
>>>>>>> b9c2ad78666c4e1c533ace772ac900f44efc7a95

  @Output() onMessageTipoBonificacion = new EventEmitter<String>();
  @Output() onerrorMessageTipoBonificacion = new EventEmitter<String>();

  optionsSelect = [
       {id:1, value: "clave_b", name: "Clave SEDETUS"},
       {id:2, value: "nombre", name: "Nombre de Beneficiario"}

  ];
  private seleccionado:String="clave_b";
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private mov_edoctaservice: Mov_edoctaService,
      private alertService:AlertService,
      private aplica_mov_edoctaservice: Aplica_Mov_edoctaService,

    )
    {

    }
    ngOnInit(){

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
    getTipoBonificaciones() {
        this.j=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {
          return this.aplica_mov_edoctaservice.getTipoBonificacion()
        })

        this.j.subscribe(
                       bonificaciones => this.bonificaciones= bonificaciones,
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

    onMessageAplicar(mensaje:String){

      this.miMensajeAplicar = mensaje;

    }

    onerrorMessageAplicar(mensaje:String){

      this.miMensajeerrorAplicar = mensaje;

    }

    //metodos de aplicabonific
    //mensaje de exito en la aplicacion de bonificaciones
    onMessageAplicaBonific(mensaje:String){

      this.miMensajeAplicaBons = mensaje;
    }

    //mensaje de fracaso en la aplicacion de bonificaciones
    onerrorMessageAplicaBonific(mensaje:String){
      
      this.miMensajeerrorAplicaBons = mensaje;
    }


    onTotalVencidos(totalvencidos:number){
      this.totalAplicarLetras = totalvencidos;
      this.totalvencidos = totalvencidos;
      //console.log("on total vencidos :"+this.totalAplicarLetras);
    }
    onTotalAplicarLetras(totalaplicar:number){
      this.totalAplicarLetras = totalaplicar;

    }
    onTotalMoratorios(totalmoratorios:number){
      this.totalMoratorios = totalmoratorios;
      console.log("Total moratorios :");
    }
    valida_ultimo(i:number){
      if (i==this.totalmov_edoscta) {
        return true;
      }else{

        return false;

      }
    }





}