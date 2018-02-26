import { Injectable,  OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { AplicarService} from '../mov_edoscta/aplicar.service';

@Injectable() export class ConfirmService {
	private subject = new Subject<any>();
	private miservice:AplicarService;
	private fecha:string;


    constructor(){

    }

    ngOnInit() {

	}

    confirm(message: string='',fecha:string,miservice:AplicarService,siFn:(message,fecha,aplicarservice)=>void,noFn:()=>void){
    	console.log('mensaje recibido dentro de confirm '+message);
    	console.log('funcion si recibido dentro de confirm '+siFn);
    	this.fecha=fecha;
    	console.log('fecha dentro de confirm '+this.fecha);
    	//console.log('valor de fecha '+fecha);
    	console.log('voy a pasar desde confirm miservice '+typeof (miservice));
        this.setConfirmation(message,this.fecha,miservice,siFn,noFn);
    }


	setConfirmation(message: string, fecha:string, miservice: AplicarService, siFn:(message,fecha,aplicarservice)=>void,noFn:()=>void) {
    	let that = this;
    	console.log('tipo de service 1 dentro de setConfirmation '+ typeof (miservice));
    	console.log('fecha dentro de setConfirmation '+fecha);
    	let mifecha=fecha;
    	let mimessage=message;
    	//console.log('valor de mifecha dentro de setConfirmation '+ mifecha);

    	this.subject.next({ type: "confirm",
                        text: message,
                        siFn:
                        function(message,fecha,aplicarservice){
                            that.subject.next(); //this will close the modal

                            //let aplicarservice=function() { return 'hola' };
                            console.log('la fecha a pasar como parametro '+mifecha);
                            console.log('tipo de service 2 dentro de setConfirmation '+ typeof (miservice));
                            siFn(mimessage ,mifecha, miservice);
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