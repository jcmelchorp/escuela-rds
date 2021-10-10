import { AdminComponent } from '@rds-admin/containers/admin/admin.component';
import { GroupsComponent } from '@rds-admin/containers/groups/groups.component';
import { SchoolHomeComponent } from '@rds-admin/containers/school-home/school-home.component';
import { UsersDomainComponent } from '@rds-admin/containers/users-domain/users-domian.component';

export const adminContainers: any[] = [
  AdminComponent,
  GroupsComponent,
  UsersDomainComponent,
  SchoolHomeComponent
];

export * from '@rds-admin/containers/users-domain/users-domian.component';
export * from '@rds-admin/containers/admin/admin.component';
export * from '@rds-admin/containers/groups/groups.component';
export * from '@rds-admin/containers/school-home/school-home.component';

