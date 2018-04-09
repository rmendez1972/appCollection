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

@Injectable()
export class Aplica_Mov_diversosService {

 private aplica_mov_diversosUrl: string;
 private beneficiarioDivUrl: string;
 private clavediversosUrl: string;
 private programasUrl: string;

 private tipoBonificacionUrl: string;
 private autorizaUrl: string;


  constructor (private http: Http,
      private url:ServiceUrl,
      private alertService: AlertService)
      {
        
        this.aplica_mov_diversosUrl=String(this.url.getUrlmov_diversos());
        this.beneficiarioDivUrl=String(this.url.getUrlBeneficiario_div());
        this.clavediversosUrl=String(this.url.getUrlclavediv());
        this.programasUrl=String(this.url.getUrlprogramas());
        this.tipoBonificacionUrl=String(this.url.getUrlbonificaciones());
        this.autorizaUrl = String(this.url.getUrlAutoriza());

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

   return body.mov_diversos || { };

 }

 private extractDataBenef_div(res: Response) {

   let body = res.json();
   console.log(body.beneficiario_div);

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
