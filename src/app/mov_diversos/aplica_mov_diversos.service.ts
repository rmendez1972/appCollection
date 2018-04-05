import { Injectable } from '@angular/core';
import { Aplica_Mov_diversos } from './aplica_mov_diversos';
import { Benef_div } from './benef_div';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';

@Injectable()
export class Aplica_Mov_diversosService {

 private aplica_mov_diversosUrl: string;
 private beneficiarioDivUrl: string;


  constructor (private http: Http,
      private url:ServiceUrl,
      private alertService: AlertService)
      {
        
        this.aplica_mov_diversosUrl=String(this.url.getUrlmov_diversos());
        this.beneficiarioDivUrl=String(this.url.getUrlBeneficiario_div());

      }

}
