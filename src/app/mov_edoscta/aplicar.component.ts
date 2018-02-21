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
  private aplicar: any=[];

  private k: Observable<Aplicar[]>;
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
      //this.vencidos= JSON.parse(localStorage.getItem('vencidos'));
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
      console.log('iteracion de la vista '+i);
      if (i==this.totalAplicarVencidos) {
        return true;
      }else{

        return false;

      }
    }
    getLetras() {
      if (this.totalAplicarVencidos!=undefined && this.totalAplicarVencidos!=null){
        //this.k=this.route.params.switchMap(( params:Params)=>
        //{
           this.aplicar=[];
           console.log('letras a pagar por benef '+this.totalAplicarVencidos);
           this.aplicar=this.aplicarService.getLetras(this.totalAplicarVencidos);
        //})
        //this.k.subscribe(
        //  aplicar =>{
            //console.log("Aplicar en suscribir: ")
            //console.log(this.aplicar);
            //this.aplicar = aplicar;
            console.log("Suscribir");
            let tipo= typeof(this.aplicar);
            console.log('tipo de dato dentro de subscribe ' +tipo) ;
            console.log('valor de aplicar dentro subscribe '+this.aplicar);

            //var array = [for (key of Object.keys(this.aplicar)) this.aplicar[key]];
            //let tipo2= typeof(array);
            //console.log('tipo de dato 2 dentro de subscribe ' +tipo2) ;
            /*
            let letrasaplicar = JSON.parse(localStorage.getItem('aplicar'));
            console
            for (var elemento in letrasaplicar) {
              let modelo={
                fecha: letrasaplicar[elemento].fecha,
                letra: letrasaplicar[elemento].letra,
                capital: letrasaplicar[elemento].capital,
                interes: letrasaplicar[elemento].iteres,
                seguro: letrasaplicar[elemento].seguro,
                admon: letrasaplicar[elemento].admon,
                oseg: letrasaplicar[elemento].oseg,
                com: letrasaplicar[elemento].com,
                tit: letrasaplicar[elemento].tit,
                mor: letrasaplicar[elemento].mor,
                total: letrasaplicar[elemento].total.toString()
              }
              console.log('modelo '+JSON.stringify(modelo));
              this.aplicar.push(JSON.stringify(modelo));
            }*/



      }else{
        this.errormessage('Error en la recuperacion de los movimientos a aplicar');
        this.message(null);
        this.aplicar=null;
      }
    };



}
