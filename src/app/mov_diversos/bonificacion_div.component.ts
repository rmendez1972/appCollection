import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, Input, EventEmitter, Output } from '@angular/core';

import { Bonific_div } from './bonific_div';

import { BonificDivService} from './bonificacion_div.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

//import { AuthGuard } from '../_guards/index';

//import { UploadComponent} from '../upload/upload.component';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';
import { ConfirmService} from '../_services/index';


@Component({
  selector: 'app-bonific-div',
  templateUrl: './bonificacion_div.component.html',
  styleUrls: ['./bonificacion_div.component.css'],
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
export class BonificacionDivComponent implements OnInit {
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
  private bonific_div: Bonific_div[];

  private k: Observable<Bonific_div[]>;
  private totalbon_diversos:number =0;
  private totales_style:String = "info";
  private renglon_style:String = "active";

  //private miMensajeerrorMovs:String;
  //private miMensajeBons:String;
  //private miMensajeBonsError:String;

 
  @Input() fecha_corte:String;
  @Input() valorcriterio:String;
  @Input() criterio:String;
  @Output() onMessage = new EventEmitter<String>();
  @Output() onMessage2 = new EventEmitter<String>();
  
  @Output() onMessageAplicaBonificSi = new EventEmitter<String>();
  

  	constructor(
      private router: Router,
      private route: ActivatedRoute,
      private bonificdivservice: BonificDivService,
      private alertService:AlertService,
      private confirmService:ConfirmService,
      private bonificservice: BonificDivService,
    )
    {}


  	ngOnInit() {

    };
    title = 'Bonificaciones';

    message(mensaje:String){
      this.onMessage.emit(mensaje);
    };

    message2(mensaje2:String){
      this.onMessage2.emit(mensaje2);
    };


    getBonificaciones() {

        this.k=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          //this.selectedId= +params['id'];
          return this.bonificdivservice.getBonificaciones(this.criterio,this.valorcriterio)
        })

        this.k.subscribe(

          bonificaciones_div =>{
            this.bonific_div = bonificaciones_div;
            this.totalbon_diversos = this.bonific_div.length-1;
            if (this.bonific_div.length>1){
              //this.miMensajeBonsError=null;
              this.message2('');
              this.message('Recuperacion Exitosa de las bonificaciones de diversos');
              
            }
            else{
              //this.miMensajeBons=null;
              this.message('');
              this.message2('Sin bonificaciones');
      
              
            }
            
            //this.message('Recuperacion Exitosa de las bonificaciones de diversos');
          
          },
        error =>  this.errorMessage = <any>error);


    };

    confirmarBonificacionDiversos(){
      this.confirmService.confirmBonificacionDiversos("Tiene Bonificaciones?",this.bonificservice,this.onMessageAplicaBonificSi,function(bonificservice,eventemmitter){
              //ACTION: Do this If user says YES
              //this.pagar = aplicarservice.getPagar(fecha);
              eventemmitter.emit('SI');
              console.log("Despues de emitir si");
              //bonificservice.siBonificacion();
            },function(eventemmitter){
              //ACTION: Do this if user says NO
              eventemmitter.emit(null);
              console.log("Despues de emitir no/null");
      })
    };

    validaUltimoBon(i:number){
      if (i==this.totalbon_diversos) {
        return true;
      }else{

        return false;

      }
    }


}
