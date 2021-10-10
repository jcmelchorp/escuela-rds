import { NgModule } from '@angular/core';

import { EntityDefinitionService, EntityServices, EntityDataService } from '@ngrx/data';

import { AdminRoutingModule } from '@rds-admin/admin-routing.module';

import { SharedModule } from '@rds-shared/shared.module';

import * as fromUserDomain from '@rds-admin/state/user-domain';
import * as fromGroup from '@rds-admin/state/group';

import * as fromEntity from '@rds-store/app/config/entity-metadata';

import { adminComponents } from '@rds-admin/components';
import { adminContainers } from '@rds-admin/containers';
import { adminServices } from '@rds-admin/services';

import { GroupsResolver } from './services/groups.resolver';
import { UserDomainsResolver } from './services/user-domains.resolver';
import { GroupDataService } from './state/group/group-data.service';
import { GroupEntityService } from './state/group/group-entity.service';
import { UserDomainDataService } from './state/user-domain/user-domain-data.service';
import { UserDomainEntityService } from './state/user-domain/user-domain-entity.service';

@NgModule({
  declarations: [
    ...adminComponents,
    ...adminContainers,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
  ],
  providers: [
    ...adminServices,
    UserDomainsResolver,
    UserDomainEntityService,
    UserDomainDataService,
    GroupsResolver,
    GroupEntityService,
    GroupDataService
  ]
})
export class AdminModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    userDomainEntityService: UserDomainEntityService,
    userDomainDataService: UserDomainDataService,
    groupEntityService: GroupEntityService,
    groupDataService: GroupDataService
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([userDomainEntityService, groupEntityService]);
    entityDataService.registerService(fromUserDomain.entityCollectionName, userDomainDataService);
    entityDataService.registerService(fromGroup.entityCollectionName, groupDataService);

  }
}
