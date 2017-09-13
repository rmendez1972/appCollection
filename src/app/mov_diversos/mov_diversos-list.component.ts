/*
  Componenete para listar los movimiento diversos de un bebeficiario
  Ismael García
  18/08/2017
  Última modificación: 23/08/2018
  app-diversos
*/ 

import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';
//import { DatePipe} from '@angular/common';

import { Mov_diversos } from './mov_diversos';
import { Benef_div } from './benef_div';
import { Mov_diversosService} from './mov_diversos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';

@Component({
  selector: 'app-diversos',
  templateUrl: './mov_diversos-list.component.html',
  styleUrls: ['./mov_diversos-list.component.css'],
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

export class Mov_diversosListComponent implements OnInit {
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
  model:any={};
  private mov_diversos: Mov_diversos[];
  private benef_div: Benef_div[];
  private k: Observable<Mov_diversos[]>;
  private l: Observable<Benef_div[]>;

  private miMensajeBons:String;
  private miMensajeBonsError:String;//igh

  private miMensajeMovs:String;
  private miMensajeerrorMovs:String;
  private bonific:String = "fa fa-check";
  private nobonific: String = "fa fa-times";

  optionsSelect = [
    {id:1, value: "clave_b", name: "Clave SEDETUS"},
    {id:2, value: "nombre", name: "Nombre de Beneficiario"}

];

  constructor(
      private router: Router,
      private route:  ActivatedRoute,
      private mov_diversosservice: Mov_diversosService,
      private alertService:AlertService
    )
    {
      
    }

  	ngOnInit() {
      this.model.fecha_corte=new Date()
      this.model.valorcriterio=null;
    };

  	title = 'Movimientos diversos';
 
    localizaBenefMov_diversos(){

      console.log('valor de model.criterio '+this.model.criterio);
      console.log('valor de model.valorcriterio '+this.model.valorcriterio);
      if ((this.model.criterio!=undefined) && (this.model.valorcriterio!=null )){
        this.miMensajeerrorMovs=null;
        this.getMov_diversos(this.model.criterio,this.model.valorcriterio);
        this.getBenef_div(this.model.criterio,this.model.valorcriterio);
        
      }else{
        this.miMensajeMovs=null;
        this.miMensajeerrorMovs = "Error en recuperación de Movimientos diversos, por favor llena los campos..";
      }
    }


    getMov_diversos(criterio:String,valorcriterio:String) {
        this.k=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {
          return this.mov_diversosservice.getMov_diversos(criterio,valorcriterio)
        })

        this.k.subscribe(
          
          movimientos => {
            this.mov_diversos = movimientos;  
            
            this.miMensajeMovs = "Recuperación Exitosa de los Movimientos diversos";
           },
          error =>  this.errorMessage = <any>error);

          //movimientos => this.mov_diversos = movimientos,
          //error =>  this.errorMessage = <any>error);
    };

    getBenef_div(criterio:String,valorcriterio:String) {
        this.l=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {
             return this.mov_diversosservice.getBenef_div(criterio,valorcriterio)
        })

        this.l.subscribe(

                       beneficiario => this.benef_div = beneficiario,
                       error =>  this.errorMessage = <any>error);


    };

    onMessage(mensaje:String){
      //console.log("Recuperacion exitosa dentro de componente hijo"+mensaje);
      //this.miMensaje = mensaje;
      this.miMensajeBons = mensaje;
     
      }

      onMessage2( mensaje2:String){
        //console.log("Recuperacion exitosa dentro de componente hijo "+mensaje2);
        //this.miMensaje = mensaje;
        this.miMensajeBonsError = mensaje2;
      }

}
