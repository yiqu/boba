import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthSigninComponent } from './signin/signin.component';
import { AuthSignupComponent } from './signup/signup.component';
import { AuthUserExistGuard } from '../shared/route-guards/auth-guards.service';

const routes: Routes = [
  { path: '', component: AuthComponent,
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', component: AuthSigninComponent,
        //canActivate: [AuthUserExistGuard] ngZone issue
      },
      { path: 'signup', component: AuthSignupComponent,
        //canActivate: [AuthUserExistGuard]
      },
  ]}
]

@NgModule({
  imports: [
    RouterModule.forChild(
      routes,
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {}
