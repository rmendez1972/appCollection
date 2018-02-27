import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, Input, EventEmitter, Output } from '@angular/core';

import { Aplicar } from './aplicar';

import { AplicarService} from './aplicar.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
import {Vencidos} from './vencidos'
import {BonificService} from './bonificacion.service';


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
      private alertService:AlertService,
      private router: Router,
      private route: ActivatedRoute,
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
      let mor = 0;
      for (var x = 0; x < this.aplicar.length ; x++) {
        mor = mor + parseFloat((this.aplicar[x].mor).toString());
      }
      this.totalmoratorios =mor;
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
      let pagar;
      this.k=this.route.params
        .switchMap((params: Params) =>
        {
          return this.aplicarService.getPagar(fecha);
        })

        this.k.subscribe(
          aplicar =>{
            this.message('Pago de las letras vencidas realizadas con exito');
            this.errormessage(null);
          },
          error =>  this.errorMessage = <any>error);
          
      };
      

}