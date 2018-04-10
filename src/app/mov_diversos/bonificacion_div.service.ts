import { Injectable } from '@angular/core';

import { Bonific_div } from './bonific_div';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import {Observable} from 'rxjs/Rx';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';


@Injectable()
export class BonificDivService {

  //private seguimientosUrl: string;
  private bonificacionUrl: string;


  constructor (private http: Http,
      private url:ServiceUrl,
      private alertService: AlertService)
      {
        //this.seguimientosUrl=String(this.url.getUrlmov_edoscta());
        this.bonificacionUrl=String(this.url.getUrlbonificacion_div());

      }

	//getMov_edoscta
  getBonificaciones(criterio:String, valorcriterio:String): Observable<Bonific_div[]> {

     return this.http.get(this.bonificacionUrl+criterio+'&valorcriterio='+valorcriterio)
                    .map(this.extractDataBon)
                    .catch(this.handleError);

  }


  private extractDataBon(res: Response) {


    let body = res.json();
    console.log(body.bonificacion);
    let mestatus:string=null;
    let mclave_b:string='Totales:';
    let mrecibo:string=null;
    let mserie:string=null;
    let mautoriza:string=null;
    let totcapital:number=0;
    let totinteres:number=0;
    let totadmon:number=0;
    let totseguro:number=0;
    let totoseg:number=0;

        
    for (var i = 0; i <body.bonificacion.length; i++) {
      totcapital=totcapital+parseFloat(body.bonificacion[i].imp_cap.toString());
      totinteres=totinteres+parseFloat(body.bonificacion[i].imp_int.toString());
      totadmon=totadmon+parseFloat(body.bonificacion[i].imp_adm.toString());
      totseguro=totseguro+parseFloat(body.bonificacion[i].imp_seg.toString());
      totoseg=totoseg+parseFloat(body.bonificacion[i].imp_osg.toString());

    }

    let totales_columna={
      estatus:mestatus,
      clavebonific:mclave_b,
      recibo:mrecibo,
      serie:mserie,
      nombreautoriza:mautoriza,
      imp_cap:totcapital,
      imp_int:totinteres,
      imp_adm:totadmon,
      imp_seg:totseguro,
      imp_osg:totoseg

     }

     body.bonificacion.push(totales_columna);
     //localStorage.setItem('UserMov',JSON.stringify(body.mov_edoscta));
    return body.bonificacion || { };
  }


/*

    let body = res.json();
    console.log(body.bonificacion);

    return body.bonificacion || { };

  }*/

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