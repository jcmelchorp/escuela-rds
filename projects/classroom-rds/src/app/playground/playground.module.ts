import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromCourseRoom from '@rds-store/course-room';
import * as fromUser from '@rds-store/user';
import * as fromEntity from '@rds-store/app/config/entity-metadata';
import { PlaygroundRoutingModule } from './playground-routing.module';
import { EntityDefinitionService, EntityServices, EntityDataService } from '@ngrx/data';
import { CourseRoomDataService } from '@rds-store/course-room/course-room-data.service';
import { CourseRoomEntityService } from '@rds-store/course-room/course-room-entity.service';
import { SharedModule } from '@rds-shared/shared.module';
import { PlaygroundComponent } from './containers/playground/playground.component';
import { UserDomainDataService } from '../admin/state/user-domain/user-domain-data.service';
import { UserDataService } from '@rds-store/user/user-data.service';
import { UserEntityService } from '../store/user/user-entity.service';


@NgModule({
  declarations: [
    PlaygroundComponent
  ],
  imports: [
    SharedModule,
    PlaygroundRoutingModule
  ],
  providers: [
    CourseRoomDataService,
    CourseRoomEntityService,
    UserDataService,
    UserEntityService
  ],
})
export class PlaygroundModule {
  constructor(eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    courseRoomEntityService: CourseRoomEntityService,
    courseRoomDataService: CourseRoomDataService,
    userEntityService: UserEntityService,
    userDataService: UserDataService
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([courseRoomEntityService, userEntityService]);
    entityDataService.registerService(fromCourseRoom.entityCollectionName, courseRoomDataService);
    entityDataService.registerService(fromUser.entityCollectionName, userDataService);
  }
}
