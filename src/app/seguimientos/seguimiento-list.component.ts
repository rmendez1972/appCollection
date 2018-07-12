import { Component, OnInit, HostBinding} from '@angular/core';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { Solicitante } from './solicitante';
import { Solicitud } from './solicitud';
import { Tramite } from './tramite';
import { Seguimiento } from './seguimiento';
import { SeguimientoService} from './seguimiento.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import { AuthGuard } from '../_guards/index';

//import { UploadComponent} from '../upload/upload.component';

import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AlertService} from '../_services/index';


@Component({
  selector: 'app-seguimiento-list',
  templateUrl: './seguimiento-list.component.html',
  styleUrls: ['./seguimiento-list.component.css'],
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
export class SeguimientoListComponent implements OnInit {
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
  private solicitantes: Solicitante[];
  private solicitudes: Solicitud[];
  private tramites: Tramite[];
  private seguimientos: Seguimiento[];
  private solicitante: Solicitante;
  private x: Observable<Solicitante[]>;
  private y: Observable<Solicitud[]>;
  private z: Observable<Tramite[]>;
  private a: Observable<Seguimiento[]>;

  private e: Observable<Seguimiento[]>;

  private selectedId: number;
  private idSolicitud: number;
  public idsolicitud:number;
  public idsolicitante:number;


  	constructor(
      private router: Router,
      private route: ActivatedRoute,
      private seguimientoservice: SeguimientoService,
      private alertService:AlertService
    )
    {
      this.idsolicitud= this.route.snapshot.params['id']; //recuperando en el constructor el parametro pasado de idsolicitud
      this.idsolicitante= this.route.snapshot.params['idSol'];
    }


  	ngOnInit() {

      this.getSolicitantes(this.idsolicitud,this.idsolicitante);
      this.getSolicitud(this.idsolicitud,this.idsolicitante);
      this.getTramite(this.idsolicitud,this.idsolicitante);
      this.getSeguimiento(this.idsolicitud,this.idsolicitante);
    };




  	title = 'Listado de Seguimientos del Trámite';
    selectedSolicitante: Solicitante;

    getSolicitantes(idSolicitud: number,idSolicitante:number) {
        this.x=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          this.selectedId= +params['id'];
          return this.seguimientoservice.getSolicitantes(idSolicitud,idSolicitante)
        })

        this.x.subscribe(

                       solicitantes => this.solicitantes = solicitantes,
                       error =>  this.errorMessage = <any>error);


    };

    getSolicitud(idSolicitud: number,idSolicitante:number) {
        this.y=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          //this.selectedId= +params['id'];
          return this.seguimientoservice.getSolicitudes(idSolicitud,idSolicitante);
        })

        this.y.subscribe(
                       solicitud => this.solicitudes = solicitud,
                       error =>  this.errorMessage = <any>error);



    };

    getTramite(idSolicitud: number,idSolicitante:number) {
        this.z=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          //this.selectedId= +params['id'];
          return this.seguimientoservice.getTramites(idSolicitud,idSolicitante)
        })

        this.z.subscribe(
                       tramite => this.tramites = tramite,
                       error =>  this.errorMessage = <any>error);

    };


    getSeguimiento(idSolicitud: number,idSolicitante:number) {
        this.a=this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) =>
        {

          //this.selectedId= +params['id'];
          return this.seguimientoservice.getSeguimientos(idSolicitud,idSolicitante)
        })

        this.a.subscribe(
                       seguimiento => {

                        this.seguimientos = seguimiento;

                        if (this.seguimientos.length > 0){

                          this.alertService.success("Núm. de solicitud recuperada exitosamente!");
                        }else{

                         this.alertService.error("Este núm. solicitud NO le pertenece, lo sentimos intente con otro núm. de solicitud!");
                        }
                       },

                       error => {
                         this.errorMessage = <any>error;
                         this.alertService.error("Este núm. solicitud NO existe, lo sentimos intente con otro núm. de solicitud!");
                       }
                      );

    };




    addSolicitante (name: string) {
      if (!name) { return; }
      this.seguimientoservice.addSolicitante(name)
                     .subscribe(
                       solicitante  => this.solicitantes.push(solicitante),
                       error =>  this.errorMessage = <any>error);
    }

  	onSelect(seguimiento: Seguimiento) {
    	this.router.navigate(['/adjunto', seguimiento.id_seguimiento, this.idsolicitud]);
    }

    onSelect2(seguimiento: Seguimiento) {
      console.log(seguimiento.id_seguimiento, seguimiento.observaciones, seguimiento.estatus);
    	this.router.navigate(['/upload', seguimiento.id_seguimiento, this.idsolicitud, this.idsolicitante]);
    }

    isSelected(seguimiento: Seguimiento) {/*alert ('dentro hero.id'+hero.id+' selectedId '+this.selectedId);*/ return seguimiento.id_seguimiento === this.selectedId; }


}
