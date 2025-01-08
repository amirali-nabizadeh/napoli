import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SecureInnerPagesGuard } from './Guards/secure-inner-pages.guard';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { UserComponent } from './Components/user/user.component';
import { AdminComponent } from './Components/admin/admin.component';
import { AuthGuard } from './Guards/auth.guard';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';

const routes: Routes = [
  {
    path: 'SignIn',
    component: LoginComponent,
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: 'SignUp',
    component: RegisterComponent,
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: 'User',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['User', 'Admin'],
    },
  },
  {
    path: 'Admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['Admin'],
    },
  },
  {
    path: 'about_us',
    component: AboutUsComponent,
    canActivate: [SecureInnerPagesGuard],
    data: {
      role: ['User', 'Admin'],
    },
  },
  {
    path: 'contact_us',
    component: ContactUsComponent,
    canActivate: [SecureInnerPagesGuard],
    data: { role: ['User', 'admin'] },
  },

  { path: 'Home', component: HomeComponent },
  { path: '', redirectTo: '/Home', pathMatch: 'full' }, // redirect to Home component on root path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
