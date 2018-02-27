import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, Input, EventEmitter, Output } from '@angular/core';

import { Bonific } from './bonific';

import { AplicaBonificService} from './aplicabonificacion.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
import { User } from '../_models/index';
import { Vencidos } from './vencidos';
import { Aplicar } from  './aplicar';
//marlon



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
  private aplicar: Aplicar;
  private currentUser: User;
  private vencidos: Vencidos;
  model:any={};

  //valores de salida del webcomponent
  @Output() onMessageAplicaBonific = new EventEmitter<String>();
  @Output() onerrorMessageAplicaBonific = new EventEmitter<String>();


  	constructor(
      private router: Router,
      private route: ActivatedRoute,
      private aplicabonificservice: AplicaBonificService,
      private alertService:AlertService
    )
    {}


  	ngOnInit() {


      //se recuperan valores del localStorage de Aplicar
      this.aplicar = JSON.parse(localStorage.getItem('aplicar'));

      //iterar en el localstorage de aplicar para almacenar los valores hacia las propiedades
      for (var y in this.aplicar) {
        this.model.id_benef = this.aplicar[y].id_benef;
        this.model.imp_cap = this.aplicar[y].imp_cap;
        this.model.imp_int = this.aplicar[y].imp_int;
        this.model.imp_adm = this.aplicar[y].imp_adm;
        this.model.imp_seg = this.aplicar[y].imp_seg;
        this.model.imp_osg = this.aplicar[y].imp_osg;
        this.model.id_catbonific = this.aplicar[y].id_catbonific;
        this.model.id_autoriza = this.aplicar[y].id_autoriza;
        this.model.imp_com = this.aplicar[y].imp_com;
        this.model.imp_mor = this.aplicar[y].imp_mor;
        this.model.imp_tit = this.aplicar[y].imp_tit;
        this.model.id_catprog = this.aplicar[y].id_catprog;

      }
      
      //el valor de estatus se declara como un valor fijo
      this.model.estatus = 'A';
      
      //se recuperan valores del localStorage de CurrentUser
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      //iterar en el localstorage de currentuser para almacernar los valores hacia las propiedades
      for (var elemento in this.currentUser) {
        this.model.id_movedocta=this.currentUser[elemento].id_movedocta;
        this.model.id_usuario=this.currentUser[elemento].id;
        this.model.recibo = this.currentUser[elemento].folio_final;
        this.model.serie = this.currentUser[elemento].serie;

      }

      //se recuperan valores del localStorage de vencidos
      this.vencidos = JSON.parse(localStorage.getItem('vencidos'));
      //iterar en el localstorage de vencidos para almacernar los valores hacia las propiedades
      for (var x in this.vencidos) {
        this.model.clave_b=this.vencidos[x].clave_b;
      }
    
    //fin Oinit
    };

    //mensaje de salida de exito
    messageAplicaBonific(mensaje:String){
      this.onMessageAplicaBonific.emit(mensaje);
    };

    //mensajde de salida de fracaso
    errormessageAplicaBonific(mensaje:String){
      this.onerrorMessageAplicaBonific.emit(mensaje);
    };

    //Metodo en donde se realizara la insercion de las bonificaciones
    postBonificaciones() {

        this.k=this.route.params

        .switchMap((params: Params) =>
        {


        return this.aplicabonificservice.postBonificaciones(this.model.id_movedocta,this.model.id_benef,this.model.imp_cap,this.model.imp_int,this.model.imp_adm,this.model.imp_seg,
          this.model.imp_osg,this.model.imp_com,this.model.imp_mor,this.model.imp_tit,this.model.id_catbonific,this.model.estatus,this.model.id_usuario,this.model.id_autoriza,
          this.model.clave_b,this.model.recibo,this.model.serie,this.model.id_catprog)
        })

        this.k.subscribe(

                       bonificaciones =>{
                         this.bonific = bonificaciones;
                         this.messageAplicaBonific('Se insertaron las bonificaciones');
                         this.errormessageAplicaBonific(null);
                        },
                       error =>{
                         this.errorMessage = <any>error;
                         this.errormessageAplicaBonific('Error en la inserción de datos');
                         this.messageAplicaBonific(null);
                       });
    };


}
