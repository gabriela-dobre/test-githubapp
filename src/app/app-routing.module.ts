import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UsersListComponent } from './modules/users/users-list/users-list.component';
import { UserDetailsComponent } from './modules/users/user-details/user-details.component';
import { ReposListComponent } from './modules/repos/repos-list/repos-list.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'ups', component: PageNotFoundComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'repos', component: ReposListComponent },
  { path: 'user/:name', component: UserDetailsComponent },
  { path: '**', redirectTo: '/ups' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
