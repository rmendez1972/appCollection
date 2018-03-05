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
import { Benef } from './benef';
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
  private aplicar: Aplicar;
  private currentUser: User;
  private beneficiario: Benef;
  private vencidos: Vencidos;
  private muestraBonificacion:boolean;
  private objeto:any;

  private imp_cap=Number;
  private imp_int=Number;
  private imp_adm=Number;
  private imp_seg=Number;
  private imp_osg=Number;
  private imp_com=Number;
  private imp_tit=Number;
  

  private model:any={};
  extraer:any={};
  extraerInit:any={};
  extraerPost:any={};

  //valores de salida del webcomponent
  @Output() onMessageAplicaBonific = new EventEmitter<String>();
  @Output() onerrorMessageAplicaBonific = new EventEmitter<String>();
  @Output() onMessageAplicaBonificSi = new EventEmitter<String>();
 


    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private aplicabonificservice: AplicaBonificService,
      private alertService:AlertService,
      private confirmService:ConfirmService,

    )
    {}


  	ngOnInit() {
      
      this.extraerInit = this.extraerLocalStorage();

      

      this.model.imp_int = this.extraerInit.imp_int;
      this.model.imp_adm = this.extraerInit.imp_adm;
      this.model.imp_seg = this.extraerInit.imp_seg;
      this.model.imp_osg = this.extraerInit.imp_osg;
      this.model.imp_com = this.extraerInit.imp_com;
      this.model.imp_tit = this.extraerInit.imp_tit;
      this.model.serie = this.extraerInit.serie;
      
      



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
    postBonificaciones(tipobonificaciones:number, moratorios:number,autoriza:number) {


      this.extraerPost =this.extraerLocalStorage();

      this.imp_cap=this.extraerPost.imp_cap;

      
        console.log('dentro de postBonificaciones de aplicabonificacioncomponent');
        this.k=this.route.params

        .switchMap((params: Params) =>
        {
        return this.aplicabonificservice.postBonificaciones(this.model.id_movedocta,this.model.id_benef,this.model.imp_cap,this.model.imp_int,this.model.imp_adm,this.model.imp_seg,
          this.model.imp_osg,this.model.imp_com,this.model.imp_mor,this.model.imp_tit,tipobonificaciones,this.model.estatus,this.model.id_usuario,this.model.id_autoriza,
          this.model.clave_b,this.model.recibo,this.model.serie,this.model.id_catprog);
        })

        this.k.subscribe(

                       bonificaciones =>{
                         console.log('se inserto la bonificacion');
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

    confirmarBonificacion() {
       this.confirmService.confirmBonificacion("Tiene Bonificaciones?",this.aplicabonificservice,this.onMessageAplicaBonificSi,function(bonificservice,eventemmitter){
              //ACTION: Do this If user says YES
              //this.pagar = aplicarservice.getPagar(fecha);
              eventemmitter.emit('SI');
              //bonificservice.siBonificacion();
            },function(eventemmitter){
              //ACTION: Do this if user says NO
              eventemmitter.emit(null);
      })

    };

    extraerLocalStorage(){
      //se recuperan valores del localStorage de Aplicar
      this.aplicar = JSON.parse(localStorage.getItem('aplicar'));

      //iterar en el localstorage de aplicar para almacenar los valores hacia las propiedades
      for (var y in this.aplicar) {
        this.extraer.imp_cap = this.aplicar[y].capital;
        this.extraer.imp_int = this.aplicar[y].interes;
        this.extraer.imp_adm = this.aplicar[y].admon;
        this.extraer.imp_seg = this.aplicar[y].seguro;
        this.extraer.imp_osg = this.aplicar[y].oseg;
        this.extraer.imp_com = this.aplicar[y].com;
        this.extraer.imp_tit = this.aplicar[y].tit;


      }

      //el valor de estatus se declara como un valor fijo
      this.extraer.estatus = 'A';


      //se recuperan valores del localStorage de CurrentUser
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      //iterar en el localstorage de currentuser para almacernar los valores hacia las propiedades
      for (var elemento in this.currentUser) {
        this.extraer.id_movedocta=this.currentUser[elemento].id_mov_edoscta;//
        this.extraer.id_usuario=this.currentUser[elemento].id;
        this.extraer.recibo = this.currentUser[elemento].folio_final;
        this.extraer.serie = this.currentUser[elemento].serie;

      }

      //se recuperan valores del localStorage de vencidos
      this.beneficiario = JSON.parse(localStorage.getItem('beneficiario'));
      console.log('valor de this.beneficiario '+this.beneficiario);
      //iterar en el localstorage de vencidos para almacernar los valores hacia las propiedades
      for (var x in this.beneficiario) {
        this.extraer.id_benef = this.beneficiario[x].id_beneficiario;
        this.extraer.clave_b=this.beneficiario[x].clave_b;
        this.extraer.id_catprog = this.beneficiario[x].id_catprog;
      }

      //console.log("VALOR EXTRAER capital"+this.extraer.imp_cap);
      return this.extraer;

    }


}