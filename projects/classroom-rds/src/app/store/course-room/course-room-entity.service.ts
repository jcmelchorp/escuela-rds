import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Observable } from 'rxjs';
import { CourseRoom } from '@rds-subjects/models/course-room.model';
import * as fromCourseRoom from '.';
import { QueryParams } from '@ngrx/data';
import { RoomCourseService } from '@rds-subjects/services/room-course.service';
@Injectable()
export class CourseRoomEntityService extends EntityCollectionServiceBase<CourseRoom> {
  constructor(
    readonly serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(fromCourseRoom.entityCollectionName, serviceElementsFactory);
  }
}
