import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';

import { CourseRoom } from '@rds-subjects/models/course-room.model';
import { RoomCourseService } from '@rds-subjects/services/room-course.service';

import { concat, from, merge, Observable, of } from 'rxjs';
import { tap, concatMap, switchMap, mergeMap, map, mergeAll, concatAll, toArray } from 'rxjs/operators';

import * as fromClass from '.';

@Injectable()
export class CourseRoomDataService extends DefaultDataService<CourseRoom> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private courseRoomService: RoomCourseService
  ) {
    super(fromClass.entityCollectionName, http, httpUrlGenerator);
  }
  /*   getAll(): Observable<CourseRoom[]> {
      return this.courseRoomService.getPeriods().pipe(
        mergeMap((periods) => periods.map(cicle => this.courseRoomService.getCoursesOnClicle(cicle.id))), mergeAll()
      );
    } */
  getAll(): Observable<CourseRoom[]> {
    return this.courseRoomService.list();
  }

  getWithQuery(queryParams: QueryParams): Observable<CourseRoom[]> {
    return this.courseRoomService.getCoursesWithQuery(queryParams);
  }
  getByKey(key: string): Observable<CourseRoom> {
    return this.courseRoomService.get(key);
  }
  add(courseRoom: CourseRoom): Observable<CourseRoom> {
    return from(this.courseRoomService.add(courseRoom));
  }
  /* update(courseRoom: Update<CourseRoom>): Observable<CourseRoom> {
    return from(
      this.courseRoomService.update({
        ...courseRoom.changes,
        priority: courseRoom.changes.priority,
      })
    );
  } */
  delete(key: string): Observable<string> {
    return from(this.courseRoomService.delete(key).then(() => key));
  }
}
