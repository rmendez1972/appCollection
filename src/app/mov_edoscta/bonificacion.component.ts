import { Component, OnInit, HostBinding,Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { Bonific } from './bonific';

import { BonificService} from './bonificacion.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';

/**
 * class BonificacionComponent()
 * Clase que realiza la presentación de las bonificaciones
 * @author: Marlon Gomez
 * @return {export} export class
 */

@Component({
  selector: 'app-bonific',
  templateUrl: './bonificacion.component.html',
  styleUrls: ['./bonificacion.component.css'],
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.8s ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class BonificacionComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'relative';
  }

  /**
  * Variables locales
  */
  private errorMessage: string;
  private bonific: Bonific[];
  private k: Observable<Bonific[]>;
  @Input() fecha_corte:String;
  @Input() valorcriterio:String;
  @Input() criterio:String;
  @Output() onMessage = new EventEmitter<String>();
  @Output() onerrorMessage = new EventEmitter<String>();

  	constructor(
      private router: Router,
      private route: ActivatedRoute,
      private bonificservice: BonificService,
      private alertService:AlertService
    )
    {}

  	ngOnInit() {
    };

    /**
    * getBonificaciones() 
    * metodo para realizar la busqueda del listado de las bonificaciones
    *  @author: Marlon Gomez
    * 
    *  @return {Void}
    */
    getBonificaciones() {
      console.log('fecha_corte '+this.fecha_corte)
      if (this.fecha_corte!=undefined && this.fecha_corte!=null && this.fecha_corte!=''){
        this.k=this.route.params
        .switchMap((params: Params) =>
        {
          return this.bonificservice.getBonificaciones(this.criterio,this.valorcriterio)
        })

        this.k.subscribe(
                       bonificaciones =>{
                         this.bonific = bonificaciones;
                         this.message('Recuperacion exitosa de los movimientos de bonificación');
                         this.errormessage(null);
                        },
                       error =>{
                         this.errorMessage = <any>error;
                         this.errormessage('No hay movimientos de bonificación para este Beneficiario');
                         this.message(null);
                       });
      }else{

        this.errormessage('Error en la recuperacion de los movimientos de bonificación, favor de introducir fecha válida');
        this.message(null);
        this.bonific=null;
      }
    };

    /**
    * message() 
    * metodo para mostrar un mensaje que esta bindiado a la vista
    *  @author: Marlon Gomez
    *  @param {String} mensaje
    *  @return {Void}
    */
    message(mensaje:String){
      this.onMessage.emit(mensaje);
    };

    /**
    * errormessage() 
    * metodo para mostrar un mensaje de error que esta bindiado a la vista
    *  @author: Marlon Gomez
    *  @param {String} mensaje
    *  @return {Void}
    */
    errormessage(mensaje:String){
      this.onerrorMessage.emit(mensaje);
    };



}
