
import { AssignmentsComponent } from './assignments/assignments.component';
import { SchoolStudentsComponent } from './school-students/school-students.component';
import { SchoolTeachersComponent } from './school-teachers/school-teachers.component';
import { SchoolComponent } from './school/school.component';

export const schoolContainers: any[] = [
  SchoolComponent,
  SchoolStudentsComponent,
  SchoolTeachersComponent,
  AssignmentsComponent
]
export * from './school-students/school-students.component';
export * from './school-teachers/school-teachers.component';
export * from './school/school.component';
export * from './assignments/assignments.component';

