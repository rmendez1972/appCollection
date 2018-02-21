import { Injectable } from '@angular/core';

import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import {Observable} from 'rxjs/Rx';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';
//import  {Vencidos} from './vencidos';
import {Aplicar} from './aplicar';


@Injectable()
export class AplicarService {
  private totalvencidos: number;
  private vencidos: any = [];
  private aplicar:any =[];
  private fecha:string;
  constructor (private http: Http,
      private url:ServiceUrl,
      private alertService: AlertService){

  }

	//getMov_edoscta

  getLetras(totalvencidos:number): Aplicar[]{
<<<<<<< HEAD
    //console.log("Get");
    localStorage.removeItem('aplicar');
=======
>>>>>>> 894223dc604472206acf67f3fcfded73f25a524b
    this.totalvencidos = totalvencidos;
    return this.extractDataAplicar();
  }

  private extractDataAplicar() {
    this.aplicar=[];
    let fecha:string=null;
    let letra:string= null;
    let capital = 0;
    let interes = 0;
    let admon = 0;
    let com = 0;
    let mor = 0;
    let seguro= 0;
    let oseg= 0;
    let tit = 0;
    let tot=0;

    this.vencidos = JSON.parse(localStorage.getItem('vencidos'));
    for (var i = 0; i < this.totalvencidos; i++) {
      this.aplicar[i]= this.vencidos[i];
    }
    let total = this.totalvencidos;
    //let total = this.aplicar.lenght;
    for (var x = 0; x < total ; x++) {
      capital = capital+parseFloat(this.aplicar[x].capital);
      interes = interes+parseFloat(this.aplicar[x].interes);
      seguro = seguro+ parseFloat(this.aplicar[x].seguro)
      admon = admon+ parseFloat(this.aplicar[x].admon)
      oseg =oseg+ parseFloat(this.aplicar[x].oseg)
      com =com + parseFloat(this.aplicar[x].com)
      tit = tit+ parseFloat(this.aplicar[x].tit)
      mor = mor + parseFloat(this.aplicar[x].mor);
      tot = tot + parseFloat(this.aplicar[x].total);

    }
<<<<<<< HEAD
    console.log("Extraer:")
    console.log('dentro de extracDataAplicar '+this.aplicar);
    let tipo= typeof(this.aplicar);
    console.log('tipo de dato dentro de extracDataAplicar ' +tipo) ;
=======
    let totales ={
      fecha:'Totales',
      letra:this.totalvencidos+1,
      capital:capital,
      intereses:interes,
      seguro:seguro,
      admon:admon,
      oseg:oseg,
      com:com,
      tit:tit,
      mor:mor,
      total:tot,

    };
    this.aplicar[x]= totales;
>>>>>>> 894223dc604472206acf67f3fcfded73f25a524b
    localStorage.setItem('aplicar',JSON.stringify(this.aplicar));
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
