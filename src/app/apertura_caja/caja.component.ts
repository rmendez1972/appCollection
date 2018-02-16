import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';
import { Caja } from './caja';
import { CajaService} from './caja.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
import { User } from '../_models/index';

//import { centavos } from '../_pipes/centavos.pipe';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css'],
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
export class CajaComponent implements OnInit {
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

  private k: Observable<boolean>;
  private selectedId: number;
  private miMensajeApertura:String;
  private miMensajeerrorApertura:String;
  private fecha:String;
  private bonific:String = "fa fa-check";
  private nobonific: String = "fa fa-times";
  public totalvencidos: number=0;

  private totales_style:String = "info";
  private renglon_style:String = "active";
  private totalmov_edoscta:number=0;
  private cajas:Caja[];
  private respuesta:boolean;
  private currentUser: User;


    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private cajaservice: CajaService,
      private alertService:AlertService

    )
    {

    }


    ngOnInit() {
      this.model.fecha= new Date().toJSON();
      this.model.folio_inicial=1;
      this.model.folio_final=1;
      this.model.poliza='I001';
      this.model.monto_inicial=100.00;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      for (var elemento in this.currentUser) {
          this.model.id=this.currentUser[elemento].id;

      }

    };

    title = 'Apertura de Caja';

    aperturaCaja(){

      if ((this.model.fecha!=undefined) && (this.model.folio_inicial!=null ) && (this.model.folio_inicial!='') && (this.model.folio_inicial!=0) && (this.model.folio_final!=null) && (this.model.folio_final!='') && (this.model.folio_final!=0) && (this.model.monto_inicial!=null) && (this.model.monto_inicial!='') && (this.model.monto_inicial!=0)){
        this.miMensajeApertura='Caja Aperturada Exitosamente..';
        this.miMensajeerrorApertura=null;
        this.postApertura_caja(this.model.fecha,this.model.folio_inicial,this.model.folio_final,this.model.poliza,this.model.monto_inicial,this.model.id);
        //this.getBenef(this.model.criterio,this.model.valorcriterio);
      }else{
        this.miMensajeApertura=null;
        this.miMensajeerrorApertura = "Error en la apertura de la caja, por favor llena los campos correctamente..";
      }
    }


    postApertura_caja(fecha:string,folio_inicial:number,folio_final:number,poliza:string,monto_inicial:number,id:number) {
        this.k=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          //this.selectedId= +params['id'];
          return this.cajaservice.postApertura_caja(fecha,folio_inicial,folio_final,poliza,monto_inicial,id)
        })

        this.k.subscribe(

                       respuesta => {
                         console.log('valor de respuesta dentro de controlador '+respuesta);
                         let valor=new String(respuesta[0]);
                         console.log('tipo de valor  '+typeof(valor));


                         if (valor!="false"){
                           this.miMensajeApertura = "Apertura Exitosa de la Caja, ya puede aplicar movimientos";
                           this.miMensajeerrorApertura=null;
                           console.log('dentro del true');

                         }else{
                           console.log('dentro del false');
                           this.miMensajeApertura = null;
                           this.miMensajeerrorApertura="Ya fue abierta la caja el día de hoy, favor de editarla";
                         }


                         setTimeout(() => this.router.navigate(['cajas/listar']), 4000);
                        },
                       error =>  this.errorMessage = <any>error);


    };



}