import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { Store } from '@ngrx/store';

import { CourseRoomEntityService } from '@rds-store/course-room/course-room-entity.service';
import { AppState } from '@rds-store/app.state';

import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { selectUser } from '@rds-auth/state/auth.selectors';

@Injectable()
export class TeachersCoursesResolver implements Resolve<boolean> {
  userId!: string;
  constructor(
    private courseRoomEntityService: CourseRoomEntityService,
    private store: Store<AppState>
  ) {
    this.store.select(selectUser).subscribe((user) => (this.userId = user.id));
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.courseRoomEntityService.loading$.pipe(
      tap((loading) => {
        if (!loading) {
          this.courseRoomEntityService.getWithQuery({
            field: 'mainTeacherId',
            operation: '==',
            value: this.userId,
          });
        }
      }),
      filter((loading) => !!loading),
      first()
    );
  }
}
