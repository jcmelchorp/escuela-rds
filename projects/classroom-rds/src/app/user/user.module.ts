import { NgModule } from '@angular/core';
import {
  EntityDefinitionService,
  EntityServices,
  EntityDataService,
} from '@ngrx/data';
import { SharedModule } from '@rds-shared/shared.module';
import * as fromEntity from '@rds-store/app/config/entity-metadata';
import * as fromUser from '@rds-store/user';
import { SchoolService } from '@rds-school/services/school.service';
import { UserDataService } from '@rds-store/user/user-data.service';
import { UserEntityService } from '@rds-store/user/user-entity.service';
import { ChartsModule } from 'ng2-charts';
import { userComponents } from './components';
import { UserRoutingModule } from './user-routing.module';
import { UserResolver } from './services/user.resolver';
import { ScoreService } from '../teachers/services/score.service';

@NgModule({
  declarations: [...userComponents],
  imports: [SharedModule, UserRoutingModule, ChartsModule],
  providers: [SchoolService, ScoreService, UserEntityService, UserDataService],
})
export class UserModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    userEntityService: UserEntityService,
    userDataService: UserDataService
  ) {
    entityServices.registerEntityCollectionServices([userEntityService]);
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityDataService.registerService(
      fromUser.entityCollectionName,
      userDataService
    );
  }
}
