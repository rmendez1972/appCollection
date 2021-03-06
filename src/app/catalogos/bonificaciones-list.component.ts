
import { Component, OnInit, HostBinding,AfterViewInit, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { Bonificaciones } from './bonificaciones';
import { CatalogosService} from './catalogos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
declare var $: any;

/**
 * class BonificacionesListComponent()
 * Clase que realiza la presentación del catalogo de bonificaciones.
 *.@author: Marlon Gomez
 * @return {export} export class
 */

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

/**
* Variables locales
*/
  private errorMessage: string;
  model:any={};
  rootNode: any;
  private bonificaciones: Bonificaciones[];
  private k: Observable<Bonificaciones[]>;
  private miMensaje:    String;
  title = 'Catálogo de Bonificaciones';

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

    /**
    * ngAfterViewInit() 
    * 
    *  @author: Angel Lara
    *  
    *  @return {Void}
    */
    ngAfterViewInit() {
      var el = $(this.rootNode.nativeElement).find('#bonificaciones')[0];
      this.paginadorBonificaciones();
    }

  	

    /**
    * getBonificaciones() 
    * metodo para realizar la busqueda del catalogo de bonificaciones.
    *  @author: Marlon Gomez
    * 
    *  @return {Void}
    */
    getBonificaciones() {
        this.k=this.route.params
        .switchMap((params: Params) =>
        {

          return this.catalogosservice.getBonificaciones()
        })

        this.k.subscribe(

                       bonificaciones => this.bonificaciones = bonificaciones,
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
    * paginadorBonificaciones() 
    * metodo que realiza el estilo "datatable"
    *  @author: Angel Lara
    *  
    *  @return {Void}
    */
    paginadorBonificaciones(){

      $(document).ready(function() {
        $('#bonificaciones').DataTable();
      });
    }
}
