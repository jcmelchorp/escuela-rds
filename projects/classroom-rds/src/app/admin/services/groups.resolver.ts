import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { GroupEntityService } from '../state/group/group-entity.service';


@Injectable()
export class GroupsResolver implements Resolve<boolean> {

  constructor(private groupEntityService: GroupEntityService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.groupEntityService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.groupEntityService.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()
      );
  }
}
