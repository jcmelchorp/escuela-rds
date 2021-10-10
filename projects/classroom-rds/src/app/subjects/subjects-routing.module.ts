import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SchoolUsersResolver } from './../school/services/school-users.resolver';

import { CourseRoomResolver } from './services/course-room.resolver';
import { CourseRoomsComponent } from './containers/course-rooms/course-rooms.component';
const routes: Routes = [
  {
    path: '',
    component: CourseRoomsComponent,
    resolve: { courses: CourseRoomResolver, users: SchoolUsersResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CourseRoomResolver, SchoolUsersResolver],
})
export class SubjectsRoutingModule {}
