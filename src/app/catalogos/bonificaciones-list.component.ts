/*
  Componenete para listar las claves de movimientos diversos
  Marlon Gomez
  23/08/2017
  app-clavediv
*/ 

import { Component, OnInit, HostBinding, trigger, transition, animate, style, state,AfterViewInit, ElementRef } from '@angular/core';
import { Bonificaciones } from './bonificaciones';
import { CatalogosService} from './catalogos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
declare var $: any;
@Component({
  selector: 'app-bonificaciones',
  templateUrl: './bonificaciones-list.component.html',
  styleUrls: ['./bonificaciones-list.component.css'],
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

export class BonificacionesListComponent implements OnInit, AfterViewInit{
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

  
  private bonificaciones: Bonificaciones[];
 

  private k: Observable<Bonificaciones[]>;

  //private e: Observable<Seguimiento[]>;
  
  private miMensaje:    String;

  constructor(
      private router: Router,
      private route:  ActivatedRoute,
      private catalogosservice: CatalogosService,
      private alertService:AlertService,
      rootNode : ElementRef

    )
    {
    this.rootNode = rootNode;
    }


  	ngOnInit() {
      
      this.getBonificaciones();
      

    };
    ngAfterViewInit() {
      // viewChild is set after the view has been initialized
      var el = $(this.rootNode.nativeElement).find('#bonificaciones')[0];
      this.paginadorBonificaciones();
    }

  	title = 'Catálogo de Bonificaciones';


    getBonificaciones() {
        this.k=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          return this.catalogosservice.getBonificaciones()
        })

        this.k.subscribe(

                       bonificaciones => this.bonificaciones = bonificaciones,
                       error =>  this.errorMessage = <any>error);
    };

    onMessage(mensaje:String){
      console.log("Recuperacion exitosa dentro de componente padre "+mensaje);
      this.miMensaje = mensaje;
    }

    paginadorBonificaciones(){

      $(document).ready(function() {
        $('#bonificaciones').DataTable();
      });
    }
}
