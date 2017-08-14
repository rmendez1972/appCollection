import { Component, OnInit } from '@angular/core';

import { AlertService } from '../_services/index';

@Component({
    //moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => {

        	//alert('el mensaje dentro del typscript del alertcomponent '+message);
        	this.message = message; //este es el objeto que contiene todas las propiedades del mensaje a mostrar

        });
    }


}