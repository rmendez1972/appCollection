import { Injectable } from '@angular/core';

import { Bonific } from './bonific';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import {Observable} from 'rxjs/Rx';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';





@Injectable()
export class BonificService {

  //private seguimientosUrl: string;
  private bonificacionUrl: string;


  constructor (private http: Http,
      private url:ServiceUrl,
      private alertService: AlertService)
      {
        //this.seguimientosUrl=String(this.url.getUrlmov_edoscta());
        this.bonificacionUrl=String(this.url.getUrlbonificacion());

      }

	//getMov_edoscta
  getBonificaciones(id_benef:number): Observable<Bonific[]> {

     return this.http.get(this.bonificacionUrl+id_benef)
                    .map(this.extractDataBon)
                    .catch(this.handleError);

  }




  private extractDataBon(res: Response) {

    let body = res.json();
    console.log(body.bonificacion);

    return body.bonificacion || { };

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
