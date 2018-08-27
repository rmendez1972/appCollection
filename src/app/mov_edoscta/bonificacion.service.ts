import { Injectable } from '@angular/core';
import { Bonific } from './bonific';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';

/**
* class BonificService()
* Esta clase se usa para conectar con el Back End y obtener los datos a usar.
* @author: Marlon Gomez
* @return {export} export class 
*/
@Injectable()
export class BonificService {
  /**
  * Variables locales
  */
  private bonificacionUrl: string;

  constructor (private http: Http, private url:ServiceUrl, private alertService: AlertService){
          this.bonificacionUrl=String(this.url.getUrlbonificacion());
  }

/**
* getBonificaciones()
* Metodo para obtener las bonificaciones del Back End.
* @author: Marlon Gomez
* @param {String} criterio
* @param {String} valorcriterio
* @return {json, error} res, error  
*/
  getBonificaciones(criterio:String, valorcriterio:String): Observable<Bonific[]> {
     return this.http.get(this.bonificacionUrl+criterio+'&valorcriterio='+valorcriterio)
                    .map(this.extractDataBon)
                    .catch(this.handleError);
  }


/**
* extractDataBon()
* Metodo para extraer los datos que regresaron del Back End.
* @author: Marlon Gomez
* @param {Response } res
* @return {let} body.bonificacion
*/
  private extractDataBon(res: Response) {
    let body = res.json();
    console.log(body.bonificacion);
    return body.bonificacion || { };
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
    return Observable.throw(errMsg);

  }

}
