import { Component, OnInit, HostBinding,AfterViewInit, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { Clavemov } from './clavemov';
import { CatalogosService} from './catalogos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
declare var $: any;

/**
 * class BonificacionesListComponent()
 * Clase que realiza la presentación del catalogo de los movimientos estado de cuenta.
 *.@author: Marlon Gomez
 * @return {export} export class
 */

@Component({
  selector: 'app-clavemov',
  templateUrl: './clavemov-list.component.html',
  styleUrls: ['./clavemov-list.component.css'],
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

export class ClavemovListComponent implements OnInit,AfterViewInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'relative';
  }

  /**
  * Variables locales
  */
  private errorMessage: string;
  model:any={};
  rootNode: any;
  private clavemov: Clavemov[];
  private k: Observable<Clavemov[]>;
  private miMensaje:    String;
  title = 'Catálogo de Claves de Movimientos';

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
      
      this.getClavemov();
    };
    /**
    * ngAfterViewInit() 
    * 
    *  @author: Angel Lara
    *  
    *  @return {Void}
    */
    ngAfterViewInit() {
      var el = $(this.rootNode.nativeElement).find('#clavemov')[0];
      this.paginadorClaveMov();
    }

    /**
    * getClavemov() 
    * metodo para realizar la busqueda del catalogo de los movimientos estado de cuenta
    *  @author: Marlon Gomez
    * 
    *  @return {Void}
    */
    getClavemov() {
        this.k=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          return this.catalogosservice.getClavemov()
        })

        this.k.subscribe(

                       clavemov => this.clavemov = clavemov,
                       error =>  this.errorMessage = <any>error);
    };

    /**
    * onMessage() 
    * metodo para mostrar un mensaje que esta bindiado a la vista
    *  @author: Marlon Gomez
    *  @param {String} mensaje
    *  @return {Void}
    */
    onMessage(mensaje:String){
      console.log("Recuperacion exitosa dentro de componente padre "+mensaje);
      this.miMensaje = mensaje;
    }

    /**
    * paginadorClaveMov() 
    * metodo que realiza el estilo "datatable"
    *  @author: Angel Lara
    *  
    *  @return {Void}
    */
    paginadorClaveMov() {
      $(document).ready(function() {
        $('#clavemov').DataTable();
      });
    };

}
