import { Component, OnInit, HostBinding, trigger, transition, animate, style, state, Input, EventEmitter, Output } from '@angular/core';

import { Bonific } from './bonific';

import { BonificService} from './bonificacion.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

//import { AuthGuard } from '../_guards/index';

//import { UploadComponent} from '../upload/upload.component';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';




@Component({
  selector: 'app-bonific',
  templateUrl: './bonificacion.component.html',
  styleUrls: ['./bonificacion.component.css'],
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
export class BonificacionComponent implements OnInit {
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


  @Input() valorcriterio:String;
  @Input() criterio:String;
  @Output() onMessage = new EventEmitter<String>();




  	constructor(
      private router: Router,
      private route: ActivatedRoute,
      private bonificservice: BonificService,
      private alertService:AlertService
    )
    {}


  	ngOnInit() {

    };

    message(mensaje:String){
      this.onMessage.emit(mensaje);

    };


    getBonificaciones() {

        this.k=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          //this.selectedId= +params['id'];
          return this.bonificservice.getBonificaciones(this.criterio,this.valorcriterio)
        })

        this.k.subscribe(

                       bonificaciones =>{
                         this.bonific = bonificaciones;
                         this.message('Recuperacion exitosa');
                        },
                       error =>  this.errorMessage = <any>error);


    };


}
