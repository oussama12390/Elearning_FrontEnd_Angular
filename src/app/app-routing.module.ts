import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ChatComponent } from './components/chat/chat.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AuthGuard } from './components/guards/auth.guard';
import { PageAdminComponent } from './components/page-admin/page-admin.component';
import { PageUserComponent } from './components/page-user/page-user.component';

import { MeetComponent } from './components/meet/meet.component';
import { CategoryManagementComponent } from './components/category-management/category-management.component';
import { UserChatComponent } from './components/user-chat/user-chat.component';
import { UserCoursesComponent } from './components/user-courses/user-courses.component';
import { UserCategoriyComponent } from './components/user-categoriy/user-categoriy.component';
import { UserMeetComponent } from './components/user-meet/user-meet.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ChapterManagementComponent } from './components/chapter-management/chapter-management.component';

const routes: Routes = [
  /*{ path: 'register', component: RegisterComponent },
  { path: 'admin', component: PageAdminComponent },
  { path: 'user', component: PageUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
   */
   { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: PageAdminComponent },
  { path: 'user', component: PageUserComponent },
  { path: 'login', component: LoginComponent },
   { path: '', redirectTo: '/login', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/login' }, // Redirect to home for undefined routes
  {path:'chat',component:ChatComponent},
  {path:'courses',component:CoursesComponent},
  {path:'categories',component:CategoryManagementComponent},
  {path:'meet',component:MeetComponent},
  {path:'upload-image',component:ImageUploadComponent},
  {path:'chapter-magment',component:ChapterManagementComponent},


  {path:'user-chat',component:UserChatComponent},
  {path:'user-courses',component:UserCoursesComponent},
  {path:'user-categoriy',component:UserCategoriyComponent},
  {path:'user-meet',component:UserMeetComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvdXNzYW1hQHVtcC5hYy5tYSIsImlhdCI6MTcyNTA0NDAyMiwiZXhwIjoxNzI1MTMwNDIyfQ.xKEpFBXD2MHoVO9Ak6HUK9ItcSsYVXv5IFCKTi3Fs0M/
//http://localhost:8080/admin/api/images/upload