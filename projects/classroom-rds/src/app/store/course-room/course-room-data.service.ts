import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Update } from '@ngrx/entity';

import { CourseRoom } from '@rds-subjects/models/course-room.model';
import { RoomCourseService } from '@rds-subjects/services/room-course.service';

import { from, Observable, of } from 'rxjs';
import { tap, concatMap, switchMap, mergeMap, map } from 'rxjs/operators';

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
  getAll(): Observable<CourseRoom[]> {
    const cicles: string[] = []
    const allcourses: CourseRoom[] = [];
    this.courseRoomService.getPeriods().pipe(
      switchMap((periods) =>
        periods.map(cicle => this.courseRoomService.getCoursesOnClicle(cicle)
          .pipe(
            map(courses => allcourses.push(...courses))))
      ));

    console.log(allcourses.length)
    return of(allcourses)
  }
  /* getAll(cicle?: string): Observable<CourseRoom[]> {
    return this.courseRoomService.getCoursesOnClicle(cicle);
  } */

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
