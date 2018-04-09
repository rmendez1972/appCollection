import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';

import { Aplica_Mov_diversos } from './aplica_mov_diversos';
import { Benef_div } from './benef_div';
import { Mov_diversos } from './mov_diversos';
import { Aplica_Mov_diversosService} from './aplica_mov_diversos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
import { ConfirmService} from '../_services/index';

@Component({
  selector: 'app-diversos',
  templateUrl: './aplica_mov_diversos-list.component.html',
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

export class Aplica_Mov_diversosListComponent implements OnInit {
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
  private aplcia_mov_diversos: Aplica_Mov_diversos[];
  private mov_diversos: Mov_diversos[];
  private benef_div: Benef_div[];
  private k: Observable<Mov_diversos[]>;
  private l: Observable<Benef_div[]>;
  private miMensajeerrorMovs:String;
  private miMensajeMovs:String;
  private miMensajeBenef:string;

  private aplicado:String = "fa fa-check";
  private noaplicado: String = "fa fa-times";


  optionsSelect = [
    {id:1, value: "clave_lector", name: "Clave de Elector(INE)"},
    {id:2, value: "clave_curp", name: "CURP"},
    {id:3, value: "clave_b", name: "Clave SEDETUS"},
    {id:4, value: "nombre", name: "Nombre de Beneficiario"}

];
private seleccionado:String="clave_b";

  constructor(
      private router: Router,
      private route:  ActivatedRoute,
      private aplica_mov_diversosservice: Aplica_Mov_diversosService,
      private alertService:AlertService
    )
    {
      
    }

  	ngOnInit() {
      this.model.fecha_corte=new Date()
      this.model.valorcriterio=null;
    };

  	title = 'Movimientos diversos';
 
    localizaBenefMov_diversos(){
      console.log('valor de model.criterio '+this.model.criterio);
      console.log('valor de model.valorcriterio '+this.model.valorcriterio);
      if ((this.model.criterio!=undefined) && (this.model.valorcriterio!=null )){
        this.miMensajeerrorMovs=null;
        this.getMov_diversos(this.model.criterio,this.model.valorcriterio);
        this.getBenef_div(this.model.criterio,this.model.valorcriterio);
        
      }else{
        this.miMensajeMovs=null;
        this.miMensajeerrorMovs = "Error en recuperación de Movimientos diversos, por favor llena los campos..";
      }
      
    }

    getMov_diversos(criterio:String,valorcriterio:String) {
      this.k=this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) =>
      {
        return this.aplica_mov_diversosservice.getMov_diversos(criterio,valorcriterio)
      })

      this.k.subscribe(
        
        movimientos => {
          this.mov_diversos = movimientos;  
          
          this.miMensajeMovs = "Recuperación Exitosa de los Movimientos diversos";
          this.errorMessage = null;
         },
        error =>  {this.errorMessage = "no se pudo localizar los movimientos diversos"; 
                   this.miMensajeMovs = null;  
                  this.mov_diversos = null;});

        //movimientos => this.mov_diversos = movimientos,
        //error =>  this.errorMessage = <any>error);
    };

  getBenef_div(criterio:String,valorcriterio:String) {
      this.l=this.route.params
      // (+) converts string 'id' to a number
      .switchMap((params: Params) =>
      {
        //this.selectedId= +params['id'];
           return this.aplica_mov_diversosservice.getBenef_div(criterio,valorcriterio)
      })

      this.l.subscribe(

                     beneficiario => {
                       this.benef_div = beneficiario;
                     
                     if (this.benef_div.length>0){
                       console.log("Encontrado!!!!");
                      this.miMensajeBenef="Encontrado";
                     }else {this.miMensajeBenef=null}
                    },
                     error =>  this.errorMessage = <any>error);

  };



    

}
