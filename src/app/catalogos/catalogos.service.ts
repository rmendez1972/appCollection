import { Injectable } from '@angular/core';
import { Cpp } from './cpp';
import { Salmin } from './salmin';
import { Salmindf } from './salmindf';
import { Clavemov } from './clavemov';
import { Clavediv } from './clavediv';
import { Bonificaciones } from './bonificaciones';
import { Programas } from './programas';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';

@Injectable()
/**
* class CatalogosService()
* Esta clase se usa para conectar con el Back End y obtener los datos a usar.
* @author: Marlon Gomez
* @return {export} export class 
*/
export class CatalogosService {
/**
* Variables locales
*/
  private cppUrl: string;
  private salminUrl: string;
  private salmindfUrl: string;
  private clavemovUrl: string;
  private clavedivUrl: string;
  private bonificacionesUrl: string;
  private programasUrl: string;

  constructor (private http: Http,
      private url:ServiceUrl,
      private alertService: AlertService)
      {
        
        this.cppUrl=String(this.url.getUrlcpp());
        this.salminUrl=String(this.url.getUrlsalmin());
        this.salmindfUrl=String(this.url.getUrlsalmindf());
        this.clavemovUrl=String(this.url.getUrlclavemov());
        this.clavedivUrl=String(this.url.getUrlclavediv());
        this.bonificacionesUrl=String(this.url.getUrlbonificaciones());
        this.programasUrl=String(this.url.getUrlprogramas());

      }
/**
* getCpp()
* Metodo para obtener el catalogo de CPP del Back End.
* @author: Marlon Gomez
* @return {json, error} res, error  
*/
  getCpp(): Observable<Cpp[]> {

     return this.http.get(this.cppUrl)
                    .map(this.extractDataCpp)
                    .catch(this.handleError);

  }

/**
* getSalmin()
* Metodo para obtener el catalogo de los Salarios Minimos del Back End.
* @author: Marlon Gomez
* @return {json, error} res, error  
*/
  getSalmin(): Observable<Salmin[]> {
    
         return this.http.get(this.salminUrl)
                        .map(this.extractDataSalmin)
                        .catch(this.handleError);
    
  }

/**
* getSalmindf()
* Metodo para obtener el catalogo de los Salarios Minimos DF del Back End.
* @author: Marlon Gomez
* @return {json, error} res, error  
*/
  getSalmindf(): Observable<Salmindf[]> {
    
         return this.http.get(this.salmindfUrl)
                        .map(this.extractDataSalmindf)
                        .catch(this.handleError);
    
  }

/**
* getSalmin()
* Metodo para obtener el catalogo clave movimientos del Back End.
* @author: Marlon Gomez
* @return {json, error} res, error  
*/
  getClavemov(): Observable<Clavemov[]> {
    
         return this.http.get(this.clavemovUrl)
                        .map(this.extractDataClavemov)
                        .catch(this.handleError);
    
  }

/**
* getClavediv()
* Metodo para obtener el catalogo clave de movimientos diversos del Back End.
* @author: Marlon Gomez
* @return {json, error} res, error  
*/
  getClavediv(): Observable<Clavediv[]> {
    
        return this.http.get(this.clavedivUrl)
                        .map(this.extractDataClavediv)
                        .catch(this.handleError);
    
  }

/**
* getBonificaciones()
* Metodo para obtener el catalogo de las bonificaciones del Back End.
* @author: Marlon Gomez
* @return {json, error} res, error  
*/
  getBonificaciones(): Observable<Bonificaciones[]> {
    
        return this.http.get(this.bonificacionesUrl)
                        .map(this.extractDataBonificaciones)
                        .catch(this.handleError);
    
  }

/**
* getProgramas()
* Metodo para obtener el catalogo de los Programas del Back End.
* @author: Marlon Gomez
* @return {json, error} res, error  
*/
  getProgramas(): Observable<Programas[]> {
    
        return this.http.get(this.programasUrl)
                        .map(this.extractDataProgramas)
                        .catch(this.handleError);
    
  }

/**
* extractDataCpp()
* Metodo para extraer los datos que regresaron del Back End.
* @author: Marlon Gomez
* @param {Response } res
* @return {let} body.cpp
*/
  private extractDataCpp(res: Response) {

    let body = res.json();
    console.log(body.cpp);

    return body.cpp|| { };

  }
/**
* extractDataSalmin()
* Metodo para extraer los datos que regresaron del Back End.
* @author: Marlon Gomez
* @param {Response } res
* @return {let} body.salmin
*/
  private extractDataSalmin(res: Response) {
    
        let body = res.json();
        console.log(body.salmin);
    
        return body.salmin|| { };
    
  }
/**
* extractDataSalmindf()
* Metodo para extraer los datos que regresaron del Back End.
* @author: Marlon Gomez
* @param {Response } res
* @return {let} body.salmindf
*/
  private extractDataSalmindf(res: Response) {
    
        let body = res.json();
        console.log(body.salmindf);
    
        return body.salmindf|| { };
    
  }
/**
* extractDataClavemov()
* Metodo para extraer los datos que regresaron del Back End.
* @author: Marlon Gomez
* @param {Response } res
* @return {let} body.salmin
*/
  private extractDataClavemov(res: Response) {
    
        let body = res.json();
        console.log(body.clavemov);
    
        return body.clavemov|| { };
    
  }
/**
* extractDataClavediv()
* Metodo para extraer los datos que regresaron del Back End.
* @author: Marlon Gomez
* @param {Response } res
* @return {let} body.salmin
*/
  private extractDataClavediv(res: Response) {
    
        let body = res.json();
        console.log(body.clavediv);
    
        return body.clavediv|| { };
    
  }
/**
* extractDataBonificaciones()
* Metodo para extraer los datos que regresaron del Back End.
* @author: Marlon Gomez
* @param {Response } res
* @return {let} body.bonificaciones
*/
  private extractDataBonificaciones(res: Response) {
    
        let body = res.json();
        console.log(body.bonificaciones);
    
        return body.bonificaciones|| { };
    
  }
/**
* extractDataProgramas()
* Metodo para extraer los datos que regresaron del Back End.
* @author: Marlon Gomez
* @param {Response } res
* @return {let} body.programas
*/
  private extractDataProgramas(res: Response) {
    
        let body = res.json();
        console.log(body.programas);
    
        return body.programas|| { };
    
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
