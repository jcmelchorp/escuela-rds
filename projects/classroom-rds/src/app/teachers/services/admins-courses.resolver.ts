import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { UserEntityService } from '@rds-store/user/user-entity.service';

import { Observable } from 'rxjs';
import {
  filter,
  first,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { CourseRoomEntityService } from '../../store/course-room/course-room-entity.service';
import { CourseRoom } from '../../subjects/models/course-room.model';

@Injectable()
export class AdminsCoursesResolver implements Resolve<boolean> {
  constructor(private userEntityService: UserEntityService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userEntityService.loading$.pipe(
      tap((loading) => {
        if (!loading) {
          this.userEntityService
            .getWithQuery(route.queryParams)
            .pipe(
              map((users) =>
                users.filter(
                  (u) =>
                    u.grade == route.queryParams.grade &&
                    u.suspended == route.queryParams.grade
                )
              )
            );
        }
      }),
      filter((loading) => !!loading),
      first()
    );
  }
}
