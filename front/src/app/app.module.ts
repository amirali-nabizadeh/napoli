import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginUserComponent } from './login-user/login-user.component';
import { MainPageComponent } from './dashbord/dashbord.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { AuthComponent } from './auth/auth.component';
import { SignupUserComponent } from './signup-user/signup-user.component';
import { FormComponent } from './form/form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { TableComponent } from './table/table.component';
import { FormDetailsComponent } from './form-details/form-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserInfoComponent } from './user-info/user-info.component';
import { MyFormsComponent } from './my-forms/my-forms.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    MainPageComponent,
    NotFoundComponent,
    NotAuthorizedComponent,
    AuthComponent,
    SignupUserComponent,
    FormComponent,
    NavbarComponent,
    FooterComponent,
    TableComponent,
    FormDetailsComponent,
    UserInfoComponent,
    MyFormsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, NgxPaginationModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
