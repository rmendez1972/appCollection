import { Injectable,  OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { AplicarService} from '../mov_edoscta/aplicar.service';
import { Aplicar } from '../mov_edoscta/aplicar';
import { Observable } from 'rxjs/Observable';
import { AplicaBonificacionComponent} from '../mov_edoscta/aplicabonificacion.component';
import { AplicaBonificService} from '../mov_edoscta/aplicabonificacion.service';
import {BonificacionDivComponent} from '../mov_diversos/bonificacion_div.component';
import {BonificDivService} from '../mov_diversos/bonificacion_div.service';
import {Aplica_Mov_diversosService} from '../mov_diversos/aplica_mov_diversos.service';
import { Mov_diversos } from '../mov_diversos/mov_diversos';
import {AplicaBonificServiceDiv} from '../mov_diversos/aplicabonificaciondiv.service';
import {Bonific_div} from '../mov_diversos/bonific_div';
import {AplicaBonificacionDivComponent} from '../mov_diversos/aplicabonificaciondiv.component';


/**
 * class CppListComponent()
 * Clase que realiza la presentación de los confirms.
 * @author: 
 * @return {export} export class
 */
@Injectable() export class ConfirmService {
  /**
  * Variables locales
  */
	private subject = new Subject<any>();
	private miservice:AplicarService;
	private miroute: ActivatedRoute;
	private bonificacioncomponent:AplicaBonificacionComponent;
	private aplicabonificservice:AplicaBonificService;
    private mik: Observable<Aplicar[]>;
    private mim: Observable<Mov_diversos[]>;
	private fecha:string;
    private totalmoratorios:number;
    private miservicesBonDiv:BonificDivService;
    private aplicabonificdivcomponent:AplicaBonificacionDivComponent;
    private aplicabonificservicediv:AplicaBonificServiceDiv;
    private b: Observable<Bonific_div[]>;
    private mid:Observable<Aplica_Mov_diversosService[]>
    private diversos :string;
    private corriente:number;
    private descripcion:string;
    private importe:number;
    private intereses:number;
    private otros:number;
    private bonificacion: number;
    private moratorios: number;
    private autoriza : number;
    onMessageAplicaBonificSi = new EventEmitter<String>();
    onMessageAplicaBonificSiDiversos = new EventEmitter<String>();


    constructor(){
    }

    ngOnInit() {
    }

    confirm(message: string='',fecha:string,miservice:AplicarService,miroute:ActivatedRoute,miK:Observable<Aplicar[]>,siFn:(message,fecha,aplicarservice, routeservice,k)=>void,noFn:()=>void){

        this.fecha=fecha;
        this.setConfirmation(message,this.fecha,miservice,miroute,this.mik,siFn,noFn);
    }


    setConfirmation(message: string, fecha:string, miservice: AplicarService, miroute: ActivatedRoute,miK:Observable<Aplicar[]>, siFn:(message,fecha,aplicarservice,routeservice,k)=>void,noFn:()=>void) {
        let that = this;
        let mifecha=fecha;
        let mimessage=message;
        let mk: Observable<Aplicar[]>;
        //console.log('valor de mifecha dentro de setConfirmation '+ mifecha);
        this.subject.next({ type: "confirm",
                        text: message,
                        siFn:
                        function(message,fecha,aplicarservice){
                            that.subject.next(); //this will close the modal
                            //let aplicarservice=function() { return 'hola' };
                            siFn(mimessage ,mifecha, miservice, miroute, mk);
                        },
                        noFn:function(){
                            that.subject.next();
                            noFn();
                        }
        });

    }


    confirmconBonific(message: string='',fecha:string,miservice:AplicarService,bonificacioncomponent:AplicaBonificacionComponent,miroute:ActivatedRoute,miK:Observable<Aplicar[]>,tipobonificacion:number,totalmoratorios:number,qautoriza:number,siFn:(message,fecha,aplicarservice,bonificacioncomponent, routeservice,k,tipobonificacion,totalmoratorios,qautoriza)=>void,noFn:()=>void){

        this.fecha=fecha;
        this.setConfirmationconBonific(message,this.fecha,miservice,bonificacioncomponent,miroute,this.mik,tipobonificacion,totalmoratorios,qautoriza,siFn,noFn);
    }


    setConfirmationconBonific(message: string, fecha:string, miservice: AplicarService, bonificacioncomponent:AplicaBonificacionComponent, miroute: ActivatedRoute,miK:Observable<Aplicar[]>,tipobonificacion:number,totalmoratiorios:number,qautoriza:number, siFn:(message,fecha,aplicarservice,bonificacioncomponent,routeservice,k,tipobonificacion,totalmoratorios,qautoriza)=>void,noFn:()=>void) {
        let that = this;
        let mifecha=fecha;
        let mimessage=message;
        let mk: Observable<Aplicar[]>;
        //console.log('valor de mifecha dentro de setConfirmationconBonific '+ mifecha);
        //console.log('valor de bonificacioncomponent dentro de setConfirmationconBonific '+ bonificacioncomponent);
        this.subject.next({ type: "confirm",
                        text: message,
                        siFn:
                        function(message,fecha,aplicarservice){
                            that.subject.next(); //this will close the modal
                            //let aplicarservice=function() { return 'hola' };
                            siFn(mimessage ,mifecha, miservice, bonificacioncomponent, miroute, mk, tipobonificacion, totalmoratiorios, qautoriza);
                        },
                        noFn:function(){
                            that.subject.next();
                            noFn();
                        }
        });


    }


    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    /**
    * confimarBonificacionDiversos() 
    *  metodo que envia parametros a otro metodo para la creación del confirm
    *  @author: Marlon Gomez
    *  @param {String} message
    *  @param {AplicaBonificService} bonificservice
    *  @param {EventEmitter<String>} onMessageAplicaBonificSi
    *  @param {EventEmitter} siFn
    *  @param {EventEmitter} noFn
    *  @return {Void}
    */
    confirmBonificacion(message: string='',bonificservice:AplicaBonificService, onMessageAplicaBonificSi:EventEmitter<String>, siFn:(component,eventemmitter) =>void,noFn:(eventemmitter)=>void){


        this.setConfirmationBonificacion(message,bonificservice,onMessageAplicaBonificSi ,siFn,noFn);
    }

    /**
    *  setConfirmationBonificacion() 
    *  creacion del confirm, dependiendo de la respuesta se realizará una accion
    *  @author: Marlon Gomez
    *  @param {String} message
    *  @param {AplicaBonificService} bonificservice
    *  @param {EventEmitter<String>} onMessageAplicaBonificSi
    *  @param {EventEmitter} siFn
    *  @param {EventEmitter} noFn
    *  @return {Void}
    */
    setConfirmationBonificacion(message:string,bonificservice:AplicaBonificService,onMessageAplicaBonificSi:EventEmitter<String>,siFn:(component,eventemmitter)=>void,noFn:(eventemmitter)=>void){
        let that = this;
        this.subject.next({ type: "confirm",
                           text: message,
                        siFn:

                        function(component){
                            that.subject.next();
                            siFn(bonificservice,onMessageAplicaBonificSi);
                        },
                        noFn:function(eventemmitter){
                            that.subject.next();
                            noFn(onMessageAplicaBonificSi);
                        }
        });
    }



    /**
    * confirmBonificacionDiversos() 
    *  metodo que envia parametros a otro metodo para la creación del confirm
    *  @author: Marlon Gomez
    *  @param {String} message
    *  @param {BonificService} bonificservice
    *  @param {EventEmitter<String>} onMessageAplicaBonificSiDiversos
    *  @param {EventEmitter} siFn
    *  @param {EventEmitter} noFn
    *  @return {Void}
    */
    confirmBonificacionDiversos(message: string='',bonificservice:BonificDivService,
        onMessageAplicaBonificSiDiversos:EventEmitter<String>, siFn:(bonificservice,eventemmitter)
        =>void,noFn:(eventemmitter)=>void){

        this.setConfirmationBonificacionDiversos(message,bonificservice,onMessageAplicaBonificSiDiversos,
            siFn,noFn);
    }


    /**
    *  setConfirmationBonificacionDiversos() 
    *  creacion del confirm, dependiendo de la respuesta se realizará una accion
    *  @author: Marlon Gomez
    *  @param {String} message
    *  @param {BonificService} bonificservice
    *  @param {EventEmitter<String>} onMessageAplicaBonificSiDiversos
    *  @param {EventEmitter} siFn
    *  @param {EventEmitter} noFn
    *  @return {Void}
    */
    setConfirmationBonificacionDiversos(message:string,bonificservice:BonificDivService,
        onMessageAplicaBonificSiDiversos:EventEmitter<String>,siFn:(bonificservice,eventemmitter)
        =>void,noFn:(eventemmitter)=>void){
        let that = this;
        this.subject.next({ type: "confirm",
                           text: message,
                        siFn:

                        function(component){
                            that.subject.next(); //this will close the modal
                            //let aplicarservice=function() { return 'hola' };
                            siFn(bonificservice,onMessageAplicaBonificSiDiversos);
                        },
                        noFn:function(eventemmitter){
                            that.subject.next();
                            noFn(onMessageAplicaBonificSiDiversos);
                        }
        });
    }




    //Confirm para aplicar diversos sin bonificaciones
    confirmDiversos(message: string='',diversos:string, corriente:number,
      descripcion:string,importe:number,intereses:number,otros:number,miservice:Aplica_Mov_diversosService,
      miroute:ActivatedRoute,mid:Observable<Aplica_Mov_diversosService[]>,siFn:(message, diversos,
          corriente,descripcion,importe,intereses,otros,aplica_mov_diversosservice, routeservice,p)=>void,
      noFn:()=>void){
        this.diversos = diversos;
        this.corriente = corriente;
        this.descripcion = descripcion;
        this.importe = importe;
        this.intereses = intereses;
        this.otros = otros;


        this.setConfirmationDiversos(message,this.diversos,
            this.corriente,
            this.descripcion,
            this.importe,
            this.intereses,
            this.otros,miservice,miroute,this.mid,siFn,noFn);
    }


    setConfirmationDiversos(message: string, diversos:string, corriente:number,
      descripcion:string,importe:number,intereses:number,otros:number, miservice: Aplica_Mov_diversosService,
      miroute: ActivatedRoute,mid:Observable<Aplica_Mov_diversosService[]>,
      siFn:(message,diversos,corriente,descripcion,importe,intereses,otros,aplica_mov_diversosservice,routeservice,
          p)=>void,noFn:()=>void) {
        let that = this;
        let mdiversos = diversos;
        let mcorriente = corriente;
        let mdescripcion = descripcion;
        let mimporte = importe;
        let mintereses = intereses;
        let motros = otros;
        let mimessage=message;
        let miid: Observable<Aplica_Mov_diversosService[]>;
        //console.log('valor de mifecha dentro de setConfirmation '+ mifecha);

        this.subject.next({ type: "confirm",
                        text: message,
                        siFn:
                        function(message,diversos,corriente,descripcion,importe,intereses,
                            otros,aplica_mov_diversosservice){
                            that.subject.next(); //this will close the modal

                            //let aplicarservice=function() { return 'hola' };
                            siFn(mimessage ,mdiversos,mcorriente,mdescripcion,mimporte,
                                mintereses,motros, miservice, miroute, miid);
                        },
                        noFn:function(){
                            that.subject.next();
                            noFn();
                        }
        });

    }

    //Confirm de pago de mensualidades diversas con bonificacion
    confirmDiversosBonificacion(message: string='',diversos:string,
      corriente:number,descripcion:string,importe:number,intereses:number,otros:number,
      bonificacion:number, moratorios:number, autoriza:number,miservice:Aplica_Mov_diversosService,
      miroute:ActivatedRoute,mid:Observable<Aplica_Mov_diversosService[]>,siFn:(message, diversos,
          corriente,descripcion,importe,intereses,otros,bonificacion,moratorios,autoriza,
          aplica_mov_diversosservice, routeservice,p)=>void,
      noFn:()=>void){
        this.diversos = diversos;
        this.corriente = corriente;
        this.descripcion = descripcion;
        this.importe = importe;
        this.intereses = intereses;
        this.otros = otros;
        this.bonificacion = bonificacion;
        this.moratorios = moratorios;
        this.autoriza = autoriza;


        this.setConfirmationDiversosBonificacion(message,this.diversos,this.corriente,this.descripcion,this.importe,
            this.intereses,this.otros,this.bonificacion,this.moratorios,this.autoriza,miservice,miroute,
            this.mid,siFn,noFn);
    }


    setConfirmationDiversosBonificacion(message: string, diversos:string,
      corriente:number,descripcion:string,importe:number,intereses:number,otros:number,
      bonificacion:number, moratorios:number, autoriza:number, miservice: Aplica_Mov_diversosService,
      miroute: ActivatedRoute,mid:Observable<Aplica_Mov_diversosService[]>,
      siFn:(message,diversos,corriente,descripcion,importe,intereses,otros,bonificacion,
          moratorios,autoriza ,aplica_mov_diversosservice,routeservice,
          p)=>void,noFn:()=>void) {
        let that = this;
        let mdiversos = diversos;
        let mcorriente = corriente;
        let mdescripcion = descripcion;
        let mimporte = importe;
        let mintereses = intereses;
        let motros = otros;
        let mbonificacion =bonificacion;
        let mmoratorios =moratorios;
        let mautoriza = autoriza;
        let mimessage=message;
        let miid: Observable<Aplica_Mov_diversosService[]>;
        //console.log('valor de mifecha dentro de setConfirmation '+ mifecha);

        this.subject.next({ type: "confirm",
                        text: message,
                        siFn:
                        function(message,diversos,corriente,descripcion,importe,intereses,
                            otros,bonificacion,moratorios,autoriza,aplica_mov_diversosservice){
                            that.subject.next(); //this will close the modal

                            //let aplicarservice=function() { return 'hola' };
                            siFn(mimessage ,mdiversos,mcorriente,mdescripcion,mimporte,
                                mintereses,motros,mbonificacion,mmoratorios,mautoriza,
                                miservice, miroute, miid);
                        },
                        noFn:function(){
                            that.subject.next();
                            noFn();
                        }
        });

    }



}