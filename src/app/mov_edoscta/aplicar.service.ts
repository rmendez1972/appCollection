import { Injectable } from '@angular/core';

import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';
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
  private beneficiario:any[];

  private UrlAplicarVencidos: String;

  constructor (private http: Http,
      private url:ServiceUrl,
      private alertService: AlertService
      ){

    this.UrlAplicarVencidos = String(this.url.getUrlAplicarVencidos())

  }

  //getMov_edoscta
  getLetras(totalvencidos:number): Aplicar[]{
    this.totalvencidos = totalvencidos;
    return this.extractDataAplicar();
  }



  getPagar(fecha:string):Observable<Aplicar[]>{
    //console.log("get pagar dentro de aplicar service");
    this.fecha = new Date(fecha).toISOString().substring(0, 10);
    return this.dataPagar(this.fecha);

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

  private dataPagar(fecha:string): Observable<Aplicar[]> {
    this.pagar=[];
    this.currentUser=[];
    this.beneficiario=[];
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
    let fecha_corte: string=fecha;//controler

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
    this.beneficiario =JSON.parse(localStorage.getItem('beneficiario'));


    for (var i = 0; i < 1 ; i++) {
      id_caja = this.currentUser[i].id_caja;
      recibo = this.currentUser[i].folio_final;//Incrementar folio por cada insercion
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

    for (var y = 0; y < 1; ++y) {
      clave_b = this.beneficiario[y].clave_b;
      id_benef = this.beneficiario[y].id_beneficiario;
      id_catprog = this.beneficiario[y].id_catprog;
      numcontrato = this.beneficiario[y].numcontrato;

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

    let beneficiarioFinal ={
      clave_b:clave_b,
      id_benef:id_benef,
      id_catprog:id_catprog,
      numcontrato:id_catprog,
    }


    //Return que solo inserta el primer registro

    return this.postPagarVencidos(beneficiarioFinal.id_benef, aplicarFinal.capital,aplicarFinal.interes,
      aplicarFinal.admon,aplicarFinal.seguro, aplicarFinal.clave_mov, usuarioFinal.poliza,
      fecha_corte,usuarioFinal.recibo, aplicarFinal.o_seguro, aplicarFinal.moratorios,usuarioFinal.fecha_pol,
      usuarioFinal.id_usuario,aplicarFinal.comisiones,usuarioFinal.serie, beneficiarioFinal.clave_b,
      aplicarFinal.tit,beneficiarioFinal.id_catprog, beneficiarioFinal.numcontrato, usuarioFinal.id_caja);



  }

postPagarVencidos(
  id_benef:number,
  capital:number,
  interes:number,
  admon:number,
  seguro:number,
  clave_mov:number,
  poliza:String,
  fecha_corte:string,
  recibo:number,
  o_seguro:number,
  moratorios:number,
  fecha_pol:String,
  id_usuario:number,
  comisiones:number,
  serie:String,
  clave_b:String,
  tit:number,
  id_catprog:number,
  numcontrato:number,
  id_caja:number,
  ): Observable<Aplicar[]> {
  //console.log('valor de clave_mov'+clave_mov);
    let param_pagar_vencidos={
      id_benef:id_benef.toString().trim(),
      capital:capital.toString().trim(),
      interes:interes.toString().trim(),
      admon:admon.toString().trim(),
      seguro:seguro.toString().trim(),
      clave_mov:clave_mov.toString().trim(),
      poliza:poliza,
      fecha_corte:fecha_corte,
      recibo:recibo.toString().trim(),
      o_seguro:o_seguro.toString().trim(),
      moratorios:moratorios.toString().trim(),
      fecha_pol:fecha_pol,
      id_usuario:id_usuario.toString().trim(),
      comisiones:comisiones.toString().trim(),
      serie:serie,
      clave_b:clave_b,
      tit:tit.toString().trim(),
      id_catprog:id_catprog.toString().trim(),
      numcontrato:numcontrato.toString().trim(),
      id_caja:id_caja.toString().trim(),

    };
    return this.http.get(this.UrlAplicarVencidos + param_pagar_vencidos.id_benef+"&capital="+param_pagar_vencidos.capital

      +"&interes="+ param_pagar_vencidos.interes+"&admon="+param_pagar_vencidos.admon+"&seguro="+param_pagar_vencidos.seguro+
      "&clave_mov="+ param_pagar_vencidos.clave_mov+"&poliza="+param_pagar_vencidos.poliza+
      "&fecha_corte="+param_pagar_vencidos.fecha_corte+"&recibo="+param_pagar_vencidos.recibo+
      "&o_seguro="+param_pagar_vencidos.o_seguro+"&moratorios="+param_pagar_vencidos.moratorios+
      "&fecha_pol="+param_pagar_vencidos.fecha_pol+"&id_usuario="+param_pagar_vencidos.id_usuario+
      "&comisiones="+param_pagar_vencidos.comisiones+"&serie="+param_pagar_vencidos.serie+
      "&clave_b="+param_pagar_vencidos.clave_b+"&tit="+param_pagar_vencidos.tit+"&id_catprog="+param_pagar_vencidos.id_catprog+
      "&numcontrato="+param_pagar_vencidos.numcontrato+"&id_caja="+param_pagar_vencidos.id_caja).map(this.extractDataPagarVencidos)
    .catch(this.handleError);
  }


  private extractDataPagarVencidos(res: Response) {

    let body = res.json();
    console.log(body.resultado);

    let recibo = body.resultado[1];
    let id_mov_edoscta;
    for (var i = 0; i < 1; ++i) {
      id_mov_edoscta = body.resultado[0];
      recibo= body.resultado[1];
    }
    let pagados ={

      recibo:recibo,
      id_mov_edoscta:id_mov_edoscta,
    }
    let current = JSON.parse(localStorage.getItem('currentUser'));
    for (var x = 0; x < 1; ++x) {

      current[x].recibo= pagados.recibo;
      current[x].id_mov_edoscta = pagados.id_mov_edoscta;
    }

    localStorage.setItem('currentUser',JSON.stringify(current));
    return body.resultado|| { };

  }
  private extractDataPagar (res: Response) {
    let body = res.json();
    console.log(body.caja);
    return body.caja || { };

  }
}