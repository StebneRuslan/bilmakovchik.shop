import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from "./guards/auth.guard";

import { ContainerComponent } from './components/container/container.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserComponent } from "./components/users/user/user.component";
import { GraphicComponent } from "./components/graphic/graphic.component";
import { UsersUploaderComponent } from "./components/users-uploader/users-uploader.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: ContainerComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'graphic',
    component: GraphicComponent
  },
  {
    path: 'user/:id',
    component: UserComponent
  },
  {
    path: 'users-uploader',
    component: UsersUploaderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
