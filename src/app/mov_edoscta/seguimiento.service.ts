import { Injectable } from '@angular/core';
import { Solicitante } from './solicitante';
import { Solicitud } from './solicitud';
import { Tramite } from './tramite';
import { Seguimiento } from './seguimiento';

import { Mov_edocta } from './mov_edocta';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import {Observable} from 'rxjs/Rx';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';





@Injectable()
export class SeguimientoService {

  private seguimientosUrl: string;
  private mov_edosctaUrl: string;


  constructor (private http: Http,
      private url:ServiceUrl,
      private alertService: AlertService)
      {
        this.seguimientosUrl=String(this.url.getUrlmov_edoscta());
        this.mov_edosctaUrl=String(this.url.getUrlmov_edoscta());

      }

	  //getSolicitantes
  getMov_edoscta(): Observable<Mov_edocta[]> {

     return this.http.get(this.mov_edosctaUrl)
                    .map(this.extractDataMov)
                    .catch(this.handleError);

  }

  //getSolicitantes
  getSolicitantes(idSolicitud: number,idSolicitante:number): Observable<Solicitante[]> {

 		return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
                    .map(this.extractData)
                    .catch(this.handleError);

	}

  //getSolicitudes
  getSolicitudes(idSolicitud: number,idSolicitante:number): Observable<Solicitud[]> {

     return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
                    .map(this.extractDataSolic)
                    .catch(this.handleError);
  }


  //getTramites
  getTramites(idSolicitud: number,idSolicitante:number): Observable<Tramite[]> {

     return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
                    .map(this.extractDataTram)
                    .catch(this.handleError);
  }


  //getSeguimientos
  getSeguimientos(idSolicitud: number,idSolicitante:number): Observable<Seguimiento[]> {

     return this.http.get(this.seguimientosUrl+idSolicitud+"&id_solicitante="+idSolicitante)
                    .map(this.extractDataSeg)
                    .catch(this.handleErrorSeguimientos);
  }

  addSolicitante (name: string): Observable<Solicitante> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.seguimientosUrl, { name }, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {

    let body = res.json();

    return body.data || { };

  }

  private extractDataMov(res: Response) {

    let body = res.json();
    console.log(body.mov_edoscta);

    return body.mov_edoscta || { };

  }


  private extractDataSolic(res: Response) {
    //alert('res en datasolic '+res);

    let body = res.json();

    return body.solicitud || { };

  }


  private extractDataTram(res: Response) {


   let body = res.json();
   console.log(body.tramite);

    return body.tramite || { };
  }

  private extractDataSeg(res: Response) {
    //alert('res en datasolic '+res);
    let body = res.json();


    return body.seguimientos || { };
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


private handleErrorSeguimientos (error: Response | any) {
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

  //getHero
  getSolicitante(id: number, idSolicitud: number): Observable<Solicitante> {
    return this.getSolicitantes(idSolicitud,id)
               .map(solicitantes => solicitantes.find(solicitante => solicitante.id_solicitante === id));
  }


}