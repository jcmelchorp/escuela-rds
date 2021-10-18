import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolUsersResolver } from '@rds-school/services/school-users.resolver';
import { CourseRoomResolver } from '@rds-subjects/services/course-room.resolver';
import { PlaygroundComponent } from './containers/playground/playground.component';

const routes: Routes = [{ path: '', component: PlaygroundComponent, resolve: { courses: CourseRoomResolver, users: SchoolUsersResolver }, }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CourseRoomResolver, SchoolUsersResolver],
})
export class PlaygroundRoutingModule { }
