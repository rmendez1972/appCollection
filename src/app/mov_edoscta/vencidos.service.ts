import { Injectable } from '@angular/core';

import { Vencidos } from './vencidos';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import {Observable} from 'rxjs/Rx';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';


@Injectable()
export class VencidosService {


  private vencidosUrl: string;


  constructor (private http: Http,
      private url:ServiceUrl,
      private alertService: AlertService)
      {
        //this.seguimientosUrl=String(this.url.getUrlmov_edoscta());
        this.vencidosUrl=String(this.url.getUrlVencidos());

      }

	//getMov_edoscta
  getVencidos(clave_b:String, fecha_corte:String): Observable<Vencidos[]> {
    console.log(this.vencidosUrl+clave_b+'&fecha_corte='+fecha_corte)
     return this.http.get(this.vencidosUrl+clave_b+'&fecha_corte='+fecha_corte)
                    .map(this.extractDataVencidos)
                    .catch(this.handleError);


  }

  private extractDataVencidos(res: Response) {
    let body = res.json();
    console.log(body.vencidos);

    return body.vencidos || { };

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

}
