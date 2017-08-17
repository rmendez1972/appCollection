import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/index';
//import { BotonBuscarComponent } from './boton-buscar/boton-buscar.component';
import { MenuComponent } from './menus/menu.component';
import { LoginComponent } from './login/index';
//import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';

// vector vacio por q las rutas las controlo en cada componente
const appRoutes: Routes = [
    { path: '',  redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent }
    //{ path: 'register', component: RegisterComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}