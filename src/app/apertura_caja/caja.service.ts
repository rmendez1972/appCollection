import { Injectable } from '@angular/core';


import { Caja } from './caja';
//import { Benef } from './benef';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import {Observable} from 'rxjs/Rx';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';
import { User } from '../_models/index';

@Injectable()
export class CajaService {
  private cajasUrl: string;
  private cajasListUrl: string;
  private currentUser: User;
  private newcurrentUser: User;
  public fecha:string;
  public folio_inicial:number;
  public folio_final:number;
  public poliza:string;
  public monto_inicial:number;
  public id:string;
  public username:string;

  constructor (private http: Http,private url:ServiceUrl,private alertService: AlertService){

    this.cajasUrl=String(this.url.getUrlcajas());
    this.cajasListUrl=String(this.url.getUrlcajaslist());

  }

  //postApertura_caja
  postApertura_caja(fecha:string,folio_inicial:number,folio_final:number,poliza:string,monto_inicial:number): Observable<Caja[]> {
    this.fecha=fecha;
    this.folio_inicial=folio_inicial;
    this.folio_final=folio_final;
    this.poliza=poliza;

    let param_apertura_caja={
      fecha:this.fecha,
      folio_inicial:this.folio_inicial,
      folio_final:this.folio_final,
      poliza:this.poliza,
      monto_inicial:monto_inicial
    };
    localStorage.setItem('paramAperturaCaja',JSON.stringify(param_apertura_caja));
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));
    console.log('currentuser antes de modif. '+this.currentUser);
    return this.http.get(this.cajasUrl+fecha+"&folio_inicial="+folio_inicial+"&folio_final="+folio_final+"&poliza="+poliza+"&monto_inicial="+monto_inicial)
    .map(this.extractDataCaja)
    .catch(this.handleError);
  }


  //getcaja
  getCaja(): Observable<Caja[]> {

     return this.http.get(this.cajasListUrl)
                    .map(this.extractDataCajaList)
                    .catch(this.handleError);

  }

  private extractDataCajaList(res: Response) {

    let body = res.json();
    console.log(body.caja);

    return body.caja|| { };

  }


  private extractDataCaja(res: Response) {
    let body = res.json();
    /*console.log(body.caja);
    let mfecha:string=null;
    let mmov:string="Totales:";
    let mrecibo:string=null;
    let mserie:string=null;
    let mbonific:string=null;
    let totcapital:number=0;
    let totinteres:number=0;
    let totadmon:number=0;
    let totseguro:number=0;
    let totoseg:number=0;
    let totcomision:number=0;
    let tottitulacion:number=0;
    let totmora:number=0;

    for (var i = 0; i <body.mov_edoscta.length; i++) {
      totcapital=totcapital+parseFloat(body.mov_edoscta[i].capital.toString());
      totinteres=totinteres+parseFloat(body.mov_edoscta[i].interes.toString());
      totadmon=totadmon+parseFloat(body.mov_edoscta[i].admon.toString());
      totseguro=totseguro+parseFloat(body.mov_edoscta[i].seguro.toString());
      totcomision=totcomision+parseFloat(body.mov_edoscta[i].comisiones.toString());
      totoseg=totoseg+parseFloat(body.mov_edoscta[i].o_seguro.toString());
      tottitulacion=+tottitulacion+parseFloat(body.mov_edoscta[i].tit.toString());
      totmora=totmora+parseFloat(body.mov_edoscta[i].moratorios.toString());
    }

    let totales_columna={
      fecha_mov:mfecha,
      clave_mov:mmov,
      recibo:mrecibo,
      serie:mserie,
      capital:totcapital,
      interes:totinteres,
      admon:totadmon,
      seguro:totseguro,
      o_seguro:totoseg,
      comisiones:totcomision,
      tit:tottitulacion,
      moratorios:totmora,
      bonific:mbonific
     }

     body.mov_edoscta.push(totales_columna);*/
     console.log('valor de body.cajas '+body.cajas);
     if (body.cajas=true){

       this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        for (var elemento in this.currentUser) {
          this.id=this.currentUser[elemento].id;
          this.username=this.currentUser[elemento].username;
        }
       console.log(typeof(this.currentUser));
       console.log('valor de id '+this.id);
       console.log('valor de username '+this.username);


       console.log('currentuser dentro de if '+JSON.stringify(this.currentUser));


       let paramAperturaCaja= JSON.parse(localStorage.getItem('paramAperturaCaja'));
       console.log('paramAperturaCaja dentro de if '+paramAperturaCaja);

       console.log('fecha dentro de if ' + new Date(paramAperturaCaja.fecha).toISOString().substring(0, 10));
       for (var elemento in this.currentUser){
         this.currentUser[elemento].fecha=new Date(paramAperturaCaja.fecha).toISOString().substring(0, 10);
         this.currentUser[elemento].folio_inicial=paramAperturaCaja.folio_inicial;
         this.currentUser[elemento].folio_final=paramAperturaCaja.folio_final;
         this.currentUser[elemento].poliza=paramAperturaCaja.poliza;
         this.currentUser[elemento].monto_inicial=paramAperturaCaja.monto_inicial;
       }
       localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
       console.log('currentuser despues de modif. '+JSON.stringify(this.currentUser));
     }

    return body.cajas || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }
    else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }


}
