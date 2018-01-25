import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, Input, EventEmitter, Output } from '@angular/core';

import { Vencidos } from './vencidos';

import { VencidosService} from './vencidos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

//import { AuthGuard } from '../_guards/index';

//import { UploadComponent} from '../upload/upload.component';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';




@Component({
  selector: 'app-vencidos',
  templateUrl: './vencidos.component.html',
  styleUrls: ['./vencidos.component.css'],
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
export class VencidosComponent implements OnInit {
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
  private vencidos: Vencidos[];

  private k: Observable<Vencidos[]>;

  @Input() fecha_corte:String;
  @Input() clave_b:String;
  @Output() onMessagevencidos = new EventEmitter<String>();
  @Output() onerrorMessagevencidos = new EventEmitter<String>();




  	constructor(
      private router: Router,
      private route: ActivatedRoute,
      private vencidosService: VencidosService,
      private alertService:AlertService
    )
    {}


  	ngOnInit() {

    };

    message(mensaje:String){
      this.onMessagevencidos.emit(mensaje);

    };

    errormessage(mensaje:String){
      this.onerrorMessagevencidos.emit(mensaje);

    };


    getVencidos() {
      console.log('fecha_corte dentro del controlador '+this.fecha_corte)
      if (this.fecha_corte!=undefined && this.fecha_corte!=null && this.fecha_corte!=''){
        this.k=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          //this.selectedId= +params['id'];
          return this.vencidosService.getVencidos(this.clave_b,this.fecha_corte)
        })

        this.k.subscribe(
          vencidos =>{
            this.vencidos = vencidos;
            this.message('Recuperacion exitosa de los movimientos vencidos');
            this.errormessage(null);
          },
          error =>  this.errorMessage = <any>error);

      }else{

        this.errormessage('Error en la recuperacion de los movimientos vencidos, favor de introducir fecha válida');
        this.message(null);
        this.vencidos=null;
      }
    };


}
