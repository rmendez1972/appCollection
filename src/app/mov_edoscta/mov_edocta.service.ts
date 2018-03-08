import { Injectable } from '@angular/core';
import { Solicitante } from './solicitante';
import { Solicitud } from './solicitud';
import { Tramite } from './tramite';
import { Seguimiento } from './seguimiento';

import { Mov_edocta } from './mov_edocta';
import { Benef } from './benef';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import {Observable} from 'rxjs/Rx';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';

@Injectable()
export class Mov_edoctaService {
  //private seguimientosUrl: string;
  private mov_edosctaUrl: string;
  private updateMovedoctaUrl: string;
  private beneficiarioUrl: string;
  constructor (private http: Http,private url:ServiceUrl,private alertService: AlertService){
    //this.seguimientosUrl=String(this.url.getUrlmov_edoscta());
    this.mov_edosctaUrl=String(this.url.getUrlmov_edoscta());
    this.beneficiarioUrl=String(this.url.getUrlBeneficiario());
    this.updateMovedoctaUrl=String(this.url.getUrlUpdateMovedocta());
  }

  //getMov_edoscta
  getMov_edoscta(criterio:String,valorcriterio:String): Observable<Mov_edocta[]> {
    return this.http.get(this.mov_edosctaUrl+criterio+"&valorcriterio="+valorcriterio).map(this.extractDataMov).catch(this.handleError);
  }
  //getBenef
  getBenef(criterio:String,valorcriterio:String): Observable<Benef[]> {
    return this.http.get(this.beneficiarioUrl+criterio+"&valorcriterio="+valorcriterio).map(this.extractDataBenef).catch(this.handleError);
  }

  private extractDataMov(res: Response) {
    let body = res.json();
    console.log(body.mov_edoscta);
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

     body.mov_edoscta.push(totales_columna);
     //localStorage.setItem('UserMov',JSON.stringify(body.mov_edoscta));
    return body.mov_edoscta || { };
  }

  private extractDataBenef(res: Response) {
    let body = res.json();
    localStorage.setItem('beneficiario',JSON.stringify(body.beneficiario));
    console.log(body.beneficiario);
    return body.beneficiario || { };
   
  }

  postUpdateMovedocta(id_movedocta:number, id_bonificacion:number){
    
    console.log("valor id_movedocta: "+id_movedocta);
    console.log("valor id_bonificacion: "+id_bonificacion);

    console.log(this.updateMovedoctaUrl+id_movedocta+"&id_bonificacion="+id_bonificacion);

    return this.http.get(this.updateMovedoctaUrl+id_movedocta+"&id_bonificacion="+id_bonificacion).map(this.extractDataUpdateMov).catch(this.handleError);


  }

  private extractDataUpdateMov(res: Response) {
    let body = res.json();
    console.log("regreso del json del update movedocta :"+body.aplicaMovedoctaBonific);
    return body.aplicaMovedoctaBonific || { };
   
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
