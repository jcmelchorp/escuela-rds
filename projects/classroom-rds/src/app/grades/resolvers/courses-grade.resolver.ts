import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { QueryParams } from '@ngrx/data';
import { Store } from '@ngrx/store';
import * as fromAuthSelector from '@rds-auth/state/auth.selectors';
import { CourseEntityService } from '@rds-store/course/course-entity.service';
import { AppState } from '@rds-store/app.state';
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
@Injectable()
export class CoursesGradeResolver implements Resolve<boolean> {
  userId: string;
  constructor(
    private courseEntityService: CourseEntityService,
    private store: Store<AppState>
  ) {
    this.store
      .select(fromAuthSelector.selectUser)
      .pipe(map((user) => (this.userId = user.id)));
  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.courseEntityService.loading$.pipe(
      tap((loading) => {
        if (!loading) {
          const queryParams: QueryParams = {
            teacherId: this.userId,
            courseStates: 'ACTIVE',
          };
          this.courseEntityService.getWithQuery(queryParams);
        }
      }),
      filter((loading) => !!loading),
      first()
    );
  }
}
