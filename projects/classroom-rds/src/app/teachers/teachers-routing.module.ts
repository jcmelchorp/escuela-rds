import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeachersDashboardComponent } from './components';
import { TeachersComponent } from './containers';

import { ScoresEditComponent } from './components/scores-edit/scores-edit.component';
import { TeacherCoursesComponent } from './components/teacher-courses/teacher-courses.component';
import { TeachersCoursesResolver } from './services/teachers-courses.resolver';
import { CourseRoomResolver } from '../subjects/services/course-room.resolver';

const routes: Routes = [
  {
    path: '',
    component: TeachersComponent,
    children: [
      { path: '', component: TeachersDashboardComponent },
      {
        path: 'calificaciones',
        component: TeacherCoursesComponent,
        data: {
          breadcrumb: 'Calificaciones',
        },
        resolve: { users: CourseRoomResolver },
      },
      {
        path: ':courseId',
        component: ScoresEditComponent,
        data: { breadcrumb: ':courseId' },
        //resolve: { users: TeachersCoursesResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CourseRoomResolver],
})
export class TeachersRoutingModule {}
