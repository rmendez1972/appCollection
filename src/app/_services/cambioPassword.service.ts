import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { User } from '../_models/index';
import { ServiceUrl } from '../serviceUrl';
import 'rxjs/add/operator/map'
//import {Observable} from 'rxjs/Rx';
import { AlertService} from '../_services/index';

@Injectable()
export class CambioPasswordService {
    private cambiaPasswordUrl: string;

    constructor(private http: Http, private url:ServiceUrl) { this.cambiaPasswordUrl=String(this.url.getUrlCambiaPassword()); }

    cambioPassword(id_solicitante:string, new_password:string): Observable<boolean[]> {
    //alert (id_solicitante+" "+password+" "+new_password);
 		return this.http.get(this.cambiaPasswordUrl+id_solicitante+"&new_password="+new_password)
        .map(this.extractData)
        .catch(this.handleError);

	  }

    private extractData(res: Response) {

    let body = res.json();
    console.log (body);

    return body.respuesta || { };

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