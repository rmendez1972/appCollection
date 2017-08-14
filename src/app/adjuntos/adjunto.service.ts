import { Injectable } from '@angular/core';
import { Adjunto } from './adjunto';
import { Solicitante } from '../seguimientos/solicitante';
import { Solicitud } from '../seguimientos/solicitud';
import { Tramite } from '../seguimientos/tramite';
import { Seguimiento } from '../seguimientos/seguimiento';
import { ServiceUrl } from '../serviceUrl';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import {Observable} from 'rxjs/Rx';


@Injectable()
export class AdjuntoService {


   private adjuntosUrl :string;
   private adjuntosdescarga :string;
   private adjuntosupload :string;



   constructor (private http: Http, private url:ServiceUrl) {
     this.adjuntosUrl=String(this.url.getUrladjuntos());
     this.adjuntosdescarga=String(this.url.getUrladjuntosdescarga());
     this.adjuntosupload=String(this.url.getUrladjuntosupload());


   }


  getAdjuntosruta(){return this.adjuntosdescarga}
  getAdjuntosupload(){return this.adjuntosupload}

	//getAdjuntos
  getAdjuntos(id: number): Observable<Adjunto[]> {
    //alert('dentro de getheroes');
 		return this.http.get(this.adjuntosUrl+id)
                    .map(this.extractData)
                    .catch(this.handleError);
	}

  //getSolicitantes
  getSolicitantes(id: number): Observable<Solicitante[]> {
    //alert('dentro de getheroes');
     return this.http.get(this.adjuntosUrl+id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  //getSolicitudes
  getSolicitudes(id: number): Observable<Solicitud[]> {
    //alert('dentro de getsolicitudes');
    console.log("dentro del service");
     return this.http.get(this.adjuntosUrl+id)
                    .map(this.extractDataSolic)
                    .catch(this.handleError);                    
  }


  //getSolicitudes
  getTramites(id: number): Observable<Tramite[]> {
    //alert('dentro de getsolicitudes');
     return this.http.get(this.adjuntosUrl+id)
                    .map(this.extractDataTram)
                    .catch(this.handleError);
  }


  //getSolicitudes
  getSeguimientos(id: number): Observable<Seguimiento[]> {
    //alert('dentro de getsolicitudes');
     return this.http.get(this.adjuntosUrl+id)
                    .map(this.extractDataSeg)
                    .catch(this.handleError);
  }



  private extractData(res: Response) {
    //alert('res '+res);
    let body = res.json();

    return body.data || { };
  }


  private extractDataSolic(res: Response) {
    //alert('res en datasolic '+res);
    let body = res.json();
    //alert('body '+body);

    return body.solicitud || { };
  }


  private extractDataTram(res: Response) {
    //alert('res en datasolic '+res);
    let body = res.json();
    //alert('body '+body);

    return body.tramite || { };
  }


  private extractDataSeg(res: Response) {
    //alert('res en datasolic '+res);
    let body = res.json();
    //alert('body '+body);

    return body.seguimiento || { };
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

  //getAdjunto
  getAdjunto(id: number): Observable<Adjunto> {
    return this.getAdjuntos(id)
               .map(adjuntos => adjuntos.find(adjunto => adjunto.id_adjunto === id));
  }

}
