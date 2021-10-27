import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserHomeComponent, UserInfoComponent, WorkingOnGradesComponent, UserGradesComponent } from './components';

import { UserResolver } from './services/user.resolver';
import { UserComponent } from './containers/user/user.component';


const routes: Routes = [
  {
    path: '', component: UserComponent, resolve: { user: UserResolver }, children: [
      { path: '', component: UserHomeComponent },
      { path: 'info', component: UserInfoComponent },
      { path: 'grades_soon', component: WorkingOnGradesComponent },
      { path: 'grades', component: UserGradesComponent, data: { breadcrumb: 'Calificaciones' } },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserResolver],
})
export class UserRoutingModule { }
