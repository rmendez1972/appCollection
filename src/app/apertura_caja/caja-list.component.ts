
import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, AfterViewInit, ElementRef } from '@angular/core';
import { Caja } from './caja';
import { CajaService} from './caja.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
declare var $: any;
@Component({
  selector: 'app-cajaList',
  templateUrl: './caja-list.component.html',
  styleUrls: ['./caja-list.component.css'],
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

export class CajaListComponent implements OnInit, AfterViewInit {
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

  private caja: Caja[];


  private k: Observable<Caja[]>;

  //private e: Observable<Seguimiento[]>;

  private miMensaje:    String;

  constructor(
      private router: Router,
      private route:  ActivatedRoute,
      private cajaservice: CajaService,
      private alertService:AlertService,
      rootNode:ElementRef
    )
    {
    this.rootNode = rootNode;
    }


  	ngOnInit() {
      this.getCaja();
    };
    ngAfterViewInit() {
      // viewChild is set after the view has been initialized
      var el = $(this.rootNode.nativeElement).find('#caja')[0];
      this.paginadorCaja();
    }

  	title = 'Catálogo de Cajas';


    getCaja() {
        this.k=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          return this.cajaservice.getCaja()
        })

        this.k.subscribe(

                       caja => this.caja = caja,
                       error =>  this.errorMessage = <any>error);
    };

    onMessage(mensaje:String){
      console.log("Recuperacion exitosa dentro de componente padre "+mensaje);
      this.miMensaje = mensaje;
    }
    paginadorCaja() {
      $(document).ready(function() {
        $('#caja').DataTable();
      });
    };

}
