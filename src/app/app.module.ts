import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
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
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { NotFoundComponentModule } from './404/404.module';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponentModule } from './main/main.module';
import { SnackModule } from './shared/snackbar/snack.module';
import { TopNavModule } from './top-nav/top-nav.module';
import { SideNavModule } from './side-nav/side-nav.module';

@NgModule({

  declarations: [
    AppComponent
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
    MainComponentModule,
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
    //AngularFireAnalyticsModule,
    SnackModule,
    TopNavModule,
    SideNavModule,
    AppRoutingModule
  ],

  providers: [

  ],

  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faShoppingCart);
  }
}
