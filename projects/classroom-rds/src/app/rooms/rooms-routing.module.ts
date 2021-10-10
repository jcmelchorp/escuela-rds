import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseRoomResolver } from '@rds-subjects/services/course-room.resolver';

import { SchoolUsersResolver } from './../school/services/school-users.resolver';

import { RoomsComponent } from './containers/rooms/rooms.component';

const routes: Routes = [
  {
    path: '',
    component: RoomsComponent,
    resolve: { courses: CourseRoomResolver, users: SchoolUsersResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CourseRoomResolver, SchoolUsersResolver],
})
export class RoomsRoutingModule {}
