import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { UserEntityService } from '@rds-store/user/user-entity.service';

import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

@Injectable()
export class UsersResolver implements Resolve<boolean> {
  usersOnline: number = 0;
  constructor(private userEntityService: UserEntityService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userEntityService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.userEntityService.getAll();
        }
      }),
      filter((loaded) => !!loaded),
      first()
    );
  }
}
