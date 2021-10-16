import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { CourseRoomEntityService } from '@rds-store/course-room/course-room-entity.service';

import { Observable } from 'rxjs';
import { filter, tap, first } from 'rxjs/operators';

@Injectable()
export class CourseRoomResolver implements Resolve<boolean> {
  constructor(private courseRoomEntityService: CourseRoomEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.courseRoomEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.courseRoomEntityService.getAll();
          /*  .getWithQuery({
             field: 'cicle',
             operation: '==',
             value:'20212022' ,
           }); */
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
