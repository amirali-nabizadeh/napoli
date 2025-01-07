import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './dashbord/dashbord.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { AppComponent } from './app.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';
import { SignupUserComponent } from './signup-user/signup-user.component';
import { FormComponent } from './form/form.component';
import { FormDetailsComponent } from './form-details/form-details.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { MyFormsComponent } from './my-forms/my-forms.component';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginUserComponent },
      { path: 'signup', component: SignupUserComponent },
    ],
  },
  {
    path: 'main',
    component: MainPageComponent,
    children: [{ path: 'form', component: FormComponent }],
    canActivate: [AuthGuard],
  },
  { path: 'formDetails/:index', component: FormDetailsComponent },
  { path: 'userInfo', component: UserInfoComponent },
  { path: 'myForms', component: MyFormsComponent },

  { path: 'not-found', component: NotFoundComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
