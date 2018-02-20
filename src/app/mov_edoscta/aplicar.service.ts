import { Injectable } from '@angular/core';

import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import {Observable} from 'rxjs/Rx';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';
//import  {Vencidos} from './vencidos';
//import {Aplicar} from './aplicar';


@Injectable()
export class AplicarService {
  private totalvencidos: number;
  private vencidos: any = [];
  private aplicar: any = [];
  private fecha:string;
  constructor (private http: Http,
      private url:ServiceUrl,
      private alertService: AlertService){

  }

	//getMov_edoscta

  getLetras(totalvencidos:number){
    console.log("Get");
    this.totalvencidos = totalvencidos;
    return this.extractDataAplicar();
  }

  private extractDataAplicar() {
    this.vencidos = JSON.parse(localStorage.getItem('vencidos'));
    for (var i = 0; i < this.totalvencidos; i++) {
      this.aplicar[i]=this.vencidos[i];
    }
    console.log(this.aplicar);
    return this.aplicar || { };
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
