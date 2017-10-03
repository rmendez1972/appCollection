/*
  Componenete para listar los salarios minimos
  Marlon Gomez
  23/08/2017
  app-salmin
*/ 

import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, AfterViewInit, ElementRef } from '@angular/core';
import { Salmin } from './salmin';
import { CatalogosService} from './catalogos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
declare var $: any;
@Component({
  selector: 'app-salmin',
  templateUrl: './salmin-list.component.html',
  styleUrls: ['./salmin-list.component.css'],
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

export class SalminListComponent implements OnInit, AfterViewInit {
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
  rootNode: any;
  
  private salmin: Salmin[];
 

  private k: Observable<Salmin[]>;

  //private e: Observable<Seguimiento[]>;
  
  private miMensaje:    String;

  constructor(
      private router: Router,
      private route:  ActivatedRoute,
      private catalogosservice: CatalogosService,
      private alertService:AlertService,
      rootNode:ElementRef
    )
    {
    this.rootNode = rootNode;
    }


  	ngOnInit() {
      this.getSalmin();
    };
    ngAfterViewInit() {
      var el = $(this.rootNode.nativeElement).find('#salmin')[0];
      this.paginadorSalMin();
    }


  	title = 'Catálogo de Salarios Minimos';


    getSalmin() {
        this.k=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          return this.catalogosservice.getSalmin()
        })

        this.k.subscribe(

                       salmin => this.salmin = salmin,
                       error =>  this.errorMessage = <any>error);
    };

    onMessage(mensaje:String){
      console.log("Recuperacion exitosa dentro de componente padre "+mensaje);
      this.miMensaje = mensaje;
    }
    paginadorSalMin() {
      $(document).ready(function() {
        $('#salmin').DataTable();
      });
    };

}
