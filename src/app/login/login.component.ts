import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/index';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    //moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    currentUser: User;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.params['returnUrl'] || '/';
        //alert(this.returnUrl);
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {

                    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

                    if (JSON.stringify(this.currentUser).length > 10) {
                        //this.router.navigate(['/boton-buscar']);
                        this.router.navigate(['/home']);
                        this.alertService.success("Autenticado exitosamente...");

                    }else{

                        this.authenticationService.logout();
                        this.alertService.error("email y/o password erroneos, intenta de nuevo...",true);
                        this.loading = false;
                    }




                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                    this.router.navigate(['/']);
                });
    }
}
