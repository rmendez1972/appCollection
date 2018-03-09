import { Injectable } from '@angular/core';

import { Bonific } from './bonific';
import { Http, Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import {Observable} from 'rxjs/Rx';
import { ServiceUrl } from '../serviceUrl';
import { AlertService} from '../_services/index';





@Injectable()
export class AplicaBonificService {

  //propiedades de la clase
  private aplicabonificacionUrl: string;
  private id_movedocta:number;
  private id_benef:number;
  private imp_cap:number;
  private imp_int:number;
  private imp_adm:number;
  private imp_seg:number;
  private imp_osg:number;
  private imp_com:number;
  private imp_mor:number;
  private imp_tit:number;
  private id_catbonific:number;
  private estatus:string;
  private id_usuario:number;
  private id_autoriza:number;
  private clave_b:string;
  private recibo:number;
  private serie:string;
  private numcontrato:string;
  private id_catprog:number;



  constructor (private http: Http,
      private url:ServiceUrl,
      private alertService: AlertService)
      {

        this.aplicabonificacionUrl=String(this.url.getUrlAplicabonificacion());

      }

  postBonificaciones(id_movedocta:number, id_benef:number, imp_cap:number, imp_int:number, imp_adm:number,
    imp_seg:number, imp_osg:number,
  imp_com:number, imp_mor:number, imp_tit:number,
  id_catbonific:number, estatus:string, id_usuario:number,
  id_autoriza:number, clave_b:string, recibo:number,
  serie:string, id_catprog:number): Observable<Bonific[]> {

    //se obtiene el numero de contrato con la clave_b
    this.numcontrato=clave_b.substr(7);

    console.log("numero de contrato dentro de aplicabonificacion.service:" + this.numcontrato);



    //metodo callback para introducir los datos al backend
    console.log(this.aplicabonificacionUrl+id_movedocta.toString()+'&id_benef='+id_benef.toString()+'&imp_cap='+imp_cap.toString()+'&imp_int='+imp_int.toString()+'&imp_adm='+imp_adm.toString()+
     '&imp_seg='+imp_seg.toString()+'&imp_osg='+imp_osg.toString()+'&imp_com='+imp_com.toString()+'&imp_mor='+imp_mor.toString()+'&imp_tit='+imp_tit.toString()+'&id_catbonific='+id_catbonific.toString()+
     '&estatus='+estatus+'&id_usuario='+id_usuario.toString()+'&clave_b='+clave_b+'&recibo='+recibo.toString()+'&serie='+serie+'&numcontrato='+this.numcontrato+'&id_catprog='+id_catprog.toString()+
     '&id_autoriza='+id_autoriza.toString());
    /*
    console.log(id_movedocta);
    console.log(id_benef);
    console.log(imp_cap);
    console.log(imp_int);
    console.log(imp_adm);
    console.log(imp_seg);
    console.log(imp_osg);
    console.log(imp_com);
    console.log(imp_mor)
    console.log(imp_tit);
    console.log(id_catbonific);
    console.log(estatus.toString().trim());
    console.log(id_usuario);
    console.log(clave_b.toString().trim());
    console.log(recibo);
    console.log(serie.toString().trim());
    //console.log(this.numcontrato);
    console.log(id_catprog);
    console.log(id_autoriza);*/

    //se obtiene el numero de contrato con la clave_b
    this.numcontrato=clave_b.substr(7);



    //metodo callback para introducir los datos al backend
    /*console.log(this.aplicabonificacionUrl+id_movedocta.toString()+'&id_benef='+id_benef.toString()+'&imp_cap='+imp_cap.toString()+'&imp_int='+imp_int.toString()+'&imp_adm='+imp_adm.toString()+
     '&imp_seg='+imp_seg.toString()+'&imp_osg='+imp_osg.toString()+'&imp_com='+imp_com.toString()+'&imp_mor='+imp_mor.toString()+'&imp_tit='+imp_tit.toString()+'&id_catbonific='+id_catbonific.toString()+
     '&estatus='+estatus+'&id_usuario='+id_usuario.toString()+'&clave_b='+clave_b+'&recibo='+recibo.toString()+'&serie='+serie+'&numcontrato='+this.numcontrato+'&id_catprog='+id_catprog.toString()+
     '&id_autoriza='+id_autoriza.toString());*/

    console.log("despues del seteo "+this.numcontrato);


     return this.http.get(this.aplicabonificacionUrl+id_movedocta.toString()+'&id_benef='+id_benef.toString()+'&imp_cap='+imp_cap.toString()+'&imp_int='+imp_int.toString()+'&imp_adm='+imp_adm.toString()+
     '&imp_seg='+imp_seg.toString()+'&imp_osg='+imp_osg.toString()+'&imp_com='+imp_com.toString()+'&imp_mor='+imp_mor.toString()+'&imp_tit='+imp_tit.toString()+'&id_catbonific='+id_catbonific.toString()+
     '&estatus='+estatus+'&id_usuario='+id_usuario.toString()+'&clave_b='+clave_b+'&recibo='+recibo.toString()+'&serie='+serie+'&numcontrato='+this.numcontrato+'&id_catprog='+id_catprog.toString()+
     '&id_autoriza='+id_autoriza.toString())
                    .map(this.extractDataBon)
                    .catch(this.handleError);

  }


  private extractDataBon(res: Response) {
    let body= res.json();
    console.log("JSON DE REGRESO despues de pedir la BONIFICACION" +body.registroBonificacion);
    let id_mov_edoscta= 0;
    let id_bonificacion = 0;
    let actividad: boolean;
    let recibo= 0;
    for (var i = 0; i < body.registroBonificacion.length; ++i) {
      id_mov_edoscta =  body.registroBonificacion[0];
      recibo =body.registroBonificacion[1];
      id_bonificacion = body.registroBonificacion[2];
      actividad = body.registroBonificacion[3];

    }

    let bonificacion ={
      id_mov_edoscta:id_mov_edoscta,
      recibo:recibo,
      id_bonificacion:id_bonificacion,
      actividad:actividad,



    };

    //console.log("json de regreso" +body.registroBonificacion);
    localStorage.setItem('bon',JSON.stringify(bonificacion));


    return body.registroBonificacion || { };

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