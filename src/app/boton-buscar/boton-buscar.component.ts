import { Component, OnInit, HostBinding} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Seguimiento } from '../seguimientos/seguimiento';
import { SeguimientoRoutingModule} from '../seguimientos/seguimientos-routing.module';
import { AlertService} from '../_services/index';
import { User } from '../_models/index';

@Component({
  selector:    'app-boton-buscar',
  templateUrl: './boton-buscar.component.html',
  styleUrls:  ['./boton-buscar.component.css'],
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
        animate('0.3s ease-out', style({
          opacity: 0,
          transform: 'translateY(90%)'
        }))
      ])
    ])
  ]
})
export class BotonBuscarComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'relative';
  }


  private idSolicitante:number;
  currentUser:Array<any>;

  constructor(
     private router: Router,
     private alertService: AlertService

  ) { }

  ngOnInit() {
  }

    enviaSolicitud(idSolicitud:number) {
      //recuperar del currentUser solo el id
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      let x=0;
      for (x=0;x<this.currentUser.length;x++){
        this.idSolicitante=this.currentUser[x].id;

      }
      //alert('el id del solicitante es: '+this.idSolicitante);

     if (idSolicitud>0) {
       this.router.navigate(['/seguimientos',idSolicitud,this.idSolicitante])
      } else {
        this.alertService.error("Núm. Solicitud NO válida...")
      }

	  }

}
