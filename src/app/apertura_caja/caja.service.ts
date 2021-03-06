import { Injectable } from '@angular/core';


import { Caja } from './caja';
//import { Benef } from './benef';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import {Observable} from 'rxjs/Rx';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';
import { User } from '../_models/index';

@Injectable()
export class CajaService {
  private cajasUrl: string;
  private cajasListUrl: string;
  private cajasEditUrl: string;
  private cajasUpdateUrl: string;
  private currentUser: User;
  private newcurrentUser: User;
  private id_caja: number;
  private fecha:string;
  private folio_inicial:number;
  private folio_final:number;
  private poliza:string;
  private monto_inicial:number;
  private id:string;
  private username:string;

  constructor (private http: Http,private url:ServiceUrl,private alertService: AlertService){

    this.cajasUrl=String(this.url.getUrlcajas());
    this.cajasListUrl=String(this.url.getUrlcajaslist());
    this.cajasEditUrl=String(this.url.getUrlcajasedit());
    this.cajasUpdateUrl=String(this.url.getUrlcajasupdate());

  }

  //postApertura_caja
  postApertura_caja(fecha:string,folio_inicial:number,folio_final:number,poliza:string,monto_inicial:number,id:number): Observable<boolean> {
    this.id=id.toString();
    this.fecha=fecha;
    this.folio_inicial=folio_inicial;
    this.folio_final=folio_final;
    this.poliza=poliza;

    let param_apertura_caja={
      id:this.id,
      fecha:this.fecha,
      folio_inicial:this.folio_inicial,
      folio_final:this.folio_final,
      poliza:this.poliza,
      monto_inicial:monto_inicial
    };
    localStorage.setItem('paramAperturaCaja',JSON.stringify(param_apertura_caja));
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));

    return this.http.get(this.cajasUrl+fecha+"&folio_inicial="+folio_inicial+"&folio_final="+folio_final+"&poliza="+poliza+"&monto_inicial="+monto_inicial+"&id="+this.id)
    .map(this.extractDataCaja)
    .catch(this.handleError);
  }


  //getcaja
  getCaja(): Observable<Caja[]> {

     return this.http.get(this.cajasListUrl)
                    .map(this.extractDataCajaList)
                    .catch(this.handleError);

  }

  //postEdicion_caja
  postEdicion_caja(
    id_caja:number,fecha:string,folio_inicial:number,folio_final:number,poliza:string,monto_inicial:number,id:number
    ): Observable<Caja[]> {

    this.id_caja=id_caja;
    this.fecha=fecha;
    this.folio_inicial=folio_inicial;
    this.folio_final=folio_final;
    this.poliza=poliza;
    this.id=id.toString();


    let param_apertura_caja={
      id_caja:this.id_caja,
      fecha:this.fecha,
      folio_inicial:this.folio_inicial,
      folio_final:this.folio_final,
      poliza:this.poliza,
      monto_inicial:monto_inicial,
      id:id
    };
    localStorage.setItem('paramAperturaCaja',JSON.stringify(param_apertura_caja));
    this.currentUser=JSON.parse(localStorage.getItem('currentUser'));

    console.log(this.cajasEditUrl+id_caja+"&fecha="+fecha+"&folio_inicial="+folio_inicial+"&folio_final="+folio_final+"&poliza="+poliza+"&monto_inicial="+monto_inicial+"&id="+id);
    return this.http.get(this.cajasEditUrl+id_caja+"&fecha="+fecha+"&folio_inicial="+folio_inicial+"&folio_final="+folio_final+"&poliza="+poliza+"&monto_inicial="+monto_inicial+"&id="+id)
    .map(this.extractDataCajaEdit)
    .catch(this.handleError);
  }


  //postUpdate_caja
  postUpdate_caja(): Observable<boolean[]> {
    console.log('dentro de postUpdate_caja !!!!');
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let id_caja:number;
    for (var elemento in this.currentUser) {
      id_caja=this.currentUser[elemento].id_caja;

    }

    return this.http.get(this.cajasUpdateUrl+id_caja)
    .map(this.extractDataCajaUpdate)
    .catch(this.handleError);
  }

  private extractDataCajaUpdate(res: Response) {

    let body = res.json();
    console.log('valor de respuesta de api rest, para update de folio final  '+body.respuesta);
    if (body.respuesta=true){
      console.log('valor de body.respuesta es true ');
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let folio_final:number;
      for (var elemento in this.currentUser) {
        folio_final=this.currentUser[elemento].folio_final;

      }

      console.log('VALOR DE FOLIO_FINAL RECUPERADO DE LOCALSTORAGE '+folio_final);
      folio_final=++folio_final;
      console.log('VALOR DE FOLIO_FINAL RECUPERADO DE LOCALSTORAGE incrementado en uno '+folio_final);
      for (var elemento in this.currentUser){
         this.currentUser[elemento].folio_final=folio_final.toString();

       }
       localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

    }

    return body.caja|| { };

  }

  private extractDataCajaList(res: Response) {

    let body = res.json();


    return body.caja|| { };

  }

  private extractDataCajaEdit(res: Response) {

    let body = res.json();

    let valor=new String(body.cajas);
    if (valor=="true"){

       this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        for (var elemento in this.currentUser) {
          this.id=this.currentUser[elemento].id;
          this.username=this.currentUser[elemento].username;
        }

       let paramAperturaCaja= JSON.parse(localStorage.getItem('paramAperturaCaja'));

       for (var elemento in this.currentUser){
         this.currentUser[elemento].id_caja=paramAperturaCaja.id_caja;
         this.currentUser[elemento].fecha=new Date(paramAperturaCaja.fecha).toISOString().substring(0, 10);
         this.currentUser[elemento].folio_inicial=paramAperturaCaja.folio_inicial;
         this.currentUser[elemento].folio_final=paramAperturaCaja.folio_final;
         this.currentUser[elemento].poliza=paramAperturaCaja.poliza;
         this.currentUser[elemento].monto_inicial=paramAperturaCaja.monto_inicial;

       }
       localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
       localStorage.removeItem('paramAperturaCaja');

     }

    return body.caja|| { };

  }



  private extractDataCaja(res: Response) {

    let body = res.json();

     let valor=new String(body.cajas[0]);
     if (valor=="true"){

       this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        for (var elemento in this.currentUser) {
          this.id=this.currentUser[elemento].id;
          this.username=this.currentUser[elemento].username;
        }


       let paramAperturaCaja= JSON.parse(localStorage.getItem('paramAperturaCaja'));

       for (var elemento in this.currentUser){
         this.currentUser[elemento].fecha=new Date(paramAperturaCaja.fecha).toISOString().substring(0, 10);
         this.currentUser[elemento].folio_inicial=paramAperturaCaja.folio_inicial;
         this.currentUser[elemento].folio_final=paramAperturaCaja.folio_final;
         this.currentUser[elemento].poliza=paramAperturaCaja.poliza;
         this.currentUser[elemento].monto_inicial=paramAperturaCaja.monto_inicial;
         this.currentUser[elemento].id_caja=body.cajas[1];
       }
       localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

     }
     localStorage.removeItem('paramAperturaCaja');

    return body.cajas || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
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
