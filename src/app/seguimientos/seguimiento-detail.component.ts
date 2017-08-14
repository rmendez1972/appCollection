import { Component, OnInit, Input, HostBinding, trigger, transition, animate, style, state } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Solicitante } from './solicitante';
import {SeguimientoService} from './seguimiento.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-seguimiento-detail',
  templateUrl: './seguimiento-detail.component.html',
  styleUrls: ['./seguimiento-detail.component.css'],
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
        animate('0.5s ease-in')
      ]),
      transition(':leave', [
        animate('0.8s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class SeguimientoDetailComponent implements OnInit {

	@HostBinding('@routeAnimation') get routeAnimation() {
    	return true;
  	}

  	@HostBinding('style.display') get display() {
    	return 'block';
  	}

  	@HostBinding('style.position') get position() {
    	return 'relative';
  	}

  constructor(
  	private route: ActivatedRoute,
  	private router: Router,
  	private service: SeguimientoService
  ) { }

  ngOnInit() {
  	this.route.params
    // (+) converts string 'id' to a number
    .switchMap((params: Params) => this.service.getSolicitante(+params['id'],+params['id']))
    .subscribe((solicitante: Solicitante) => this.solicitante = solicitante);
  }

  title: 'detalle';
  active = true;
  submitted = false;
  onSubmit() { this.submitted = true; }
  //@Input()
  solicitante: Solicitante;

  gotoSolicitantes() {
  	let solicitanteId = this.solicitante ? this.solicitante.id_solicitante : null;
  	// Pass along the hero id if available
  	// so that the HeroList component can select that hero.
  	this.router.navigate(['/solicitantes', { id: solicitanteId }]);
  }

}
