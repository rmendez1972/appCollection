//import { Component, OnInit } from '@angular/core';
import { Component, OnInit, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../_models/index';
import { AlertService, CambioPasswordService } from '../_services/index';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-cambia-password',
  templateUrl: './cambia-password.component.html',
  styleUrls: ['./cambia-password.component.css'],
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


export class CambiaPasswordComponent implements OnInit {
     @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }
  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'relative';
  }

    model: any = {};
    loading = false;
    returnUrl: string;
    currentUser: User;
    id:string;
    private respuestas:boolean[];
    private x: Observable<boolean[]>;
    private errorMessage: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cambiapasswordservice: CambioPasswordService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();

        //get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.params['returnUrl'] || '/';
        //alert(this.returnUrl);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        for (var elemento in this.currentUser) {
          this.id=this.currentUser[elemento].id
        }

    }



    //CambiaPassword(id_solicitante:string, password:string, new_password:string) {
    CambiaPassword() {

        this.loading = true;

        this.x=this.route.params
        .switchMap ((params: Params)=>
        {
          return this.cambiapasswordservice.cambioPassword(this.id, this.model.new_password)
        })

        this.x.subscribe(
          data => {
            this.router.navigate(['/boton-buscar']);
            this.respuestas = data;
            this.alertService.success("Nuevo password cambiado exitosamente...");
          },
          error =>  {
            this.errorMessage = <any>error
            this.alertService.error("Ups! Algo pasó, no se pudo cambiar tú password, inténtalo de nuevo");
          }
        );
    };
}
