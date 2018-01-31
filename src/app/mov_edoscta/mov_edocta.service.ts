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
  private beneficiarioUrl: string;
  constructor (private http: Http,private url:ServiceUrl,private alertService: AlertService){
    //this.seguimientosUrl=String(this.url.getUrlmov_edoscta());
    this.mov_edosctaUrl=String(this.url.getUrlmov_edoscta());
    this.beneficiarioUrl=String(this.url.getUrlBeneficiario());
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
    return body.mov_edoscta || { };
  }

  private extractDataBenef(res: Response) {
    let body = res.json();
    return body.beneficiario || { };
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
