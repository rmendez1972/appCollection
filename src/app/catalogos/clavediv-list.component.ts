import { Component, OnInit, HostBinding, AfterViewInit, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { Clavediv } from './clavediv';
import { CatalogosService} from './catalogos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';

/**
 * class ClavedivListComponent()
 * Clase que realiza la presentación del catalogo de los movimientos diversos.
 *.@author: Marlon Gomez
 * @return {export} export class
 */

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

export class ClavedivListComponent implements OnInit, AfterViewInit {
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
  private clavediv: Clavediv[];
  private k: Observable<Clavediv[]>;
  private miMensaje:    String;
  title = 'Catálogo de Clave de Movimientos Diversos';

  constructor(
      private router: Router,
      private route:  ActivatedRoute,
      private catalogosservice: CatalogosService,
      private alertService:AlertService,
      rootNode :ElementRef
    )
    {
    this.rootNode = rootNode;
    }


  	ngOnInit() {
      
      this.getClavediv();
    };
    /**
    * ngAfterViewInit() 
    * 
    *  @author: Angel Lara
    *  
    *  @return {Void}
    */
    ngAfterViewInit() {
      // viewChild is set after the view has been initialized
      var el = $(this.rootNode.nativeElement).find('#clavediv')[0];
      this.paginadorClaveDiv();
    }

    /**
    * getClavediv() 
    * metodo para realizar la busqueda del catalogo de los movimientos diversos
    *  @author: Marlon Gomez
    * 
    *  @return {Void}
    */
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
    * paginadorClaveDiv() 
    * metodo que realiza el estilo "datatable"
    *  @author: Angel Lara
    *  
    *  @return {Void}
    */
    paginadorClaveDiv() {

      $(document).ready(function() {
        $('#clavediv').DataTable();
      });
    }
}
