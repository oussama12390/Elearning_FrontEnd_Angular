import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ChatComponent } from './components/chat/chat.component';
import { CategoriesComponent } from './components/categories/categories.component';

const routes: Routes = [
  { path: 'signup', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {path:"logOut",component:LogOutComponent},
  {path:"courses",component:CoursesComponent},
  {path:"chat",component:ChatComponent},
  {path:"categories",component:CategoriesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

