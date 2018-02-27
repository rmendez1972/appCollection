import { Component, OnInit } from '@angular/core';
import { ConfirmService } from '../_services/index';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    //moduleId: module.id,
    selector: 'confirm',
    templateUrl: 'confirm.component.html'
})
export class ConfirmComponent {
    message: any;

    constructor(
      public router: Router,
      private route: ActivatedRoute,
      private confirmService: ConfirmService,
   ) {}
   ngOnInit() {

    //this function waits for a message from alert service, it gets
    //triggered when we call this from any other component
    	this.confirmService.getMessage().subscribe(message => {

        	this.message = message;



    	});
	}
}