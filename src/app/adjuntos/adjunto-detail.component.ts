import { Component, OnInit, Input, HostBinding} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Adjunto } from './adjunto';
import {AdjuntoService} from './adjunto.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
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
export class AdjuntoDetailComponent implements OnInit {

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
  	private service: AdjuntoService
  ) { }

  ngOnInit() {
  	this.route.params
    // (+) converts string 'id' to a number
    .switchMap((params: Params) => this.service.getAdjunto(+params['id']))
    .subscribe((adjunto: Adjunto) => this.adjunto = adjunto);
  }

  title: 'detalle';
  active = true;
  submitted = false;
  onSubmit() { this.submitted = true; }
  //@Input()
  adjunto: Adjunto;

  gotoAdjuntos() {
  	let adjuntoId = this.adjunto ? this.adjunto.id_adjunto : null;
  	// Pass along the hero id if available
  	// so that the HeroList component can select that hero.
  	this.router.navigate(['/adjuntos', { id: adjuntoId }]);
  }

}
