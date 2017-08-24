/*
  Componenete para listar los salarios minimos
  Marlon Gomez
  23/08/2017
  app-salmindf
*/ 

import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';
import { Salmindf } from './salmindf';
import { CatalogosService} from './catalogos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';

@Component({
  selector: 'app-salmindf',
  templateUrl: './salmindf-list.component.html',
  styleUrls: ['./salmindf-list.component.css'],
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

export class SalmindfListComponent implements OnInit {
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
  
  private salmindf: Salmindf[];
 

  private k: Observable<Salmindf[]>;

  //private e: Observable<Seguimiento[]>;
  
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

      this.getSalmindf();

    };

  	title = 'Catálogo de Salarios Minimos Distrito Federal';


    getSalmindf() {
        this.k=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          return this.catalogosservice.getSalmindf()
        })

        this.k.subscribe(

                       salmindf => this.salmindf = salmindf,
                       error =>  this.errorMessage = <any>error);
    };

    onMessage(mensaje:String){
      console.log("Recuperacion exitosa dentro de componente padre "+mensaje);
      this.miMensaje = mensaje;
    }

}
