import { Injectable } from '@angular/core';


import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import {Observable} from 'rxjs/Rx';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';



@Injectable()
export class BonificServiceDiversos {
	private aplicabonificacionUrl: string;

	constructor (private http: Http,
      private url:ServiceUrl,
      private alertService: AlertService)
      {

        this.aplicabonificacionUrl=String(this.url.getUrlAplicabonificacion());

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
    return Observable.throw(errMsg);

  }

}
