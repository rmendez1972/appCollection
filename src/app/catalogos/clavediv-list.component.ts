/*
  Componenete para listar las claves de movimientos diversos
  Marlon Gomez
  23/08/2017
  app-clavediv
*/ 

import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';
import { Clavediv } from './clavediv';
import { CatalogosService} from './catalogos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';

declare var $: any;

@Component({
  selector: 'app-clavediv',
  templateUrl: './clavediv-list.component.html',
  styleUrls: ['./clavediv-list.component.css'],
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

export class ClavedivListComponent implements OnInit {
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
  
  private clavediv: Clavediv[];
 

  private k: Observable<Clavediv[]>;

  //private e: Observable<Seguimiento[]>;
  
  private miMensaje:    String;

  constructor(
      private router: Router,
      private route:  ActivatedRoute,
      private catalogosservice: CatalogosService,
      private alertService:AlertService
    )
    {
    this.paginadorClaveDiv();
    }


  	ngOnInit() {
      
      this.getClavediv();
      

    };

  	title = 'Catálogo de Clave de Movimientos Diversos';


    getClavediv() {
        this.k=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          return this.catalogosservice.getClavediv()
        })

        this.k.subscribe(

                       clavediv => this.clavediv = clavediv,
                       error =>  this.errorMessage = <any>error);
    };

    onMessage(mensaje:String){
      console.log("Recuperacion exitosa dentro de componente padre "+mensaje);
      this.miMensaje = mensaje;
    }

    paginadorClaveDiv() {

      $(document).ready(function() {
        $('#clavediv').DataTable();
      });
    }
}
