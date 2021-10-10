import { NgModule } from '@angular/core';

import {
  EntityDefinitionService,
  EntityServices,
  EntityDataService,
} from '@ngrx/data';

import * as fromEntity from '@rds-store/app/config/entity-metadata';

import { SharedModule } from '@rds-shared/shared.module';
import { CourseRoomDataService } from '@rds-store/course-room/course-room-data.service';
import { CourseRoomEntityService } from '@rds-store/course-room/course-room-entity.service';

import { subjectComponents } from './components';
import { subjectContainers } from './containers';
import { SubjectsRoutingModule } from './subjects-routing.module';

import { RoomCourseService } from './services/room-course.service';
import * as fromCourseRoom from '@rds-store/course-room';

@NgModule({
  declarations: [...subjectComponents, ...subjectContainers],
  imports: [SharedModule, SubjectsRoutingModule],
  providers: [
    RoomCourseService,
    CourseRoomEntityService,
    CourseRoomDataService,
  ],
})
export class SubjectsModule {
  constructor(
    eds: EntityDefinitionService,
    entityServices: EntityServices,
    entityDataService: EntityDataService,
    courseRoomEntityService: CourseRoomEntityService,
    courseRoomDataService: CourseRoomDataService
  ) {
    eds.registerMetadataMap(fromEntity.entityMetadata);
    entityServices.registerEntityCollectionServices([courseRoomEntityService]);
    entityDataService.registerService(
      fromCourseRoom.entityCollectionName,
      courseRoomDataService
    );
  }
}
