import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, Input, EventEmitter, Output } from '@angular/core';

import { Bonific_div } from './bonific_div';

import { BonificDivService} from './bonificacion_div.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

//import { AuthGuard } from '../_guards/index';

//import { UploadComponent} from '../upload/upload.component';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';




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

  @Input() valorcriterio:String;
  @Input() criterio:String;
  @Output() onMessage = new EventEmitter<String>();




  	constructor(
      private router: Router,
      private route: ActivatedRoute,
      private bonificdivservice: BonificDivService,
      private alertService:AlertService
    )
    {}


  	ngOnInit() {

    };
    title = 'Bonificaciones';

    message(mensaje:String){
      this.onMessage.emit(mensaje);

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
                         this.message('Recuperacion exitosa');
                        },
                       error =>  this.errorMessage = <any>error);


    };


}