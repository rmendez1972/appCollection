import { Component, OnInit, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { Caja } from './caja';
import {CajaService} from './caja.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/index';


@Component({
  selector: 'app-caja-edit',
  templateUrl: './caja-edit.component.html',
  styleUrls: ['./caja-edit.component.css'],
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
export class CajaEditComponent implements OnInit {
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
  private cajas: Caja[];
  private miMensajeEdit:String;
  private miMensajeerrorEdit:String;



  private caja: Caja;
  private k: Observable<Caja[]>;

  private cajasruta: string;



  model:any={};

  currentUser:Array<any>;


    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private cajaservice: CajaService

    )
    {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      let x=0;
      //for (x=0;x<this.currentUser.length;x++){
      //  this.idSolicitante=this.currentUser[x].id;

      //}
    }


  	ngOnInit() {
      this.model.id_caja=  this.route.snapshot.params.id_caja;
      this.model.fecha=  this.route.snapshot.params.fecha;
      this.model.folio_inicial= this.route.snapshot.params.folio_inicial;
      this.model.folio_final=  this.route.snapshot.params.folio_final;
      this.model.poliza= this.route.snapshot.params.poliza;
      this.model.monto_inicial= +this.route.snapshot.params.monto_inicial;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      for (var elemento in this.currentUser) {
          this.model.id=this.currentUser[elemento].id;

      }

    };


  	title = 'Edición de Caja';

    onEditCaja(){


      if ((this.model.fecha!=undefined) && (this.model.folio_inicial!=null ) && (this.model.folio_inicial!='') && (this.model.folio_inicial!=0) && (this.model.folio_final!=null) && (this.model.folio_final!='')  && (this.model.monto_inicial!=null) && (this.model.monto_inicial!='') && (this.model.monto_inicial!=0)){

        this.miMensajeerrorEdit=null;
        this.postEdicion_caja(this.model.id_caja,this.model.fecha,this.model.folio_inicial,this.model.folio_final,this.model.poliza,this.model.monto_inicial,this.model.id);
        //this.getBenef(this.model.criterio,this.model.valorcriterio);

      }else{
        this.miMensajeEdit=null;
        this.miMensajeerrorEdit = "Error en la edición de la caja, por favor llena los campos correctamente..";
      }
    }


    postEdicion_caja(id_caja:number,fecha:string,folio_inicial:number,folio_final:number,poliza:string,monto_inicial:number,id:number) {

        this.k=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          //this.selectedId= +params['id'];
          return this.cajaservice.postEdicion_caja(id_caja,fecha,folio_inicial,folio_final,poliza,monto_inicial,id)
        })

        this.k.subscribe(

                       cajas => {
                         this.cajas = cajas;
                         this.miMensajeEdit = "Edición Exitosa de la Caja";
                         setTimeout(() => this.router.navigate(['cajas/listar']), 3000);

                        },
                       error =>  this.errorMessage = <any>error);


    };




}
