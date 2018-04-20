import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, Input, EventEmitter, Output } from '@angular/core';

import { Bonific_div } from './bonific_div';

import { AplicaBonificServiceDiv} from './aplicabonificaciondiv.service';
//import { Mov_edoctaService } from './mov_edocta.service'; se cambiara a movdiversos services
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Mov_diversosService } from './mov_diversos.service';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
import { User } from '../_models/index';
//import { Vencidos } from './vencidos';
//import { Aplicar } from  './aplicar';
import { Benef } from './benef';
import { ConfirmService} from '../_services/index';
import { CajaService} from '../apertura_caja/caja.service';

//marlon
@Component({
  selector: 'app-aplicabonificdiv',
  templateUrl: './aplicabonificaciondiv.component.html',
  styleUrls: ['./aplicabonificaciondiv.component.css'],
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
export class AplicaBonificacionDivComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'relative';
  }

  private miMensajeAplicaBons: string;
  private miMensajeerrorAplicaBons: string;
  private errorMessage: string;
  private bonific: Bonific_div[];

  private k: Observable<Bonific_div[]>;

  private l: Observable<boolean[]>;

  private n: Observable<Bonific_div[]>;

  //private aplicar: Aplicar;
  private currentUser: User;
  private beneficiario: Benef;
  //private vencidos: Vencidos;
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
  private id_movdiversos=0;
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
      private aplicabonificservice: AplicaBonificServiceDiv,
      private alertService:AlertService,
      private confirmService:ConfirmService,
      private cajaservice: CajaService,
      private mov_diversosservice:Mov_diversosService

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
      this.model.imp_mor = this.extraerInit.imp_mor;
      this.model.serie = this.extraerInit.serie;
      this.model.estatus = this.extraerInit.estatus;


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
      console.log('DENTRO DE POSTBONIFICACIONES DENTRO DE  aplicabonificacion.component DESPUES DE APLICAR EL PAGO');
      this.extraerPost =this.extraerLocalStorage();

      //asignando valores a las propiedades
      this.id_movdiversos = this.extraerPost.id_movdiversos;
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

      
      /*console.log("valor de id_movdiversos: "+this.id_movdiversos);
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
      console.log("valor de id_catprog: "+this.id_catprog);*/
      
        this.k=this.route.params

        .switchMap((params: Params) =>

        {

        //console.log('VALOR DE this.id_movdiversos antes de llamar al BACK-END '+this.id_movdiversos);
        return this.aplicabonificservice.postBonificaciones(this.id_movdiversos,this.id_benef,this.imp_cap,this.imp_int,this.imp_adm,this.imp_seg,
          this.imp_osg,this.imp_com,this.imp_mor,this.imp_tit,this.id_catbonific,this.estatus,this.id_usuario,this.id_autoriza,
          this.clave_b,this.recibo,this.serie,this.id_catprog);
        })

        this.k.subscribe(
                       bonificaciones =>{
                         console.log('SE INSERTO LA BONIFICACION EXITOSAMENTE...');
                         this.bonific = bonificaciones;
                         this.messageAplicaBonific('Se insertó la bonificación exitosamente');
                         this.errormessageAplicaBonific(null);
                        
                         console.log('el valor de id_bonificacion es '+bonificaciones[2]);

                          //actualizacion del folio al catalogo de caja
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

                         let idmovedocta;
                         let idbonificacion;
                         for (let i = 0; i < 1; i++) {
                          idmovedocta = bonificaciones[0];
                          idbonificacion = bonificaciones[2];
                         }

                          this.n=this.route.params

                          .switchMap((params: Params) =>
                          {
                          return this.mov_diversosservice.postUpdateMovDiversos(idmovedocta,idbonificacion);
                          })

                          this.n.subscribe(
                            movedocta =>{
                              console.log('se actualizo la bonificacion y el id_bonificacion en id_movdiversos');

                            },
                            error =>{
                              this.errorMessage = <any>error;
                              //this.errormessageAplicaBonific('Error en la inserción de datos');
                              //this.messageAplicaBonific(null);
                            });


                            
                        },
                       error =>{
                         this.errorMessage = <any>error;
                         this.errormessageAplicaBonific('Error en la inserción de datos');
                         this.messageAplicaBonific(null);
                       });
    };

    /*confirmarBonificacion() {
       this.confirmService.confirmBonificacion("Tiene Bonificaciones?",this.aplicabonificservice,this.onMessageAplicaBonificSi,function(bonificservice,eventemmitter){
              //ACTION: Do this If user says YES
              //this.pagar = aplicarservice.getPagar(fecha);
              eventemmitter.emit('SI');
              //bonificservice.siBonificacion();
            },function(eventemmitter){
              //ACTION: Do this if user says NO
              eventemmitter.emit(null);
      })

    };*/

    extraerLocalStorage(){
      
        this.extraer.imp_cap = 0;
        this.extraer.imp_int = 0;
        this.extraer.imp_adm = 0;
        this.extraer.imp_seg = 0;
        this.extraer.imp_osg = 0;
        this.extraer.imp_com = 0;
        this.extraer.imp_tit = 0;
        this.extraer.imp_mor = 0;


      
      //el valor de estatus se declara como un valor fijo
      this.extraer.estatus = 'A';


      //se recuperan valores del localStorage de CurrentUser
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      //iterar en el localstorage de currentuser para almacernar los valores hacia las propiedades
      for (var elemento in this.currentUser) {
        this.extraer.id_movdiversos=this.currentUser[elemento].id_mov_diversos;//
        this.extraer.id_usuario=this.currentUser[elemento].id;
        this.extraer.recibo = this.currentUser[elemento].folio_final;
        this.extraer.serie = this.currentUser[elemento].serie;

      }

       console.log('VALOR DE ID_MOV_EDOSCTA RECUPERADO DE LOCAL STORAGE EN APLICABONIFICACION.COMPONENT '+this.extraer.id_movdiversos);

      //se recuperan valores del localStorage de beneficiario
      this.beneficiario = JSON.parse(localStorage.getItem('beneficiario_div'));
      console.log('valor de this.beneficiario '+this.beneficiario);
      //iterar en el localstorage de beneficiario para almacernar los valores hacia las propiedades
      for (var x in this.beneficiario) {
        this.extraer.id_benef = this.beneficiario[x].id_bendiv;
        this.extraer.clave_b=this.beneficiario[x].clave_b;
        this.extraer.id_catprog = this.beneficiario[x].id_catprog;
      }

      //console.log("VALOR EXTRAER capital"+this.extraer.imp_cap);
      return this.extraer;

    }



}