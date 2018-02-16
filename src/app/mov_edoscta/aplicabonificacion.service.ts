import { Injectable } from '@angular/core';

import { Bonific } from './bonific';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import {Observable} from 'rxjs/Rx';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';





@Injectable()
export class AplicaBonificService {

  //private seguimientosUrl: string;
  private aplicabonificacionUrl: string;


  constructor (private http: Http,
      private url:ServiceUrl,
      private alertService: AlertService)
      {
        //this.seguimientosUrl=String(this.url.getUrlmov_edoscta());
        this.aplicabonificacionUrl=String(this.url.getUrlAplicabonificacion());

      }

      //verificar los importes cual es mayor a cero
      //convertir los importes a string


  /*postBonificaciones(id_benef:String, imp_cap:String, imp_int:String, imp_adm:String, imp_seg:String, imp_osg:String,
  imp_com:String, imp_mor:String, imp_tit:String, id_catbonific:String, id_autoriza:String): Observable<Bonific[]> {

     return this.http.get(this.aplicabonificacionUrl+id_movedoscta.toString()+'&id_benef='+id_benef+'&imp_cap='+imp_cap.toString()+'&imp_int='+imp_int+'&imp_adm='+imp_adm+
     '&imp_seg='+imp_seg+'&imp_osg='+imp_osg+'&imp_com='+imp_com+'&imp_mor='+imp_mor+'&imp_tit='+imp_tit+'&id_catbonific='+id_catbonific+
     '&estatus='+estatus+'&id_usuario='+id_usuario+'&clave_b='+clave_b+'&recibo='+recibo+'&serie='+serie+'&numcontrato='+numcontrato+'&id_catprog='+id_catprog+
     '&id_autoriza='+id_autoriza)
                    .map(this.extractDataBon)
                    .catch(this.handleError);

  }*/




  private extractDataBon(res: Response) {

    let body = res.json();

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
    return Observable.throw(errMsg);

  }

}
