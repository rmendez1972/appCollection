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
  private currentUser: User;
  model:any={};

  @Output() onMessage = new EventEmitter<String>();


  @Input() id_benef:String;
  @Input() imp_cap:Number;
  @Input() imp_int:Number;
  @Input() imp_adm:Number;
  @Input() imp_seg:Number;
  @Input() imp_osg:Number;
  @Input() id_catbonific:String;
  @Input() id_autoriza:String;
  @Input() imp_com:Number;
  @Input() imp_mor:Number;
  @Input() imp_tit:Number;
  @Input() id_catprog: String;



  	constructor(
      private router: Router,
      private route: ActivatedRoute,
      private aplicabonificservice: AplicaBonificService,
      private alertService:AlertService
    )
    {}


  	ngOnInit() {
      //this.model.propiedad
      this.model.id_benef = this.id_benef;
      this.model.imp_cap = this.imp_cap;
      this.model.imp_int = this.imp_int;
      this.model.imp_adm = this.imp_adm;
      this.model.imp_seg = this.imp_seg;
      this.model.imp_osg = this.imp_osg;
      this.model.id_catbonific = this.id_catbonific;
      this.model.estatus = 'A';
      this.model.id_autoriza = this.id_autoriza;
      this.model.imp_com = this.imp_com;
      this.model.imp_mor = this.imp_mor;
      this.model.imp_tit = this.imp_tit;
      this.model.id_catprog = this.id_catprog;


      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      for (var elemento in this.currentUser) {
        this.model.id_movedocta=this.currentUser[elemento].id_movedocta;
        this.model.id_usuario=this.currentUser[elemento].id;
        this.model.recibo = this.currentUser[elemento].foliofinal;
        this.model.serie = this.currentUser[elemento].serie;

      }


    };

    message(mensaje:String){
      this.onMessage.emit(mensaje);

    };

    /*postBonificaciones() {

        this.k=this.route.params

        .switchMap((params: Params) =>
        {


        return this.aplicabonificservice.postBonificaciones(this.id_benef,this.imp_cap,this.imp_int,this.imp_adm,this.imp_seg,
        this.imp_osg,this.imp_com,this.imp_mor,this.imp_tit,this.id_catbonific,this.id_autoriza)
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

    };*/


}
