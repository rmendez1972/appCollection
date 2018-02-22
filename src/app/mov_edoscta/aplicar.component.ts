import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, Input, EventEmitter, Output } from '@angular/core';

import { Aplicar } from './aplicar';

import { AplicarService} from './aplicar.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import { AuthGuard } from '../_guards/index';

//import { UploadComponent} from '../upload/upload.component';

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
  private aplicar: any[];

  private pagar: any[];

  private totales_style:String = "info";
  private renglon_style:String = "active";

  private vencidos:Vencidos;


  @Input() totalAplicarVencidos;

  @Output() totalLetrasAplicar = new EventEmitter<Number>();
  @Output() onMessageAplicar = new EventEmitter<String>();
  @Output() onerrorMessageAplicar = new EventEmitter<String>();

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

    valida_ultimo(i:number){
      if (i==this.totalAplicarVencidos) {
        return true;
      }else{

        return false;

      }
    }
    getLetras() {
      if (this.totalAplicarVencidos!=undefined && this.totalAplicarVencidos!=null){

          this.aplicar = this.aplicarService.getLetras(this.totalAplicarVencidos);
          this.message('Recuperación exitosa de las letras a aplicar');
          this.errormessage(null);


      }else{
        this.errormessage('Error en la recuperacion de las letras a aplicar');
        this.message(null);
        this.aplicar=null;
      }
    };

    getPagar(fecha:string) {
      this.pagar = this.aplicarService.getPagar(fecha);
      this.message('Recuperación exitosa de las letras a aplicar');
      
    };

}
