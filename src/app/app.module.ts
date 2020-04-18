import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModuleBundle } from './shared/material-bundle.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';
import { NotFoundComponentModule } from './404/404.module';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({

  declarations: [
    AppComponent,
    MainComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModuleBundle,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NotFoundComponentModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      extendedTimeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      closeButton: true,
      enableHtml: true,
      progressBar: true,
      newestOnTop: true,
      iconClasses : {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning'
      }
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule
  ],

  providers: [

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
