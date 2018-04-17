import { Injectable } from '@angular/core';
import { Aplica_Mov_diversos } from './aplica_mov_diversos';
import { Benef_div } from './benef_div';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';
import { Mov_diversos } from './mov_diversos';

import {Clave_Diversos} from './clave_div';
import {Programas} from './cat_prog';

import { TipoBonificacion } from './tipoBonificacion';
import { Autoriza } from './autoriza';

import {BonificacionDivComponent} from './bonificacion_div.component';

@Injectable()
export class Aplica_Mov_diversosService {

 private aplica_mov_diversosUrl: string;
 private beneficiarioDivUrl: string;
 private clavediversosUrl: string;
 private programasUrl: string;

 private tipoBonificacionUrl: string;
 private autorizaUrl: string;


 private aplicabonificacionUrl: string;


 private UrlPagarDiversos: String;

 private currentUser:any[];
 private beneficiarioDiverso:any[];


  constructor (private http: Http,
      private url:ServiceUrl,
      private alertService: AlertService,
      //private bonificaciondiversos:BonificacionDivComponent
      )
      {
        
        this.aplica_mov_diversosUrl=String(this.url.getUrlmov_diversos());
        this.beneficiarioDivUrl=String(this.url.getUrlBeneficiario_div());
        this.clavediversosUrl=String(this.url.getUrlclavediv());
        this.programasUrl=String(this.url.getUrlprogramas());
        this.tipoBonificacionUrl=String(this.url.getUrlbonificaciones());
        this.autorizaUrl = String(this.url.getUrlAutoriza());
        this.aplicabonificacionUrl=String(this.url.getUrlAplicabonificacion());
        this.UrlPagarDiversos= String(this.url.getUrlGuardarDiversos())

      }

	//getMov_diversos
  getMov_diversos(criterio:String,valorcriterio:String): Observable<Mov_diversos[]> {

    return this.http.get(this.aplica_mov_diversosUrl+criterio+"&valorcriterio="+valorcriterio)
                   .map(this.extractDataMov_div)
                   .catch(this.handleError);

 }

 //getBenef_div
 getBenef_div(criterio:String,valorcriterio:String): Observable<Benef_div[]> {

    return this.http.get(this.beneficiarioDivUrl+criterio+"&valorcriterio="+valorcriterio)
                   .map(this.extractDataBenef_div)
                   .catch(this.handleError);

 }

 getClaveDiversos(): Observable<Clave_Diversos[]> {
     return this.http.get(this.clavediversosUrl)
                    .map(this.extractDataClaveDiversos)
                    .catch(this.handleError);
  }


  getProgramas(): Observable<Programas[]> {
     return this.http.get(this.programasUrl)
                    .map(this.extractDataProgramas)
                    .catch(this.handleError);
  }

  getTipoBonificacion(): Observable<TipoBonificacion[]> {
     return this.http.get(this.tipoBonificacionUrl)
                    .map(this.extractDataTipoBonificacion)
                    .catch(this.handleError);
  }

  //get quien autoriza las bonificaciones
  getAutoriza(): Observable <Autoriza[]>{
    return this.http.get(this.autorizaUrl).map(this.extractDataAutoriza).catch(this.handleError);

  }


 private extractDataMov_div(res: Response) {

   let body = res.json();
   console.log(body.mov_diversos);

   let mfecha_div:string=null;
   let mmov:string=null;
   let mdescripcion:string=null;
   let mrecibo:string=null;
   let mserie:string="Totales";
   let totcargo:number=0;
   let totabono:number=0;
   let totmoratorios:number=0;
   let maprobado:string=null;

   for (var i = 0; i < body.mov_diversos.length; i++){
     totcargo = totcargo+parseFloat(body.mov_diversos[i].cargo.toString());
     totabono = totabono+parseFloat(body.mov_diversos[i].abono.toString());
     totmoratorios = totmoratorios+parseFloat(body.mov_diversos[i].moratorios.toString());
   }

   let totales_columna={
    fecha_div:mfecha_div,
    clave_div:mmov,
    descripcion:mdescripcion,
    recibo:mrecibo,
    serie:mserie,
    cargo:totcargo,
    abono:totabono,
    moratorios:totmoratorios,
    aplicado:maprobado
   }

    body.mov_diversos.push(totales_columna);
   return body.mov_diversos || { };

 }

 private extractDataBenef_div(res: Response) {

   let body = res.json();
   console.log(body.beneficiario_div);
   localStorage.setItem('beneficiario_div',JSON.stringify(body.beneficiario_div));
   return body.beneficiario_div || { };

 }

 private extractDataClaveDiversos(res: Response) {
    let body = res.json();
    console.log(body.clavediv);
    return body.clavediv|| { };
  }

  private extractDataProgramas(res: Response) {
    let body = res.json();
    console.log(body.programas);
    return body.programas|| { };
  }

  private extractDataTipoBonificacion(res: Response) {
    let body = res.json();
    console.log(body.bonificaciones);
    return body.bonificaciones|| { };
  }
  private extractDataAutoriza(res: Response){
    let body = res.json();
    console.log(body.autoriza);
    return body.autoriza || {};
  }

