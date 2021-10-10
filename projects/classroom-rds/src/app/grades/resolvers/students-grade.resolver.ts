import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { StudentEntityService } from '@rds-store/student/student-entity.service';
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
@Injectable()
export class StudentsGradeResolver implements Resolve<boolean> {
  constructor(private studentEntityService: StudentEntityService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.studentEntityService.loading$.pipe(
      tap((loading) => {
        if (!loading) {
          this.studentEntityService.getWithQuery(
            route.paramMap.get('courseId')
          );
        }
      }),
      filter((loading) => !!loading),
      first()
    );
  }
}
