import { NgModule } from '@angular/core';
import { SharedModule } from '@rds-shared/shared.module';
import { RoomService } from '@rds-rooms/services/room.service';
import { SchoolService } from '@rds-school/services/school.service';
import { teachersComponents } from './components';
import { teachersContainers } from './containers';
import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersCoursesService } from './services/teachers-courses.service';
import { CourseRoomEntityService } from '../store/course-room/course-room-entity.service';
import {
  EntityDefinitionService,
  EntityServices,
  EntityDataService,
} from '@ngrx/data';
import { CourseRoomDataService } from '@rds-store/course-room/course-room-data.service';
import * as fromCourseRoom from '@rds-store/course-room';
import * as fromEntity from '@rds-store/app/config/entity-metadata';
import { RoomCourseService } from '@rds-subjects/services/room-course.service';
import { ScoreService } from './services/score.service';

@NgModule({
  declarations: [...teachersComponents, ...teachersContainers],
  imports: [SharedModule, TeachersRoutingModule],
  providers: [
    RoomService,
    ScoreService,
    SchoolService,
    RoomCourseService,
    TeachersCoursesService,
    CourseRoomEntityService,
    CourseRoomDataService,
  ],
})
export class TeachersModule {
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