  getPagar(diversos:string, corriente:number,
      descripcion:string,importe:number,
      intereses:number,otros:number){
    return this.PagarDiversos(diversos, corriente,descripcion,importe,intereses,otros);
  }


  PagarDiversos(diversos:String, corriente:number,descripcion:String,importe:number,
      intereses:number,otros:number){

    this.currentUser=[];
    this.beneficiarioDiverso=[];

    let id_bendiv:String; //beneficiario_div
    let fecha_div:String; //currentUser
    let poliza:String; //currentUser
    let recibo:String; //currentUser
    //otros ; otros importes
    let estatus :String = 'A' ; //fijo
    let id_usuario :String ; //currentUser
    //descripcion; descripcion del cobro
    //let id_catprog : String; // ¿Cuenta Corriente? o ¿Programa?
    let serie :String ; // currentUser: serie
    let clave_b :String ; // beneficiario_div
    let numcontrato : String; //beneficiario_div
    let id_caja : String; // currentUser
    let bonific : number =0; // fijo 0;

    this.currentUser =JSON.parse(localStorage.getItem('currentUser'));
    this.beneficiarioDiverso =JSON.parse(localStorage.getItem('beneficiario_div'));

    for (var i = 0; i < 1 ; i++) {
      fecha_div= this.currentUser[i].fecha;
      poliza = this.currentUser[i].poliza;
      recibo = this.currentUser[i].folio_final;
      id_usuario = this.currentUser[i].id;
      serie= this.currentUser[i].serie;
      id_caja = this.currentUser[i].id_caja;
      
    }

    for (var y = 0; y < 1; ++y) {
      id_bendiv = this.beneficiarioDiverso[y].id_bendiv;
      clave_b = this.beneficiarioDiverso[y].clave_b;
      numcontrato = this.beneficiarioDiverso[y].numcontrato;

    }

    let usuarioFinal = {
      fecha_div : fecha_div,
      poliza : poliza,
      recibo :recibo,
      id_usuario: id_usuario,
      serie :serie, 
      id_caja :id_caja

    };
    let beneficiarioFinal ={
      id_bendiv : id_bendiv,
      clave_b : clave_b,
      numcontrato : numcontrato
    }

    this.dataPagarDiversos(beneficiarioFinal.id_bendiv, diversos,
      usuarioFinal.fecha_div,usuarioFinal.poliza,usuarioFinal.recibo,importe,intereses,otros,
      estatus,usuarioFinal.id_usuario,descripcion,corriente,usuarioFinal.serie,
      beneficiarioFinal.clave_b,beneficiarioFinal.numcontrato,usuarioFinal.id_caja,bonific)
    .subscribe(
      
      );

    return this.PagarDiversos;

  };

  private dataPagarDiversos(id_bendiv:String,clave_div:String,fecha_div:String,
    poliza:String,recibo:String,abono:number,moratorios:number,otros:number,estatus :String,
    id_usuario :String,descripcion :String,corriente:number,serie :String,clave_b :String,
    numcontrato : String,id_caja : String,bonific : number):Observable<Aplica_Mov_diversos[]>{

    let param_pagar_diversos={
      id_bendiv:id_bendiv.toString().trim(),
      clave_div:clave_div,
      fecha_div: fecha_div.toString().trim(),
      poliza: poliza,
      recibo:recibo.toString().trim(),
      abono:abono.toString().trim(),
      moratorios:moratorios.toString().trim(),
      otros:otros,
      estatus:estatus.toString().trim(),
      id_usuario:id_usuario.toString().trim(),
      descripcion:descripcion,
      id_catprog:corriente,
      serie:serie.toString().trim(),
      clave_b:clave_b,
      numcontrato:numcontrato,
      id_caja:id_caja.toString().trim(),
      bonific:bonific.toString().trim(),
    };

    
    return this.http.get(this.UrlPagarDiversos+ param_pagar_diversos.id_bendiv+'&clave_div='
      +param_pagar_diversos.clave_div+'&fecha_div='+param_pagar_diversos.fecha_div+'&poliza='
      +param_pagar_diversos.poliza+'&recibo='+param_pagar_diversos.recibo+'&abono='
      +param_pagar_diversos.abono+'&moratorios='+param_pagar_diversos.moratorios+'&otros='
      +param_pagar_diversos.otros+'&estatus='+param_pagar_diversos.estatus+'&id_usuario='
      +param_pagar_diversos.id_usuario+'&descripcion='+param_pagar_diversos.descripcion
      +'&id_catprog='+param_pagar_diversos.id_catprog+'&serie='+param_pagar_diversos.serie
      +'&clave_b='+param_pagar_diversos.clave_b+'&numcontrato='+param_pagar_diversos.numcontrato
      +'&id_caja='+param_pagar_diversos.id_caja+'&bonific='+param_pagar_diversos.bonific)
    .map(this.extractDataPagarDiversos).catch(this.handleError);

  };


  private extractDataPagarDiversos (res: Response) {
    let body = res.json();
    console.log(body.registroAplicaMovDiversos);
    return body.registroAplicaMovDiversos|| { };

  }

 private handleError (error: Response | any) {

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

}
