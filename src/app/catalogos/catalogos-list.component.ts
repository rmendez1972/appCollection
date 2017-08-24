/*
  Componenete para listar los movimiento diversos de un bebeficiario
  Marlon Gomez
  22/08/2017
  app-catalogos
*/ 

import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';
import { Mov_diversos } from './mov_diversos';
import { Benef_div } from './benef_div';
import { CatalogosService} from './catalogos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos-list.component.html',
  styleUrls: ['./catalogos-list.component.css'],
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

export class CatalogosListComponent implements OnInit {
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

  private miMensaje:    String;

  constructor(
      private router: Router,
      private route:  ActivatedRoute,
      private catalogosservice: CatalogosService,
      private alertService:AlertService
    )
    {
      
    }


  	ngOnInit() {

    };

  	title = 'Catalogos';
    //selectedSolicitante: Solicitante;
    localizaBenefMov_diversos(){
     

    }

   

    onMessage(mensaje:String){
      console.log("Recuperacion exitosa dentro de componente padre "+mensaje);
      this.miMensaje = mensaje;
    }

}
