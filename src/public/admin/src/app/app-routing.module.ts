import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from "./guards/auth.guard";

import { ContainerComponent } from './components/container/container.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: ContainerComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
