import { Injectable } from '@angular/core';
//import { Solicitante } from './solicitante';
//import { Solicitud } from './solicitud';
//import { Tramite } from './tramite';
//import { Seguimiento } from './seguimiento';
import { Mov_diversos } from './mov_diversos';
import { Benef_div } from './benef_div';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import {Observable} from 'rxjs/Rx';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';

@Injectable()
export class Mov_diversosService {

 private mov_diversosUrl: string;
 private beneficiarioDivUrl: string;


  constructor (private http: Http,
      private url:ServiceUrl,
      private alertService: AlertService)
      {
        
        this.mov_diversosUrl=String(this.url.getUrlmov_diversos());
        this.beneficiarioDivUrl=String(this.url.getUrlBeneficiario_div());

      }

	//getMov_diversos
  getMov_diversos(criterio:String,valorcriterio:String): Observable<Mov_diversos[]> {

     return this.http.get(this.mov_diversosUrl+criterio+"&valorcriterio="+valorcriterio)
                    .map(this.extractDataMov_div)
                    .catch(this.handleError);

  }

  //getBenef_div
  getBenef_div(criterio:String,valorcriterio:String): Observable<Benef_div[]> {

     return this.http.get(this.beneficiarioDivUrl+criterio+"&valorcriterio="+valorcriterio)
                    .map(this.extractDataBenef_div)
                    .catch(this.handleError);

  }

  private extractDataMov_div(res: Response) {

    let body = res.json();
    console.log(body.mov_diversos);

    return body.mov_diversos || { };

  }

  private extractDataBenef_div(res: Response) {

    let body = res.json();
    console.log(body.beneficiario_div);

    return body.beneficiario_div || { };

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
