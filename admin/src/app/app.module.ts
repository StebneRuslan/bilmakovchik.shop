import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from '@angular/material';
import { MatCardModule } from "@angular/material/card";
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxSpinnerModule } from 'ngx-spinner';

import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ContainerComponent } from './components/container/container.component';
import { UsersComponent } from './components/users/users.component';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { CookieService } from 'ngx-cookie-service';
import { AuthenticationInterceptor } from "./interceptors/auth.interceptor";
import { UserComponent } from './components/users/user/user.component';
import { GraphicComponent } from './components/graphic/graphic.component';
import { UsersUploaderComponent } from './components/users-uploader/users-uploader.component';
import { FilesComponent } from './components/files/files.component';
import { FileComponent } from './components/files/file/file.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ContainerComponent,
    UsersComponent,
    LoginComponent,
    RegistrationComponent,
    UserComponent,
    GraphicComponent,
    UsersUploaderComponent,
    FilesComponent,
    FileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MaterialFileInputModule,
    NgxSpinnerModule
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
