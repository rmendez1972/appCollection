import { Component, OnInit, HostBinding, trigger, transition, animate, style, state } from '@angular/core';

import { Aplica_Mov_diversos } from './aplica_mov_diversos';
import { Benef_div } from './benef_div';
import { Aplica_Mov_diversosService} from './aplica_mov_diversos.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';

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
  private benef_div: Benef_div[];
  private k: Observable<Aplica_Mov_diversos[]>;
  private l: Observable<Benef_div[]>;


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
      
    }

    

}
