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


    constructor(){

    }

    ngOnInit() {

	}

    confirm(message: string='',fecha:string,miservice:AplicarService,miroute:ActivatedRoute,miK:Observable<Aplicar[]>,siFn:(message,fecha,aplicarservice, routeservice,k)=>void,noFn:()=>void){
    	console.log('mensaje recibido dentro de confirm '+message);
    	this.fecha=fecha;
    	console.log('fecha dentro de confirm '+this.fecha);
    	//console.log('valor de fecha '+fecha);
    	console.log('voy a pasar desde confirm miservice '+typeof (miservice));
        this.setConfirmation(message,this.fecha,miservice,miroute,this.mik,siFn,noFn);
    }


	setConfirmation(message: string, fecha:string, miservice: AplicarService, miroute: ActivatedRoute,miK:Observable<Aplicar[]>, siFn:(message,fecha,aplicarservice,routeservice,k)=>void,noFn:()=>void) {
    	let that = this;
    	console.log('tipo de service 1 dentro de setConfirmation '+ typeof (miservice));
    	console.log('fecha dentro de setConfirmation '+fecha);
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
                            console.log('la fecha a pasar como parametro '+mifecha);
                            console.log('tipo de service 2 dentro de setConfirmation '+ typeof (miservice));
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
}