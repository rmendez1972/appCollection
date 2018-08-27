import { Component, OnInit, HostBinding, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { Bonific_div } from './bonific_div';
import { BonificDivService} from './bonificacion_div.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
import { ConfirmService} from '../_services/index';
import { Mov_diversos } from './mov_diversos';

/**
 * class BonificacionDivComponent()
 * Clase que realiza la presentación de las bonificaciones.
 * @author: Marlon Gomez
 * @return {export} export class
 */
@Component({
  selector: 'app-bonific-div',
  templateUrl: './bonificacion_div.component.html',
  styleUrls: ['./bonificacion_div.component.css'],
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
export class BonificacionDivComponent implements OnInit {
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
  private bonific_div: Bonific_div[];
  private k: Observable<Bonific_div[]>;
  private totalbon_diversos:number =0;
  private totales_style:String = "info";
  private renglon_style:String = "active";
  private m: Observable<Mov_diversos[]>;
  @Input() fecha_corte:String;
  @Input() valorcriterio:String;
  @Input() criterio:String;
  @Output() onMessage = new EventEmitter<String>();
  @Output() onMessage2 = new EventEmitter<String>();
  @Output() onMessageAplicaBonificSi = new EventEmitter<String>();
  title = 'Bonificaciones';
  

  	constructor(
      private router: Router,
      private route: ActivatedRoute,
      private bonificdivservice: BonificDivService,
      private alertService:AlertService,
      private confirmService:ConfirmService,
      private bonificservice: BonificDivService,
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
        this.k=this.route.params
        .switchMap((params: Params) =>
        {
          
          return this.bonificdivservice.getBonificaciones(this.criterio,this.valorcriterio)
        })
        this.k.subscribe(
          bonificaciones_div =>{
            this.bonific_div = bonificaciones_div;
            this.totalbon_diversos = this.bonific_div.length-1;
            if (this.bonific_div.length>1){
              this.message2('');
              this.message('Recuperacion Exitosa de las bonificaciones de diversos');
            }
            else{
              
              this.message('');
              this.message2('Sin bonificaciones'); 
            }
          },
        error =>  this.errorMessage = <any>error);
    };

    /**
    * confimarBonificacionDiversos() 
    * metodo para enviar valores al confirm y realice distintas acciones
    *  @author: Marlon Gomez
    * 
    *  @return {Void}
    */
    confirmarBonificacionDiversos(){
      this.confirmService.confirmBonificacionDiversos("Tiene Bonificaciones?",this.bonificservice,this.onMessageAplicaBonificSi,function(bonificservice,eventemmitter){
              eventemmitter.emit('SI');
            },function(eventemmitter){
              eventemmitter.emit(null);
      })
    };

    /**
    * validaUltimoBon() 
    * metodo para validar los ultimos valores del vector
    *  @author: Marlon Gomez
    *  @param {Number} i
    *  @return {Void}
    */
    validaUltimoBon(i:number){
      if (i==this.totalbon_diversos) {
        return true;
      }else{

        return false;
      }
    }

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
    * message2() 
    * metodo para mostrar un mensaje de error que esta bindiado a la vista
    *  @author: Marlon Gomez
    *  @param {String} mensaje2
    *  @return {Void}
    */
     message2(mensaje2:String){
        this.onMessage2.emit(mensaje2);
      };


}
