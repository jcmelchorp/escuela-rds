import { AssigmentsDashboardComponent } from './assigments-dashboard/assigments-dashboard.component';
import { SaveUserConfirmComponent } from './save-user-confirm/save-user-confirm.component';
import { SaveUserErrorComponent } from './save-user-error/save-user-error.component';
import { SaveUserComponent } from './save-user/save-user.component';
import { SchoolDashboardComponent } from './school-dashboard/school-dashboard.component';
import { SchoolUserComponent } from './school-user/school-user.component';
import { SchoolUsersComponent } from './school-users/school-users.component';
import { TeachersFormComponent } from './teachers-form/teachers-form.component';
import { NewCicleDialogComponent } from './new-cicle-dialog/new-cicle-dialog.component';

export const schoolComponents: any[] = [
  SchoolDashboardComponent,
  TeachersFormComponent,
  AssigmentsDashboardComponent,
  SchoolUsersComponent,
  SchoolUserComponent,
  SaveUserComponent,
  SaveUserConfirmComponent,
  SaveUserErrorComponent,
  NewCicleDialogComponent,
];
export * from './school-dashboard/school-dashboard.component';
export * from './teachers-form/teachers-form.component';
export * from './assigments-dashboard/assigments-dashboard.component';
export * from './school-users/school-users.component';
export * from './school-user/school-user.component';
export * from './save-user/save-user.component';
export * from './save-user-confirm/save-user-confirm.component';
export * from './save-user-error/save-user-error.component';
export * from './new-cicle-dialog/new-cicle-dialog.component';
