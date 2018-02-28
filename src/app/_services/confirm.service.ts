import { Injectable,  OnInit } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute, Params } from '@angular/router';


import { Subject } from 'rxjs/Subject';
import { AplicarService} from '../mov_edoscta/aplicar.service';
import { Aplicar } from '../mov_edoscta/aplicar';
import { Observable } from 'rxjs/Observable';


@Injectable() export class ConfirmService {
	private subject = new Subject<any>();
	private miservice:AplicarService;
	private miroute: ActivatedRoute;
	private mik: Observable<Aplicar[]>;
	private fecha:string;

    private totalmoratorios:number;


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

    getMessage(): Observable<any> {
    	return this.subject.asObservable();
    }
    confirmBonificacion(message: string='', totalmoratorios:number, extractmoratorios, siBon:(message,totalmoratorios,extractmoratorios) =>void,noBon:()=>void){
        this.totalmoratorios = totalmoratorios;
        this.setConfirmationBonificacion(message,this.totalmoratorios,extractmoratorios,siBon,noBon);
    }
    setConfirmationBonificacion(message:string,totalmoratorios:number,extractmoratorios,siBon:(message,totalmoratorios,extractmoratorios)=>void,noBon:()=>void){
        let t = this;
        let moratorios =totalmoratorios;
    }
}