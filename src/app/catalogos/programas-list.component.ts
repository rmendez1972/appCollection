/*
  Componente para listar el catalogo de programas (condiciones financieras)
  igh
  19/09/2017
  
*/ 

import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, ElementRef } from '@angular/core';
import { Programas } from './programas';
import { CatalogosService} from './catalogos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';

/*
Aplicando data tables
*/
declare var $: any;
@Component({
  selector: 'app-programas',
  templateUrl: './programas-list.component.html',
  styleUrls: ['./programas-list.component.css'],
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

export class ProgramasListComponent implements OnInit {
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
  
  private programas: Programas[];
 

  private k: Observable<Programas[]>;

  //private e: Observable<Seguimiento[]>;
  
  private miMensaje:    String;

  constructor(
      private router: Router,
      private route:  ActivatedRoute,
      private catalogosservice: CatalogosService,
      private alertService:AlertService
    )
    {
    this.getProgramas();
    }


  	ngOnInit() {

      this.paginador();
      
      

      
    };

  	title = 'Catálogo de Programas';


    getProgramas() {
        this.k=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          return this.catalogosservice.getProgramas()
        })

        this.k.subscribe(

                       programas => this.programas = programas,
                       error =>  this.errorMessage = <any>error);
    };

    onMessage(mensaje:String){
      console.log("Recuperacion exitosa dentro de componente padre "+mensaje);
      this.miMensaje = mensaje;
    };
    paginador(){
      $(document).ready(function() {
        $('#programas').DataTable();
      });
    };

}
