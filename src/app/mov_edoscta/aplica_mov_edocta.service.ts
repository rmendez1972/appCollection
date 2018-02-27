import { Injectable } from '@angular/core';
import { Aplica_Mov_edocta } from './aplica_mov_edocta';
import { Benef } from './../mov_edoscta/benef';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';
import { TipoBonificacion } from './tipoBonificacion';

@Injectable()
export class Aplica_Mov_edoctaService {

  private aplica_mov_edosctaUrl: string;
  private beneficiarioUrl: string;
  private tipoBonificacionUrl: string;

  constructor (private http: Http,private url:ServiceUrl,private alertService: AlertService){
    this.aplica_mov_edosctaUrl=String(this.url.getUrlmov_edoscta());
    this.beneficiarioUrl=String(this.url.getUrlBeneficiario());
    this.tipoBonificacionUrl=String(this.url.getUrlbonificaciones());
  }

  //getMov_edoscta
  getMov_edoscta(criterio:String,valorcriterio:String): Observable<Aplica_Mov_edocta[]> {
    return this.http.get(this.aplica_mov_edosctaUrl+criterio+"&valorcriterio="+valorcriterio).map(this.extractDataMov).catch(this.handleError);
  }
  //getBenef
  getBenef(criterio:String,valorcriterio:String): Observable<Benef[]> {
    return this.http.get(this.beneficiarioUrl+criterio+"&valorcriterio="+valorcriterio).map(this.extractDataBenef).catch(this.handleError);
  }

  getTipoBonificacion(): Observable<TipoBonificacion[]> {
     return this.http.get(this.tipoBonificacionUrl)
                    .map(this.extractDataTipoBonificacion)
                    .catch(this.handleError);
  }

  private extractDataMov(res: Response) {
    let body = res.json();
    console.log(body.mov_edoscta);
    let mfecha:string=null;
    let mmov:string="Totales:";
    let mrecibo:string=null;
    let mserie:string=null;
    let mbonific:string=null;
    let totcapital:number=0;
    let totinteres:number=0;
    let totadmon:number=0;
    let totseguro:number=0;
    let totoseg:number=0;
    let totcomision:number=0;
    let tottitulacion:number=0;
    let totmora:number=0;

    for (var i = 0; i <body.mov_edoscta.length; i++) {
      totcapital=totcapital+parseFloat(body.mov_edoscta[i].capital.toString());
      totinteres=totinteres+parseFloat(body.mov_edoscta[i].interes.toString());
      totadmon=totadmon+parseFloat(body.mov_edoscta[i].admon.toString());
      totseguro=totseguro+parseFloat(body.mov_edoscta[i].seguro.toString());
      totcomision=totcomision+parseFloat(body.mov_edoscta[i].comisiones.toString());
      totoseg=totoseg+parseFloat(body.mov_edoscta[i].o_seguro.toString());
      tottitulacion=+tottitulacion+parseFloat(body.mov_edoscta[i].tit.toString());
      totmora=totmora+parseFloat(body.mov_edoscta[i].moratorios.toString());
    }

    let totales_columna={
      fecha_mov:mfecha,
      clave_mov:mmov,
      recibo:mrecibo,
      serie:mserie,
      capital:totcapital,
      interes:totinteres,
      admon:totadmon,
      seguro:totseguro,
      o_seguro:totoseg,
      comisiones:totcomision,
      tit:tottitulacion,
      moratorios:totmora,
      bonific:mbonific
     }

     body.mov_edoscta.push(totales_columna);

    return body.mov_edoscta || { };
  }

  private extractDataBenef(res: Response) {
    let body = res.json();
    return body.beneficiario || { };
  }

  private extractDataTipoBonificacion(res: Response) {
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
    }
    else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}