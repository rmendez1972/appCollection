import { Injectable } from '@angular/core';
import { Cpp } from './cpp';
import { Salmin } from './salmin';
import { Salmindf } from './salmindf';
import { Clavemov } from './clavemov';
import { Clavediv } from './clavediv';
import { Bonificaciones } from './bonificaciones';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import {Observable} from 'rxjs/Rx';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';

@Injectable()
export class CatalogosService {

  //private seguimientosUrl: string;
  private cppUrl: string;
  private salminUrl: string;
  private salmindfUrl: string;
  private clavemovUrl: string;
  private clavedivUrl: string;
  private bonificacionesUrl: string;

  constructor (private http: Http,
      private url:ServiceUrl,
      private alertService: AlertService)
      {
        
        this.cppUrl=String(this.url.getUrlcpp());
        this.salminUrl=String(this.url.getUrlsalmin());
        this.salmindfUrl=String(this.url.getUrlsalmindf());
        this.clavemovUrl=String(this.url.getUrlclavemov());
        this.clavedivUrl=String(this.url.getUrlclavediv());
        this.bonificacionesUrl=String(this.url.getUrlbonificaciones());

      }

	//getcpp
  getCpp(): Observable<Cpp[]> {

     return this.http.get(this.cppUrl)
                    .map(this.extractDataCpp)
                    .catch(this.handleError);

  }

  //getsalmin
  getSalmin(): Observable<Salmin[]> {
    
         return this.http.get(this.salminUrl)
                        .map(this.extractDataSalmin)
                        .catch(this.handleError);
    
  }

  //getsalmin
  getSalmindf(): Observable<Salmindf[]> {
    
         return this.http.get(this.salmindfUrl)
                        .map(this.extractDataSalmindf)
                        .catch(this.handleError);
    
  }

  //getclavemov
  getClavemov(): Observable<Clavemov[]> {
    
         return this.http.get(this.clavemovUrl)
                        .map(this.extractDataClavemov)
                        .catch(this.handleError);
    
  }

  //getclavediv
  getClavediv(): Observable<Clavediv[]> {
    
        return this.http.get(this.clavedivUrl)
                        .map(this.extractDataClavediv)
                        .catch(this.handleError);
    
  }

  //getbonificaciones
  getBonificaciones(): Observable<Bonificaciones[]> {
    
        return this.http.get(this.bonificacionesUrl)
                        .map(this.extractDataBonificaciones)
                        .catch(this.handleError);
    
  }


  private extractDataCpp(res: Response) {

    let body = res.json();
    console.log(body.cpp);

    return body.cpp|| { };

  }

  private extractDataSalmin(res: Response) {
    
        let body = res.json();
        console.log(body.salmin);
    
        return body.salmin|| { };
    
  }

  private extractDataSalmindf(res: Response) {
    
        let body = res.json();
        console.log(body.salmindf);
    
        return body.salmindf|| { };
    
  }

  private extractDataClavemov(res: Response) {
    
        let body = res.json();
        console.log(body.clavemov);
    
        return body.clavemov|| { };
    
  }

  private extractDataClavediv(res: Response) {
    
        let body = res.json();
        console.log(body.clavediv);
    
        return body.clavediv|| { };
    
  }

  private extractDataBonificaciones(res: Response) {
    
        let body = res.json();
        console.log(body.bonificaciones);
    
        return body.bonificaciones|| { };
    
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
