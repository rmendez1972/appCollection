import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, Input, EventEmitter, Output } from '@angular/core';

import { Bonific } from './bonific';

import { AplicaBonificService} from './aplicabonificacion.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
import { User } from '../_models/index';
import { Vencidos } from './vencidos';
import { ConfirmService} from '../_services/index';
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
  public currentUser: User;
  private vencidos: Vencidos;
  private muestraBonificacion:boolean;
  private objeto:any;

  model:any={};

  //valores de salida del webcomponent
  @Output() onMessageAplicaBonific = new EventEmitter<String>();
  @Output() onerrorMessageAplicaBonific = new EventEmitter<String>();
  @Output() onMessageAplicaBonificSi = new EventEmitter<String>();

  //valores de entrada del webcomponent
  @Input() id_benef:Number;
  @Input() imp_cap:Number;
  @Input() imp_int:Number;
  @Input() imp_adm:Number;
  @Input() imp_seg:Number;
  @Input() imp_osg:Number;
  @Input() id_catbonific:Number;
  @Input() id_autoriza:Number;
  @Input() imp_com:Number;
  @Input() imp_mor:Number;
  @Input() imp_tit:Number;
  @Input() id_catprog: Number;



  	constructor(
      private router: Router,
      private route: ActivatedRoute,
      private aplicabonificservice: AplicaBonificService,
      private alertService:AlertService,
      private confirmService:ConfirmService,

    )
    {}


  	ngOnInit() {
      //Propiedades de la clase inicializandolos con los valores de entrada
      //this.muestraBonificacion=true;
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
    postBonificaciones(tipobonificaciones:number, moratorios:number) {
      console.log("Tipo de bonificaciones: "+ tipobonificaciones);
      console.log("Moratorios :" +moratorios);

        this.k=this.route.params

        .switchMap((params: Params) =>
        {
        return this.aplicabonificservice.postBonificaciones(this.model.id_movedocta,this.model.id_benef,this.model.imp_cap,this.model.imp_int,this.model.imp_adm,this.model.imp_seg,
          this.model.imp_osg,this.model.imp_com,this.model.imp_mor,this.model.imp_tit,this.model.id_catbonific,this.model.estatus,this.model.id_usuario,this.model.id_autoriza,
          this.model.clave_b,this.model.recibo,this.model.serie,this.model.id_catprog);
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

    public hola(){
      console.log('hola');
    }

    confirmarBonificacion() {


      console.log('dentro de confirmarBonificacion ');
       this.confirmService.confirmBonificacion("Tiene Bonificaciones?",this.aplicabonificservice,this.onMessageAplicaBonificSi,function(bonificservice,eventemmitter){
              //ACTION: Do this If user says YES
              //this.pagar = aplicarservice.getPagar(fecha);
              console.log('tipo de bonificservice '+typeof(bonificservice));
              console.log('apunto de emitir ');
              eventemmitter.emit('SI');
              //bonificservice.siBonificacion();
            },function(eventemmitter){
              //ACTION: Do this if user says NO
              console.log('dentro del NO');
              eventemmitter.emit(null);
      })

    };


}
