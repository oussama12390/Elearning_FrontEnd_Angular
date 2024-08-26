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
import { CommonModule } from '@angular/common';
import { PageAdminComponent } from './components/page-admin/page-admin.component';
import { PageUserComponent } from './components/page-user/page-user.component';
import { MeetComponent } from './components/meet/meet.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';
import { UserChatComponent } from './components/user-chat/user-chat.component';
import { UserCategoriyComponent } from './components/user-categoriy/user-categoriy.component';
import { UserMeetComponent } from './components/user-meet/user-meet.component';  // Import CommonModule


@NgModule({
  declarations:[
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogOutComponent,
    CoursesComponent,
    ChatComponent,
    CategoriesComponent,
    ProfileComponent,
    PageAdminComponent,
    PageUserComponent,
    MeetComponent,
    CategoryManagementComponent,
    UserCoursesComponent,
    UserChatComponent,
    UserCategoriyComponent,
    UserMeetComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,  // Add CommonModule here
  
  ],
  providers: [
    AuthService, // Ajoutez vos services ici
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS } // Ajoutez JwtHelperService comme fournisseur
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
