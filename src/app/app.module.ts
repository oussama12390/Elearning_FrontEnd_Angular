import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { LogOutComponent } from './components/log-out/log-out.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ChatComponent } from './components/chat/chat.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from './service/auth.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';


@NgModule({
  declarations:[
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LogOutComponent,
    CoursesComponent,
    ChatComponent,
    CategoriesComponent,
    ProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule//  add
  
  ],
  providers: [
    AuthService, // Ajoutez vos services ici
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS } // Ajoutez JwtHelperService comme fournisseur
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
