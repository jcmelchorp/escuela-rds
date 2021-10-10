import { AddUserGroupComponent } from '@rds-admin/components/add-user-group/add-user-group.component';
import { AdminWellcomeComponent } from '@rds-admin/components/admin-wellcome/admin-wellcome.component';
import { GroupDialogComponent } from '@rds-admin/components/group-dialog/group-dialog.component';
import { GroupComponent } from '@rds-admin/components/group/group.component';
import { UsersGroupsComponent } from '@rds-admin/components/users-groups/users-groups.component';
import { UsersTableComponent } from '@rds-admin/components/users-table/users-table.component';

import { GroupTableComponent } from './group-table/group-table.component';
import { UserDetailsComponent } from './user-details/user-details.component';

export const adminComponents: any[] = [
  AddUserGroupComponent,
  AdminWellcomeComponent,
  GroupComponent,
  GroupDialogComponent,
  GroupTableComponent,
  UsersGroupsComponent,
  UsersTableComponent,
  UserDetailsComponent
];

export * from '@rds-admin/components/add-user-group/add-user-group.component';
export * from '@rds-admin/components/admin-wellcome/admin-wellcome.component';
export * from '@rds-admin/components/group/group.component';
export * from '@rds-admin/components/group-table/group-table.component';
export * from '@rds-admin/components/group-dialog/group-dialog.component';
export * from '@rds-admin/components/users-groups/users-groups.component';
export * from '@rds-admin/components/users-table/users-table.component';
export * from '@rds-admin/components/user-details/user-details.component';



