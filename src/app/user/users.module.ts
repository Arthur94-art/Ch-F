import { SharedModuleModule } from './../shared/shared-module.module';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { HomeLayoutComponent } from "./components/home-page/home-layout.component";
import { LeafleatTutorialComponent } from "./components/leafleat-tutorial/leafleat-tutorial.component";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { LoginComponent } from "./auth/login-component/login.component";
import { AuthUserService } from "./auth/services/auth-user.service";
import { UsersAuthNotLoggedGuard } from "./auth/services/users-guards/users-auth-not-logged.guard";
import { UserAuthLoggedGuard } from "./auth/services/users-guards/user-auth-logged.guard";
import { ErrorPageComponent } from "../error-page/error-page.component";
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

@NgModule({
  declarations: [MainLayoutComponent, LoginComponent],
  imports: [
    SharedModuleModule,
    RouterModule.forChild([{
      path: '', component: MainLayoutComponent, children: [
        { path: 'login', component: LoginComponent, canActivate: [UserAuthLoggedGuard] },
        { path: 'home', component: HomeLayoutComponent, canActivate: [UsersAuthNotLoggedGuard] },
        { path: 'tutorial', component: LeafleatTutorialComponent, canActivate: [UsersAuthNotLoggedGuard] },
        { path: 'add-user', component: AddUserComponent, canActivate: [UsersAuthNotLoggedGuard] },
        { path: '', redirectTo: '/user/home', pathMatch: 'full' },
        { path: '404', component: ErrorPageComponent },
        { path: '**', redirectTo: '/404' }
      ]
    }]
    )
  ],
  exports: [RouterModule],
  providers: [AuthUserService]
})
export class UsersModule {
}
