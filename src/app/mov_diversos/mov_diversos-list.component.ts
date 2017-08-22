/*
  Componenete para listar los movimiento diversos de un bebeficiario
  Ismael García
  18/08/2017
  app-diversos
*/ 

import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';
import { Mov_diversos } from './mov_diversos';
import { Benef_div } from './benef_div';
import { Mov_diversosService} from './mov_diversos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';

@Component({
  selector: 'app-diversos',
  templateUrl: './mov_diversos-list.component.html',
  styleUrls: ['./mov_diversos-list.component.css'],
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

export class Mov_diversosListComponent implements OnInit {
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
  //private solicitantes: Solicitante[];
  private mov_diversos: Mov_diversos[];
  private benef_div: Benef_div[];
  //private solicitudes: Solicitud[];
  //private tramites: Tramite[];
  //private seguimientos: Seguimiento[];
  //private solicitante: Solicitante;
  //private x: Observable<Solicitante[]>;
  //private y: Observable<Solicitud[]>;
  //private z: Observable<Tramite[]>;
  //private a: Observable<Seguimiento[]>;
  private k: Observable<Mov_diversos[]>;
  private l: Observable<Benef_div[]>;
  //private e: Observable<Seguimiento[]>;
  private selectedId:   number;
  private idSolicitud:  number;
  public  idsolicitud:  number;
  public  idsolicitante:number;
  private miMensaje:    String;

  constructor(
      private router: Router,
      private route:  ActivatedRoute,
      private mov_diversosservice: Mov_diversosService,
      private alertService:AlertService
    )
    {
      this.idsolicitud= this.route.snapshot.params['id']; //recuperando en el constructor el parametro pasado de idsolicitud
      this.idsolicitante= this.route.snapshot.params['idSol'];
    }


  	ngOnInit() {

    };

  	title = 'Estado de Cuenta Movimientos diversos';
    //selectedSolicitante: Solicitante;
    localizaBenefMov_diversos(){
      this.getMov_diversos(this.model.criterio,this.model.valorcriterio);
      this.getBenef_div(this.model.criterio,this.model.valorcriterio);

    }

    getMov_diversos(criterio:String,valorcriterio:String) {
        this.k=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          this.selectedId= +params['id'];
          return this.mov_diversosservice.getMov_diversos(criterio,valorcriterio)
        })

        this.k.subscribe(

                       movimientos => this.mov_diversos = movimientos,
                       error =>  this.errorMessage = <any>error);
    };

    getBenef_div(criterio:String,valorcriterio:String) {
        this.l=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          this.selectedId= +params['id'];
          return this.mov_diversosservice.getBenef_div(criterio,valorcriterio)
        })

        this.l.subscribe(

                       beneficiario => this.benef_div = beneficiario,
                       error =>  this.errorMessage = <any>error);


    };

    onMessage(mensaje:String){
      console.log("Recuperacion exitosa dentro de componente padre "+mensaje);
      this.miMensaje = mensaje;
    }

}
