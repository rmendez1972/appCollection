import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, Input, EventEmitter, Output} from '@angular/core';

import { Aplica_Mov_diversos } from './aplica_mov_diversos';
import { Benef_div } from './benef_div';
import { Mov_diversos } from './mov_diversos';
import { Aplica_Mov_diversosService} from './aplica_mov_diversos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
import { ConfirmService} from '../_services/index';

import {Clave_Diversos} from './clave_div';
import {Programas} from './cat_prog';

import { TipoBonificacion} from './tipoBonificacion';
import { Autoriza } from './autoriza';
import { AplicaBonificService} from '../mov_edoscta/aplicabonificacion.service';
import {BonificacionDivComponent} from './bonificacion_div.component';
import {AplicaBonificacionDivComponent} from './aplicabonificaciondiv.component';


@Component({
  selector: 'app-diversos',
  templateUrl: './aplica_mov_diversos-list.component.html',
  styleUrls: ['./mov_diversos-list.component.css'],
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

export class Aplica_Mov_diversosListComponent implements OnInit {
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
  private aplcia_mov_diversos: Aplica_Mov_diversos[];
  private mov_diversos: Mov_diversos[];
  private benef_div: Benef_div[];
  private k: Observable<Mov_diversos[]>;
  private l: Observable<Benef_div[]>;

  private j: Observable<Clave_Diversos[]>;
  private m: Observable<Programas []>;

  private h: Observable<TipoBonificacion[]>;
  private i: Observable<Autoriza[]>;

  private miMensajeerrorMovs:String;
  private miMensajeMovs:String;

  private miMensajeBenef:string;

  private miMensajeBonsError:String;//igh
  private miMensajeBons:String;
  
  private aplicado:String = "fa fa-check";
  private noaplicado: String = "fa fa-times";

  private clavediv: Clave_Diversos[];
  private programas: Programas[];

  private bonificaciones: TipoBonificacion[];
  private autoriza: Autoriza[];


  private totalmov_diversos: number=0;

  private totales_style:String = "info";
  private renglon_style:String = "active";
  private miMensajeAplicaBons:String;
  private miMensajeerrorAplicaBons:String;
  private miMensajeAplicaBonsSi:String;


  optionsSelect = [
    {id:1, value: "clave_lector", name: "Clave de Elector(INE)"},
    {id:2, value: "clave_curp", name: "CURP"},
    {id:3, value: "clave_b", name: "Clave SEDETUS"},
    {id:4, value: "nombre", name: "Nombre de Beneficiario"}

];
private seleccionado:String="clave_b";

  constructor(
      private router: Router,
      private route:  ActivatedRoute,
      private aplica_mov_diversosservice: Aplica_Mov_diversosService,
      private alertService:AlertService,
      private confirmService:ConfirmService,
    )
    {
      
    }

  	ngOnInit() {
      console.log('valor de miMensajeAplicaBonsSi '+this.miMensajeAplicaBonsSi);
      this.model.fecha_corte=new Date()
      this.model.valorcriterio=null;
    };

  	title = 'Cobranza: movimientos diversos';
 
    localizaBenefMov_diversos(){
      console.log('valor de model.criterio '+this.model.criterio);
      console.log('valor de model.valorcriterio '+this.model.valorcriterio);
      if ((this.model.criterio!=undefined) && (this.model.valorcriterio!=null )){
        this.miMensajeerrorMovs=null;
        this.getMov_diversos(this.model.criterio,this.model.valorcriterio);
        this.getBenef_div(this.model.criterio,this.model.valorcriterio);
        
      }else{
        this.miMensajeMovs=null;
        this.miMensajeerrorMovs = "Error en recuperación de Movimientos diversos, por favor llena los campos..";
      }
      
    }

    getMov_diversos(criterio:String,valorcriterio:String) {
      this.k=this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) =>
      {
        return this.aplica_mov_diversosservice.getMov_diversos(criterio,valorcriterio)
      })

      this.k.subscribe(
        
        movimientos => {
          this.mov_diversos = movimientos;  
          this.totalmov_diversos = this.mov_diversos.length-1;
          this.miMensajeMovs = "Recuperación Exitosa de los Movimientos diversos";
          this.errorMessage = null;
         },
        error =>  {this.errorMessage = "no se pudo localizar los movimientos diversos"; 
                   this.miMensajeMovs = null;  
                  this.mov_diversos = null;});

        //movimientos => this.mov_diversos = movimientos,
        //error =>  this.errorMessage = <any>error);
    };

  getBenef_div(criterio:String,valorcriterio:String) {
      this.l=this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) =>
      {
        //this.selectedId= +params['id'];
           return this.aplica_mov_diversosservice.getBenef_div(criterio,valorcriterio)
      })

      this.l.subscribe(

                     beneficiario => {
                       this.benef_div = beneficiario;
                     
                     if (this.benef_div[0]!= null){
                       console.log("Encontrado!!!!");
                      this.miMensajeBenef="Se encontro el beneficiario";
                     }else if (this.benef_div[0]== null) {
                       console.log("No Encontrado!!!!");
                       this.miMensajeBenef="No se encontro el beneficiario";
                     }
                     else {
                       this.miMensajeBenef=null;}
                    },
                     error =>  this.errorMessage = <any>error);

  };

  getClaveDiversos() {
        this.j=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {
          return this.aplica_mov_diversosservice.getClaveDiversos()
        })
        this.j.subscribe(
                       clavediv => this.clavediv= clavediv,
                       error =>  this.errorMessage = <any>error);

    };
    getProgramas() {
        this.m=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {
          return this.aplica_mov_diversosservice.getProgramas()
        })
        this.m.subscribe(
                       programas=> this.programas= programas,
                       error =>  this.errorMessage = <any>error);

    };

    getTipoBonificaciones() {
        this.h=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {
          return this.aplica_mov_diversosservice.getTipoBonificacion()
        })
        this.h.subscribe(
                       bonificaciones => this.bonificaciones= bonificaciones,
                       error =>  this.errorMessage = <any>error);

    };
    getAutoriza(){
      this.i=this.route.params
      .switchMap((params:Params) =>
      {
        return this.aplica_mov_diversosservice.getAutoriza()
      })
      this.i.subscribe(
        autoriza => this.autoriza = autoriza,
        error => this.errorMessage = <any>error);
    };


   getPagar(diversos:string, corriente:number,
      descripcion:string,importe:number,
      intereses:number,otros:number) {

      return this.aplica_mov_diversosservice.getPagar(diversos,corriente,descripcion,importe,intereses,
        otros);

    };
    getPagarBonificacion(diversos:string, 
      corriente:number,descripcion:string,importe:number,
      intereses:number,otros:number, 
      bonificacion:number, moratorios:number, autoriza:number){

      return this.aplica_mov_diversosservice.getPagarBonificacion(diversos,corriente,descripcion,importe,intereses,
        otros,bonificacion,moratorios,autoriza);
    };



    onMessageAplicaBonificSi(mensaje:String){
      this.miMensajeAplicaBonsSi = mensaje;
    }

    //Mensajes para las bonificaciones igh
    onMessage(mensaje:String){
      this.miMensajeBons = mensaje;
     
      }

    onMessage2( mensaje2:String){
        this.miMensajeBonsError = mensaje2;
      }
    valida_ultimo(i:number){
      if (i==this.totalmov_diversos) {
        return true;
      }else{

        return false;

      }
    };

    //metodos de aplicabonific
    //mensaje de exito en la aplicacion de bonificaciones
    onMessageAplicaBonific(mensaje:String){
      console.log('DENTRO DE OnMessageAplicaBonific del padre');

      this.miMensajeAplicaBons = mensaje;
    }

    //mensaje de fracaso en la aplicacion de bonificaciones
    onerrorMessageAplicaBonific(mensaje:String){

      this.miMensajeerrorAplicaBons = mensaje;
    }
    

    

}
