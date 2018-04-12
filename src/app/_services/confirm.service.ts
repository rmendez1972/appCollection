import { Injectable,  OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute, Params } from '@angular/router';


import { Subject } from 'rxjs/Subject';
import { AplicarService} from '../mov_edoscta/aplicar.service';
import { Aplicar } from '../mov_edoscta/aplicar';
import { Observable } from 'rxjs/Observable';
import { AplicaBonificacionComponent} from '../mov_edoscta/aplicabonificacion.component';
import { AplicaBonificService} from '../mov_edoscta/aplicabonificacion.service';

import {BonificacionDivComponent} from '../mov_diversos/bonificacion_div.component';
import {BonificDivService} from '../mov_diversos/bonificacion_div.service';


import {Aplica_Mov_diversosService} from '../mov_diversos/aplica_mov_diversos.service'
import { Mov_diversos } from '../mov_diversos/mov_diversos';

@Injectable() export class ConfirmService {
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

    private diversos :string;
    private corriente:string;
    private descripcion:string;
    private importe:string;
    private intereses:string;
    private otros:string;

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

	};

    getMessage(): Observable<any> {
    	return this.subject.asObservable();
    }
    confirmBonificacion(message: string='',bonificservice:AplicaBonificService, onMessageAplicaBonificSi:EventEmitter<String>, siFn:(component,eventemmitter) =>void,noFn:(eventemmitter)=>void){


        this.setConfirmationBonificacion(message,bonificservice,onMessageAplicaBonificSi ,siFn,noFn);
    }
    setConfirmationBonificacion(message:string,bonificservice:AplicaBonificService,onMessageAplicaBonificSi:EventEmitter<String>,siFn:(component,eventemmitter)=>void,noFn:(eventemmitter)=>void){
        let that = this;

        //console.log('tipo de bonificservice dentro de confirmservice '+typeof(bonificservice));
    	this.subject.next({ type: "confirm",
                       	text: message,
                        siFn:

                        function(component){
                            that.subject.next(); //this will close the modal

                            //let aplicarservice=function() { return 'hola' };
                            siFn(bonificservice,onMessageAplicaBonificSi);
                        },
                        noFn:function(eventemmitter){
                            that.subject.next();
                            noFn(onMessageAplicaBonificSi);
                        }
    	});
    }




    //Confirm para movimientos diversos
    
    confirmBonificacionDiversos(message: string='',bonificservice:BonificDivService, 
        onMessageAplicaBonificSiDiversos:EventEmitter<String>, siFn:(bonificservice,eventemmitter) 
        =>void,noFn:(eventemmitter)=>void){


        this.setConfirmationBonificacionDiversos(message,bonificservice,onMessageAplicaBonificSiDiversos,
            siFn,noFn);
    }

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


    //Confirm para aplicar los movimientos diversos
    //confirm sin bonificaciones
    confirmAplicaDiv(message:string='',diversos:string,corriente:string,descripcion:string,importe:string,intereses:string,otros:string,miservicesBonDiv:BonificDivService,miroute:ActivatedRoute, miM:Observable<Mov_diversos[]>,
                    siFn:(message,diversos,corriente,descripcion,importe,intereses,otros,miservicesBonDiv,route,m)=>void,noFn:()=>void){

        this.setconfirmAplicaDiv(message,diversos,corriente,descripcion,importe,intereses,otros,miservicesBonDiv,miroute, this.mim,siFn,noFn)         

    }

    setconfirmAplicaDiv(message:string='',diversos:string,corriente:string,descripcion:string,importe:string,intereses:string,otros:string,miservicesBonDiv:BonificDivService,miroute:ActivatedRoute, miM:Observable<Mov_diversos[]>,
    siFn:(message,diversos,corriente,descripcion,importe,intereses,otros,miservicesBonDiv,route,m)=>void,noFn:()=>void){
        let that = this;
        let mm:Observable<Mov_diversos[]>;

        this.subject.next({ type: "confirm",
        text: message,
        siFn:
        function(message,miservicesBonDiv){
            that.subject.next(); //this will close the modal

            //let aplicarservice=function() { return 'hola' };
            siFn(message,diversos,corriente,descripcion,importe,intereses,otros,miservicesBonDiv,miroute,mm);
        },
        noFn:function(){
            that.subject.next();
            noFn();
        }
    });

    }

    //Confirm para pagos de diversos
    confirmDiversos(message: string='',diversos:string, corriente:string,
      descripcion:string,importe:string,
      intereses:string,otros:string,miservice:AplicarService,miroute:ActivatedRoute,
      miK:Observable<Aplicar[]>,siFn:(message,diversos,corriente,descripcion,
          importe,intereses,otros ,aplicarservice, routeservice,k)=>void,noFn:()=>void){

        this.diversos = diversos;
        this.corriente = corriente;
        this.descripcion = descripcion;
        this.importe = importe;
        this.intereses = intereses;
        this.otros = otros;
        this.setConfirmationDiversos(message,this.diversos,this.corriente,this.descripcion,
            this.importe,this.intereses,this.otros,miservice,miroute,this.mik,siFn,noFn);
    }

    setConfirmationDiversos(message: string, diversos:string, corriente:string,
      descripcion:string,importe:string,
      intereses:string,otros:string, miservice: AplicarService, miroute: ActivatedRoute,
      miK:Observable<Aplicar[]>, siFn:(message,diversos,corriente,descripcion,importe,intereses,
      otros ,aplicarservice,routeservice,k)=>void,noFn:()=>void) {
        let that = this;
        let midiversos  = diversos;
        let micorriente = corriente;
        let midescripcion = descripcion;
        let miimporte  = importe;
        let miintereses = intereses;
        let miotros = otros;

        let mimessage=message;
        let mk: Observable<Aplicar[]>;
        //console.log('valor de mifecha dentro de setConfirmation '+ mifecha);

        this.subject.next({ type: "confirm",
                        text: message,
                        siFn:
                        function(message,fecha,aplicarservice){
                            that.subject.next(); //this will close the modal

                            //let aplicarservice=function() { return 'hola' };
                            siFn(mimessage ,midiversos,
                                micorriente,midescripcion,miimporte,
                                miintereses,miotros, miservice, miroute, mk);
                        },
                        noFn:function(){
                            that.subject.next();
                            noFn();
                        }
        });

    }

}