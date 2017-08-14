import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { User } from '../_models/index';
import { ServiceUrl } from '../serviceUrl';
import 'rxjs/add/operator/map'
import { AlertService} from '../_services/index';

@Injectable()
export class UploadService {
    private uploadUrlFileName: string;

    constructor(private http: Http, private url:ServiceUrl) { this.uploadUrlFileName=String(this.url.getUrlfilename()); }

    filename(archivo:string, id_seguimiento: number): Observable<boolean[]> {
        console.log("Imprimiendo nombre archivo y id seguimeinto: "+archivo+" "+id_seguimiento)
        return this.http.get(this.uploadUrlFileName+id_seguimiento+"&filename="+archivo) 
        .map(this.extractData)
        .catch(this.handleError);
                                       
	  }

    private extractData(res: Response) {

    let body = res.json();
       
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