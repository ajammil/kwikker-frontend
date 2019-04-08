import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotificationsModule } from './notifications/notifications.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { ErrorPageComponent } from './ErrorPage/error-page/error-page.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: '', component: SignUpComponent},
  {path:'notifications', component: NotificationsComponent},
  {path: 'login', component: LogInComponent},
  {path: 'error', component: ErrorPageComponent}
];

@NgModule({

  imports: [RouterModule.forRoot(routes),
    NotificationsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
