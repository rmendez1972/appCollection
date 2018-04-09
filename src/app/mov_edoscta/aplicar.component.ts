import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, Input, EventEmitter, Output } from '@angular/core';

import { Aplicar } from './aplicar';

import { AplicarService} from './aplicar.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
import { ConfirmService} from '../_services/index';
import {Vencidos} from './vencidos'
import {BonificService} from './bonificacion.service';
import { AplicaBonificacionComponent} from './aplicabonificacion.component';
import { CajaService} from '../apertura_caja/caja.service';


@Component({
  selector: 'app-aplicar',
  templateUrl: './aplicar.component.html',
  styleUrls: ['./aplicar.component.css'],
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
export class AplicarComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'relative';
  }


  private errorMessage: string;

  private pagar: any[];

  private totales_style:String = "info";
  private renglon_style:String = "active";

  private aplicar:Aplicar[];
  private k: Observable<Aplicar[]>;
  private j: Observable<Aplicar[]>;
  private l: Observable<boolean[]>;

  private totalmoratorios: number=0;


  @Input() totalAplicarVencidos;


  @Input() fecha_corte:String;
  @Output() totalLetrasAplicar = new EventEmitter<Number>();
  @Output() onMessageAplicar = new EventEmitter<String>();
  @Output() onerrorMessageAplicar = new EventEmitter<String>();
  @Output() onTotalMoratorios = new EventEmitter<Number>();

    constructor(
      private aplicarService: AplicarService,
      private bonificService: BonificService,
      private aplicabonificacioncomponent: AplicaBonificacionComponent,
      private alertService:AlertService,
      private confirmService:ConfirmService,
      private router: Router,
      private route: ActivatedRoute,
      private cajaservice: CajaService,
    )
    {

    }

    ngOnInit() {
    };
    message(mensaje:String){
      this.onMessageAplicar.emit(mensaje);
    };
    errormessage(mensaje:String){
      this.onerrorMessageAplicar.emit(mensaje);
    };

    totalMoratorios(totalmoratorios:number){
      this.onTotalMoratorios.emit(totalmoratorios);
    }


    valida_ultimo(i:number){
      if (i==this.totalAplicarVencidos) {
        return true;
      }else{
        return false;
      }
    }
    extractMoratorios(){
      let mor:number = 0;
      mor = this.aplicar[this.aplicar.length-1].mor;
      this.totalmoratorios =parseFloat(mor.toFixed(2));
      return this.totalmoratorios;
    }
    getLetras() {
      if (this.totalAplicarVencidos!=undefined && this.totalAplicarVencidos!=null){
          this.aplicar = this.aplicarService.getLetras(this.totalAplicarVencidos);
          this.message('Recuperación exitosa de las letras a aplicar');
          this.errormessage(null);



          this.totalmoratorios=this.extractMoratorios();
          this.totalMoratorios(this.totalmoratorios);
      }else{
        this.errormessage('Error en la recuperacion de las letras a aplicar');
        this.message(null);
        this.aplicar=null;
      }
    };

    getPagar(fecha:string) {


       this.confirmService.confirm("Seguro de aplicar estas mensualidades?",fecha,this.aplicarService,this.route,this.k,function(message,fecha,aplicarservice,route,k){
              //ACTION: Do this If user says YES
              //this.pagar = aplicarservice.getPagar(fecha);
              k=route.params
              .switchMap((params: Params) =>
              {
                return aplicarservice.getPagar(fecha);
              })

              k.subscribe(
                aplicar =>{
                  //this.message('Pago de las letras vencidas realizadas con exito');
                  //this.errormessage(null);
                }
                //error => let error=error
                  //this.errorMessage = <any>error
                );

            },function(){
              //ACTION: Do this if user says NO
      })

    };




    getPagarConBonific(fecha:string,tipobonificacion:number,totalmoratorios:number,qautoriza:number) {
       this.confirmService.confirmconBonific(
         "Seguro de aplicar estas mensualidades?",
         fecha,this.aplicarService,this.aplicabonificacioncomponent,this.route,this.k,
         tipobonificacion,totalmoratorios,qautoriza,function(
           message,fecha,aplicarservice,aplicabonificacioncomponent,route,k,
           tipobonificacion,totalmoratorios,qautoriza){

              aplicarservice.getPagar(fecha,tipobonificacion,totalmoratorios,qautoriza);


            },function(){
              //ACTION: Do this if user says NO
      })

      this.l=this.route.params

                            .switchMap((params: Params) =>
                            {
                            return this.cajaservice.postUpdate_caja();
                            })

                            this.l.subscribe(

                             cajas =>{
                               console.log('se actualizo el folio final de la caja exitosamente');


                              },
                             error =>{
                               this.errorMessage = <any>error;

                             });


    };



}

