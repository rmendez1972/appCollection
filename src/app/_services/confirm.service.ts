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

@Injectable() export class ConfirmService {
	private subject = new Subject<any>();
	private miservice:AplicarService;
	private miroute: ActivatedRoute;
	private bonificacioncomponent:AplicaBonificacionComponent;
	private aplicabonificservice:AplicaBonificService;
	private mik: Observable<Aplicar[]>;
	private fecha:string;
    private totalmoratorios:number;

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

    confirmBonificacionDiversos(message: string='',
        onMessageAplicaBonificSiDiversos:EventEmitter<String>, siFn:(eventemmitter)=>void,noFn:(eventemmitter)=>void){


        this.setConfirmationBonificacionDiversos(message,onMessageAplicaBonificSiDiversos,
            siFn,noFn);
    }

    setConfirmationBonificacionDiversos(message:string,
        onMessageAplicaBonificSiDiversos:EventEmitter<String>,siFn:(eventemmitter)=>void,noFn:(eventemmitter)=>void){
        let that = this;

        this.subject.next({ type: "confirm",
                           text: message,
                        siFn:

                        function(component){
                            that.subject.next(); //this will close the modal
                            //let aplicarservice=function() { return 'hola' };
                            siFn(onMessageAplicaBonificSiDiversos);
                        },
                        noFn:function(eventemmitter){
                            that.subject.next();
                            noFn(onMessageAplicaBonificSiDiversos);
                        }
        });
    }
}