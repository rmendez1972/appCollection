import { Injectable } from '@angular/core';

import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import {Observable} from 'rxjs/Rx';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';
//import  {Vencidos} from './vencidos';
import {Aplicar} from './aplicar';


@Injectable()
export class AplicarService {
  private totalvencidos: number;
  private vencidos: any = [];
  private aplicar:any =[];
  private fecha:string;

  private pagar: any[];
  private currentUser:any[];
  private aplicarPagar:any[];
  private usuario:any[]


  constructor (private http: Http,
      private url:ServiceUrl,
      private alertService: AlertService){

  }

	//getMov_edoscta

  getLetras(totalvencidos:number): Aplicar[]{

    this.totalvencidos = totalvencidos;
    return this.extractDataAplicar();
  }


  getPagar(totalvencidos:number): Aplicar[]{
    this.totalvencidos = totalvencidos;
    return this.extractDataPagar();
  }


  private extractDataAplicar() {
    this.aplicar=[];
    let fecha:string=null;
    let letra:string= null;
    let capital = 0;
    let interes = 0;
    let admon = 0;
    let com = 0;
    let mor = 0;
    let seguro= 0;
    let oseg= 0;
    let tit = 0;
    let tot=0;

    this.vencidos = JSON.parse(localStorage.getItem('vencidos'));
    for (var i = 0; i < this.totalvencidos; i++) {
      this.aplicar[i]= this.vencidos[i];
    }
    let total = this.totalvencidos;
    //let total = this.aplicar.lenght;
    for (var x = 0; x < total ; x++) {
      capital = capital+parseFloat(this.aplicar[x].capital);
      interes = interes+parseFloat(this.aplicar[x].interes);
      seguro = seguro+ parseFloat(this.aplicar[x].seguro)
      admon = admon+ parseFloat(this.aplicar[x].admon)
      oseg =oseg+ parseFloat(this.aplicar[x].oseg)
      com =com + parseFloat(this.aplicar[x].com)
      tit = tit+ parseFloat(this.aplicar[x].tit)
      mor = mor + parseFloat(this.aplicar[x].mor);
      tot = tot + parseFloat(this.aplicar[x].total);

    }

    let totales ={
      fecha:'Totales:',
      letra:null,
      capital:capital,
      interes:interes,
      seguro:seguro,
      admon:admon,
      oseg:oseg,
      com:com,
      tit:tit,
      mor:mor,
      total:tot,

    };
    this.aplicar[x]= totales;

    localStorage.setItem('aplicar',JSON.stringify(this.aplicar));
    return this.aplicar || { };
  }
  private handleError (error: Response | any) {

    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);

  }

  private extractDataPagar() {
    this.pagar=[];
    this.currentUser=[];
    this.aplicarPagar=[];
    this.usuario=[];

    let capital=0;//aplicar
    let interes=0;//aplicar
    let admon=0;//aplicar
    let seguro=0;//aplicar
    let clave_mov=0;//aplicar es la letra
    let comisiones=0;//aplicar
    let o_seguro=0;//aplicar
    let moratorios=0;//aplicar
    let tit: number;//aplicar

    let fecha_corte:String;//controler
    let id_bonific=0;//Controler
    
    
    let clave_b:String;//Benef
    let id_benef=0;//bene
    let id_catprog: number;//Benef
    let numcontrato=0;//Benef


    let id_caja=0;//CurrentUser
    let recibo=0;//CurrentUser folio_final
    let serie:String;//currentUser
    let fecha_pol:String;//CurrentUSer
    let id_usuario=0;//CurrentUser
    let poliza:String;//current


    this.aplicar = JSON.parse(localStorage.getItem('aplicar'));
    this.currentUser =JSON.parse(localStorage.getItem('currentUser'));


    for (var i = 0; i < 1 ; i++) {
      id_caja = this.currentUser[i].id_caja;
      recibo = this.currentUser[i].folio_final;
      serie= this.currentUser[i].serie;
      fecha_pol = this.currentUser[i].fecha;
      id_usuario = this.currentUser[i].id;
      poliza = this.currentUser[i].poliza;
    }

    for (var x = 0; x < 1; ++x) {
      capital = this.aplicar[x].capital;
      interes = this.aplicar[x].interes;
      admon = this.aplicar[x].admon;
      seguro = this.aplicar[x].seguro;
      clave_mov = this.aplicar[x].letra;
      comisiones = this.aplicar[x].com;
      o_seguro = this.aplicar[x].oseg;
      moratorios = this.aplicar[x].mor;
      tit = this.aplicar[x].tit;
    }

    let usuarioFinal ={
      serie:serie,
      id_caja:id_caja,
      recibo:recibo,
      fecha_pol:fecha_pol,
      id_usuario:id_usuario,
      poliza:poliza,

    };

    let aplicarFinal={
      capital:capital,
      interes:interes,
      admon:admon,
      seguro:seguro,
      clave_mov:clave_mov,
      comisiones:comisiones,
      o_seguro: o_seguro,
      moratorios: moratorios,
      tit:tit,
    };

    console.log("Imprimiendo los datos del usuario :");
    console.log(usuarioFinal);

    console.log("Imprimiendo los datos de aplicar:");
    console.log(aplicarFinal);
    this.usuario[i] =usuarioFinal;

    return this.aplicar || {};
  }
}
