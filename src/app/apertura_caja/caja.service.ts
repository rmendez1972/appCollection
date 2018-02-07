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
  private currentUser: string;
  private newcurrentUser: string;
  private fecha:string;
  private folio_inicial:number;
  private folio_final:number;
  private poliza:string;

  constructor (private http: Http,private url:ServiceUrl,private alertService: AlertService){

    this.cajasUrl=String(this.url.getUrlcajas());

  }

  //postApertura_caja
  postApertura_caja(fecha:string,folio_inicial:number,folio_final:number,poliza:string,monto_inicial:number): Observable<Caja[]> {
    this.fecha=fecha;
    this.folio_inicial=folio_inicial;
    this.folio_final=folio_final;
    this.poliza=poliza;
    this.currentUser=localStorage.getItem('currentUser');
    console.log('currentuser antes de modif. '+this.currentUser);
    return this.http.get(this.cajasUrl+fecha+"&folio_inicial="+folio_inicial+"&folio_final="+folio_final+"&poliza="+poliza+"&monto_inicial="+monto_inicial)
    .map(this.extractDataCaja)
    .catch(this.handleError);
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

       this.newcurrentUser=localStorage.getItem('currentUser');
       console.log('newcurrentuser dentro de if '+this.newcurrentUser);
       this.newcurrentUser['fecha']=this.fecha;
       this.newcurrentUser['folio_inical']=this.folio_inicial;
       this.newcurrentUser['folio_final']=this.folio_final;
       this.newcurrentUser['poliza']=this.poliza;
       console.log('newcurrentuser despues de modif. '+this.newcurrentUser);
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
