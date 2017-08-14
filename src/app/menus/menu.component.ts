import { Component , OnInit, Input, Output, EventEmitter} from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
//import { Hero } from './hero';
//import {HeroService} from './hero.service';
//import { Router, ActivatedRoute, Params } from '@angular/router';

//import 'rxjs/add/operator/switchMap';
//import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],

})
export class MenuComponent implements OnInit {
	currentUser: User;
	users: User[] = [];
	@Output() everySecond: EventEmitter<any> = new EventEmitter();

     constructor(private userService: UserService) {
         setInterval(() => this.everySecond.emit(this.currentUser = JSON.parse(localStorage.getItem('currentUser'))), 1000);

    }

  	ngOnInit() {

    };
}