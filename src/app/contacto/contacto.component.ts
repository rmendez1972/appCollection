import { Component, OnInit, HostBinding} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { Router, ActivatedRoute, Params } from '@angular/router';




@Component({
  selector:    'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls:  ['./contacto.component.css'],
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
        animate('0.9s ease-out', style({
          opacity: 0,
          transform: 'translateY(70%)'
        }))
      ])
    ])
  ]
})
export class ContactoComponent implements OnInit {
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
     private router: Router

  ) { }

  ngOnInit() {
  }
  title: string = 'Contacto';
  // google maps zoom level
  zoom: number = 17;
  lat: number = 18.49926214;
  lng: number = -88.31169829;
  label: string ="SEDUVI"
}
