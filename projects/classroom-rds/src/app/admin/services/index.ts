import { AdminApiService } from '@rds-admin/services/admin-api.service';
import { AdminFireService } from '@rds-admin/services/admin-fire.service';
import { GroupsService } from '@rds-admin/services/groups.service';


export const adminServices: any[] = [
  AdminApiService,
  AdminFireService,
  GroupsService
];

export * from '@rds-admin/services/groups.service';
export * from '@rds-admin/services/admin-fire.service';
export * from '@rds-admin/services/admin-api.service';
