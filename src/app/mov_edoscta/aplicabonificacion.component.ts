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
import { CajaService} from '../apertura_caja/caja.service';

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

  private miMensajeAplicaBons: string='Aqui debe ir el mensaje';
  private miMensajeerrorAplicaBons: string;
  private errorMessage: string;
  private bonific: Bonific[];

  private k: Observable<Bonific[]>;
  private l: Observable<boolean[]>;
  private aplicar: Aplicar;
  private currentUser: User;
  private beneficiario: Benef;
  private vencidos: Vencidos;
  private muestraBonificacion:boolean;
  private objeto:any;

  private imp_cap=0;
  private imp_int=0;
  private imp_adm=0;
  private imp_seg=0;
  private imp_osg=0;
  private imp_com=0;
  private imp_tit=0;
  private imp_mor=0;
  private id_movedocta=0;
  private id_benef=0;
  private id_catprog=0;
  private estatus;
  private id_usuario=0;
  private id_autoriza=0;
  private id_catbonific=0;
  private clave_b;
  private recibo;
  private serie;


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
      private cajaservice: CajaService,

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
    messageAplicaBonific(mensaje:string){
      console.log('mensaje apunto de emitir desde aplicabonificacion '+mensaje);
      //this.onMessageAplicaBonific.emit(mensaje);
      this.miMensajeAplicaBons=mensaje;
    };

    //mensajde de salida de fracaso
    errormessageAplicaBonific(mensaje:string){
      //this.onerrorMessageAplicaBonific.emit(mensaje);
      this.miMensajeerrorAplicaBons=mensaje;
    };

    //Metodo en donde se realizara la insercion de las bonificaciones
    postBonificaciones(tipobonificaciones:number, moratorios:number,autoriza:number) {

      this.extraerPost =this.extraerLocalStorage();

      //asignando valores a las propiedades
      this.id_movedocta = this.extraerPost.id_movedocta;
      this.id_benef = this.extraerPost.id_benef;
      this.imp_cap=moratorios;
      this.imp_int=this.extraerPost.imp_int;
      this.imp_adm=this.extraerPost.imp_adm;
      this.imp_seg=this.extraerPost.imp_seg;
      this.imp_osg=this.extraerPost.imp_osg;
      this.imp_com=this.extraerPost.imp_com;
      this.imp_tit=this.extraerPost.imp_tit;
      this.id_catbonific=tipobonificaciones;
      this.estatus=this.extraerPost.estatus;
      this.id_usuario=this.extraerPost.id_usuario;
      this.id_autoriza=autoriza;
      this.clave_b=this.extraerPost.clave_b;
      this.recibo=this.extraerPost.recibo;
      this.serie=this.extraerPost.serie;
      this.id_catprog=this.extraerPost.id_catprog;


      console.log("valor de id_movedocta: "+this.id_movedocta);
      console.log("valor de beneficiario: "+this.id_benef);
      console.log("valor de moratorios: "+this.imp_cap);
      console.log("valor de imp_int: "+this.imp_int);
      console.log("valor de imp_adm: "+this.imp_adm);
      console.log("valor de imp_seg: "+this.imp_seg);
      console.log("valor de imp_osg: "+this.imp_osg);
      console.log("valor de imp_com: "+this.imp_com);
      console.log("valor de imp_mor: "+this.imp_mor);
      console.log("valor de imp_tit: "+this.imp_tit);
      console.log("valor de id_catbonific: "+this.id_catbonific);
      console.log("valor de estatus: "+this.estatus);
      console.log("valor de id_usuario: "+this.id_usuario);
      console.log("valor de id_autoriza: "+this.id_autoriza);
      console.log("valor de clave_b: "+this.clave_b);
      console.log("valor de recibo: "+this.recibo);
      console.log("valor de serie: "+this.serie);
      console.log("valor de id_catprog: "+this.id_catprog);

        this.k=this.route.params

        .switchMap((params: Params) =>
        {
        return this.aplicabonificservice.postBonificaciones(this.id_movedocta,this.id_benef,this.imp_cap,this.imp_int,this.imp_adm,this.imp_seg,
          this.imp_osg,this.imp_com,this.imp_mor,this.imp_tit,this.id_catbonific,this.estatus,this.id_usuario,this.id_autoriza,
          this.clave_b,this.recibo,this.serie,this.id_catprog);
        })

        this.k.subscribe(

                       bonificaciones =>{
                         console.log('se inserto la bonificacion exitosamente');
                         this.bonific = bonificaciones;
                         this.messageAplicaBonific('Se insertó la bonificación exitosamente');
                         this.errormessageAplicaBonific(null);
                         console.log('el valor de id_bonificacion es '+bonificaciones[2]);


                             this.l=this.route.params

                            .switchMap((params: Params) =>
                            {
                            return this.cajaservice.postUpdate_caja();
                            })

                            this.l.subscribe(

                             cajas =>{
                               console.log('se actualizo el folio final de la caja exitosamente');


                              },
                             error =>{
                               this.errorMessage = <any>error;

                             });


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