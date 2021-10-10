import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import {
  EntityDataService,
  EntityDefinitionService,
  EntityServices,
} from '@ngrx/data';

import { SharedModule } from '@rds-shared/shared.module';
import * as fromUserDomain from '@rds-admin/state/user-domain';
import * as fromEntity from '@rds-store/app/config/entity-metadata';
import * as fromUser from '@rds-store/user';
import { AdminApiService } from '@rds-admin/services';
import * as fromCourseRoom from '@rds-store/course-room';
import { CourseRoomDataService } from '@rds-store/course-room/course-room-data.service';
import { CourseRoomEntityService } from '@rds-store/course-room/course-room-entity.service';
import { UserDataService } from '@rds-store/user/user-data.service';
import { UserEntityService } from '@rds-store/user/user-entity.service';
import { CourseRoomService } from '@rds-subjects/services/course-room.service';
import { RoomCourseService } from '@rds-subjects/services/room-course.service';
import { UserDomainDataService } from '@rds-admin/state/user-domain/user-domain-data.service';
import { UserDomainEntityService } from '@rds-admin/state/user-domain/user-domain-entity.service';
import { schoolComponents } from './components';
import { schoolContainers } from './container';
import { SchoolRoutingModule } from './school-routing.module';
import { SchoolService } from './services/school.service';
import { RoomService } from '@rds-rooms/services/room.service';

@NgModule({
  declarations: [...schoolComponents, ...schoolContainers],
  imports: [SharedModule, SchoolRoutingModule],
  providers: [
    AdminApiService,
    SchoolService,
    RoomService,
    RoomCourseService,
    UserEntityService,
    UserDataService,
    UserDomainEntityService,
    UserDomainDataService,
    CourseRoomService,
    CourseRoomEntityService,
    CourseRoomDataService,
  ],
})
export class SchoolModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    userEntityService: UserEntityService,
    userDataService: UserDataService,
    userDomainEntityService: UserDomainEntityService,
    userDomainDataService: UserDomainDataService,
    courseRoomEntityService: CourseRoomEntityService,
    courseRoomDataService: CourseRoomDataService
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([
      userDomainEntityService,
      userEntityService,
      courseRoomEntityService,
    ]);
    entityDataService.registerService(
      fromUser.entityCollectionName,
      userDataService
    );
    entityDataService.registerService(
      fromUserDomain.entityCollectionName,
      userDomainDataService
    );
    entityDataService.registerService(
      fromCourseRoom.entityCollectionName,
      courseRoomDataService
    );
  }
}
