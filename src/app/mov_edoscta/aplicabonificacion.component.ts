import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, Input, EventEmitter, Output } from '@angular/core';

import { Bonific } from './bonific';

import { AplicaBonificService} from './aplicabonificacion.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
import { User } from '../_models/index';




@Component({
  selector: 'app-aplicabonific',
  templateUrl: './aplicabonificacion.component.html',
  styleUrls: ['./aplicabonificacion.component.css'],
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
export class AplicaBonificacionComponent implements OnInit {
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
  private bonific: Bonific[];

  private k: Observable<Bonific[]>;


  @Output() onMessage = new EventEmitter<String>();


  @Input() id_movedoscta:String;





  	constructor(
      private router: Router,
      private route: ActivatedRoute,
      private aplicabonificservice: AplicaBonificService,
      private alertService:AlertService
    )
    {}


  	ngOnInit() {

    };

    message(mensaje:String){
      this.onMessage.emit(mensaje);

    };

    postBonificaciones() {

        this.k=this.route.params

        .switchMap((params: Params) =>
        {


        return this.aplicabonificservice.postBonificaciones(this.id_movedoscta,this.id_benef,this.imp_cap,this.imp_int,this.imp_adm,this.imp_seg,
        this.imp_osg,this.imp_com,this.imp_mor,this.imp_tit,this.id_catbonific,this.estatus,this.id_usuario,this.clave_b,this.recibo,this.serie,
        this.numcontrato,this.id_catprog,this.id_autoriza)
        })

        this.k.subscribe(

                       bonificaciones =>{
                         this.bonific = bonificaciones;
                         this.message('Se insertaron las bonificaciones');

                        },
                       error =>{
                         this.errorMessage = <any>error;

                         this.message(null);
                       });

        this.message(null);
        this.bonific=null;

    };


}
