import { Component, OnInit, HostBinding, ElementRef,AfterViewInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { Programas } from './programas';
import { CatalogosService} from './catalogos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
declare var $: any;

/**
 * class ProgramasListComponent()
 * Clase que realiza la presentación del catalogo de  programas (condiciones financieras)
 * @author: Ismael Garcia
 * @return {export} export class
 */

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

export class ProgramasListComponent implements OnInit,AfterViewInit {
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
  private programas: Programas[];
  private k: Observable<Programas[]>; 
  private miMensaje:    String;
  title = 'Catálogo de Programas';
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
      this.getProgramas();
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
      var el = $(this.rootNode.nativeElement).find('#programas')[0];
      this.paginador();
    }

    /**
    * getProgramas() 
    * metodo para realizar la busqueda del catalogo de programas (condiciones financieras)
    *  @author: Marlon Gomez
    * 
    *  @return {Void}
    */
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
    };

    /**
    * paginador() 
    * metodo que realiza el estilo "datatable"
    *  @author: Angel Lara
    *  
    *  @return {Void}
    */
    paginador(){
      $(document).ready(function() {
        $('#programas').DataTable();
      });
    };

}
